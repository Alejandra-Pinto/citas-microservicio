import { Inject, Injectable } from '@nestjs/common';
import type { CitaRepository } from '../../domain/repositories/cita.repository';

@Injectable()
export class ListarTodasLasCitasUseCase {
  constructor(
    @Inject('CitaRepository')
    private readonly citaRepository: CitaRepository,
  ) {}

  async ejecutar() {
    // Llamamos al método del repositorio que trae todo sin filtros
    const citas = await this.citaRepository.buscarTodas();

    if (!citas || citas.length === 0) {
      return []; // Devolvemos un array vacío si no hay nada
    }

    return citas;
  }
}
