import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('especialistas')
export class EspecialistaOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombres: string;

  @Column()
  tipo: string;

  @Column()
  especialidad: string;

  @Column()
  intervaloAtencion: number;

  @Column()
  activo: boolean;
}
