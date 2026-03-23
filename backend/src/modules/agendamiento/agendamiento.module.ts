import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaOrmEntity } from './infrastructure/persistence/cita.orm-entity';
import { CitaController } from './infrastructure/controllers/cita.controller';

//Use Cases
import { CrearCitaManualUseCase } from './application/use-cases/crear-cita-manual.usecase';
import { ListarCitasProfesionalUseCase } from './application/use-cases/listar-citas-profesional.usecase';
import { ObtenerDisponibilidadUseCase } from './application/use-cases/obtener-disponibilidad.usecase';
import { ObtenerCitasUseCase } from './application/use-cases/obtener-citas.usecase';
import { CancelarCitaUseCase } from './application/use-cases/cancelar-cita.usecase';
import { ReagendarCitaUseCase } from './application/use-cases/reagendar-cita.usecase';
import { FinalizarCitaUseCase } from './application/use-cases/finalizar-cita.usecase';
import { MarcarNoAsistioUseCase } from './application/use-cases/noAsistida-cita.usecase';
import { ExportarCitasUseCase } from './application/use-cases/exportar-citas.usecase';

//Services
import { PoliticaAgendamientoService } from './domain/services/politica-agendamiento.service';
import { DisponibilidadAgendamientoService } from './domain/services/disponibilidad-agendamiento.service';

//Infrastructure & Adapters
import { CitaRepositoryImpl } from './infrastructure/persistence/cita.repository.impl';
import { PacienteAdapter } from './infrastructure/adapters/paciente.adapter';
import { EspecialistaAdapter } from './infrastructure/adapters/especialista.adapter';
import { ConfiguracionAdapter } from './infrastructure/adapters/configuracionAgenda.adapter';
import { ExportadorCitasAdapter } from './infrastructure/adapters/exportador-citas.adapter'; // Nuevo
import { ExportadorCitasPort } from './domain/ports/exportador-citas.port'; // Nuevo

//External Modules
import { PacienteModule } from '../paciente/paciente.module';
import { EspecialistaModule } from '../especialista/especialista.module';
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
    ObtenerDisponibilidadUseCase,
    ObtenerCitasUseCase,
    CancelarCitaUseCase,
    ReagendarCitaUseCase,
    FinalizarCitaUseCase,
    MarcarNoAsistioUseCase,
    ExportarCitasUseCase,
    PoliticaAgendamientoService,
    DisponibilidadAgendamientoService,

    //Repositories & Ports
    { provide: 'CitaRepository', useClass: CitaRepositoryImpl },

    //Exportador (PDF/Excel)
    { provide: ExportadorCitasPort, useClass: ExportadorCitasAdapter },

    //Adapters de otros módulos
    PacienteAdapter,
    { provide: 'PacientePort', useExisting: PacienteAdapter },

    EspecialistaAdapter,
    { provide: 'EspecialistaPort', useExisting: EspecialistaAdapter },

    ConfiguracionAdapter,
    { provide: 'ConfiguracionPort', useExisting: ConfiguracionAdapter },
  ],
  exports: ['PacientePort', 'EspecialistaPort', ExportarCitasUseCase],
})
export class AgendamientoModule {}
