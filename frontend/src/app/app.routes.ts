import { Routes } from '@angular/router';

export const routes: Routes = [

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
