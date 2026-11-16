import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Hiker, CreateHikerDto } from '../../models/hiker.model';
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
import { notBlank } from '../../../../shared/validators/not-blank.validator';
import { HikerService } from '../../services/hiker.service';

@Component({
  selector: 'app-hiker-form',
  imports: [ReactiveFormsModule, RouterLink, MatProgressBarModule, MatSelect, MatOption, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule],
  templateUrl: './hiker-form.html',
  styleUrl: './hiker-form.scss',
})
export class HikerForm {
  private formBuilder = inject(FormBuilder);
  private hikerService = inject(HikerService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  saving = signal(false);
  saveError = signal<string | null>(null);
  
  readonly id = input<string>();

  ngOnInit(): void{
    const id = this.id();
    if (!id) return;

    this.hikerService.getHikerById(id).subscribe({
      next: (hiker) =>
        this.hikerForm.patchValue({username: hiker.username, email: hiker.email, password: hiker.password, country: hiker.country ?? ""}),
      error: (err: Error) => this.saveError.set(err.message),
    });
  }

  hikerForm = this.formBuilder.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(1),
      Validators.maxLength(30), notBlank]],
    email: ['', [Validators.required, Validators.maxLength(30), notBlank]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), notBlank]],
    country: this.formBuilder.control(''),
  });

  onSubmit(): void{
    const {username, email, password, country} = this.hikerForm.getRawValue();
    const newHiker: CreateHikerDto = {username, email, password, country: country ?? ""};
    
    
    this.saving.set(true);
    this.saveError.set(null);


    this.hikerForm.disable();

   
   const id = this.id();
   const request = id ? this.hikerService.updateHiker(id, newHiker)
   : this.hikerService.addHiker(newHiker);

   request.subscribe({
      next: (response) => {
        this.snackBar.open(`${newHiker.username} ${newHiker.email} saved`, 'Close', {
          duration: 10000
        });
        console.log('Hiker added successfully:', response);
        this.router.navigate(['/hikers']); 
      },
      error: (error)=>{
        this.saveError.set(error.message);
        this.saving.set(false);
        this.hikerForm.enable();
      }
    });
  }
}
