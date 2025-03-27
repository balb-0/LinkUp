import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { DateTimePickerComponent } from '../date-time-picker/date-time-picker.component';

@Component({
  selector: 'app-popup',
  imports: [ DropDownComponent, DateTimePickerComponent],
  templateUrl: './popup-tec-assistiva.component.html',
  styleUrls: ['./popup-tec-assistiva.component.css']
})
export class PopupTecAssistivaComponent {
  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<PopupTecAssistivaComponent>
  ) {}

  navigateToPage() {
    this.router.navigate(['/dashboard']);
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  confirm() {
    // Aqui você pode disparar um serviço ou passar dados
    console.log('Confirmado!');
    this.closeDialog();
  }

}
