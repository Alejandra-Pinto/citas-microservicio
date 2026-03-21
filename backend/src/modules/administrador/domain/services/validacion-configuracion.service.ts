import { Injectable } from '@nestjs/common';
import { ConfiguracionAgenda } from '../entities/configuracion-agenda.entity';

@Injectable()
export class ValidacionConfiguracionService {
  validar(config: ConfiguracionAgenda) {
    if (config.horaInicio >= config.horaFin) {
      throw new Error('Hora inicio inválida');
    }

    if (config.semanasDisponibles <= 0) {
      throw new Error('Semanas inválidas');
    }
  }
}
