import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
  estado: string;
}
