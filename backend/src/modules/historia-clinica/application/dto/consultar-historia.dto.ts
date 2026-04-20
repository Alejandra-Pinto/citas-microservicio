import { IsOptional } from 'class-validator';

export class ConsultarHistoriaDto {
  @IsOptional()
  citaId?: string;

  @IsOptional()
  pacienteId?: string;
}
