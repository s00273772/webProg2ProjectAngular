import { Component, inject } from '@angular/core';
import { HikerTrailService } from '../../services/hiker-trail.service';
import { AsyncPipe } from '@angular/common';
import { HikerTrailCard } from '../hiker-trail-card/hiker-trail-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';
@Component({
  selector: 'app-hiker-trail-list',
  imports: [AsyncPipe, HikerTrailCard],
  templateUrl: './hiker-trail-list.html',
  styleUrl: './hiker-trail-list.scss',
})

export class HikerTrailList {
  private hikerTrailService = inject(HikerTrailService);
  
  hikerTrails = toSignal(this.hikerTrailService.getHikerTrails());

  state = toSignal(withLoadState(this.hikerTrailService.getHikerTrails()), {requireSync: true});
}
