import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { RestaurantReviewComponent } from './components/restaurant-review/restaurant-review.component';
import { RestaurantSingleComponent } from './components/restaurant-single/restaurant-single.component';
import { LoggedInAuthGuard } from './auth/guards/logged-in-auth.guard';
import { ReviewComponent } from './pages/review/review.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedInAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInAuthGuard] },
  {
    path: 'restaurant',
    component: RestaurantComponent,
    canActivate: [AuthGuard],
  },
  { path: '', redirectTo: "/restaurant", pathMatch: "full", },
  {
    path: "restaurant/:id",
    component: RestaurantSingleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rate-restaurant/:id',
    component: RestaurantReviewComponent,
    canActivate: [AuthGuard]
  },
  {

    path: "review",
    component: ReviewComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
