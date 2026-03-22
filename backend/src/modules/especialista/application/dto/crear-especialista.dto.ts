/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsEnum, IsInt, Min } from 'class-validator';
import {
  TipoProfesional,
  Especialidad,
} from '../../domain/entities/especialista.entity';

export class CrearEspecialistaDto {
  @IsString()
  id: string;

  @IsString()
  nombres: string;

  @IsEnum(TipoProfesional)
  tipo: TipoProfesional;

  @IsEnum(Especialidad)
  especialidad: Especialidad;

  @IsInt()
  @Min(1)
  intervaloAtencion: number;
}
