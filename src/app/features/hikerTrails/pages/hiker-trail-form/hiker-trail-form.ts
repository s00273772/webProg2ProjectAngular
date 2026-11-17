import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateHikerTrailDto } from '../../models/hikerTrail';
import { ReactiveFormsModule } from '@angular/forms';
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
import { HikerTrailService } from '../../services/hiker-trail.service';
import { notBlank } from '../../../../shared/validators/not-blank.validator';

@Component({
  selector: 'app-hiker-trail-form',
  imports: [ReactiveFormsModule, RouterLink,  MatProgressBarModule, MatSelect, MatOption, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule],
  templateUrl: './hiker-trail-form.html',
  styleUrl: './hiker-trail-form.scss',
})

export class HikerTrailForm {
   private formBuilder = inject(FormBuilder);
    private hikerTrailService = inject(HikerTrailService);
    private router = inject(Router);
    private snackBar = inject(MatSnackBar);
  
    saving = signal(false);
    saveError = signal<string | null>(null);
    
    readonly id = input<string>();
  
    ngOnInit(): void{
      const id = this.id();
      if (!id) return;
  
      //Had to ask ChatGPT how to format the date so when editing, the form is not populated with the time
      this.hikerTrailService.getHikerTrailById(id).subscribe({
        next: (hikerTrail) =>
          this.hikerTrailForm.patchValue({trail: hikerTrail.trail, hiker: hikerTrail.hiker, dateHiked: hikerTrail.dateHiked ? hikerTrail.dateHiked.split('T')[0]: '', rating: hikerTrail.rating ?? undefined, picture: hikerTrail.picture ?? ""}),
        error: (err: Error) => this.saveError.set(err.message),
      });
    }
  
    hikerTrailForm = this.formBuilder.nonNullable.group({
      trail: ['', [Validators.required, notBlank]],
      hiker: ['', [Validators.required, notBlank]],
      dateHiked: ['', [Validators.required, notBlank]],
      rating: this.formBuilder.control<number | null>(null, [Validators.min(1),
        Validators.max(5),
      ]),
      picture: this.formBuilder.control(''),
    });
  
    onSubmit(): void{
      const {trail, hiker, dateHiked, rating, picture} = this.hikerTrailForm.getRawValue();
      const newHikerTrail: CreateHikerTrailDto = {trail, hiker, dateHiked, rating: rating ?? undefined, picture: picture ?? ""};
      
      
      this.saving.set(true);
      this.saveError.set(null);
  
  
      this.hikerTrailForm.disable();
  
     
     const id = this.id();
     const request = id ? this.hikerTrailService.updateHikerTrail(id, newHikerTrail)
     : this.hikerTrailService.addHikerTrail(newHikerTrail);
  
     request.subscribe({
        next: (response) => {
          this.snackBar.open(`${newHikerTrail.trail} ${newHikerTrail.hiker} saved`, 'Close', {
            duration: 10000
          });
          console.log('HikerTrail added successfully:', response);
          this.router.navigate(['/hikerTrails']); 
        },
        error: (error)=>{
          this.saveError.set(error.message);
          this.saving.set(false);
          this.hikerTrailForm.enable();
        }
      });
    }
}
