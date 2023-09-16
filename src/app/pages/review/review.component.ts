import { Component, OnInit } from '@angular/core';
import { ESnackBarStatus } from 'src/app/enums/ESnackBarStatus';
import { ReviewService } from 'src/app/services/review.service';
import { TReview } from 'src/app/types/TReview';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  reviews: TReview[] = []
  constructor(private reviewService: ReviewService) {

  }
  ngOnInit(): void {
    this.reviewService.getAll().subscribe({
      next: res => {
        this.reviews = res
      },
      error: err => {
        this.reviewService.notifyService.openSnackBar(err.message, "close", ESnackBarStatus.ERROR)
      }
    })
  }


}
