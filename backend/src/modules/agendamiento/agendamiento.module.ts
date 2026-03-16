import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitaOrmEntity } from './infrastructure/persistence/cita.orm-entity';
import { CitaController } from './infrastructure/controllers/cita.controller';
import { CrearCitaManualUseCase } from './application/use-cases/crear-cita-manual.usecase';
import { ListarCitasProfesionalUseCase } from './application/use-cases/listar-citas-profesional.usecase';
import { PoliticaAgendamientoService } from './domain/services/politica-agendamiento.service';
import { CitaRepositoryImpl } from './infrastructure/persistence/cita.repository.impl';

@Module({
  controllers: [CitaController],
  imports: [TypeOrmModule.forFeature([CitaOrmEntity])],
  providers: [
    CrearCitaManualUseCase,
    ListarCitasProfesionalUseCase,
    PoliticaAgendamientoService,
    {
      provide: 'CitaRepository',
      useClass: CitaRepositoryImpl,
    },
  ],
})
export class AgendamientoModule {}
