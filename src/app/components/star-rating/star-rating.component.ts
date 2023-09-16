import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  @Input() maxRating = 5;
  @Input() selectedStar: number = 0
  @Output()
  onRate: EventEmitter<number> = new EventEmitter<number>();
  maxRatingArr: any = [];
  previousSelection = 0;
  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxRating).fill(0)
  }

  handleMouseEnter(index: number) {
    this.selectedStar = index + 1
  }

  handleMouseLeave() {
    if (this.previousSelection !== 0) {
      this.selectedStar = this.previousSelection
    } else {
      this.selectedStar = 0
    }
  }

  rate(index: number) {
    this.selectedStar = index + 1;
    this.previousSelection = this.selectedStar
    this.onRate.emit(this.selectedStar)
  }
}
