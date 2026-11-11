import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrailService } from '../../services/trail.service';
import { Trail } from '../../models/trail.model';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { input } from '@angular/core';
import { LoadState } from '../../../../shared/load-state';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';

@Component({
  selector: 'app-trail-details',
  imports: [AsyncPipe],
  templateUrl: './trail-details.html',
  styleUrl: './trail-details.scss',
})
export class TrailDetails{
  
  private trailService = inject(TrailService);

  readonly id = input.required<string>();
  readonly initial: LoadState<Trail> = {status: 'loading'};

  state = toSignal(
    toObservable(this.id)
    .pipe(
      switchMap((id) => withLoadState(this.trailService.getTrailById(id))),
    ),
    {initialValue: this.initial},
  );

  
}

