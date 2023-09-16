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

  login(user: TUser) {
    return this.httpClient
      .post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        localStorage.setItem('jwt', res.jwt);
        this.router.navigate(['/restaurant']);
      });
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

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
