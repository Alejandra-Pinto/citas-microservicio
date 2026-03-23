import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EspecialistaRepository } from '../../domain/repositories/especialista.repository';
import { HorarioAtencion } from '../../domain/entities/especialista.entity';

@Injectable()
export class ConfigurarAgendaEspecialistaUseCase {
  constructor(
    @Inject('EspecialistaRepository')
    private readonly repository: EspecialistaRepository,
  ) {}

  async execute(
    id: string,
    nuevoIntervalo: number,
    nuevosHorarios: HorarioAtencion,
  ) {
    const especialista = await this.repository.findById(id);

    if (!especialista) {
      throw new NotFoundException(
        `El especialista con ID ${id} no existe en Piedra Azul`,
      );
    }

    // Ejecutamos la lógica de negocio que definimos en la entidad de dominio
    especialista.actualizarConfiguracionAgenda(nuevoIntervalo, nuevosHorarios);

    // Persistimos el cambio
    await this.repository.update(especialista);

    return {
      message: 'Configuración de agenda actualizada con éxito',
      especialistaId: especialista.id,
    };
  }
}
