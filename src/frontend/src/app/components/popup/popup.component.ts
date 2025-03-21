import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<PopupComponent>
  ) {}

  navigateToPage() {
    this.router.navigate(['/dashboard']);
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
  
}
