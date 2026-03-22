export type generoP = 'MASCULINO' | 'FEMENINO' | 'OTRO';

export enum GeneroEnum {
  MASCULINO = 'MASCULINO',
  FEMENINO = 'FEMENINO',
  OTRO = 'OTRO',
}

export class Paciente {
  constructor(
    public documento: string,
    public nombres: string,
    public apellidos: string,
    public celular: string,
    public genero: GeneroEnum,
    public fechaNacimiento?: Date,
    public email?: string,
    public activo: boolean = true,
  ) {}

  nombreCompleto(): string {
    return `${this.nombres} ${this.apellidos}`;
  }

  desactivar() {
    this.activo = false;
  }

  activar() {
    this.activo = true;
  }
}
