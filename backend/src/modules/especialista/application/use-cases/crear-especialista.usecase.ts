import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import type { EspecialistaRepository } from '../../domain/repositories/especialista.repository';
import { CrearEspecialistaDto } from '../dto/crear-especialista.dto';
import { Especialista } from '../../domain/entities/especialista.entity';
import { PoliticaEspecialistaService } from '../../domain/services/politica-especialista.service';
import { ValidacionEspecialistaService } from '../../domain/services/validacion-especialista.service';

@Injectable()
export class CrearEspecialistaUseCase {
  constructor(
    @Inject('EspecialistaRepository')
    private readonly especialistaRepository: EspecialistaRepository,
    private readonly politica: PoliticaEspecialistaService,
    private readonly validacion: ValidacionEspecialistaService, // <-- inyectamos el service
  ) {}

  async ejecutar(dto: CrearEspecialistaDto) {
    //Validaciones
    this.validacion.validarDocumento(dto.id); // <-- validamos el documento
    this.validacion.validarEspecialidad(dto.especialidad); // validar especialidad

    //Política de intervalo
    this.politica.validarIntervalo(dto.intervaloAtencion);

    //Crear la entidad
    const especialista = new Especialista(
      dto.id,
      dto.nombres,
      dto.tipo,
      dto.especialidad,
      dto.intervaloAtencion,
      true,
    );

    // Comprobar existencia
    const existente = await this.especialistaRepository.findById(dto.id);

    if (existente) {
      throw new BadRequestException('El especialista ya existe');
    }
    //Guardar en repositorio
    await this.especialistaRepository.save(especialista);

    return especialista;
  }
}
