import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TReview } from '../types/TReview';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  api: string = "https://api.shoufle.ge/api/review"
  constructor(private httpClient: HttpClient) { }

  create(review: TReview): Observable<any> {
    return this.httpClient.post<TReview>(`${this.api}`, review).pipe(catchError(this.handleError))
  }

  getAll(): Observable<any> {
    return this.httpClient.get(`${this.api}`).pipe(catchError(this.handleError))
  }

  getAllWithUser(id: number): Observable<any> {
    return this.httpClient.get<number>(`${this.api}/${id}`).pipe(catchError(this.handleError))
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
