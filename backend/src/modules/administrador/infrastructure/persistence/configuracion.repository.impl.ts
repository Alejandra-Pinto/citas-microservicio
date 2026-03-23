import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfiguracionRepository } from '../../domain/repositories/configuracion.repository';
import { ConfiguracionSistema } from '../../domain/entities/configuracion-sistema.entity';
import { ConfiguracionSistemaOrmEntity } from './configuracion-sistema.orm.entity';

@Injectable()
export class AdministradorRepositoryImpl implements ConfiguracionRepository {
  constructor(
    @InjectRepository(ConfiguracionSistemaOrmEntity)
    private readonly repo: Repository<ConfiguracionSistemaOrmEntity>,
  ) {}

  async obtenerConfiguracionGlobal(): Promise<ConfiguracionSistema | null> {
    // Buscamos la primera (y normalmente única) configuración del sistema
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const entity = await this.repo.findOne({ where: {} });
    if (!entity) return null;

    return new ConfiguracionSistema(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      entity.id,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      entity.ventanaHabilitacionSemanas,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      entity.fechaUltimaActualizacion,
    );
  }

  async save(config: ConfiguracionSistema): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const entity = this.repo.create({
      id: config.id,
      ventanaHabilitacionSemanas: config.ventanaHabilitacionSemanas,
      fechaUltimaActualizacion: config.fechaUltimaActualizacion,
    });
    await this.repo.save(entity);
  }
}
