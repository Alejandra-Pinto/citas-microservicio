import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import type { ConfiguracionRepository } from '../../domain/repositories/configuracion.repository';
import { ConfiguracionAgenda } from '../../domain/entities/configuracion-agenda.entity';
import { ConfiguracionAgendaOrm } from './configuracionAgenda.orm.entity';

@Injectable()
export class ConfiguracionRepositoryImpl implements ConfiguracionRepository {
  constructor(
    @InjectRepository(ConfiguracionAgendaOrm)
    private repo: Repository<ConfiguracionAgendaOrm>,
  ) {}

  async guardar(config: ConfiguracionAgenda): Promise<void> {
    await this.repo.save(config);
  }

  async obtener(): Promise<ConfiguracionAgenda | null> {
    const data = await this.repo.find({ take: 1 });

    if (!data.length) return null;

    return new ConfiguracionAgenda(
      data[0].id,
      data[0].semanasDisponibles,
      data[0].diasAtencion,
      data[0].horaInicio,
      data[0].horaFin,
    );
  }
}
