export enum TipoProfesional {
  MEDICO = 'MEDICO',
  TERAPISTA = 'TERAPISTA',
}
export enum Especialidad {
  TERAPIA_NEURAL = 'TERAPIA_NEURAL',
  QUIROPRAXIA = 'QUIROPRAXIA',
  FISIOTERAPIA = 'FISIOTERAPIA',
}
export interface HorarioAtencion {
  diaSemana: string[];
  horaInicio: string; // "08:00"
  horaFin: string; // "12:00"
}

export class Especialista {
  constructor(
    public id: string,
    public nombres: string,
    public tipo: TipoProfesional,
    public especialidad: Especialidad,
    public intervaloAtencion: number,
    public horarioAtencion: HorarioAtencion,
    public activo: boolean = true,
  ) {}

  desactivar() {
    this.activo = false;
  }

  activar() {
    this.activo = true;
  }

  actualizarConfiguracionAgenda(
    nuevoIntervalo: number,
    nuevosHorarios: HorarioAtencion,
  ) {
    this.intervaloAtencion = nuevoIntervalo;
    this.horarioAtencion = nuevosHorarios;
  }
}
