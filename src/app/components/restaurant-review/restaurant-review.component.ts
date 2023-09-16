import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ESnackBarStatus } from 'src/app/enums/ESnackBarStatus';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ReviewService } from 'src/app/services/review.service';
import { TRestaurant } from 'src/app/types/TRestaurant';
import { TReview } from 'src/app/types/TReview';

@Component({
  selector: 'app-restaurant-review',
  templateUrl: './restaurant-review.component.html',
  styleUrls: ['./restaurant-review.component.scss'],
})
export class RestaurantReviewComponent implements OnInit {
  id: number;
  restaurant: TRestaurant = { id: 0, name: "", rating: 0 };
  constructor(
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private reviewService: ReviewService,
    private router: Router

  ) {
    this.id = Number(this.activeRoute.snapshot.paramMap.get("id"));

  }
  ngOnInit(): void {
    this.restaurantService.getById(this.id).subscribe({
      next: res => {
        this.restaurant = res
      },
      error: err => {
        this.restaurantService.notifyService.openSnackBar(err.message, "close", ESnackBarStatus.ERROR)
      }
    })
  }

  reviewForm = this.formBuilder.group({
    comment: this.formBuilder.control("this is comment", [Validators.required]),
    star: this.formBuilder.control(0, [Validators.required]),
    restaurantId: this.formBuilder.control(0, [Validators.required]),
    date_visit: this.formBuilder.control('', [Validators.required])
  })

  handleRate(event: number) {
    this.reviewForm.controls['star'].setValue(event);
  }


  proceed() {
    this.reviewForm.controls['restaurantId'].setValue(this.id);

    if (this.reviewForm.valid && this.reviewForm.get("star")!.value! > 0) {

      this.reviewService.create(this.reviewForm.value as TReview).subscribe({
        next: res => {
          if (res) {
            this.restaurantService.notifyService.openSnackBar("Review Created", "close", ESnackBarStatus.SUCCESS)
            this.router.navigate([`/restaurant/${this.id}`])
          }
        },
        error: err => {
          this.restaurantService.notifyService.openSnackBar(err.message, "close", ESnackBarStatus.ERROR)
        }
      })
    } else {

    }
  }
}
