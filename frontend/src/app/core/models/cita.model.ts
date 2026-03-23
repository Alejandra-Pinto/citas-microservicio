export interface Cita {
  id: string;
  pacienteId: string;
  especialistaId: string;
  especialistaNombre?: string;
  fechaHora: string;
  duracion: number;
  tipo: string;
  estado: string;
}
