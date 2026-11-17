import { Component, inject, signal } from '@angular/core';
import { HikerTrailService } from '../../services/hiker-trail.service';
import { switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { input } from '@angular/core';
import { LoadState } from '../../../../shared/load-state';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HikerTrail } from '../../models/hikerTrail';

@Component({
  selector: 'app-hiker-trail-details',
  imports: [AsyncPipe, RouterLink, MatButtonModule],
  templateUrl: './hiker-trail-details.html',
  styleUrl: './hiker-trail-details.scss',
})
export class HikerTrailDetails {
  private hikerTrailService = inject(HikerTrailService);
    private readonly router = inject(Router);
  
    readonly id = input.required<string>();
    readonly initial: LoadState<HikerTrail> = {status: 'loading'};
  
    state = toSignal(
      toObservable(this.id)
      .pipe(
        switchMap((id) => withLoadState(this.hikerTrailService.getHikerTrailById(id))),
      ),
      {initialValue: this.initial},
    );
  
    readonly deleting = signal(false);
    readonly deleteError = signal<string | null>(null);
  
    deleteHikerTrail(hikerTrail: HikerTrail): void{
      if (!confirm(`Delete ${hikerTrail.trail}?`)) return;
  
      this.deleting.set(true);
      this.deleteError.set(null);
  
      this.hikerTrailService.deleteHikerTrail(hikerTrail._id).subscribe({
        next: () => this.router.navigate(['/hikerTrails']),
        error: (err: Error) => {
          this.deleteError.set(err.message);
          this.deleting.set(false);
        },
  
  
      });
  
    }
}
