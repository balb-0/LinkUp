import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { AuthButtonComponent } from '../../auth-button/auth-button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, AuthButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    // Verifica se o usuário já está autenticado
    this.auth.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        // se tiver ok ele redireciona para a página inicial
        this.router.navigate(['/']);
      }
    });
  }
}
