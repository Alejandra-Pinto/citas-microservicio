import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaOrmEntity } from './infrastructure/persistence/cita.orm-entity';
import { CitaController } from './infrastructure/controllers/cita.controller';
import { CrearCitaManualUseCase } from './application/use-cases/crear-cita-manual.usecase';
import { ListarCitasProfesionalUseCase } from './application/use-cases/listar-citas-profesional.usecase';
import { PoliticaAgendamientoService } from './domain/services/politica-agendamiento.service';
import { CitaRepositoryImpl } from './infrastructure/persistence/cita.repository.impl';
import { PacienteAdapter } from './infrastructure/adapters/paciente.adapter';
import { EspecialistaAdapter } from './infrastructure/adapters/especialista.adapter';
import { PacienteModule } from '../paciente/paciente.module';
import { EspecialistaModule } from '../especialista/especialista.module';
import { ObtenerDisponibilidadUseCase } from './application/use-cases/obtener-disponibilidad.usecase';
import { DisponibilidadAgendamientoService } from './domain/services/disponibilidad-agendamiento.service';
import { ConfiguracionAdapter } from './infrastructure/adapters/configuracionAgenda.adapter';
import { ObtenerCitasUseCase } from './application/use-cases/obtener-citas.usecase';
import { CancelarCitaUseCase } from './application/use-cases/cancelar-cita.usecase';
import { ReagendarCitaUseCase } from './application/use-cases/reagendar-cita.usecase';
import { FinalizarCitaUseCase } from './application/use-cases/finalizar-cita.usecase';
import { MarcarNoAsistioUseCase } from './application/use-cases/noAsistida-cita.usecase';
import { AdministradorModule } from '../administrador/administrador.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CitaOrmEntity]),
    PacienteModule,
    EspecialistaModule,
    AdministradorModule,
  ],
  controllers: [CitaController],
  providers: [
    CrearCitaManualUseCase,
    ListarCitasProfesionalUseCase,
    PoliticaAgendamientoService,
    ObtenerDisponibilidadUseCase,
    DisponibilidadAgendamientoService,
    ObtenerCitasUseCase,
    CancelarCitaUseCase,
    ReagendarCitaUseCase,
    FinalizarCitaUseCase,
    MarcarNoAsistioUseCase,

    { provide: 'CitaRepository', useClass: CitaRepositoryImpl },

    PacienteAdapter,
    { provide: 'PacientePort', useExisting: PacienteAdapter },

    EspecialistaAdapter,
    { provide: 'EspecialistaPort', useExisting: EspecialistaAdapter },

    ConfiguracionAdapter,
    { provide: 'ConfiguracionPort', useExisting: ConfiguracionAdapter },
  ],
  exports: ['PacientePort', 'EspecialistaPort'],
})
export class AgendamientoModule {}
