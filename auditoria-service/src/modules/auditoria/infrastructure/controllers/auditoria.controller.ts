import { Controller, Get } from '@nestjs/common';
import { AuditoriaService } from '../../application/auditoria.service';

@Controller('auditorias')
export class AuditoriaController {
  constructor(private readonly auditoriaService: AuditoriaService) {}

  @Get()
  async obtenerTodas() {
    return this.auditoriaService.obtenerTodas();
  }

  @Get('listar')
  async obtenerTodasConHC() {
    return this.auditoriaService.obtenerTodasConHC();
  }
}
