import { Component, input } from '@angular/core';
import { Hiker } from '../../models/hiker.model';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-hiker-card',
  imports: [RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './hiker-card.html',
  styleUrl: './hiker-card.scss',
})
export class HikerCard {
  hiker = input.required<Hiker>();
}
