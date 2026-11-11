import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Trail } from '../../models/trail.model';
import { ReactiveFormsModule } from '@angular/forms';
import { TrailService } from '../../services/trail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trail-form',
  imports: [ReactiveFormsModule],
  templateUrl: './trail-form.html',
  styleUrl: './trail-form.scss',
})


//I had to use ChatGPT to help me figure out how to include the locationCoordinates in the form
export class TrailForm {
  private formBuilder = inject(FormBuilder);
  private trailService = inject(TrailService);
  private router = inject(Router);

  trailForm = this.formBuilder.nonNullable.group({
    trailName: ['', Validators.required],
    longitude: [''],
    latitude: [''],
    country: ['', Validators.required],
    difficultyLevel: ['', Validators.required]
  });

  //use lat and long and set values in on submit using trailForm.value
  onSubmit(): void{
    //const trailName = this.trailForm.value.trailName;
    //console.log("Trail name", trailName);
    //const trailData: Trail = this.trailForm.value as Trail;
    const form = this.trailForm.value;
    
    const trailData: Trail = {
      
      trailName: form.trailName ?? '',
      locationCoordinates: {
        type: 'Point',
        coordinates: [Number(form.longitude), Number(form.latitude)]
      },
      country: form.country ?? '',
      difficultyLevel: form.difficultyLevel ?? ''

    }
    console.log('Submitted Trail:', trailData);

    this.trailService.addTrail(trailData).subscribe({
      next: (response) => {
        console.log('Trail Added successfully:', response);
      },
      error: (error) => {
        console.error('Error adding trail:', error)
      }
    });

    this.router.navigate(['/trails']);
  }
}
