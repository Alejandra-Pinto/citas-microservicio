import { Inject, Injectable } from '@nestjs/common';
import type { EspecialistaRepository } from '../../domain/repositories/especialista.repository';
import { CrearEspecialistaDto } from '../dto/crear-especialista.dto';
import { Especialista } from '../../domain/entities/especialista.entity';
import { randomUUID } from 'crypto';
import { PoliticaEspecialistaService } from '../../domain/services/politica-especialista.service';

@Injectable()
export class CrearEspecialistaUseCase {
  constructor(
    @Inject('EspecialistaRepository')
    private readonly especialistaRepository: EspecialistaRepository,
    private readonly politica: PoliticaEspecialistaService,
  ) {}

  async ejecutar(dto: CrearEspecialistaDto) {
    this.politica.validarIntervalo(dto.intervaloAtencion);
    const especialista = new Especialista(
      randomUUID(),
      dto.nombres,
      dto.tipo,
      dto.especialidad,
      dto.intervaloAtencion,
      true,
    );

    await this.especialistaRepository.save(especialista);

    return especialista;
  }
}
