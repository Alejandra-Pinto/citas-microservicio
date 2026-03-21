import { Cita } from '../entities/cita.entity';

export interface CitaRepository {
  guardar(cita: Cita): Promise<void>;

  buscarPorProfesionalYFecha(
    especialistaId: string,
    fecha: string,
  ): Promise<Cita[]>;

  existeCitaEnHorario(
    especialistaId: string,
    fechaHora: Date,
  ): Promise<boolean>;
}
