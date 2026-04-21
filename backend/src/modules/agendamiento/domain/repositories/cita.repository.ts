import { Cita } from '../entities/cita.entity';
import { ConsultarCitasDto } from '../../application/dto/consultar-cita.dto';

export interface CitaRepository {
  guardar(cita: Cita): Promise<void>;
  buscarTodas(dto: ConsultarCitasDto): Promise<Cita[]>;
  buscarPorId(id: string): Promise<Cita | null>;
  buscarTodas(): Promise<Cita[]>;

  buscarPorProfesionalYFecha(
    especialistaId: string,
    fecha: string,
  ): Promise<Cita[]>;

  existeCitaEnHorario(
    especialistaId: string,
    fechaHora: Date,
  ): Promise<boolean>;

  buscarPorPaciente(pacienteId: string): Promise<Cita[]>;
}
