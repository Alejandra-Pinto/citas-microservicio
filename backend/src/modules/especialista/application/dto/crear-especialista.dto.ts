import {
  TipoProfesional,
  Especialidad,
} from '../../domain/entities/especialista.entity';

export class CrearEspecialistaDto {
  id: string;
  nombres: string;
  tipo: TipoProfesional;
  especialidad: Especialidad;
  intervaloAtencion: number;
}
