import { GeneroEnum } from '../../infrastructure/persistence/paciente.orm.entity';

export class CrearPacienteDto {
  documento: string;
  nombres: string;
  apellidos: string;
  celular: string;
  generoP: GeneroEnum;
  fechaNacimiento?: Date;
  email?: string;
}
