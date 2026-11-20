import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrailList } from './features/trails/pages/trail-list/trail-list';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TrailList, MatButtonModule, MatToolbarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('webProg2ProjectAngular');
}
