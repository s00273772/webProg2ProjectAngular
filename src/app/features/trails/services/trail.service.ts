import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Trail, TrailList, CreateTrailDto } from '../models/trail.model';
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

  addTrail(trail: CreateTrailDto): Observable<Trail>{
    return this.http.post<Trail>(this.apiUrl, trail)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): Observable<never>{
    let message: string;

    switch(error.status){
      case 0:
        message = 'Cannot reach the server. Check that the API is running.';
        break;
      case 400:
        message = 'Some of the data was not valid.';
        break;
      case 401:
        message = 'Please log in to continue.';
        break;
      case 403:
        message = 'You are not allowed to do that.';
        break;
      case 404:
        message = 'That car could not be found.';
        break;
      default:
        message = 'Something went wrong on the server. Please try again later.';
    }

    console.error(`HTTP ${error.status} from ${error.url}`, error);
    return throwError(() => new Error(message));
  }
}
