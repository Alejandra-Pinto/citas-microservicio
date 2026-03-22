import { Inject, Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import type { PacienteRepository } from '../../domain/repositories/paciente.repository';
import { CrearPacienteDto } from '../dto/crear-paciente.dto';
import { Paciente } from '../../domain/entities/paciente.entity';
import { ValidacionPacienteService } from '../../domain/services/validacion-paciente.service';

@Injectable()
export class CrearPacienteUseCase {
  constructor(
    @Inject('PacienteRepository')
    private readonly pacienteRepository: PacienteRepository,
    private readonly validacion: ValidacionPacienteService,
  ) {}

  async ejecutar(dto: CrearPacienteDto) {
    // Validaciones de reglas de negocio
    this.validacion.validarDocumento(dto.documento);
    this.validacion.validarCelular(dto.celular);

    const existente = await this.pacienteRepository.findById(dto.documento);

    if (existente) {
      throw new BadRequestException('El paciente ya existe');
    }

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
