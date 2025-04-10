import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-service-technology-card',
  imports: [],
  templateUrl: './service-technology-card.component.html',
  styleUrl: './service-technology-card.component.css'
})
export class ServiceTechnologyCardComponent {

  @Input() name: string = '';
  @Input() title: string = '';
  @Input() dateTime: string = '';
  @Input() showDateTime: boolean = true;

  date: string = '';
  time: string = '';
  isEditing: boolean | undefined;

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

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

}
