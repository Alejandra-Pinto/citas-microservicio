import { Routes } from '@angular/router';

export const routes: Routes = [
  {
  path: '',
  loadComponent: () => import('./features/home/home')
    .then(m => m.Home)
  },
  {
    path: 'agendarUser',
    loadComponent: () => import('./features/agendamiento/pages/asistente/asistente')
      .then(m => m.AsistenteComponent)
  },
  {
    path: 'mis-citas',
    loadComponent: () => import('./features/components/consulta-citas/consulta-citas')
      .then(m => m.ConsultaCitas)
  },
  {
  path: 'agendar',
  loadComponent: () => import('./features/agendamiento/agendamiento/agendamiento')
    .then(m => m.Agendamiento)
  },
  {
    path: 'administrador',
    loadChildren: () => import('./administrador/administrador-module')
      .then(m => m.AdministradorModule)
  },

  {
    path: '',
    redirectTo: 'administrador/configuracion-agenda',
    pathMatch: 'full'
  }
];
