import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-service-technology-card',
  imports: [MatIconModule],
  templateUrl: './service-technology-card.component.html',
  styleUrl: './service-technology-card.component.css'
})
export class ServiceTechnologyCardComponent {

  @Input() name: string = '';
  @Input() title: string = '';
  @Input() dateTime: string = '';
  @Input() showDateTime: boolean = true;
  @Input() showDeleteButton: boolean = false;
  @Input() itemId: string | undefined = '';

  @Output() deleteClick = new EventEmitter<string>();

  date: string = '';
  time: string = '';
  isEditing: boolean | undefined;

  onDeleteClick() {
    this.deleteClick.emit(this.itemId);
  }

  ngOnInit() {
    if (this.dateTime) {
      const parsedDate = new Date(this.dateTime);

      this.date = parsedDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });


      this.time = parsedDate.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  }

  get formattedDate(): string {
    return this.date || 'DD/MM/AAAA';
  }

  get formattedTime(): string {
    return this.time || 'HH:MM';
  }

}
