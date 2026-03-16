import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'agendar',
    loadComponent: () => import('./features/agendamiento/pages/asistente/asistente')
      .then(m => m.AsistenteComponent)
  },
  { path: '', redirectTo: 'agendar', pathMatch: 'full' }
];
