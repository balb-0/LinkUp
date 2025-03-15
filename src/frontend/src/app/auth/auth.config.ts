import { AuthConfig } from '@auth0/auth0-angular';

// URL de redirecionamento padrão
const defaultRedirectUri = 'http://localhost:4200';

// Verificar se estamos no ambiente do navegador
const isBrowser = typeof window !== 'undefined';

// Configuração do Auth0
export const authConfig: AuthConfig = {
  domain: 'dev-fajz0ktra1xpumuu.us.auth0.com',
  clientId: 'cGsObypQ0va3dlp1zYXk2CLhOeF95Kd4',
  authorizationParams: {
    redirect_uri: isBrowser ? window.location.origin : defaultRedirectUri
  },
  cacheLocation: isBrowser ? 'localstorage' : 'memory'
}; 