import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CrearCitaManualUseCase } from '../../application/use-cases/crear-cita-manual.usecase';
import { ListarCitasProfesionalUseCase } from '../../application/use-cases/listar-citas-profesional.usecase';
import { CrearCitaDto } from '../../application/dto/crear-cita.dto';

@Controller('citas')
export class CitaController {
  constructor(
    private readonly crearCita: CrearCitaManualUseCase,
    private readonly listarCitas: ListarCitasProfesionalUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearCitaDto) {
    return this.crearCita.ejecutar(dto);
  }

  @Get()
  async listar(
    @Query('especialistaId') especialistaId: string,
    @Query('fecha') fecha: string,
  ) {
    return this.listarCitas.ejecutar(especialistaId, fecha);
  }
}
