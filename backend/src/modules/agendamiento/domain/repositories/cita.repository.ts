import { Cita } from '../entities/cita.entity';
/* 
Esto es clave en arquitectura hexagonal:
el dominio no sabe cómo se guarda la cita.
*/
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
