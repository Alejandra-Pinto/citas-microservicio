export class Cita {
  constructor(
    public id: string,
    public pacienteId: string,
    public especialistaId: string,
    public fechaHora: Date,
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
