export type TipoProfesional = 'MEDICO' | 'TERAPISTA';

export type Especialidad = 'TERAPIA_NEURAL' | 'QUIROPRAXIA' | 'FISIOTERAPIA';

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
