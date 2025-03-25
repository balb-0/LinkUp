import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-time-picker',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css'], // <-- corrigido (era styleUrl)
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimePickerComponent {
  value: Date | undefined;
}
