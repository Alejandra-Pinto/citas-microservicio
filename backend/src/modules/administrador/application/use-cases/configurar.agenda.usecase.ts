import { Injectable } from '@nestjs/common';
import {
  EspecialistaAgendaPort,
  HorarioData,
} from '../../domain/ports/especialista-agenda.port';

@Injectable()
export class ConfigurarAgendaUseCase {
  constructor(private readonly especialistaPort: EspecialistaAgendaPort) {}

  async execute(id: string, intervalo: number, horario: HorarioData) {
    // Aquí podrías poner lógica propia del administrador si fuera necesario
    return await this.especialistaPort.actualizarConfiguracion(
      id,
      intervalo,
      horario,
    );
  }
}
