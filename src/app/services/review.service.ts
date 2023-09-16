import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TReview } from '../types/TReview';
import { Observable, catchError } from 'rxjs';
import { localEnviromnemt } from '../constant';
import { NotifyService } from './notify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  api: string = localEnviromnemt ? "http://localhost:3000/api/review" : "https://api.shoufle.ge/api/review";

  constructor(private httpClient: HttpClient, public notifyService: NotifyService, public router: Router) { }

  create(review: TReview): Observable<any> {
    return this.httpClient.post<TReview>(`${this.api}`, review).pipe(catchError(this.notifyService.handleError))
  }

  getAll(): Observable<any> {
    return this.httpClient.get(`${this.api}`).pipe(catchError(this.notifyService.handleError))
  }

  getAllWithUser(id: number): Observable<any> {
    return this.httpClient.get<number>(`${this.api}/${id}`).pipe(catchError(this.notifyService.handleError))
  }



}
