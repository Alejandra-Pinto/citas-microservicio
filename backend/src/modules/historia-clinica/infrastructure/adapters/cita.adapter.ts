import * as citaRepository_1 from './../../../agendamiento/domain/repositories/cita.repository';
import { Injectable, Inject } from '@nestjs/common';
import { CitaPort } from '../../domain/ports/cita.port';
import { Cita } from 'src/modules/agendamiento/domain/entities/cita.entity';

@Injectable()
export class CitaAdapter implements CitaPort {
  constructor(
    @Inject('CitaRepository')
    private readonly citaRepository: citaRepository_1.CitaRepository,
  ) {}

  async obtenerPorId(citaId: string): Promise<{
    citaId: string;
  } | null> {
    const cita: Cita | null = await this.citaRepository.buscarPorId(citaId);
    if (!cita) return null;

    return {
      citaId: cita.id,
    };
  }
}
