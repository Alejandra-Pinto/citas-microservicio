import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteController } from './infrastructure/controllers/paciente.controller';
import { CrearPacienteUseCase } from './application/use-cases/crear-paciente.usecase';
import { ListarPacientesUseCase } from './application/use-cases/listar-pacientes.usecase';
import { BuscarPacienteUseCase } from './application/use-cases/buscar-paciente.usecase';
import { PacienteRepositoryImpl } from './infrastructure/persistence/paciente.repository.impl';
import { ValidacionPacienteService } from './domain/services/validacion-paciente.service';
import { PacienteOrmEntity } from './infrastructure/persistence/paciente.orm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteOrmEntity])],
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
  exports: ['PacienteRepository'],
})
export class PacienteModule {}
