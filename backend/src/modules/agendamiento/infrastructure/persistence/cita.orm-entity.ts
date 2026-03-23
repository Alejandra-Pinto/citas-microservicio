import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TipoCita } from '../../domain/entities/cita.entity';
import { EstadoCita } from '../../domain/entities/cita.entity';
import { PacienteOrmEntity } from 'src/modules/paciente/infrastructure/persistence/paciente.orm.entity';
import { EspecialistaOrmEntity } from 'src/modules/especialista/infrastructure/persistence/especialista.orm-entity';

@Entity('citas')
export class CitaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  pacienteId: string;
  @Column()
  especialistaId: string;

  // --- RELACIONES ---
  @ManyToOne(() => PacienteOrmEntity)
  @JoinColumn({ name: 'pacienteId' }) // Le dice a TypeORM que use la columna existente
  paciente: PacienteOrmEntity;

  @ManyToOne(() => EspecialistaOrmEntity)
  @JoinColumn({ name: 'especialistaId' })
  especialista: EspecialistaOrmEntity;
  // ------------------

  @Column({ type: 'timestamp' })
  fechaHora: Date;
  @Column()
  duracion: number;
  @Column({
    type: 'enum',
    enum: TipoCita,
  })
  tipo: TipoCita;
  @Column({
    type: 'enum',
    enum: EstadoCita,
  })
  estadoCita: EstadoCita;
}
