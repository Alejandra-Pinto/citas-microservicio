// administrador/application/use-cases/obtener-configuracion-sistema.usecase.ts
import { Injectable } from '@nestjs/common';
import { ConfiguracionRepository } from '../../domain/repositories/configuracion.repository';

@Injectable()
export class ObtenerConfiguracionSistemaUseCase {
  constructor(private readonly adminRepository: ConfiguracionRepository) {}

  async execute() {
    const config = await this.adminRepository.obtenerConfiguracionGlobal();

    // Si no existe, devolvemos un valor por defecto coherente
    return (
      config || {
        ventanaHabilitacionSemanas: 4,
        mensaje: 'Valores por defecto',
      }
    );
  }
}
