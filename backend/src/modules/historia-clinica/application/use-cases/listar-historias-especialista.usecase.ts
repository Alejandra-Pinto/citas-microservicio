import { Injectable, Inject } from '@nestjs/common';
import type { HistoriaClinicaRepository } from '../../domain/repositories/historia-clinica.repository';
import { HistoriaClinica } from '../../domain/entities/historia-clinica.entity';

@Injectable()
export class ListarHistoriasEspecialistaUseCase {
  constructor(
    @Inject('HistoriaClinicaRepository')
    private readonly repository: HistoriaClinicaRepository,
  ) {}

  async ejecutar(EspecialistaId: string): Promise<HistoriaClinica[]> {
    return this.repository.listarPorEspecialista(EspecialistaId);
  }
}
