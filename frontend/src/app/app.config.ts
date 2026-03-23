import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

// Importaciones para el idioma
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

// IMPORTANTE: Registra el locale con un ID explícito
registerLocaleData(localeEs, 'es-ES'); 

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    // Cambiamos 'es' por 'es-ES' para que coincida exactamente con el registro de arriba
    { provide: LOCALE_ID, useValue: 'es-ES' } 
  ]
};