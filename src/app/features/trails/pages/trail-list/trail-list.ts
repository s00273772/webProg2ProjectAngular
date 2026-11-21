import { Component, inject } from '@angular/core';
import { TrailService } from '../../services/trail.service';
import { AsyncPipe } from '@angular/common';
import { TrailCard } from '../trail-card/trail-card';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';
import { LoadState } from '../../../../shared/load-state';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder} from '@angular/forms';
import { signal } from '@angular/core';
import { Trail } from '../../models/trail.model';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-trail-list',
  imports: [AsyncPipe, TrailCard, ReactiveFormsModule, MatInputModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './trail-list.html',
  styleUrl: './trail-list.scss',
})
export class TrailList {
  private trailService = inject(TrailService);
  private formBuilder = inject(FormBuilder);

  readonly trailName = signal('');
  readonly initial: LoadState<Trail[]> = {status: 'loading'};

  filterTrailsForm = this.formBuilder.nonNullable.group({
      trailName: ['']
    });

  trails = toSignal(this.trailService.getTrails());

  //Youtube video
  trailNameChanged(){
   const trailName = this.filterTrailsForm.controls['trailName'].value;
    
    this.trailName.set(trailName);
  }

  //I used ChatGPT to explain the state change for getTrailById in more detail
  //then I implemented the same logic for filtering trails by trailName
  state = toSignal(
    toObservable(this.trailName)
    .pipe(
      switchMap((trailName) => withLoadState(this.trailService.getTrails(trailName))),
    ),
    {initialValue: this.initial},
  );
}
