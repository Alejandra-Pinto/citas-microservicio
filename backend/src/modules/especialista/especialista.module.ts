import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialistaController } from './infrastructure/controllers/especialista.controller';
import { CrearEspecialistaUseCase } from './application/use-cases/crear-especialista.usecase';
import { ListarEspecialistasUseCase } from './application/use-cases/listar-especialista.usecase';
import { EspecialistaRepositoryImpl } from './infrastructure/persistence/especialista.repository.impl';
import { PoliticaEspecialistaService } from './domain/services/politica-especialista.service';
import { EspecialistaOrmEntity } from './infrastructure/persistence/especialista.orm-entity';
import { ValidacionEspecialistaService } from './domain/services/validacion-especialista.service';

@Module({
  imports: [TypeOrmModule.forFeature([EspecialistaOrmEntity])],
  controllers: [EspecialistaController],
  providers: [
    CrearEspecialistaUseCase,
    ListarEspecialistasUseCase,
    PoliticaEspecialistaService,
    ValidacionEspecialistaService,
    {
      provide: 'EspecialistaRepository',
      useClass: EspecialistaRepositoryImpl,
    },
  ],
  exports: ['EspecialistaRepository'],
})
export class EspecialistaModule {}
