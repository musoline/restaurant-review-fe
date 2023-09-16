import { Component, Input } from '@angular/core';
import { TReview } from 'src/app/types/TReview';

@Component({
  selector: 'app-single-review',
  templateUrl: './single-review.component.html',
  styleUrls: ['./single-review.component.scss']
})
export class SingleReviewComponent {
  @Input() review: TReview = {}
  constructor() { }
}
