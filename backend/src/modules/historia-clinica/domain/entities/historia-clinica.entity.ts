export class HistoriaClinica {
  constructor(
    public readonly id: string,
    public readonly citaId: string,
    public readonly pacienteId: string,
    public readonly profesionalId: string,
    public readonly fechaHora: Date,
    public descripcion: string,
  ) {}

  actualizarDescripcion(nuevaDescripcion: string) {
    if (!nuevaDescripcion || nuevaDescripcion.trim().length === 0) {
      throw new Error('La descripción no puede estar vacía');
    }
    this.descripcion = nuevaDescripcion;
  }
}
