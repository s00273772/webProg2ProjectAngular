import { Component, inject } from '@angular/core';
import { TrailService } from '../../services/trail.service';
import { Observable } from 'rxjs';
import { Trail } from '../../models/trail.model';
import { OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-trail-list',
  imports: [AsyncPipe],
  templateUrl: './trail-list.html',
  styleUrl: './trail-list.scss',
})
export class TrailList implements OnInit {
  private trailService = inject(TrailService);

  trails$!: Observable<Trail[]>;

  ngOnInit(): void{
    this.trails$ = this.trailService.getTrails();
  }
}
