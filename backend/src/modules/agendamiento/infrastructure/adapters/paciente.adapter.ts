import { Injectable, Inject } from '@nestjs/common';
import { PacientePort } from '../../domain/ports/paciente.port';
import type { PacienteRepository } from '../../../paciente/domain/repositories/paciente.repository';
import { Paciente } from '../../../paciente/domain/entities/paciente.entity';

@Injectable()
export class PacienteAdapter implements PacientePort {
  constructor(
    @Inject('PacienteRepository')
    private readonly pacienteRepository: PacienteRepository,
  ) {}

  async obtenerPorId(
    documento: string,
  ): Promise<{ documento: string; activo: boolean } | null> {
    const paciente: Paciente | null =
      await this.pacienteRepository.findById(documento);
    if (!paciente) return null;
    return {
      documento: paciente.documento,
      activo: paciente.activo,
    };
  }
}
