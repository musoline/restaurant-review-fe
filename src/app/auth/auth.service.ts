import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { TUser } from '../types/TUser';
import { localEnviromnemt } from '../constant';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = localEnviromnemt ? "http://localhost:3000/auth" : "https://api.shoufle.ge/auth";
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(private httpClient: HttpClient, public router: Router) { }

  register(user: TUser): Observable<any> {
    let api = `${this.endpoint}/register`;
    console.log(api, user);
    return this.httpClient
      .post<TUser>(api, user)
      .pipe(catchError(this.handleError));
  }

  login(user: TUser): Observable<any> {
    return this.httpClient
      .post<TUser>(`${this.endpoint}/login`, user).pipe(catchError(this.handleError))
  }
  getToken() {
    return localStorage.getItem('jwt');
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('jwt');
    return authToken !== null ? true : false;
  }
  doLogout() {
    let removeToken = localStorage.removeItem('jwt');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  getUserProfile(id: any): Observable<any> {
    let api = `${this.endpoint}/user-profile/${id}`;
    return this.httpClient.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
