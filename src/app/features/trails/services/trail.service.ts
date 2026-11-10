import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Trail, TrailList } from '../models/trail.model';
import { map } from 'rxjs';
import { throwError } from 'rxjs';

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

  getTrailById(id: string): Observable<Trail>{
    return this.http.get<Trail>(`${this.apiUrl}/${id}`);
  }

  addTrail(trail: Trail): Observable<Trail>{
    return this.http.post<Trail>(this.apiUrl, trail)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse){
        if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      if (error.status == 401 || error.status == 403) {

        console.error('authorisation issue ' , error.status );
         return throwError(() => new Error('You are not authorised for that action'));

      }
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));

  }
}
