/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Cita, EstadoCita, TipoCita } from '../../domain/entities/cita.entity';
import type { CitaRepository } from '../../domain/repositories/cita.repository';
import { CrearCitaDto } from '../dto/crear-cita.dto';
import { randomUUID } from 'crypto';
import type { EspecialistaPort } from '../../domain/ports/especialista.port';
import type { PacientePort } from '../../domain/ports/paciente.port';
import { DisponibilidadAgendamientoService } from '../../domain/services/disponibilidad-agendamiento.service';

@Injectable()
@Injectable()
export class CrearCitaManualUseCase {
  constructor(
    @Inject('CitaRepository') private readonly citaRepository: CitaRepository,
    private readonly disponibilidadService: DisponibilidadAgendamientoService,
    @Inject('EspecialistaPort')
    private readonly especialistaPort: EspecialistaPort,
    @Inject('PacientePort') private readonly pacientePort: PacientePort,
  ) {}

  async ejecutar(dto: CrearCitaDto) {
    const fechaCita = new Date(dto.fechaHora);

    // 1. Validar ventana de tiempo (Configuración Global Administrador)
    const enVentana =
      await this.disponibilidadService.estaEnVentanaPermitida(fechaCita);
    if (!enVentana) {
      throw new BadRequestException(
        'La fecha seleccionada está fuera del rango permitido por la clínica',
      );
    }

    // 2. Validar paciente
    const paciente = await this.pacientePort.obtenerPorId(dto.pacienteId);
    if (!paciente || !paciente.activo) {
      throw new BadRequestException('Paciente no válido o inactivo');
    }

    // 3. Validar especialista y obtener su agenda
    const especialista = await this.especialistaPort.obtenerPorId(
      dto.especialistaId,
    );
    if (!especialista || !especialista.activo) {
      throw new BadRequestException('Especialista no disponible');
    }

    // 4. Calcular duración según tipo de cita
    const duracionNueva = this.calcularDuracion(
      dto.tipo,
      especialista.intervaloAtencion,
    );

    // 5. Validar que la hora esté dentro del HORARIO ESPECÍFICO del médico
    // Reutilizamos la lógica del servicio comparando contra el horario configurado
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const [hInicio, mInicio] = especialista.horarioAtencion.horaInicio
      .split(':')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .map(Number);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const [hFin, mFin] = especialista.horarioAtencion.horaFin
      .split(':')
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .map(Number);
    const minutosCitaInicio =
      fechaCita.getHours() * 60 + fechaCita.getMinutes();
    const minutosCitaFin = minutosCitaInicio + duracionNueva;
    const minutosLimiteInicio = hInicio * 60 + mInicio;
    const minutosLimiteFin = hFin * 60 + mFin;

    if (
      minutosCitaInicio < minutosLimiteInicio ||
      minutosCitaFin > minutosLimiteFin
    ) {
      throw new BadRequestException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `El especialista solo atiende de ${especialista.horarioAtencion.horaInicio} a ${especialista.horarioAtencion.horaFin}`,
      );
    }

    // 6. Validar conflictos con otras citas
    const fechaStr = fechaCita.toISOString().split('T')[0];
    const citasDelDia = await this.citaRepository.buscarPorProfesionalYFecha(
      dto.especialistaId,
      fechaStr,
    );
    const tieneConflicto = this.disponibilidadService.existeConflicto(
      fechaCita,
      duracionNueva,
      citasDelDia,
    );
    if (tieneConflicto) {
      throw new BadRequestException('El horario ya está ocupado por otra cita');
    }

    // 7. Crear y guardar
    const cita = new Cita(
      randomUUID(),
      dto.pacienteId,
      dto.especialistaId,
      fechaCita,
      duracionNueva,
      dto.tipo,
      EstadoCita.PROGRAMADA,
    );

    await this.citaRepository.guardar(cita);
    return cita;
  }

  private calcularDuracion(tipo: TipoCita, intervaloBase: number): number {
    return tipo === TipoCita.PRIMERA_VEZ ? intervaloBase + 10 : intervaloBase;
  }
}
