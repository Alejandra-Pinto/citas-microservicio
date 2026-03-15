import { Inject, Injectable } from '@nestjs/common';
import type { EspecialistaRepository } from '../../domain/repositories/especialista.repository';

@Injectable()
export class ListarEspecialistasUseCase {
  constructor(
    @Inject('EspecialistaRepository')
    private readonly especialistaRepository: EspecialistaRepository,
  ) {}

  async ejecutar() {
    return this.especialistaRepository.findAll();
  }
}
