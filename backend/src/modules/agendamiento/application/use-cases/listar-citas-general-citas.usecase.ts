import { Inject, Injectable } from '@nestjs/common';
import type { CitaRepository } from '../../domain/repositories/cita.repository';

@Injectable()
export class ListarTodasLasCitasUseCase {
  constructor(
    @Inject('CitaRepository')
    private readonly citaRepository: CitaRepository,
  ) {}

  async ejecutar() {
    return await this.citaRepository.buscarTodas();
  }
}
