import { Injectable, Inject } from '@nestjs/common';
import type { HistoriaClinicaRepository } from '../../domain/repositories/historia-clinica.repository';
import { HistoriaClinica } from '../../domain/entities/historia-clinica.entity';

@Injectable()
export class ListarHistoriasUseCase {
  constructor(
    @Inject('HistoriaClinicaRepository')
    private readonly repository: HistoriaClinicaRepository,
  ) {}

  async ejecutar(): Promise<HistoriaClinica[]> {
    return this.repository.listarTodas();
  }
}
