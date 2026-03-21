import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EspecialistaRepository } from '../../domain/repositories/especialista.repository';
import { Especialista } from '../../domain/entities/especialista.entity';
import type {
  Especialidad,
  TipoProfesional,
} from '../../domain/entities/especialista.entity';
import { EspecialistaOrmEntity } from './especialista.orm-entity';

@Injectable()
export class EspecialistaRepositoryImpl implements EspecialistaRepository {
  constructor(
    @InjectRepository(EspecialistaOrmEntity)
    private repo: Repository<EspecialistaOrmEntity>,
  ) {}

  async save(especialista: Especialista): Promise<void> {
    const entity = this.repo.create({
      id: especialista.id,
      nombres: especialista.nombres,
      tipo: especialista.tipo,
      especialidad: especialista.especialidad,
      intervaloAtencion: especialista.intervaloAtencion,
      activo: especialista.activo,
    });

    await this.repo.save(entity);
  }

  async findAll(): Promise<Especialista[]> {
    const especialistas = await this.repo.find();

    return especialistas.map(
      (e) =>
        new Especialista(
          e.id,
          e.nombres,
          e.tipo as TipoProfesional,
          e.especialidad as Especialidad,
          e.intervaloAtencion,
          e.activo,
        ),
    );
  }

  async findById(id: string): Promise<Especialista | null> {
    const e = await this.repo.findOne({ where: { id } });

    if (!e) return null;

    return new Especialista(
      e.id,
      e.nombres,
      e.tipo as TipoProfesional,
      e.especialidad as Especialidad,
      e.intervaloAtencion,
      e.activo,
    );
  }

  async update(especialista: Especialista): Promise<void> {
    await this.repo.update(especialista.id, {
      nombres: especialista.nombres,
      tipo: especialista.tipo,
      especialidad: especialista.especialidad,
      intervaloAtencion: especialista.intervaloAtencion,
      activo: especialista.activo,
    });
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
