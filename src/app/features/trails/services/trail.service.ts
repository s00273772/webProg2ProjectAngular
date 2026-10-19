import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Trail } from '../models/trail.model';

@Injectable({
  providedIn: 'root',
})
export class TrailService {
  private http = inject(HttpClient);

  //should be read from an env variable
  private apiUrl = 'http://localhost:3000/api/v1/trails';

  getTrails(): Observable<Trail[]>{
    return this.http.get<Trail[]>(this.apiUrl)
  }
}
