import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TRestaurant } from '../types/TRestaurant';
import { Observable, catchError, throwError } from 'rxjs';
import { localEnviromnemt } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  endpoint: string = localEnviromnemt ? "http://localhost:3000/api/restaurant" : "https://api.shoufle.ge/api/restaurant"

  constructor(private httpClient: HttpClient) { }

  create(restaurant: TRestaurant) {
    this.httpClient
      .post(`${this.endpoint}`, restaurant)
      .subscribe((res) => {
        console.log(res);
      });
  }

  getAll(): Observable<any> {
    return this.httpClient
      .get<TRestaurant>(`${this.endpoint}`)
      .pipe(catchError(this.handleError));

  }

  getById(restaurantId: number): Observable<any> {
    return this.httpClient
      .get(`${this.endpoint}/${restaurantId}`)
      .pipe(catchError(this.handleError))
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
      () => alert("Something Bad Happened")
    );
  }
}
