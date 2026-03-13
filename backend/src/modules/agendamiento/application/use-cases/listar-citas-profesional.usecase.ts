import { Inject, Injectable } from '@nestjs/common';
import type { CitaRepository } from '../../domain/repositories/cita.repository';

@Injectable()
export class ListarCitasProfesionalUseCase {
  constructor(
    @Inject('CitaRepository')
    private readonly citaRepository: CitaRepository,
  ) {}

  async ejecutar(especialistaId: string, fecha: string) {
    return this.citaRepository.buscarPorProfesionalYFecha(
      especialistaId,
      fecha,
    );
  }
}
