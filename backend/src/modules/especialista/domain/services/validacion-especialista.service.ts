import { Injectable } from '@nestjs/common';
import { Especialista } from '../entities/especialista.entity';

@Injectable()
export class ValidacionEspecialistaService {
  validarDocumento(documento: string) {
    if (!documento || documento.trim().length === 0) {
      throw new Error('El documento del especialista es obligatorio');
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

  validarActivo(especialista: Especialista) {
    if (!especialista.activo) {
      throw new Error('El especialista se encuentra inactivo');
    }
  }

  //Especialidad obligatoria
  validarEspecialidad(especialidad: string) {
    if (!especialidad || especialidad.trim().length === 0) {
      throw new Error('La especialidad es obligatoria');
    }
  }
}
