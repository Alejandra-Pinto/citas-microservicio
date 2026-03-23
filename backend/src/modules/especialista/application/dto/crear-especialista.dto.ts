/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsEnum,
  IsInt,
  Min,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import {
  TipoProfesional,
  Especialidad,
} from '../../domain/entities/especialista.entity';
import { Type } from 'class-transformer';

class HorarioAtencionDto {
  @IsArray()
  @IsString({ each: true })
  diaSemana: string[];

  @IsString()
  @IsNotEmpty()
  horaInicio: string;

  @IsString()
  @IsNotEmpty()
  horaFin: string;
}

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

  @ValidateNested() // Valida el objeto interno
  @Type(() => HorarioAtencionDto) // Le dice a class-transformer qué clase usar
  horarioAtencion: HorarioAtencionDto;
}
