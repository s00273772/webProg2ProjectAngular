import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { Hiker, CreateHikerDto, UpdateHikerDto } from '../models/hiker.model';
import { map } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HikerService {
  private http = inject(HttpClient);

  //should be read from an env variable
  private apiUrl = 'http://localhost:3000/api/v1/hikers';

  
  getHikers(): Observable<Hiker[]>{
    return this.http
    .get<Hiker[]>(this.apiUrl);
  }

  getHikerById(id: string): Observable<Hiker>{
    return this.http.get<Hiker>(`${this.apiUrl}/${id}`)
    .pipe(catchError((err) => this.handleError(err)));
  }

  addHiker(hiker: CreateHikerDto): Observable<Hiker>{
    return this.http.post<Hiker>(this.apiUrl, hiker)
    .pipe(
      catchError((err) => this.handleError(err))
    )
  }

  updateHiker(id: string, changes: UpdateHikerDto): Observable<Hiker>{
    return this.http.put<Hiker>(`${this.apiUrl}/${id}`, changes)
  }

  deleteHiker(id: string): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
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
        message = 'That hiker could not be found.';
        break;
      default:
        message = 'Something went wrong on the server. Please try again later.';
    }

    console.error(`HTTP ${error.status} from ${error.url}`, error);
    return throwError(() => new Error(message));
  }
}
