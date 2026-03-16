import { Injectable } from '@nestjs/common';
import { Paciente } from './../../domain/entities/paciente.entity';
import type { PacienteRepository } from '../../domain/repositories/paciente.repository';

@Injectable()
export class PacienteRepositoryImpl implements PacienteRepository {
  private pacientes: Paciente[] = [];

  save(especialista: Paciente): Promise<void> {
    this.pacientes.push(especialista);
    return Promise.resolve();
  }

  findAll(): Promise<Paciente[]> {
    return Promise.resolve(this.pacientes);
  }

  findById(id: string): Promise<Paciente | null> {
    const pacientes = this.pacientes.find((p) => p.documento === id) || null;
    return Promise.resolve(pacientes);
  }

  update(paciente: Paciente): Promise<void> {
    const index = this.pacientes.findIndex(
      (p) => p.documento === paciente.documento,
    );

    if (index !== -1) {
      this.pacientes[index] = paciente;
    }

    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    this.pacientes = this.pacientes.filter((p) => p.documento !== id);
    return Promise.resolve();
  }
}
