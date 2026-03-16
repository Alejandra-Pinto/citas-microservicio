import { Injectable } from '@nestjs/common';
import { Paciente } from '../entities/paciente.entity';

@Injectable()
export class ValidacionPacienteService {
  validarDocumento(documento: string) {
    if (!documento || documento.trim().length === 0) {
      throw new Error('El documento del paciente es obligatorio');
    }

    if (documento.length < 6) {
      throw new Error('El documento no es válido');
    }
  }

  validarCelular(celular: string) {
    if (!celular || celular.trim().length === 0) {
      throw new Error('El celular es obligatorio');
    }

    if (celular.length < 10) {
      throw new Error('El número de celular no es válido');
    }
  }

  validarPacienteActivo(paciente: Paciente) {
    if (!paciente.activo) {
      throw new Error('El paciente se encuentra inactivo');
    }
  }
}
