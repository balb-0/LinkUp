import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-home',
  imports: [MatCardModule],
  templateUrl: './card-home.component.html',
  styleUrl: './card-home.component.css'
})
export class CardHomeComponent {
  @Input() imageSrc: string = '';
  @Input() altText: string = 'Imagem do card';
  @Input() text: string = '';
  @Input() link: string = '#';

  constructor(private router: Router) {}

  navigate() {
    if (this.link) {
      console.log('Card clicado!');
      this.router.navigate([this.link]);
    }
  }
}
