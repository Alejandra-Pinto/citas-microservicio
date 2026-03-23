export enum TipoCita {
  PRIMERA_VEZ = 'PRIMERA_VEZ',
  CONTROL = 'CONTROL',
}

export enum EstadoCita {
  PROGRAMADA = 'PROGRAMADA', // confirmada
  CANCELADA = 'CANCELADA', // cancelada manualmente
  REAGENDADA = 'REAGENDADA', // se movió a otra fecha
  FINALIZADA = 'FINALIZADA', // ya se atendió
  NO_ASISTIO = 'NO_ASISTIO', // paciente no llegó
}

export class Cita {
  constructor(
    public id: string,
    public pacienteId: string,
    public especialistaId: string,
    public fechaHora: Date,
    public duracion: number,
    public tipo: TipoCita,
    public estado: EstadoCita = EstadoCita.PROGRAMADA,
    public paciente?: { nombre: string; documento: string },
    public especialista?: { nombre: string; especialidad?: string },
  ) {}

  cancelar() {
    if (this.estado === EstadoCita.CANCELADA) {
      throw new Error('La cita ya está cancelada');
    }

    if (this.estado === EstadoCita.FINALIZADA) {
      throw new Error('No puedes cancelar una cita finalizada');
    }

    this.estado = EstadoCita.CANCELADA;
  }

  reagendar(nuevaFecha: Date) {
    this.fechaHora = nuevaFecha;
    this.estado = EstadoCita.REAGENDADA;
  }

  finalizar() {
    this.estado = EstadoCita.FINALIZADA;
  }

  marcarNoAsistio() {
    this.estado = EstadoCita.NO_ASISTIO;
  }
}
