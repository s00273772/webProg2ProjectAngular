import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateTrailDto, Trail } from '../../models/trail.model';
import { ReactiveFormsModule } from '@angular/forms';
import { TrailService } from '../../services/trail.service';
import { Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-trail-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './trail-form.html',
  styleUrl: './trail-form.scss',
})


//I had to use ChatGPT to help me figure out how to include the locationCoordinates in the form
export class TrailForm {
  private formBuilder = inject(FormBuilder);
  private trailService = inject(TrailService);
  private router = inject(Router);

  saving = signal(false);
  saveError = signal<string | null>(null);

  trailForm = this.formBuilder.nonNullable.group({
    trailName: ['', Validators.required],
    longitude: [''],
    latitude: [''],
    country: ['', Validators.required],
    difficultyLevel: ['', Validators.required]
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

    this.trailService.addTrail(newTrail).subscribe({
      next: (response) => {
        console.log('Trail Added successfully:', response);
        this.router.navigate(['/trails']);
      },
      error: (error) => {
        this.saveError.set(error.message);
        this.saving.set(false);
      }
    });

    this.router.navigate(['/trails']);
  }
}
