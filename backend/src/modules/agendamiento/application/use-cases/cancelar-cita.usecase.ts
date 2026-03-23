import { Inject, Injectable } from '@nestjs/common';
import type { CitaRepository } from '../../domain/repositories/cita.repository';

@Injectable()
export class CancelarCitaUseCase {
  constructor(
    @Inject('CitaRepository')
    private readonly citaRepository: CitaRepository,
  ) {}

  async ejecutar(id: string) {
    const cita = await this.citaRepository.buscarPorId(id);

    if (!cita) {
      throw new Error('Cita no encontrada');
    }

    cita.cancelar();

    await this.citaRepository.guardar(cita);

    return cita;
  }
}
