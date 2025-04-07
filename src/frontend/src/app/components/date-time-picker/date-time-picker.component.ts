import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-time-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateTimePickerComponent {
  @Output() dataSelecionada = new EventEmitter<Date>();

  value: Date | string | undefined;
  timeValue: string = '';

  onDateSelected(): void {
    if (!this.value || !this.timeValue) return;

    // Garante que a data é válida mesmo que digitada como string
    const parsedDate = this.value instanceof Date ? this.value : new Date(this.value);

    if (isNaN(parsedDate.getTime())) {
      console.warn('Data inválida digitada manualmente:', this.value);
      return;
    }

    const [hours, minutes] = this.timeValue.split(':').map(Number);

    parsedDate.setHours(hours);
    parsedDate.setMinutes(minutes);
    parsedDate.setSeconds(0);
    parsedDate.setMilliseconds(0);

    console.log('Data emitida:', parsedDate);
    this.dataSelecionada.emit(parsedDate);
  }
}
