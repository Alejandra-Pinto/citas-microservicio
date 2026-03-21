export class ConfiguracionAgenda {
  constructor(
    public readonly id: string,
    public semanasDisponibles: number,
    public diasAtencion: string[],
    public horaInicio: string,
    public horaFin: string,
  ) {}
}
