export interface Cita {
  id: string;
  pacienteId: string;
  especialistaId: string;
  especialistaNombre?: string;
  fechaHora: string;
  duracion: number;
  tipo: 'PROGRAMADA' | 'CANCELADA' | 'REAGENDADA' | 'FINALIZADA';
  estado: string;
  notas?: string;

  //relaciones
  paciente?: {
    nombre: string;
    apellidos: string;
    documento: string;
    fotoUrl?: string;
  };
  especialista?: {
    nombre: string;
    apellidos: string;
    fotoUrl?: string;
  };
}
