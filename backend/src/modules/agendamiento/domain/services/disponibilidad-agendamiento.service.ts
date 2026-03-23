import { Injectable } from '@nestjs/common';
import { Cita } from '../entities/cita.entity';
import { ConfiguracionSistemaPort } from '../ports/configuracionSistema.port';

@Injectable()
export class DisponibilidadAgendamientoService {
  constructor(private readonly configuracionPort: ConfiguracionSistemaPort) {}

  async estaEnVentanaPermitida(fechaSolicitada: Date): Promise<boolean> {
    // CORRECCIÓN: Usar 'this.configuracionPort' (la variable inyectada), no el nombre del puerto/clase
    const config = await this.configuracionPort.obtenerConfiguracion();

    const hoy = new Date();
    // Normalizamos hoy a las 00:00 para que la comparación sea solo por días
    hoy.setHours(0, 0, 0, 0);

    const fechaLimite = new Date(hoy);
    // Sumamos las semanas configuradas
    fechaLimite.setDate(hoy.getDate() + config.ventanaSemanas * 7);

    // Validamos que la fecha solicitada esté entre hoy y el límite
    return fechaSolicitada >= hoy && fechaSolicitada <= fechaLimite;
  }

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

      // Lógica de solapamiento: (InicioA < FinB) && (FinA > InicioB)
      return inicioNuevo < finExistente && finNuevo > inicioExistente;
    });
  }

  calcularHorariosDisponibles(
    intervalo: number,
    citas: Cita[],
    fecha: string,
    horarioAtencion: { horaInicio: string; horaFin: string },
  ): Date[] {
    const disponibles: Date[] = [];
    const [hInicio, mInicio] = horarioAtencion.horaInicio
      .split(':')
      .map(Number);
    const [hFin, mFin] = horarioAtencion.horaFin.split(':').map(Number);

    const minutosFin = hFin * 60 + mFin;
    const [year, month, day] = fecha.split('-').map(Number);

    // 1. Mapeamos las citas a minutos para facilitar comparaciones numéricas
    const citasEnMinutos = citas
      .map((c) => {
        const d = new Date(c.fechaHora);
        const inicio = d.getHours() * 60 + d.getMinutes();
        return { inicio, fin: inicio + c.duracion };
      })
      .sort((a, b) => a.inicio - b.inicio);

    let minutosActuales = hInicio * 60 + mInicio;

    // 2. Bucle de búsqueda
    while (minutosActuales + intervalo <= minutosFin) {
      // ¿Hay alguna cita que esté ocurriendo JUSTO AHORA?
      const citaActual = citasEnMinutos.find(
        (c) => minutosActuales >= c.inicio && minutosActuales < c.fin,
      );

      if (citaActual) {
        // Si el médico está ocupado, saltamos al final de esta cita
        minutosActuales = citaActual.fin;
        continue;
      }

      // ¿Si empiezo una cita ahora, chocaría con la PRÓXIMA cita programada?
      // (Validamos el bloque de 20 minutos hacia adelante)
      const choqueConProxima = citasEnMinutos.find(
        (c) =>
          minutosActuales < c.inicio && minutosActuales + intervalo > c.inicio,
      );

      if (choqueConProxima) {
        // Si choca, no podemos usar este hueco.
        // Saltamos al final de esa cita próxima para seguir buscando
        minutosActuales = choqueConProxima.fin;
      } else {
        // ¡LIBRE! El bloque de 20 min cabe perfectamente
        const slot = new Date(
          year,
          month - 1,
          day,
          Math.floor(minutosActuales / 60),
          minutosActuales % 60,
        );
        disponibles.push(slot);
        minutosActuales += intervalo;
      }
    }

    return disponibles;
  }
}
