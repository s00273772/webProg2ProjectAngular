import { Component, inject } from '@angular/core';
import { TrailService } from '../../services/trail.service';
import { AsyncPipe } from '@angular/common';
import { TrailCard } from '../trail-card/trail-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';


@Component({
  selector: 'app-trail-list',
  imports: [AsyncPipe, TrailCard],
  templateUrl: './trail-list.html',
  styleUrl: './trail-list.scss',
})
export class TrailList {
  private trailService = inject(TrailService);

  trails = toSignal(this.trailService.getTrails());

  state = toSignal(withLoadState(this.trailService.getTrails()), {requireSync: true});
}
