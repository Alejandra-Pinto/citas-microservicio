export class Auditoria {
  constructor(
    public readonly id: string,
    public readonly historiaId: string,
    public readonly accion: string,
    public readonly usuario: string,
    public readonly fecha: Date,
  ) {}
}
