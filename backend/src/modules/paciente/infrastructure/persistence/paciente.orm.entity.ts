import { Entity, Column, PrimaryColumn } from 'typeorm';
import { GeneroEnum } from '../../domain/entities/paciente.entity';

@Entity('pacientes')
export class PacienteOrmEntity {
  @PrimaryColumn()
  documento: string;

  @Column()
  nombres: string;

  @Column()
  apellidos: string;

  @Column()
  celular: string;

  @Column({
    type: 'enum',
    enum: GeneroEnum,
  })
  genero: GeneroEnum;

  @Column({ nullable: true })
  fechaNacimiento: Date;

  @Column({ nullable: true })
  email: string;

  @Column({ default: true })
  activo: boolean;
}
