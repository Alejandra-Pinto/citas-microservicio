import { Injectable, NotFoundException } from '@nestjs/common';
import { EspecialistaAgendaPort } from '../../domain/ports/especialista-agenda.port';

@Injectable()
export class ObtenerAgendaEspecialistaUseCase {
  constructor(private readonly especialistaPort: EspecialistaAgendaPort) {}

  async execute(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const datos = await this.especialistaPort.obtenerPorId(id);
    if (!datos) {
      throw new NotFoundException(
        `No se encontró el especialista con ID ${id}`,
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return datos;
  }
}
