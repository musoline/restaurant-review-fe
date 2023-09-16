import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TESnackBarStatus } from '../types/TESnackBarStatus';

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

}
