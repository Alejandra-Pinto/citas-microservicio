import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './shared/layouts/dashboard-layout/dashboard-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  //RUTA INDEPENDIENTE (Sin Sidebar)
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/pages/home').then(m => m.Home),
  },
  //RUTAS PROTEGIDAS / CON SIDEBAR (Hijas del Layout)
  {
    path: '',
    component: DashboardLayoutComponent, // Este componente ya tiene el Sidebar en su HTML
    children: [
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
            .then(m => m.ConfiguracionAgendaComponent),
      },
    ]
  },
  //Si la ruta no existe, vuelve al Home
  {
    path: '**',
    redirectTo: 'home',
  }
];