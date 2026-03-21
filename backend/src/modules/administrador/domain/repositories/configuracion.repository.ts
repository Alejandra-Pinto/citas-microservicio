import { ConfiguracionAgenda } from '../entities/configuracion-agenda.entity';

export interface ConfiguracionRepository {
  guardar(config: ConfiguracionAgenda): Promise<void>;
  obtener(): Promise<ConfiguracionAgenda | null>;
}
