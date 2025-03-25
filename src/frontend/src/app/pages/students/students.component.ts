import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { DropDownComponent } from '../../components/drop-down/drop-down.component';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SearchBarComponent, 
    DropDownComponent,
    TableComponent
  ],
  templateUrl: './students.component.html'
})
export class StudentsComponent {

  minhaVariavelSelecionada: string = '';
  opcoesDropdown: string[] = ['Opção 1', 'Opção 2', 'Opção 3'];

  onItemSelected(item: string): void {
    this.minhaVariavelSelecionada = item;
    console.log('Item selecionado no componente pai:', item);
  }
  
  testToggleDropdown(): void {
    console.log('Testando toggle via botão');
  }
  shouldShowNav$: Observable<boolean>;

  
  constructor(private router: Router, public auth: AuthService) {
    // Essa observable emitirá 'true' se a rota atual NÃO for login ou register
    this.shouldShowNav$ = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        const currentRoute = event.urlAfterRedirects;
        // Retorna falso se a rota for /login ou /register
        return !(currentRoute.includes('/login') || currentRoute.includes('/register'));
      })
    );
  }
  
}