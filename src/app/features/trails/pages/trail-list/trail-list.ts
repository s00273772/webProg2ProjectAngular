import { Component, inject } from '@angular/core';
import { TrailService } from '../../services/trail.service';
import { AsyncPipe } from '@angular/common';
import { TrailCard } from '../trail-card/trail-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-trail-list',
  imports: [AsyncPipe, TrailCard, ReactiveFormsModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './trail-list.html',
  styleUrl: './trail-list.scss',
})
export class TrailList {
  private trailService = inject(TrailService);
  private formBuilder = inject(FormBuilder);

  filterTrailsForm = this.formBuilder.nonNullable.group({
      trailName: ['', [Validators.required]]
    });

  trails = toSignal(this.trailService.getTrails());

  //Youtube video - not working so commented out
  trailNameChanged(){
   // const trailName = this.filterTrailsForm.controls['trailName'].value;
    
    //this.trailService.getTrails(trailName);
  }

  state = toSignal(withLoadState(this.trailService.getTrails()), {requireSync: true});
}
