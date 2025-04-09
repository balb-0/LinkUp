import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  showMessage(
    message: string,
    isError: boolean = false,
    panelClass: string = '',
    verticalPosition: MatSnackBarVerticalPosition = 'top'  
  ): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      panelClass: panelClass ? panelClass : (isError ? 'snackbar-error' : 'snackbar-success'),
      verticalPosition: verticalPosition
    });
  }
}
