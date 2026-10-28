import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrailService } from '../../services/trail.service';
import { Trail } from '../../models/trail.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-trail-details',
  imports: [AsyncPipe],
  templateUrl: './trail-details.html',
  styleUrl: './trail-details.scss',
})
export class TrailDetails implements OnInit{
  private route = inject(ActivatedRoute);
  private trailService = inject(TrailService);

  trail$: Observable<Trail> | undefined
  loading = true;
  error = '';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if(id){
      this.trail$ = this.trailService.getTrailById(id)
    }
  }
}

