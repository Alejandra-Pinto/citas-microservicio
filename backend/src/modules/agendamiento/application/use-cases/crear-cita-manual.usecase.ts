import { Inject, Injectable } from '@nestjs/common';
import { Cita, TipoCita } from '../../domain/entities/cita.entity';
import type { CitaRepository } from '../../domain/repositories/cita.repository';
import { PoliticaAgendamientoService } from '../../domain/services/politica-agendamiento.service';
import { CrearCitaDto } from '../dto/crear-cita.dto';
import { randomUUID } from 'crypto';

import type { EspecialistaPort } from '../../domain/ports/especialista.port';
import type { PacientePort } from '../../domain/ports/paciente.port';
import { DisponibilidadAgendamientoService } from '../../domain/services/disponibilidad-agendamiento.service';

@Injectable()
export class CrearCitaManualUseCase {
  constructor(
    @Inject('CitaRepository')
    private readonly citaRepository: CitaRepository,

    private readonly politica: PoliticaAgendamientoService,

    private readonly disponibilidadService: DisponibilidadAgendamientoService,

    @Inject('EspecialistaPort')
    private readonly especialistaPort: EspecialistaPort,

    @Inject('PacientePort')
    private readonly pacientePort: PacientePort,
  ) {}

  async ejecutar(dto: CrearCitaDto) {
    const fechaCita = new Date(dto.fechaHora);

    //No permitir pasado
    if (fechaCita < new Date()) {
      throw new Error('No puedes agendar citas en el pasado');
    }

    //Validar paciente
    const paciente = await this.pacientePort.obtenerPorId(dto.pacienteId);
    if (!paciente) throw new Error('Paciente no existe');
    if (!paciente.activo) throw new Error('Paciente inactivo');

    //Validar especialista
    const especialista = await this.especialistaPort.obtenerPorId(
      dto.especialistaId,
    );
    if (!especialista) throw new Error('Especialista no existe');
    if (!especialista.activo) throw new Error('Especialista inactivo');

    //Calcular duración (AJUSTADO)
    const duracionNueva = this.calcularDuracion(
      dto.tipo,
      especialista.intervaloAtencion,
    );

    //Validar horario dentro del rango permitido (8:00 - 18:00)
    if (!this.disponibilidadService.esHorarioValido(fechaCita, duracionNueva)) {
      throw new Error('Las citas solo pueden agendarse entre 8:00 y 18:00');
    }

    //Traer citas del día
    const fecha = fechaCita.toISOString().split('T')[0];

    const citas = await this.citaRepository.buscarPorProfesionalYFecha(
      dto.especialistaId,
      fecha,
    );

    //Validar conflicto (USANDO SERVICE 🔥)
    const conflicto = this.disponibilidadService.existeConflicto(
      fechaCita,
      duracionNueva,
      citas,
    );
    if (conflicto) {
      throw new Error('Horario no disponible');
    }

    //Crear cita
    const cita = new Cita(
      randomUUID(),
      dto.pacienteId,
      dto.especialistaId,
      fechaCita,
      duracionNueva,
      dto.tipo,
      'PROGRAMADA',
    );

    await this.citaRepository.guardar(cita);
    return cita;
  }

  private calcularDuracion(tipo: TipoCita, intervaloBase: number): number {
    if (tipo === TipoCita.PRIMERA_VEZ) {
      return intervaloBase + 10;
    }
    return intervaloBase;
  }
}
