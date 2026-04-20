import { HistoriaClinica } from '../entities/historia-clinica.entity';

export interface HistoriaClinicaRepository {
  guardar(historia: HistoriaClinica): Promise<void>;
  buscarPorCita(citaId: string): Promise<HistoriaClinica | null>;
  listarPorPaciente(pacienteId: string): Promise<HistoriaClinica[]>;
  listarTodas(): Promise<HistoriaClinica[]>;
  listarPorEspecialista(profesionalId: string): Promise<HistoriaClinica[]>;
}
