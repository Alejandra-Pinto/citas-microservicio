export class ConfiguracionAgenda {
  constructor(
    public readonly id: string,
    public semanasDisponibles: number,
    public diasAtencion: string[],
    public horaInicio: string,
    public horaFin: string,
    public intervaloMinutos: number,
  ) {}

  validarIntervalo() {
    if (this.intervaloMinutos <= 0) {
      throw new Error('Intervalo inválido');
    }
  }
}
