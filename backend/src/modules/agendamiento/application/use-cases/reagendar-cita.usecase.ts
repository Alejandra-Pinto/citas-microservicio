import { Inject, Injectable } from '@nestjs/common';
import { EstadoCita } from '../../domain/entities/cita.entity';
import type { CitaRepository } from '../../domain/repositories/cita.repository';

@Injectable()
export class ReagendarCitaUseCase {
  constructor(
    @Inject('CitaRepository')
    private readonly citaRepository: CitaRepository,
  ) {}

  async ejecutar(citaId: string, nuevaFecha: Date) {
    const cita = await this.citaRepository.buscarPorId(citaId);

    if (!cita) throw new Error('Cita no encontrada');

    //No reagendar canceladas o finalizadas
    if (
      cita.estado === EstadoCita.CANCELADA ||
      cita.estado === EstadoCita.FINALIZADA
    ) {
      throw new Error('No puedes reagendar esta cita');
    }

    //No permitir pasado
    if (nuevaFecha < new Date()) {
      throw new Error('No puedes reagendar al pasado');
    }

    //Validar horario (8 a 18)
    const hora = nuevaFecha.getHours();
    if (hora < 8 || hora >= 18) {
      throw new Error('Fuera del horario de atención');
    }

    //Traer citas del mismo día
    const fecha = nuevaFecha.toISOString().split('T')[0];

    const citas = await this.citaRepository.buscarPorProfesionalYFecha(
      cita.especialistaId,
      fecha,
    );

    const nuevaInicio = nuevaFecha.getTime();
    const nuevaFin = nuevaInicio + cita.duracion * 60000;

    //Validar solapamiento (excluyendo la misma cita)
    const conflicto = citas.some((c) => {
      if (c.id === cita.id) return false;

      const inicioExistente = new Date(c.fechaHora).getTime();
      const finExistente = inicioExistente + c.duracion * 60000;

      return nuevaInicio < finExistente && nuevaFin > inicioExistente;
    });

    if (conflicto) {
      throw new Error('Horario no disponible');
    }

    //Reagendar
    cita.reagendar(nuevaFecha);

    await this.citaRepository.guardar(cita);

    return cita;
  }
}
