import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TUser } from 'src/app/types/TUser';

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
    name: this.formBuilder.control('Nika', [Validators.required]),
    email: this.formBuilder.control('Nika123@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.control('U!pn$xZnvi68iBt', [
      Validators.required,
      Validators.pattern(
        '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
      ),
    ]),
  });

  proceed() {
    if (this.registerForm.valid) {
      this.authService
        .register(this.registerForm.value as TUser)
        .subscribe((res) => {
          if (res.result) {
            this.registerForm.reset();
            this.router.navigate(['login']);
          }
        });
    }
  }
}
