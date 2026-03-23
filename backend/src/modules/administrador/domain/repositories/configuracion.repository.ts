import { ConfiguracionSistema } from '../entities/configuracion-sistema.entity';

export abstract class ConfiguracionRepository {
  abstract obtenerConfiguracionGlobal(): Promise<ConfiguracionSistema | null>;
  abstract save(configuracion: ConfiguracionSistema): Promise<void>;
}
