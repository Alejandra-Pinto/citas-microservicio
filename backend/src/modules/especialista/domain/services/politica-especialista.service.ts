import { Injectable } from '@nestjs/common';
import { Especialista } from '../entities/especialista.entity';

@Injectable()
export class PoliticaEspecialistaService {
  validarIntervalo(intervalo: number) {
    if (intervalo <= 0) {
      throw new Error('El intervalo de atención debe ser mayor a 0');
    }
  }

  validarEspecialistaActivo(especialista: Especialista) {
    if (!especialista.activo) {
      throw new Error('El especialista está inactivo');
    }
  }
}
