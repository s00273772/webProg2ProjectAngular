import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrailService } from '../../services/trail.service';
import { Trail } from '../../models/trail.model';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { input } from '@angular/core';
import { LoadState } from '../../../../shared/load-state';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-trail-details',
  imports: [AsyncPipe, RouterLink, MatButtonModule],
  templateUrl: './trail-details.html',
  styleUrl: './trail-details.scss',
})
export class TrailDetails{
  
  private trailService = inject(TrailService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();
  readonly initial: LoadState<Trail> = {status: 'loading'};

  state = toSignal(
    toObservable(this.id)
    .pipe(
      switchMap((id) => withLoadState(this.trailService.getTrailById(id))),
    ),
    {initialValue: this.initial},
  );

  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  deleteTrail(trail: Trail): void{
    if (!confirm(`Delete ${trail.trailName}?`)) return;

    this.deleting.set(true);
    this.deleteError.set(null);

    this.trailService.deleteTrail(trail._id).subscribe({
      next: () => this.router.navigate(['/trails']),
      error: (err: Error) => {
        this.deleteError.set(err.message);
        this.deleting.set(false);
      },


    });

  }
  
}

