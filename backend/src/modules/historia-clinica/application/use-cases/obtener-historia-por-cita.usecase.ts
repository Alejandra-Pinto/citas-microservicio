// src/modules/agendamiento/application/use-cases/exportar-citas.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import type { HistoriaClinicaRepository } from '../../domain/repositories/historia-clinica.repository';
import { HistoriaClinica } from '../../domain/entities/historia-clinica.entity';

@Injectable()
export class ObtenerHistoriaPorCitaUseCase {
  constructor(
    @Inject('HistoriaClinicaRepository')
    private readonly repository: HistoriaClinicaRepository,
  ) {}

  async ejecutar(citaId: string): Promise<HistoriaClinica | null> {
    return this.repository.buscarPorCita(citaId);
  }
}
