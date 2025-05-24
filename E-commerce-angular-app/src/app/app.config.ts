import { ApplicationConfig, importProvidersFrom, Provider, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Loading } from './Core/interceptors/loading.interceptor';
import { myLoadingInterceptor } from './Core/interceptors/my-loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    MessageService,
    provideAnimations(),
    // importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch() , withInterceptors([myLoadingInterceptor]))
  ]
};
