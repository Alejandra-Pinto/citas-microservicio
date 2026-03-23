import { Injectable, Inject } from '@nestjs/common';
import { EspecialistaPort } from '../../domain/ports/especialista.port';
import { Especialista } from '../../../especialista/domain/entities/especialista.entity';
import type { EspecialistaRepository } from '../../../especialista/domain/repositories/especialista.repository';

@Injectable()
export class EspecialistaAdapter implements EspecialistaPort {
  constructor(
    @Inject('EspecialistaRepository')
    private readonly especialistaRepository: EspecialistaRepository, //usar clase concreta
  ) {}

  async obtenerPorId(id: string): Promise<{
    id: string;
    intervaloAtencion: number;
    horarioAtencion: any;
    activo: boolean;
  } | null> {
    const especialista: Especialista | null =
      await this.especialistaRepository.findById(id);
    if (!especialista) return null;

    return {
      id: especialista.id,
      intervaloAtencion: especialista.intervaloAtencion,
      horarioAtencion: especialista.horarioAtencion,
      activo: especialista.activo,
    };
  }
}
