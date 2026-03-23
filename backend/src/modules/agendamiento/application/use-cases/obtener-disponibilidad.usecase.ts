import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { CitaRepository } from '../../domain/repositories/cita.repository';
import type { EspecialistaPort } from '../../domain/ports/especialista.port';
import { DisponibilidadAgendamientoService } from '../../domain/services/disponibilidad-agendamiento.service';

@Injectable()
export class ObtenerDisponibilidadUseCase {
  constructor(
    @Inject('CitaRepository') private readonly citaRepository: CitaRepository,
    @Inject('EspecialistaPort')
    private readonly especialistaPort: EspecialistaPort,
    private readonly disponibilidadService: DisponibilidadAgendamientoService,
  ) {}

  async ejecutar(especialistaId: string, fecha: string) {
    // 1. Validar si la fecha está en la ventana permitida por el Admin
    const fechaDate = new Date(fecha + 'T00:00:00'); // Asegurar zona horaria local
    const esValida =
      await this.disponibilidadService.estaEnVentanaPermitida(fechaDate);
    if (!esValida) {
      throw new BadRequestException(
        'La fecha solicitada no está habilitada para agendamiento',
      );
    }

    // 2. Obtener datos del especialista (incluye intervalo y horario)
    const especialista =
      await this.especialistaPort.obtenerPorId(especialistaId);
    if (!especialista || !especialista.activo) {
      throw new BadRequestException('Especialista no encontrado o inactivo');
    }

    // 3. Obtener citas ocupadas
    const citas = await this.citaRepository.buscarPorProfesionalYFecha(
      especialistaId,
      fecha,
    );

    // 4. Calcular disponibilidad usando el horarioAtencion del especialista
    return this.disponibilidadService.calcularHorariosDisponibles(
      especialista.intervaloAtencion,
      citas,
      fecha,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      especialista.horarioAtencion, // Pasamos el objeto { horaInicio, horaFin }
    );
  }
}
