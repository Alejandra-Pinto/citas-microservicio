import { Injectable } from '@nestjs/common';
import { EspecialistaRepository } from '../../domain/repositories/especialista.repository';
import { Especialista } from '../../domain/entities/especialista.entity';

@Injectable()
export class EspecialistaRepositoryImpl implements EspecialistaRepository {
  private especialistas: Especialista[] = [];

  save(especialista: Especialista): Promise<void> {
    this.especialistas.push(especialista);
    return Promise.resolve();
  }

  findAll(): Promise<Especialista[]> {
    return Promise.resolve(this.especialistas);
  }

  findById(id: string): Promise<Especialista | null> {
    const especialista = this.especialistas.find((e) => e.id === id) || null;
    return Promise.resolve(especialista);
  }

  update(especialista: Especialista): Promise<void> {
    const index = this.especialistas.findIndex((e) => e.id === especialista.id);

    if (index !== -1) {
      this.especialistas[index] = especialista;
    }

    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    this.especialistas = this.especialistas.filter((e) => e.id !== id);
    return Promise.resolve();
  }
}
