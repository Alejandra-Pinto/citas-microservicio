import { Injectable, Inject } from '@nestjs/common';
import type { ConfiguracionRepository } from '../../domain/repositories/configuracion.repository';
import { ConfigurarAgendaDto } from '../dto/crear-configuracion.dto';
import { ConfiguracionAgenda } from '../../domain/entities/configuracion-agenda.entity';
import { ValidacionConfiguracionService } from '../../domain/services/validacion-configuracion.service';

@Injectable()
export class ConfigurarAgendaUseCase {
  constructor(
    @Inject('ConfiguracionRepository')
    private readonly repo: ConfiguracionRepository,
    private readonly validator: ValidacionConfiguracionService,
  ) {}

  async ejecutar(dto: ConfigurarAgendaDto) {
    const existente = await this.repo.obtener();

    if (existente) {
      // reutilizas el mismo id
      const config = new ConfiguracionAgenda(
        existente.id,
        dto.semanasDisponibles,
        dto.diasAtencion,
        dto.horaInicio,
        dto.horaFin,
      );

      await this.repo.guardar(config);
      return config;
    }

    // si no existe, crea nueva
    const nueva = new ConfiguracionAgenda(
      crypto.randomUUID(),
      dto.semanasDisponibles,
      dto.diasAtencion,
      dto.horaInicio,
      dto.horaFin,
    );

    await this.repo.guardar(nueva);
    return nueva;
  }
}
