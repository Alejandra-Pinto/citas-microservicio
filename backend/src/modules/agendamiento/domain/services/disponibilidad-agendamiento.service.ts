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
    fecha: string, // Formato "YYYY-MM-DD"
    horarioAtencion: { horaInicio: string; horaFin: string },
  ): Date[] {
    const disponibles: Date[] = [];

    // 1. Convertir horas "HH:mm" a minutos totales para el bucle
    const [hInicio, mInicio] = horarioAtencion.horaInicio
      .split(':')
      .map(Number);
    const [hFin, mFin] = horarioAtencion.horaFin.split(':').map(Number);

    const minutosInicio = hInicio * 60 + mInicio;
    const minutosFin = hFin * 60 + mFin;

    // 2. Preparar la fecha base
    const [year, month, day] = fecha.split('-').map(Number);
    const fechaBase = new Date(year, month - 1, day);

    // 3. Iterar por slots de tiempo
    for (
      let minutos = minutosInicio;
      minutos + intervalo <= minutosFin; // El slot debe caber antes de la hora fin
      minutos += intervalo
    ) {
      const slotInicio = new Date(fechaBase);
      slotInicio.setHours(Math.floor(minutos / 60), minutos % 60, 0, 0);

      const ocupado = this.existeConflicto(slotInicio, intervalo, citas);

      if (!ocupado) {
        disponibles.push(slotInicio);
      }
    }

    return disponibles;
  }
}
