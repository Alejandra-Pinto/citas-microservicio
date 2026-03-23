import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministradorController } from './infrastructure/controllers/administrador.controller';
import { ConfigurarAgendaUseCase } from './application/use-cases/configurar.agenda.usecase';
import { ObtenerAgendaEspecialistaUseCase } from './application/use-cases/obtener.agenda.usecase';
import { ObtenerConfiguracionSistemaUseCase } from './application/use-cases/obtener.configuracion.sistema.usecase';
import { ConfigurarSistemaUseCase } from './application/use-cases/configurar.sistema.usecase';
import { AdministradorRepositoryImpl } from './infrastructure/persistence/configuracion.repository.impl';
import { ConfiguracionSistemaOrmEntity } from './infrastructure/persistence/configuracion-sistema.orm.entity';
import { EspecialistaAgendaPort } from './domain/ports/especialista-agenda.port';
import { EspecialistaAgendaAdapter } from './infrastructure/adapters/especialista-agenda.adapter';
import { EspecialistaModule } from '../especialista/especialista.module';
import { ConfiguracionRepository } from './domain/repositories/configuracion.repository';

@Module({
  imports: [
    EspecialistaModule,
    TypeOrmModule.forFeature([ConfiguracionSistemaOrmEntity]),
  ],
  controllers: [AdministradorController],
  providers: [
    ConfigurarAgendaUseCase,
    ObtenerAgendaEspecialistaUseCase,
    ObtenerConfiguracionSistemaUseCase,
    ConfigurarSistemaUseCase,
    {
      provide: ConfiguracionRepository,
      useClass: AdministradorRepositoryImpl,
    },
    {
      provide: EspecialistaAgendaPort,
      useClass: EspecialistaAgendaAdapter,
    },
  ],
  exports: [ConfiguracionRepository],
})
export class AdministradorModule {}
