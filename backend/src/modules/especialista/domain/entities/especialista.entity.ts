export enum TipoProfesional {
  MEDICO = 'MEDICO',
  TERAPISTA = 'TERAPISTA',
}
export enum Especialidad {
  TERAPIA_NEURAL = 'TERAPIA_NEURAL',
  QUIROPRAXIA = 'QUIROPRAXIA',
  FISIOTERAPIA = 'FISIOTERAPIA',
}
export class Especialista {
  constructor(
    public id: string,
    public nombres: string,
    public tipo: TipoProfesional,
    public especialidad: Especialidad,
    public intervaloAtencion: number,
    public activo: boolean = true,
  ) {}

  desactivar() {
    this.activo = false;
  }

  activar() {
    this.activo = true;
  }
}
