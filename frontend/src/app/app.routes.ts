import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/pages/home').then(m => m.Home),
  },
  {
    path: 'agendarUser',
    loadComponent: () =>
      import('./features/agendamiento/pages/asistente/asistente')
        .then(m => m.AsistenteComponent),
  },
  {
    path: 'agendar',
    loadComponent: () =>
      import('./features/agendamiento/pages/agendamiento/agendamiento')
        .then(m => m.Agendamiento),
  },
  {
    path: 'mis-citas',
    loadComponent: () =>
      import('./features/consulta-citas/pages/consulta-citas')
        .then(m => m.ConsultaCitas),
  },
  {
    path: 'administrador',
    loadComponent: () =>
      import('./features/administrador/pages/configuracion-agenda/configuracion-agenda')
        .then(m => m.ConfiguracionAdmin),
  },
  {
    path: '**',
    redirectTo: 'home',
  }
];