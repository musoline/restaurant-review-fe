import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TUser } from 'src/app/types/TUser';
import { ESnackBarStatus } from 'src/app/enums/ESnackBarStatus';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  registerForm = this.formBuilder.group({
    name: this.formBuilder.control('', [Validators.required]),
    email: this.formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%?&.]{8,}$/gm),
    ]),
  });

  proceed() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value as TUser).subscribe({
        next: (res) => {
          if (res.result) {
            this.authService.notifyService.openSnackBar(
              'Registration Succeed!',
              'close',
              ESnackBarStatus.SUCCESS
            );
            this.registerForm.reset();
            this.router.navigate(['login']);
          }
        },
        error: (err) => {
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
