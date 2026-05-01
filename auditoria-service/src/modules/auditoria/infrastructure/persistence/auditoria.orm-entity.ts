import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
