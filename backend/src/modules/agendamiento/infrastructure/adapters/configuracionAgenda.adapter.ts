import { Injectable, Inject } from '@nestjs/common';
import { ConfiguracionPort } from '../../domain/ports/configuracionAgenda.port';
import type { ConfiguracionRepository } from '../../../administrador/domain/repositories/configuracion.repository';

@Injectable()
export class ConfiguracionAdapter implements ConfiguracionPort {
  constructor(
    @Inject('ConfiguracionRepository')
    private readonly repo: ConfiguracionRepository,
  ) {}

  async obtenerConfiguracion(): Promise<{
    horaInicio: number;
    horaFin: number;
    diasAtencion: number[];
  }> {
    const config = await this.repo.obtener();

    if (!config) {
      throw new Error('No hay configuración de agenda definida');
    }

    return {
      horaInicio: parseInt(config.horaInicio.split(':')[0]),
      horaFin: parseInt(config.horaFin.split(':')[0]),
      diasAtencion: config.diasAtencion.map((d) => parseInt(d)),
    };
  }
}
