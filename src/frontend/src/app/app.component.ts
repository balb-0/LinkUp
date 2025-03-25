import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';

import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { ProfileHeaderComponent } from './components/profile-header/profile-header.component';

import { DropDownComponent } from './components/drop-down/drop-down.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TabServiceTechnologyComponent } from './components/tab-service-technology/tab-service-technology.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MenuNavComponent, 
    CommonModule, 
    RouterModule, 
    ProfileHeaderComponent,
    DropDownComponent,
    ReactiveFormsModule, 
    TabServiceTechnologyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
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
  
  // Método para lidar com a mudança no dropdown
  onLanguageChange(value: any): void {
    console.log('Idioma selecionado:', value);
    // Implementar lógica para mudar o idioma
  }
}