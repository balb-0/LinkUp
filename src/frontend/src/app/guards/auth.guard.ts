import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, tap } from 'rxjs/operators';

// Guarda de autenticação
// Verifica se o usuário está autenticado antes de permitir acesso a uma rota
//protetor de rotas
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    map(isAuthenticated => {
      if (!isAuthenticated) {
        // se não estiver autenticado, redireciona para a página de login
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
}; 