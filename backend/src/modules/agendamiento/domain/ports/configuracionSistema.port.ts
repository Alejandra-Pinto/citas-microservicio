export abstract class ConfiguracionSistemaPort {
  abstract obtenerConfiguracion(): Promise<{
    ventanaSemanas: number;
  }>;
}
