import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfiguracionSistemaPort } from '../../domain/ports/configuracionSistema.port';
import { ConfiguracionRepository } from '../../../administrador/domain/repositories/configuracion.repository';

@Injectable()
export class ConfiguracionSistemaAdapter implements ConfiguracionSistemaPort {
  constructor(
    @Inject(ConfiguracionRepository)
    private readonly repo: ConfiguracionRepository,
  ) {}

  async obtenerConfiguracion(): Promise<{
    ventanaSemanas: number;
  }> {
    const config = await this.repo.obtenerConfiguracionGlobal();

    if (!config) {
      // En lugar de un Error genérico, usamos uno de NestJS para mejor respuesta HTTP
      throw new NotFoundException(
        'No hay configuración global definida en el sistema',
      );
    }

    // 2. Retornamos los datos tal cual los necesita el módulo de Agendamiento
    // según la entidad ConfiguracionSistema que creamos
    return {
      ventanaSemanas: config.ventanaHabilitacionSemanas,
    };
  }
}
