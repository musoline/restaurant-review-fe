import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { TUser } from '../types/TUser';
import { localEnviromnemt } from '../constant';
import { NotifyService } from '../services/notify.service';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = localEnviromnemt ? "http://localhost:3000/auth" : "https://api.shoufle.ge/auth";
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(private httpClient: HttpClient, public router: Router, public notifyService: NotifyService) { }

  register(user: TUser): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.httpClient
      .post<TUser>(api, user)
      .pipe(catchError(this.handleError));
  }

  login(user: TUser): Observable<any> {
    return this.httpClient
      .post<TUser>(`${this.endpoint}/login`, user)
      .pipe(catchError(this.handleError))
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




  private handleError(error: HttpErrorResponse) {

    return throwError(
      () => error.error
    );
  }



}
