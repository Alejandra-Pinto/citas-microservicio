import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './shared/layouts/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/pages/home').then((m) => m.Home),
  },

  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'agendarUser',
        loadComponent: () =>
          import('./features/agendamiento/pages/asistente/asistente').then(
            (m) => m.AsistenteComponent,
          ),
      },
      {
        path: 'agendar',
        loadComponent: () =>
          import('./features/agendamiento/pages/agendamiento/agendamiento').then(
            (m) => m.Agendamiento,
          ),
      },
      {
        path: 'mis-citas',
        loadComponent: () =>
          import('./features/consulta-citas/pages/consulta-citas').then((m) => m.ConsultaCitas),
      },
      {
        path: 'administrador',
        loadComponent: () =>
          import('./features/administrador/pages/configuracion-agenda/configuracion-agenda').then(
            (m) => m.ConfiguracionAdmin,
          ),
      },
      {
        path: 'cita/:id', // <--- Añadimos esta
        title: 'Detalle de Cita - Piedra Azul',
        loadComponent: () =>
          import('./features/vistaCita/pages/vista-cita-doctor/vista-cita-doctor').then(
            (m) => m.VistaCitaDoctor,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
