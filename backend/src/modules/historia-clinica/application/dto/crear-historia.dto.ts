/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString } from 'class-validator';

export class CrearHistoriaDto {
  @IsString()
  citaId: string;

  @IsString()
  pacienteId: string;

  @IsString()
  especialistaId: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;
}
