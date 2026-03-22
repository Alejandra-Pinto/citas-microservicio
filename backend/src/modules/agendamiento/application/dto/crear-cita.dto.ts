/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsDate, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { TipoCita } from '../../domain/entities/cita.entity';

export class CrearCitaDto {
  @IsString()
  pacienteId: string;

  @IsString()
  especialistaId: string;

  @Type(() => Date) // convierte string → Date automáticamente
  @IsDate()
  fechaHora: Date;

  @IsEnum(TipoCita)
  tipo: TipoCita;
}
