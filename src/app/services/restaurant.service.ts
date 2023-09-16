import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TRestaurant } from '../types/TRestaurant';
import { Observable, catchError } from 'rxjs';
import { localEnviromnemt } from '../constant';
import { NotifyService } from './notify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  endpoint: string = localEnviromnemt ? "http://localhost:3000/api/restaurant" : "https://api.shoufle.ge/api/restaurant"

  constructor(private httpClient: HttpClient, public notifyService: NotifyService, private router: Router) { }

  create(restaurant: TRestaurant) {
    this.httpClient
      .post(`${this.endpoint}`, restaurant)
      .subscribe((res) => { console.log(res); });
  }

  getAll(): Observable<any> {
    return this.httpClient
      .get<TRestaurant>(`${this.endpoint}`)
      .pipe(catchError(this.notifyService.handleError));

  }

  getById(restaurantId: number): Observable<any> {
    return this.httpClient
      .get(`${this.endpoint}/${restaurantId}`)
      .pipe(catchError(this.notifyService.handleError))
  }


}
