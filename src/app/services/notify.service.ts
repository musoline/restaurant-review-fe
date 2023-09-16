import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TESnackBarStatus } from '../types/TESnackBarStatus';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private snackBar: MatSnackBar) { }


  openSnackBar(message: string, action: string, status: TESnackBarStatus) {
    this.snackBar.open(message, action, {
      duration: 1500,
      verticalPosition: "top",
      panelClass: "success-snackbar"
    });
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => error.error)
  }
}
