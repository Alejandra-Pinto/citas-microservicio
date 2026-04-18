/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject, Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import type { PacienteRepository } from '../../domain/repositories/paciente.repository';
import { CrearPacienteDto } from '../dto/crear-paciente.dto';
import { Paciente } from '../../domain/entities/paciente.entity';
import { ValidacionPacienteService } from '../../domain/services/validacion-paciente.service';
import type { IdentidadRepository } from '../../domain/repositories/identidad.repository';

@Injectable()
export class CrearPacienteUseCase {
  constructor(
    @Inject('PacienteRepository')
    private readonly pacienteRepository: PacienteRepository,
    private readonly validacion: ValidacionPacienteService,
    @Inject('IdentidadRepository') // <--- Nuevo puerto
    private readonly identidadRepository: IdentidadRepository,
  ) {}

  async ejecutar(dto: CrearPacienteDto) {
    // Validaciones de reglas de negocio
    this.validacion.validarDocumento(dto.documento);
    this.validacion.validarCelular(dto.celular);

    const existente = await this.pacienteRepository.findById(dto.documento);

    if (existente) {
      throw new BadRequestException('El paciente ya existe');
    }

    // 1. Intentar crear en Keycloak
    try {
      await this.identidadRepository.crearUsuario(
        dto.documento, // El username siempre será la cédula/documento
        dto.password,
        dto.nombres,
        dto.apellidos,
        'PACIENTE',
        dto.email, // Se envía si existe, si no, llega como undefined
      );
    } catch (error: any) {
      // Si el email ya existe en Keycloak o hay error de red, aquí se detiene
      throw new BadRequestException(
        `Error en Keycloak: ${error.message || 'Error desconocido'}`,
      );
    }

    // 2. Si Keycloak fue exitoso, guardamos en SQL
    const paciente = new Paciente(
      dto.documento,
      dto.nombres,
      dto.apellidos,
      dto.celular,
      dto.generoP,
      dto.fechaNacimiento,
      dto.email,
    );

    await this.pacienteRepository.save(paciente);
    return paciente;
  }
}
