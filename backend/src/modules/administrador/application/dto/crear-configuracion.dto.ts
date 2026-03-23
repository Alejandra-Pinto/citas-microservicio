/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { HorarioData } from '../../domain/ports/especialista-agenda.port';

export class CrearConfiguracionDto {
  @IsOptional()
  @IsString()
  especialistaId?: string; // El admin debe decir a quién configura

  @IsInt()
  @Min(15)
  intervaloAtencion: number;

  @ValidateNested()
  @Type(() => HorarioData)
  horarioAtencion: HorarioData;
}
