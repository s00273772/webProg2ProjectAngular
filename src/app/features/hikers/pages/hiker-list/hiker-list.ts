import { Component, inject } from '@angular/core';
import { HikerService } from '../../services/hiker.service';
import { AsyncPipe } from '@angular/common';
import { HikerCard } from '../hiker-card/hiker-card';
import { toSignal } from '@angular/core/rxjs-interop';
import { withLoadState } from '../../../../shared/load-state';

@Component({
  selector: 'app-hiker-list',
  imports: [AsyncPipe, HikerCard],
  templateUrl: './hiker-list.html',
  styleUrl: './hiker-list.scss',
})
export class HikerList {
    private hikerService = inject(HikerService);

    hikers = toSignal(this.hikerService.getHikers());

    state = toSignal(withLoadState(this.hikerService.getHikers()), {requireSync: true});
}
