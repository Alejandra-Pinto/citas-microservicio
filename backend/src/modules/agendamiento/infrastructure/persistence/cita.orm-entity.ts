import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TipoCita } from '../../domain/entities/cita.entity';
import { EstadoCita } from '../../domain/entities/cita.entity';

@Entity('citas')
export class CitaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  pacienteId: string;
  @Column()
  especialistaId: string;
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
