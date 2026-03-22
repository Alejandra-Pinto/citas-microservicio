import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { CitaRepository } from '../../domain/repositories/cita.repository';
import type { EspecialistaPort } from '../../domain/ports/especialista.port';
import { DisponibilidadAgendamientoService } from '../../domain/services/disponibilidad-agendamiento.service';
import type { ConfiguracionPort } from '../../domain/ports/configuracionAgenda.port';

@Injectable()
export class ObtenerDisponibilidadUseCase {
  constructor(
    @Inject('CitaRepository')
    private readonly citaRepository: CitaRepository,

    @Inject('EspecialistaPort')
    private readonly especialistaPort: EspecialistaPort,

    @Inject('ConfiguracionPort')
    private readonly configPort: ConfiguracionPort,

    private readonly disponibilidadService: DisponibilidadAgendamientoService,
  ) {}

  async ejecutar(especialistaId: string, fecha: string) {
    //1. Validar especialista
    const especialista =
      await this.especialistaPort.obtenerPorId(especialistaId);

    if (!especialista) {
      throw new BadRequestException('Especialista no existe');
    }

    if (!especialista.activo) {
      throw new Error('Especialista inactivo');
    }

    //2. Obtener citas del día
    const citas = await this.citaRepository.buscarPorProfesionalYFecha(
      especialistaId,
      fecha,
    );

    const config = await this.configPort.obtenerConfiguracion();

    //3.Calcular disponibilidad
    return this.disponibilidadService.calcularHorariosDisponibles(
      especialista.intervaloAtencion,
      citas,
      fecha,
      config.horaInicio,
      config.horaFin,
    );
  }
}
