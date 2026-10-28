import { Component, input } from '@angular/core';
import { Trail } from '../../models/trail.model';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-trail-card',
  imports: [RouterLink],
  templateUrl: './trail-card.html',
  styleUrl: './trail-card.scss',
})
export class TrailCard {
  trail = input.required<Trail>();
}
