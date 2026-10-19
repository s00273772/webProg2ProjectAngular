import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Trail, TrailList } from '../models/trail.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrailService {
  private http = inject(HttpClient);

  //should be read from an env variable
  private apiUrl = 'http://localhost:3000/api/v1/trails';

  //ChatGPT needed to create an interface for the trails object as the trails are stored inside a trails object
  getTrails(): Observable<Trail[]>{
    return this.http.get<TrailList>(this.apiUrl).pipe(
    map(response => response.trails));
  }
}
