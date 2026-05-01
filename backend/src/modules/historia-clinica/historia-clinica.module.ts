import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

// 🔹 Controller
import { HistoriaClinicaController } from './infrastructure/controllers/historia.controller';

// 🔹 ORM
import { HistoriaClinicaOrmEntity } from './infrastructure/persistence/historia-clinica.orm-entity';

// 🔹 Repository
import { HistoriaClinicaRepositoryImpl } from './infrastructure/persistence/historia-clinica.repository.impl';

// 🔹 Use Cases
import { CrearHistoriaUseCase } from './application/use-cases/crear-historia.usecase';
import { ObtenerHistoriaPorCitaUseCase } from './application/use-cases/obtener-historia-por-cita.usecase';
import { ListarHistoriasPacienteUseCase } from './application/use-cases/listar-historias-paciente.usecase';
import { ListarHistoriasEspecialistaUseCase } from './application/use-cases/listar-historias-especialista.usecase';
import { ListarHistoriasUseCase } from './application/use-cases/listar-historias.usecase';

// 🔹 Ports
import { EspecialistaPort } from './domain/ports/especialista.port';
import { PacientePort } from './domain/ports/paciente.port';

// 🔹 Adapters
import { CitaAdapter } from './infrastructure/adapters/cita.adapter';
import { EspecialistaAdapter } from './infrastructure/adapters/especialista.adapter';
import { PacienteAdapter } from './infrastructure/adapters/paciente.adapter';

// 🔹 Modulos externos (para adapters)
import { PacienteModule } from '../paciente/paciente.module';
import { EspecialistaModule } from '../especialista/especialista.module';
import { AgendamientoModule } from '../agendamiento/agendamiento.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUDITORIA_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auditoria_queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([HistoriaClinicaOrmEntity]),
    PacienteModule,
    EspecialistaModule,
    AgendamientoModule,
  ],

  controllers: [HistoriaClinicaController],

  providers: [
    // ✅ Use Cases
    CrearHistoriaUseCase,
    ObtenerHistoriaPorCitaUseCase,
    ListarHistoriasPacienteUseCase,
    ListarHistoriasUseCase,
    ListarHistoriasEspecialistaUseCase,

    // ✅ Repository (inyección correcta)
    {
      provide: 'HistoriaClinicaRepository',
      useClass: HistoriaClinicaRepositoryImpl,
    },

    // ✅ Ports → Adapters
    {
      provide: 'CitaPort',
      useClass: CitaAdapter,
    },
    {
      provide: EspecialistaPort,
      useClass: EspecialistaAdapter,
    },
    {
      provide: PacientePort,
      useClass: PacienteAdapter,
    },
  ],

  exports: ['HistoriaClinicaRepository'],
})
export class HistoriaClinicaModule {}
