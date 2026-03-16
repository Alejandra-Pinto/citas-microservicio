import { Inject, Injectable } from '@nestjs/common';
import type { PacienteRepository } from '../../domain/repositories/paciente.repository';

@Injectable()
export class BuscarPacienteUseCase {
  constructor(
    @Inject('PacienteRepository')
    private readonly pacienteRepository: PacienteRepository,
  ) {}

  async ejecutar(documento: string) {
    return this.pacienteRepository.findById(documento);
  }
}
