import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionAgendaComponent } from './pages/configuracion-agenda/configuracion-agenda';

const routes: Routes = [
  {
    path: 'configuracion-agenda',
    component: ConfiguracionAgendaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule {}
