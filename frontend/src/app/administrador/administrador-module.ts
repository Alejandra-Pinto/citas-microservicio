import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdministradorRoutingModule } from './administrador-routing-module';
import { ConfiguracionAgendaComponent } from './pages/configuracion-agenda/configuracion-agenda';

@NgModule({
  declarations: [ ConfiguracionAgendaComponent ],
  imports: [
    CommonModule,
    FormsModule,
    AdministradorRoutingModule
  ]
})
export class AdministradorModule { }
