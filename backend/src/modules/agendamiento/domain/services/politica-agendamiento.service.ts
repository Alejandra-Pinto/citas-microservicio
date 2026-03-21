import { Injectable } from '@nestjs/common';
//Reglas:

// evitar duplicados
// validar intervalos
// validar horarios

@Injectable()
export class PoliticaAgendamientoService {
  validarHorarioDisponible(existeCita: boolean) {
    if (existeCita) {
      throw new Error('Ya existe una cita en ese horario');
    }
  }
}
