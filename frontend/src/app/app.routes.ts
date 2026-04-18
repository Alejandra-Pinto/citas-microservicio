import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from './shared/layouts/dashboard-layout/dashboard-layout';
import { AuthGuard } from './core/guards/auth.guard'; // Asegúrate de haber creado este archivo

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
    canActivate: [AuthGuard], // <-- Protege TODO el dashboard
    children: [
      {
        path: 'agendarUser',
        loadComponent: () =>
          import('./features/agendamiento/pages/asistente/asistente').then(
            (m) => m.AsistenteComponent,
          ),
        data: { roles: ['PACIENTE', 'ADMIN'] } 
      },
      {
        path: 'agendar',
        loadComponent: () =>
          import('./features/agendamiento/pages/agendamiento/agendamiento').then(
            (m) => m.Agendamiento,
          ),
        data: { roles: ['ESPECIALISTA', 'ADMIN'] } // Ejemplo de roles
      },
      {
        path: 'mis-citas',
        loadComponent: () =>
          import('./features/consulta-citas/pages/consulta-citas').then((m) => m.ConsultaCitas),
        data: { roles: ['PACIENTE', 'ESPECIALISTA', 'ADMIN'] }
      },
      {
        path: 'administrador',
        loadComponent: () =>
          import('./features/administrador/pages/configuracion-agenda/configuracion-agenda').then(
            (m) => m.ConfiguracionAdmin,
          ),
        data: { roles: ['ADMIN'] } // Bloqueado para doctores y pacientes
      },
      {
        path: 'cita/:id',
        title: 'Detalle de Cita - Piedra Azul',
        loadComponent: () =>
          import('./features/vistaCita/pages/vista-cita-doctor/vista-cita-doctor').then(
            (m) => m.VistaCitaDoctor,
          ),
        data: { roles: ['ESPECIALISTA', 'ADMIN'] }
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];