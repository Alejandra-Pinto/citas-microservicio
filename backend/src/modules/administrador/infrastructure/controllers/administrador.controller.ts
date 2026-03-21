import { Body, Controller, Get, Post } from '@nestjs/common';
import { ConfigurarAgendaUseCase } from '../../application/use-cases/configurar.agenda.usecase';
import { ObtenerConfiguracionUseCase } from '../../application/use-cases/obtener.agenda.usecase';
import { ConfigurarAgendaDto } from '../../application/dto/crear-configuracion.dto';

@Controller('administrador')
export class AdministradorController {
  constructor(
    private readonly configurarUseCase: ConfigurarAgendaUseCase,
    private readonly obtenerUseCase: ObtenerConfiguracionUseCase,
  ) {}

  @Post('configuracion')
  configurar(@Body() dto: ConfigurarAgendaDto) {
    return this.configurarUseCase.ejecutar(dto);
  }

  @Get('configuracion')
  obtener() {
    return this.obtenerUseCase.ejecutar();
  }
}
