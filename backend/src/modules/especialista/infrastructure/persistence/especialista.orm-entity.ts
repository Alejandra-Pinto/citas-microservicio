import { Entity, Column, PrimaryColumn } from 'typeorm';
import {
  Especialidad,
  TipoProfesional,
} from '../../domain/entities/especialista.entity';

@Entity('especialistas')
export class EspecialistaOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  nombres: string;

  @Column({
    type: 'enum',
    enum: TipoProfesional,
  })
  tipo: string;

  @Column({
    type: 'enum',
    enum: Especialidad,
  })
  especialidad: string;

  @Column()
  intervaloAtencion: number;

  @Column()
  activo: boolean;
}
