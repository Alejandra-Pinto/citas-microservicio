export type generoP = 'MASCULINO' | 'FEMENINO' | 'OTRO';

export enum GeneroEnum {
  MASCULINO = 'MASCULINO',
  FEMENINO = 'FEMENINO',
  OTRO = 'OTRO',
}

export class Paciente {
  constructor(
    public readonly documento: string,
    public nombres: string,
    public apellidos: string,
    public celular: string,
    public genero: GeneroEnum,
    public fechaNacimiento?: Date,
    public email?: string,
    public activo: boolean = true,
  ) {
    this.validarDocumento();
    this.validarCelular();
    this.validarFechaNacimiento();
  }

  private validarDocumento() {
    if (!this.documento || this.documento.trim().length < 5) {
      throw new Error('El documento debe tener al menos 5 caracteres');
    }
  }

  private validarCelular() {
    if (!this.celular || this.celular.trim().length < 10) {
      throw new Error('El celular debe tener al menos 10 dígitos');
    }
  }

  private validarFechaNacimiento() {
    if (this.fechaNacimiento && this.fechaNacimiento > new Date()) {
      throw new Error('La fecha de nacimiento no puede ser en el futuro');
    }
  }

  nombreCompleto(): string {
    return `${this.nombres.trim()} ${this.apellidos.trim()}`;
  }

  calcularEdad(): number {
    if (!this.fechaNacimiento) return 0;
    const hoy = new Date();
    let edad = hoy.getFullYear() - this.fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - this.fechaNacimiento.getMonth();
    if (
      mes < 0 ||
      (mes === 0 && hoy.getDate() < this.fechaNacimiento.getDate())
    ) {
      edad--;
    }
    return edad;
  }

  desactivar() {
    this.activo = false;
  }

  activar() {
    this.activo = true;
  }
}
