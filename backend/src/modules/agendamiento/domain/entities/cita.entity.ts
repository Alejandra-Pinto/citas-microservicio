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
  ) {}

  cancelar() {
    this.estado = EstadoCita.CANCELADA;
  }

  reagendar(nuevaFecha: Date) {
    this.fechaHora = nuevaFecha;
  }

  finalizar() {
    this.estado = EstadoCita.FINALIZADA;
  }

  marcarNoAsistio() {
    this.estado = EstadoCita.NO_ASISTIO;
  }
}
