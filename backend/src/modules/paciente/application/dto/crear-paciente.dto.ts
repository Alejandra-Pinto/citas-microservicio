export class CrearPacienteDto {
  documento: string;
  nombres: string;
  apellidos: string;
  celular: string;
  generoP: 'MASCULINO' | 'FEMENINO' | 'OTRO';
  fechaNacimiento?: Date;
  email?: string;
}
