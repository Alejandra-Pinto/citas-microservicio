import { TipoCita } from '../../domain/entities/cita.entity';

export class CrearCitaDto {
  pacienteId: string;
  especialistaId: string;
  fechaHora: Date;
  tipo: TipoCita;
}
