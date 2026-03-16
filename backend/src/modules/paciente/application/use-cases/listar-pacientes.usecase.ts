import { Inject, Injectable } from '@nestjs/common';
import type { PacienteRepository } from '../../domain/repositories/paciente.repository';

@Injectable()
export class ListarPacientesUseCase {
  constructor(
    @Inject('PacienteRepository')
    private readonly pacienteRepository: PacienteRepository,
  ) {}

  async ejecutar() {
    return this.pacienteRepository.findAll();
  }
}
