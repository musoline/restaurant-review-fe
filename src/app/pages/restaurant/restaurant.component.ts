import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { TRestaurant } from 'src/app/types/TRestaurant';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  restaurants!: TRestaurant[];
  displayedColumns: string[] = ['id', 'name', 'rating'];
  dataSource = new MatTableDataSource<TRestaurant>();

  constructor(
    private restaurantService: RestaurantService,
    private _liveAnouncer: LiveAnnouncer
  ) {}

  ngOnInit() {
    this.restaurantService.getAll().subscribe((res) => {
      this.restaurants = res;
      this.dataSource = new MatTableDataSource<TRestaurant>(this.restaurants);
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnouncer.announce('Sorting cleared');
    }
  }

  calculatePercent(rating: number | undefined) {
    if (!rating) {
      return 0;
    } else {
      console.log(rating);
      return rating * 20;
    }
  }
}
