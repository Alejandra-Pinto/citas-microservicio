/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CrearCitaManualUseCase } from '../../application/use-cases/crear-cita-manual.usecase';
import { ListarCitasProfesionalUseCase } from '../../application/use-cases/listar-citas-profesional.usecase';
import { CrearCitaDto } from '../../application/dto/crear-cita.dto';
import { ObtenerDisponibilidadUseCase } from '../../application/use-cases/obtener-disponibilidad.usecase';
import { ObtenerCitasUseCase } from '../../application/use-cases/obtener-citas.usecase';
import { ConsultarCitasDto } from '../../application/dto/consultar-cita.dto';
import { CancelarCitaUseCase } from '../../application/use-cases/cancelar-cita.usecase';
import { ReagendarCitaUseCase } from '../../application/use-cases/reagendar-cita.usecase';
import { FinalizarCitaUseCase } from '../../application/use-cases/finalizar-cita.usecase';
import { MarcarNoAsistioUseCase } from '../../application/use-cases/noAsistida-cita.usecase';
import { Param, Patch } from '@nestjs/common';

@Controller('citas')
export class CitaController {
  constructor(
    private readonly crearCita: CrearCitaManualUseCase,
    private readonly listarCitas: ListarCitasProfesionalUseCase,
    private readonly obtenerDisponibilidad: ObtenerDisponibilidadUseCase,
    private readonly obtenerCitas: ObtenerCitasUseCase,
    private readonly cancelarCita: CancelarCitaUseCase,
    private readonly reagendarCita: ReagendarCitaUseCase,
    private readonly finalizarCita: FinalizarCitaUseCase,
    private readonly marcarNoAsistioUseCase: MarcarNoAsistioUseCase,
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

  @Get('/filtrar')
  async obtener(@Query() dto: ConsultarCitasDto) {
    return this.obtenerCitas.ejecutar(dto);
  }

  @Patch(':id/cancelar')
  async cancelar(@Param('id') id: string) {
    return this.cancelarCita.ejecutar(id);
  }

  @Patch(':id/reagendar')
  async reagendar(
    @Param('id') id: string,
    @Body('fechaHora') fechaHora: string,
  ) {
    return this.reagendarCita.ejecutar(id, new Date(fechaHora));
  }

  @Patch('/finalizar')
  async finalizar(@Param('citaId') citaId: string) {
    return this.finalizarCita.ejecutar(citaId);
  }

  @Patch(':id/no-asistio')
  async marcarNoAsistio(@Param('id') id: string) {
    return this.marcarNoAsistioUseCase.ejecutar(id);
  }
}
