/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsArray, IsString, Min } from 'class-validator';

export class ConfigurarAgendaDto {
  @IsInt()
  @Min(1)
  semanasDisponibles: number;

  @IsArray()
  @IsString({ each: true }) // cada elemento del array es string
  diasAtencion: string[];

  @IsString()
  horaInicio: string;

  @IsString()
  horaFin: string;
}
