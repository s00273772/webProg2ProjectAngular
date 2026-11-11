import { Component, inject, OnInit, signal } from '@angular/core';
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
import { input } from '@angular/core';
import { notBlank } from '../../../../shared/validators/not-blank.validator';

@Component({
  selector: 'app-trail-form',
  imports: [ReactiveFormsModule, RouterLink, MatProgressBarModule, MatSelect, MatOption, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule
],
  templateUrl: './trail-form.html',
  styleUrl: './trail-form.scss',
})


//I had to use ChatGPT to help me figure out how to include the locationCoordinates in the form
export class TrailForm implements OnInit {
  private formBuilder = inject(FormBuilder);
  private trailService = inject(TrailService);
  private router = inject(Router);

  private snackBar = inject(MatSnackBar);

  saving = signal(false);
  saveError = signal<string | null>(null);

  readonly id = input<string>();

  ngOnInit(): void {
    const id = this.id();
    if (!id) return; 

    this.trailService.getTrailById(id).subscribe({
      next: (trail) =>
        this.trailForm.patchValue({ trailName: trail.trailName, country: trail.country, difficultyLevel: trail.difficultyLevel, longitude: trail.locationCoordinates?.coordinates[0] ?? null, latitude: trail.locationCoordinates?.coordinates[1] ?? null }),
      error: (err: Error) => this.saveError.set(err.message),
    });
  }


  trailForm = this.formBuilder.nonNullable.group({
    trailName: ['', [Validators.required, Validators.minLength(1), notBlank]],
    longitude: this.formBuilder.control<number | null>(null),
    latitude: this.formBuilder.control<number | null>(null),
    country: ['', [Validators.required, Validators.minLength(1), notBlank]],
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

    const id = this.id();
    const request = id
    ? this.trailService.updateTrail(id, newTrail)
    : this.trailService.addTrail(newTrail);
    
    request.subscribe({
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
