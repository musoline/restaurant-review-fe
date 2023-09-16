import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ReviewService } from 'src/app/services/review.service';
import { TRestaurant } from 'src/app/types/TRestaurant';
import { TReview } from 'src/app/types/TReview';

@Component({
  selector: 'app-restaurant-single',
  templateUrl: './restaurant-single.component.html',
  styleUrls: ['./restaurant-single.component.scss']
})
export class RestaurantSingleComponent implements OnInit {
  restaurant: TRestaurant = { id: 1, name: "restaurent 1", rating: 5.0 }
  id: number;
  reviews: TReview[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private activeRoute: ActivatedRoute,
    private reviewService: ReviewService
  ) {
    this.id = Number(this.activeRoute.snapshot.paramMap.get("id"));

  }
  ngOnInit(): void {

    this.restaurantService.getById(this.id).subscribe(res => {
      this.restaurant = res
    })

    this.reviewService.getAllWithUser(this.id).subscribe(res => { 
      this.reviews = res 
      console.log(this.reviews)
    })
  }
}
