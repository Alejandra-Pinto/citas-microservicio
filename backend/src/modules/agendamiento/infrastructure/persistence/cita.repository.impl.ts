import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CitaRepository } from '../../domain/repositories/cita.repository';
import { Cita } from '../../domain/entities/cita.entity';
import { CitaOrmEntity } from './cita.orm-entity';

@Injectable()
export class CitaRepositoryImpl implements CitaRepository {
  constructor(
    @InjectRepository(CitaOrmEntity)
    private repo: Repository<CitaOrmEntity>,
  ) {}

  async guardar(cita: Cita): Promise<void> {
    const entity = this.repo.create({
      id: cita.id,
      pacienteId: cita.pacienteId,
      especialistaId: cita.especialistaId,
      fechaHora: cita.fechaHora,
      estado: cita.estado,
    });

    await this.repo.save(entity);
  }

  async buscarPorProfesionalYFecha(
    especialistaId: string,
    fecha: string,
  ): Promise<Cita[]> {
    const citas = await this.repo.find({
      where: {
        especialistaId,
      },
    });
    return citas
      .filter((c) => {
        const fechaCita = c.fechaHora.toISOString().split('T')[0];
        return fechaCita === fecha;
      })
      .map(
        (c) =>
          new Cita(c.id, c.pacienteId, c.especialistaId, c.fechaHora, c.estado),
      );
  }

  async existeCitaEnHorario(
    especialistaId: string,
    fechaHora: Date,
  ): Promise<boolean> {
    const count = await this.repo.count({
      where: {
        especialistaId,
        fechaHora,
      },
    });

    return count > 0;
  }
}
