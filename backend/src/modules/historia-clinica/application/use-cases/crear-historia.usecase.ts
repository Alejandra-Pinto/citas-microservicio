/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Inject } from '@nestjs/common';
import { HistoriaClinica } from '../../domain/entities/historia-clinica.entity';
import type { HistoriaClinicaRepository } from '../../domain/repositories/historia-clinica.repository';
import { CrearHistoriaDto } from '../dto/crear-historia.dto';
import { randomUUID } from 'crypto';
import { ClientProxy } from '@nestjs/microservices';
import type { CitaPort } from '../../domain/ports/cita.port';
import type { EspecialistaPort } from '../../domain/ports/especialista.port';
import type { PacientePort } from '../../domain/ports/paciente.port';

@Injectable()
export class CrearHistoriaUseCase {
  constructor(
    @Inject('HistoriaClinicaRepository')
    private readonly repository: HistoriaClinicaRepository,
    @Inject('CitaPort')
    private readonly citaPort: CitaPort,
    @Inject('EspecialistaPort')
    private readonly especialistaPort: EspecialistaPort,
    @Inject('PacientePort')
    private readonly pacientePort: PacientePort,
    @Inject('AUDITORIA_SERVICE')
    private readonly client: ClientProxy,
  ) {}

  async ejecutar(dto: CrearHistoriaDto): Promise<HistoriaClinica> {
    const existeCita = await this.citaPort.obtenerPorId(dto.citaId);
    if (!existeCita) {
      throw new Error('La cita no existe');
    }

    const existeProfesional = await this.especialistaPort.obtenerPorId(
      dto.especialistaId,
    );
    if (!existeProfesional) {
      throw new Error('Especialista no válido');
    }

    const existePaciente = await this.pacientePort.obtenerPorId(dto.pacienteId);
    if (!existePaciente) {
      throw new Error('Paciente no válido');
    }

    const historia = new HistoriaClinica(
      randomUUID(),
      dto.citaId,
      dto.pacienteId,
      dto.especialistaId,
      new Date(),
      dto.descripcion,
    );

    await this.repository.guardar(historia);

    this.client.emit('historia_creada', {
      historiaId: historia.id,
      citaId: historia.citaId,
      pacienteId: historia.pacienteId,
      especialistaId: historia.profesionalId,
      descripcion: historia.descripcion,
      fecha: historia.fechaHora,
    });

    return historia;
  }
}
