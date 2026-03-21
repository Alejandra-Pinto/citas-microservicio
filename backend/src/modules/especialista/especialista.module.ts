import { Module } from '@nestjs/common';
import { EspecialistaController } from './infrastructure/controllers/especialista.controller';
import { CrearEspecialistaUseCase } from './application/use-cases/crear-especialista.usecase';
import { ListarEspecialistasUseCase } from './application/use-cases/listar-especialista.usecase';
import { EspecialistaRepositoryImpl } from './infrastructure/persistence/especialista.repository.impl';
import { PoliticaEspecialistaService } from './domain/services/politica-especialista.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EspecialistaOrmEntity } from './infrastructure/persistence/especialista.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([EspecialistaOrmEntity])],
  controllers: [EspecialistaController],

  providers: [
    CrearEspecialistaUseCase,
    ListarEspecialistasUseCase,
    PoliticaEspecialistaService,

    {
      provide: 'EspecialistaRepository',
      useClass: EspecialistaRepositoryImpl,
    },
  ],
})
export class EspecialistaModule {}
