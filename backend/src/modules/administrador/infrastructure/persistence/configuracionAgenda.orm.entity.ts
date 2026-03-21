import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('configuracion_agenda')
export class ConfiguracionAgendaOrm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  semanasDisponibles: number;

  @Column('simple-array')
  diasAtencion: string[];

  @Column()
  horaInicio: string;

  @Column()
  horaFin: string;

  @Column()
  intervaloMinutos: number;
}
