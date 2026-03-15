export class CrearEspecialistaDto {
  nombres: string;
  tipo: 'MEDICO' | 'TERAPISTA';
  especialidad: 'TERAPIA_NEURAL' | 'QUIROPRAXIA' | 'FISIOTERAPIA';
  intervaloAtencion: number;
}
