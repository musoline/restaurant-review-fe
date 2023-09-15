import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantSingleComponent } from './restaurant-single.component';

describe('RestaurantSingleComponent', () => {
  let component: RestaurantSingleComponent;
  let fixture: ComponentFixture<RestaurantSingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantSingleComponent]
    });
    fixture = TestBed.createComponent(RestaurantSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
