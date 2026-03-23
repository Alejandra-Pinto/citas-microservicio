export class ConfiguracionSistema {
  constructor(
    public readonly id: string,
    public ventanaHabilitacionSemanas: number, // La regla de las semanas que mencionas
    public fechaUltimaActualizacion: Date,
  ) {}

  actualizarVentana(semanas: number) {
    if (semanas <= 0)
      throw new Error('La ventana debe ser al menos de 1 semana');
    this.ventanaHabilitacionSemanas = semanas;
    this.fechaUltimaActualizacion = new Date();
  }
}
