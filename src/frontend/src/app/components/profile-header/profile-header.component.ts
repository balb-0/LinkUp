// header.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css'
})
export class ProfileHeaderComponent {
  @Input() headerTitle: string = 'Perfil do Aluno';
}
