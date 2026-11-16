import { Component, inject, signal } from '@angular/core';
import { HikerService } from '../../services/hiker.service';
import { Hiker } from '../../models/hiker.model';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { input } from '@angular/core';
import { LoadState } from '../../../../shared/load-state';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-hiker-details',
  imports: [AsyncPipe, RouterLink, MatButtonModule],
  templateUrl: './hiker-details.html',
  styleUrl: './hiker-details.scss',
})
export class HikerDetails {
  private hikerService = inject(HikerService);
  private readonly router = inject(Router);

  readonly id = input.required<string>();
  readonly initial: LoadState<Hiker> = {status: 'loading'};

  state = toSignal(
    toObservable(this.id)
    .pipe(
      switchMap((id) => withLoadState(this.hikerService.getHikerById(id))),
    ),
    {initialValue: this.initial},
  );

  readonly deleting = signal(false);
  readonly deleteError = signal<string | null>(null);

  deleteHiker(hiker: Hiker): void{
    if (!confirm(`Delete ${hiker.username}?`)) return;

    this.deleting.set(true);
    this.deleteError.set(null);

    this.hikerService.deleteHiker(hiker._id).subscribe({
      next: () => this.router.navigate(['/hikers']),
      error: (err: Error) => {
        this.deleteError.set(err.message);
        this.deleting.set(false);
      },


    });

  }
}
