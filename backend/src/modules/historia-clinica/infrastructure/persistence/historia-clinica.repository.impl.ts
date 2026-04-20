import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { HistoriaClinicaRepository } from '../../domain/repositories/historia-clinica.repository';
import { HistoriaClinica } from '../../domain/entities/historia-clinica.entity';
import { HistoriaClinicaOrmEntity } from './historia-clinica.orm-entity';

@Injectable()
export class HistoriaClinicaRepositoryImpl implements HistoriaClinicaRepository {
  constructor(
    @InjectRepository(HistoriaClinicaOrmEntity)
    private readonly repo: Repository<HistoriaClinicaOrmEntity>,
  ) {}

  async guardar(historia: HistoriaClinica): Promise<void> {
    const entity = this.repo.create({
      id: historia.id,
      citaId: historia.citaId,
      pacienteId: historia.pacienteId,
      profesionalId: historia.profesionalId,
      fechaHora: historia.fechaHora,
      descripcion: historia.descripcion,
    });

    await this.repo.save(entity);
  }

  async buscarPorCita(citaId: string): Promise<HistoriaClinica | null> {
    const entity = await this.repo.findOne({
      where: { citaId },
      relations: ['paciente', 'profesional', 'cita'], // opcional pero útil
    });

    if (!entity) return null;

    return this.mapToDomain(entity);
  }

  async listarPorPaciente(pacienteId: string): Promise<HistoriaClinica[]> {
    const entities = await this.repo.find({
      where: { pacienteId },
      relations: ['profesional', 'cita'],
    });

    return entities.map((e) => this.mapToDomain(e));
  }

  async listarTodas(): Promise<HistoriaClinica[]> {
    const entities = await this.repo.find({
      relations: ['paciente', 'profesional', 'cita'],
      order: { fechaHora: 'DESC' },
    });

    return entities.map((e) => this.mapToDomain(e));
  }

  async listarPorEspecialista(
    profesionalId: string,
  ): Promise<HistoriaClinica[]> {
    const entities = await this.repo.find({
      where: { profesionalId },
      relations: ['paciente', 'cita'],
      order: { fechaHora: 'DESC' },
    });

    return entities.map((e) => this.mapToDomain(e));
  }

  private mapToDomain(entity: HistoriaClinicaOrmEntity): HistoriaClinica {
    return new HistoriaClinica(
      entity.id,
      entity.citaId,
      entity.pacienteId,
      entity.profesionalId,
      entity.fechaHora,
      entity.descripcion,
    );
  }
}
