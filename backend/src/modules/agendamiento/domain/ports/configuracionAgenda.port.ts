export abstract class ConfiguracionPort {
  abstract obtenerConfiguracion(): Promise<{
    horaInicio: number;
    horaFin: number;
    diasAtencion: number[];
  }>;
}
