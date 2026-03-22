import { Module } from '@nestjs/common';
import { AdministradorController } from './infrastructure/controllers/administrador.controller';
import { ConfigurarAgendaUseCase } from './application/use-cases/configurar.agenda.usecase';
import { ObtenerConfiguracionUseCase } from './application/use-cases/obtener.agenda.usecase';
import { ValidacionConfiguracionService } from './domain/services/validacion-configuracion.service';
import { ConfiguracionRepositoryImpl } from './infrastructure/persistence/configuracion.repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfiguracionAgendaOrm } from './infrastructure/persistence/configuracionAgenda.orm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConfiguracionAgendaOrm])],
  controllers: [AdministradorController],
  providers: [
    ConfigurarAgendaUseCase,
    ObtenerConfiguracionUseCase,
    ValidacionConfiguracionService,
    {
      provide: 'ConfiguracionRepository',
      useClass: ConfiguracionRepositoryImpl,
    },
  ],
  exports: ['ConfiguracionRepository'],
})
export class AdministradorModule {}
