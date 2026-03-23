import { IsInt, Min } from 'class-validator';

export class ActualizarReglasGlobalesDto {
  @IsInt()
  @Min(1)
  ventanaHabilitacionSemanas: number;
}
