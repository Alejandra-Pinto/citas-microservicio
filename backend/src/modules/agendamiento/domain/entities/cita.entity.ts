export enum TipoCita {
  PRIMERA_VEZ = 'PRIMERA_VEZ',
  CONTROL = 'CONTROL',
}
export class Cita {
  constructor(
    public id: string,
    public pacienteId: string,
    public especialistaId: string,
    public fechaHora: Date,
    public duracion: number,
    public tipo: TipoCita,
    public estado: string = 'PROGRAMADA',
  ) {}

  cancelar() {
    this.estado = 'CANCELADA';
  }

  confirmar() {
    this.estado = 'CONFIRMADA';
  }

  reagendar(nuevaFecha: Date) {
    this.fechaHora = nuevaFecha;
  }
}
