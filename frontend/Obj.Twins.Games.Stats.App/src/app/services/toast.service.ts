import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) { }

  public showToast(msg: string): void {
    this.snackBar.open(msg, null, { duration: 4000, verticalPosition: 'top' });
  }

}
