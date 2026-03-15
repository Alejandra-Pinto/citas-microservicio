import { Especialista } from '../entities/especialista.entity';

export abstract class EspecialistaRepository {
  abstract save(especialista: Especialista): Promise<void>;
  abstract findAll(): Promise<Especialista[]>;
  abstract findById(id: string): Promise<Especialista | null>;
  abstract update(especialista: Especialista): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
