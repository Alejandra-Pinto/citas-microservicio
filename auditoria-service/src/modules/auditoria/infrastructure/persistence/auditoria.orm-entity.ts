import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { HistoriaClinicaSnapshotOrmEntity } from './historia-clinica-snapshot.orm-entity';

@Entity('auditoria_historia')
export class AuditoriaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  historiaId: string;

  @Column()
  accion: string;

  @Column()
  usuario: string;

  @Column()
  fecha: Date;

  @ManyToOne(() => HistoriaClinicaSnapshotOrmEntity)
  @JoinColumn({ name: 'historiaId' })
  historiaClinica: HistoriaClinicaSnapshotOrmEntity;
}
