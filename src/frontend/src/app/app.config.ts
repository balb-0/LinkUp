import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';
import { authConfig } from './auth/auth.config';
import { ProfessionalStateService } from './services/professional-state.service';

// Verificar se estamos no ambiente do navegador para poder utilizar do SSR
const isBrowser = typeof window !== 'undefined';

// URL de redirecionamento padrão para quando estamos no servidor
const defaultRedirectUri = 'http://localhost:4200';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    ProfessionalStateService,
    // Só fornecemos o Auth0 se estivermos no navegador
    ...(isBrowser ? [provideAuth0(authConfig)] : [])
  ]
};
