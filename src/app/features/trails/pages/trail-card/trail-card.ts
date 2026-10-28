import { Component, input } from '@angular/core';
import { Trail } from '../../models/trail.model';


@Component({
  selector: 'app-trail-card',
  imports: [],
  templateUrl: './trail-card.html',
  styleUrl: './trail-card.scss',
})
export class TrailCard {
  trail = input.required<Trail>();
}
