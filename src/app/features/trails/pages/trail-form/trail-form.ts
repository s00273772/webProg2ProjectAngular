import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateTrailDto, Trail } from '../../models/trail.model';
import { ReactiveFormsModule } from '@angular/forms';
import { TrailService } from '../../services/trail.service';
import { Router, RouterLink} from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-trail-form',
  imports: [ReactiveFormsModule, RouterLink, MatProgressBarModule, MatSelect, MatOption, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule
],
  templateUrl: './trail-form.html',
  styleUrl: './trail-form.scss',
})


//I had to use ChatGPT to help me figure out how to include the locationCoordinates in the form
export class TrailForm {
  private formBuilder = inject(FormBuilder);
  private trailService = inject(TrailService);
  private router = inject(Router);

  private snackBar = inject(MatSnackBar);

  saving = signal(false);
  saveError = signal<string | null>(null);

  trailForm = this.formBuilder.nonNullable.group({
    trailName: ['', [Validators.required, Validators.minLength(1)]],
    longitude: this.formBuilder.control<number | null>(null),
    latitude: this.formBuilder.control<number | null>(null),
    country: ['', [Validators.required, Validators.minLength(1)]],
    difficultyLevel: ['', [Validators.required]]
  });

  //I asked ChatGPT how to save locationCoordinates using the form
  //use lat and long and set values in on submit using trailForm.value
  onSubmit(): void{
    
    const {trailName, latitude, longitude, country, difficultyLevel} = this.trailForm.getRawValue();
    
   
    
    const newTrail: CreateTrailDto = {
      
      trailName: trailName ?? '',
      locationCoordinates: {
        type: 'Point',
        coordinates: [Number(longitude), Number(latitude)]
      },
      country: country ?? '',
      difficultyLevel: difficultyLevel ?? ''

    };

    this.saving.set(true);
    this.saveError.set(null);

    this.trailForm.disable();

    this.trailService.addTrail(newTrail).subscribe({
      next: (response) => {
        this.snackBar.open(`${newTrail.trailName} ${newTrail.country} saved`, 'Close', {
          duration: 10000
        });
        console.log('Trail Added successfully:', response);
        this.router.navigate(['/trails']);
      },
      error: (error) => {
        this.saveError.set(error.message);
        this.saving.set(false);
        this.trailForm.enable();
      }
    });

    this.router.navigate(['/trails']);
  }
}
