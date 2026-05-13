import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AuditoriaOrmEntity } from '../infrastructure/persistence/auditoria.orm-entity';

@Injectable()
export class AuditoriaService {
  constructor(
    @InjectRepository(AuditoriaOrmEntity)
    private readonly auditoriaRepo: Repository<AuditoriaOrmEntity>,
  ) {}

  async obtenerTodas() {
    return this.auditoriaRepo.find({
      order: {
        fecha: 'DESC',
      },
    });
  }
}
