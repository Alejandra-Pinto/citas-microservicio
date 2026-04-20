import { Injectable, Inject } from '@nestjs/common';
import type { HistoriaClinicaRepository } from '../../domain/repositories/historia-clinica.repository';
import { HistoriaClinica } from '../../domain/entities/historia-clinica.entity';

@Injectable()
export class ListarHistoriasPacienteUseCase {
  constructor(
    @Inject('HistoriaClinicaRepository')
    private readonly repository: HistoriaClinicaRepository,
  ) {}

  async ejecutar(pacienteId: string): Promise<HistoriaClinica[]> {
    return this.repository.listarPorPaciente(pacienteId);
  }
}
