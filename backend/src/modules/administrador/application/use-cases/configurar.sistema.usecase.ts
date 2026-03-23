import { Injectable } from '@nestjs/common';
import { ConfiguracionRepository } from '../../domain/repositories/configuracion.repository';
import { ConfiguracionSistema } from '../../domain/entities/configuracion-sistema.entity';

@Injectable()
export class ConfigurarSistemaUseCase {
  constructor(private readonly adminRepository: ConfiguracionRepository) {}

  async execute(ventanaSemanas: number) {
    let config = await this.adminRepository.obtenerConfiguracionGlobal();

    if (!config) {
      config = new ConfiguracionSistema(
        'GLOBAL_001',
        ventanaSemanas,
        new Date(),
      );
    } else {
      config.actualizarVentana(ventanaSemanas);
    }

    await this.adminRepository.save(config);
  }
}
