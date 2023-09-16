import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Injectable({
  providedIn: "root"
})
export class LoggedInAuthGuard {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/restaurant'])
      return false
    } else {
      return true
    }
  }
}