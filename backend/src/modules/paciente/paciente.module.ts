import { Module } from '@nestjs/common';
import { PacienteController } from './infrastructure/controllers/paciente.controller';
import { CrearPacienteUseCase } from './application/use-cases/crear-paciente.usecase';
import { ListarPacientesUseCase } from './application/use-cases/listar-pacientes.usecase';
import { PacienteRepositoryImpl } from './infrastructure/persistence/paciente.repository.impl';
import { ValidacionPacienteService } from './domain/services/validacion-paciente.service';
import { BuscarPacienteUseCase } from './application/use-cases/buscar-paciente.usecase';

@Module({
  controllers: [PacienteController],

  providers: [
    CrearPacienteUseCase,
    ListarPacientesUseCase,
    BuscarPacienteUseCase,
    ValidacionPacienteService,

    {
      provide: 'PacienteRepository',
      useClass: PacienteRepositoryImpl,
    },
  ],
})
export class PacienteModule {}
