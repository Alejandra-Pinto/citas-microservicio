import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgendamientoModule } from './modules/agendamiento/agendamiento.module';
import { PacienteModule } from './modules/paciente/paciente.module';
import { EspecialistaModule } from './modules/especialista/especialista.module';
import { AdministradorModule } from './modules/administrador/administrador.module';
import { AutenticacionModule } from './modules/autenticacion/autenticacion.module';
import { HistoriaClinicaModule } from './modules/historia-clinica/historia-clinica.module';
import { AuditoriaModule } from './modules/auditoria/auditoria.module';

@Module({
  imports: [
    AgendamientoModule,
    PacienteModule,
    EspecialistaModule,
    AdministradorModule,
    AutenticacionModule,
    HistoriaClinicaModule,
    AuditoriaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
