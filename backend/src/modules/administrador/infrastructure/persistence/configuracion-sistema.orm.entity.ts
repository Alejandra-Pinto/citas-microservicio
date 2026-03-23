import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('configuracion_sistema')
export class ConfiguracionSistemaOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'int', default: 4 })
  ventanaHabilitacionSemanas: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaUltimaActualizacion: Date;
}
