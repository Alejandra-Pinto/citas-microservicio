import { Inject, Injectable } from '@nestjs/common';
import { Cita } from '../../domain/entities/cita.entity';
import type { CitaRepository } from '../../domain/repositories/cita.repository';
import { PoliticaAgendamientoService } from '../../domain/services/politica-agendamiento.service';
import { CrearCitaDto } from '../dto/crear-cita.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class CrearCitaManualUseCase {
  constructor(
    @Inject('CitaRepository')
    private readonly citaRepository: CitaRepository,

    private readonly politica: PoliticaAgendamientoService,
  ) {}

  async ejecutar(dto: CrearCitaDto) {
    const existe = await this.citaRepository.existeCitaEnHorario(
      dto.especialistaId,
      dto.fechaHora,
    );

    this.politica.validarHorarioDisponible(existe);

    const cita = new Cita(
      randomUUID(),
      dto.pacienteId,
      dto.especialistaId,
      new Date(dto.fechaHora),
    );

    await this.citaRepository.guardar(cita);

    return cita;
  }
}
