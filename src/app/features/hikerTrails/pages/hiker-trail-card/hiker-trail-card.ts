import { Component, input } from '@angular/core';
import { HikerTrail } from '../../models/hikerTrail';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hiker-trail-card',
  imports: [RouterLink, MatButtonModule],
  templateUrl: './hiker-trail-card.html',
  styleUrl: './hiker-trail-card.scss',
})
export class HikerTrailCard {
  hikerTrail = input.required<HikerTrail>();
}
