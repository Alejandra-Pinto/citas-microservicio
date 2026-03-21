import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CrearCitaManualUseCase } from '../../application/use-cases/crear-cita-manual.usecase';
import { ListarCitasProfesionalUseCase } from '../../application/use-cases/listar-citas-profesional.usecase';
import { CrearCitaDto } from '../../application/dto/crear-cita.dto';
import { ObtenerDisponibilidadUseCase } from '../../application/use-cases/obtener-disponibilidad.usecase';

@Controller('citas')
export class CitaController {
  constructor(
    private readonly crearCita: CrearCitaManualUseCase,
    private readonly listarCitas: ListarCitasProfesionalUseCase,
    private readonly obtenerDisponibilidad: ObtenerDisponibilidadUseCase,
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

  @Get('/disponibilidad')
  async disponibilidad(
    @Query('especialistaId') especialistaId: string,
    @Query('fecha') fecha: string,
  ) {
    const horarios = await this.obtenerDisponibilidad.ejecutar(
      especialistaId,
      fecha,
    );

    return horarios.map((h) => ({
      hora: h.toLocaleTimeString(),
      iso: h.toISOString(),
    }));
  }
}
