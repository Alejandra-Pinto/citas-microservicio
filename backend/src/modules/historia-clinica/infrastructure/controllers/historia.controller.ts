import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';

import { CrearHistoriaUseCase } from '../../application/use-cases/crear-historia.usecase';
import { ListarHistoriasPacienteUseCase } from '../../application/use-cases/listar-historias-paciente.usecase';
import { ObtenerHistoriaPorCitaUseCase } from '../../application/use-cases/obtener-historia-por-cita.usecase';
import { ListarHistoriasUseCase } from '../../application/use-cases/listar-historias.usecase';
import { ListarHistoriasEspecialistaUseCase } from '../../application/use-cases/listar-historias-especialista.usecase';

import { CrearHistoriaDto } from '../../application/dto/crear-historia.dto';
import { Roles } from 'nest-keycloak-connect';

@Controller('historias-clinicas')
export class HistoriaClinicaController {
  constructor(
    private readonly crearHistoriaUseCase: CrearHistoriaUseCase,
    private readonly listarHistoriasPacienteUseCase: ListarHistoriasPacienteUseCase,
    private readonly obtenerHistoriaPorCitaUseCase: ObtenerHistoriaPorCitaUseCase,
    private readonly listarHistoriasEspecialistaUseCase: ListarHistoriasEspecialistaUseCase,
    private readonly listarHistoriasUseCase: ListarHistoriasUseCase,
  ) {}

  @Post()
  @Roles({ roles: ['ESPECIALISTA'] })
  async crear(@Body() dto: CrearHistoriaDto) {
    return await this.crearHistoriaUseCase.ejecutar(dto);
  }

  @Roles({ roles: ['ESPECIALISTA'] })
  @Get('cita/:citaId')
  async obtenerPorCita(@Param('citaId') citaId: string) {
    const historia = await this.obtenerHistoriaPorCitaUseCase.ejecutar(citaId);

    if (!historia) {
      throw new HttpException(
        'Historia clínica no encontrada para la cita',
        HttpStatus.NOT_FOUND,
      );
    }

    return historia;
  }

  @Roles({ roles: ['ESPECIALISTA', 'PACIENTE'] })
  @Get('paciente/:pacienteId')
  async listarPorPaciente(@Param('pacienteId') pacienteId: string) {
    return this.listarHistoriasPacienteUseCase.ejecutar(pacienteId);
  }

  @Roles({ roles: ['ESPECIALISTA'] })
  @Get()
  async listarTodas() {
    return this.listarHistoriasUseCase.ejecutar();
  }

  @Get('mis-historias')
  @Roles({ roles: ['ESPECIALISTA'] })
  async listarMisHistorias(@Req() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const profesionalId = req.user.sub;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.listarHistoriasEspecialistaUseCase.ejecutar(profesionalId);
  }
}
