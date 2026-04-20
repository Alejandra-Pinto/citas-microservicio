import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { PacienteOrmEntity } from 'src/modules/paciente/infrastructure/persistence/paciente.orm.entity';
import { EspecialistaOrmEntity } from 'src/modules/especialista/infrastructure/persistence/especialista.orm-entity';
import { CitaOrmEntity } from 'src/modules/agendamiento/infrastructure/persistence/cita.orm-entity';

@Entity('historias_clinicas')
export class HistoriaClinicaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 🔑 FK
  @Column()
  citaId: string;

  @Column()
  pacienteId: string;

  @Column()
  profesionalId: string;

  // --- RELACIONES ---

  @ManyToOne(() => CitaOrmEntity)
  @JoinColumn({ name: 'citaId' })
  cita: CitaOrmEntity;

  @ManyToOne(() => PacienteOrmEntity)
  @JoinColumn({ name: 'pacienteId' })
  paciente: PacienteOrmEntity;

  @ManyToOne(() => EspecialistaOrmEntity)
  @JoinColumn({ name: 'profesionalId' })
  profesional: EspecialistaOrmEntity;

  // ------------------

  @Column({ type: 'timestamp' })
  fechaHora: Date;

  @Column({ type: 'text' })
  descripcion: string;
}
