import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-button.component.html',
  styleUrl: './add-button.component.css'
})
export class AddButtonComponent {
  @Input() text: string = '';
  @Output() clicked = new EventEmitter<void>(); 

  onClick() {
    console.log('Botão interno clicado');
    this.clicked.emit();
  }
}
