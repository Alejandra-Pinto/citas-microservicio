import { Injectable, Inject } from '@nestjs/common';
import type { ConfiguracionRepository } from '../../domain/repositories/configuracion.repository';

@Injectable()
export class ObtenerConfiguracionUseCase {
  constructor(
    @Inject('ConfiguracionRepository')
    private readonly repo: ConfiguracionRepository,
  ) {}

  async ejecutar() {
    return this.repo.obtener();
  }
}
