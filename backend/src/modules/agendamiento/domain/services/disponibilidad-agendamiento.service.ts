import { Inject, Injectable } from '@nestjs/common';
import { Cita } from '../entities/cita.entity';
import { ConfiguracionPort } from '../ports/configuracionAgenda.port';

@Injectable()
export class DisponibilidadAgendamientoService {
  existeConflicto(
    nuevaFecha: Date,
    duracionNueva: number,
    citas: Cita[],
  ): boolean {
    const inicioNuevo = nuevaFecha.getTime();
    const finNuevo = inicioNuevo + duracionNueva * 60000;

    return citas.some((c) => {
      const inicioExistente = new Date(c.fechaHora).getTime();
      const finExistente = inicioExistente + c.duracion * 60000;

      return inicioNuevo < finExistente && finNuevo > inicioExistente;
    });
  }

  calcularHorariosDisponibles(
    intervalo: number,
    citas: Cita[],
    fecha: string,
    horaInicio: number,
    horaFin: number,
  ): Date[] {
    const disponibles: Date[] = [];

    const [year, month, day] = fecha.split('-').map(Number);
    const fechaBase = new Date(year, month - 1, day);

    for (
      let minutos = horaInicio * 60;
      minutos < horaFin * 60;
      minutos += intervalo
    ) {
      const horario = new Date(fechaBase);
      horario.setHours(Math.floor(minutos / 60), minutos % 60, 0, 0);

      const ocupado = this.existeConflicto(
        horario,
        intervalo, // duración del slot
        citas,
      );

      if (!ocupado) {
        disponibles.push(horario);
      }
    }

    return disponibles;
  }

  constructor(
    @Inject('ConfiguracionPort')
    private readonly configuracionPort: ConfiguracionPort,
  ) {}

  async esHorarioValido(inicio: Date, duracion: number): Promise<boolean> {
    const config = await this.configuracionPort.obtenerConfiguracion();

    const inicioMs = inicio.getTime();
    const finMs = inicioMs + duracion * 60000;

    const horaInicio = inicio.getHours();
    const horaFin = new Date(finMs).getHours();

    return horaInicio >= config.horaInicio && horaFin < config.horaFin;
  }
}
