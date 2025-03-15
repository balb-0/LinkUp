import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { AuthService } from '@auth0/auth0-angular';


class MockAuthService {
  isAuthenticated$ = {
    pipe: () => ({
      subscribe: (callback: any) => {
        if (callback) callback(false);
        return { unsubscribe: () => {} };
      }
    })
  };
  
  user$ = {
    pipe: () => ({
      subscribe: (callback: any) => {
        if (callback) callback(null);
        return { unsubscribe: () => {} };
      }
    })
  };
  
  loginWithRedirect() {}
  logout() {}
  handleRedirectCallback() { return Promise.resolve({ appState: null }); }
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    
    { provide: AuthService, useClass: MockAuthService }
  ]
};

// Cria uma nova configuração mesclando a configuração do app com a configuração do servidor
// A configuração do servidor substituirá qualquer provedor conflitante da configuração do app
export const config = mergeApplicationConfig(appConfig, serverConfig);
