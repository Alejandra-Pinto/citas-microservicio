import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('historia_clinica_snapshot')
export class HistoriaClinicaSnapshotOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  citaId: string;

  @Column()
  pacienteId: string;

  @Column()
  especialistaId: string;

  @Column()
  fecha: Date;

  @Column('text')
  descripcion: string;
}
