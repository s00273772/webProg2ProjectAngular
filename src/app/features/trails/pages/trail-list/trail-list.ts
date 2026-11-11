import { Component, inject } from '@angular/core';
import { TrailService } from '../../services/trail.service';
import { Observable } from 'rxjs';
import { Trail } from '../../models/trail.model';
import { OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { TrailCard } from '../trail-card/trail-card';
import { toSignal } from '@angular/core/rxjs-interop';
import withLoads
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
