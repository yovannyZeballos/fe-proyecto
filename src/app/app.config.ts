import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApiInterceptor } from './interceptors/api-interceptor';
import { apiInterceptorFn } from './interceptors/api-interceptor-fn';

const nebularProviders = NbThemeModule.forRoot({ name: 'default' }).providers || [];
const nebularAuthProviders = NbAuthModule.forRoot({
  strategies: [
    NbPasswordAuthStrategy.setup({
      name: 'email',
      token: {
        class: NbAuthJWTToken,
        key: 'accessToken', 
      },
      baseEndpoint: 'https://ms-proyecto-gateway.onrender.com/ms-proyecto-auth-server/auth/',
      login: {
        endpoint: 'login',
      },
      register: {
        endpoint: 'register',
      },
    }),
  ],
  forms: {},
}).providers || [];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([apiInterceptorFn])),
    provideAnimations(),
    nebularProviders,
    nebularAuthProviders,

  ],
};
