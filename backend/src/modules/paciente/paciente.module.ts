import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacienteController } from './infrastructure/controllers/paciente.controller';
import { CrearPacienteUseCase } from './application/use-cases/crear-paciente.usecase';
import { ListarPacientesUseCase } from './application/use-cases/listar-pacientes.usecase';
import { BuscarPacienteUseCase } from './application/use-cases/buscar-paciente.usecase';
import { PacienteRepositoryImpl } from './infrastructure/persistence/paciente.repository.impl';
import { ValidacionPacienteService } from './domain/services/validacion-paciente.service';
import { PacienteOrmEntity } from './infrastructure/persistence/paciente.orm.entity';
import { KeycloakAdapter } from './infrastructure/adapters/keycloak.adapter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([PacienteOrmEntity]), ConfigModule],
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
    {
      provide: 'IdentidadRepository', // <--- Nuevo puerto
      useClass: KeycloakAdapter,
    },
  ],
  exports: ['PacienteRepository'],
})
export class PacienteModule {}
