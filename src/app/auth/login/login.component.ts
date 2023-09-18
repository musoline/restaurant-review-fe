import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TUser } from 'src/app/types/TUser';
import { ESnackBarStatus } from 'src/app/enums/ESnackBarStatus';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  loginForm = this.formBuilder.group({
    email: this.formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d]{8,}$/gm),
    ]),
  });

  proceed() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as TUser).subscribe({
        next: (res: any) => {
          this.authService.notifyService.openSnackBar(
            `Welcome ${res.user.name}!`,
            'close',
            ESnackBarStatus.SUCCESS
          );
          localStorage.setItem('jwt', res.jwt);
          this.authService.router.navigate(['/restaurant']);
        },
        error: (err: any) => {
          this.authService.notifyService.openSnackBar(
            err.message,
            'close',
            ESnackBarStatus.ERROR
          );
        },
      });
    }
  }
}
