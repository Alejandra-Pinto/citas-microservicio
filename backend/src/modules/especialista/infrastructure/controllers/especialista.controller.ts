import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrearEspecialistaUseCase } from '../../application/use-cases/crear-especialista.usecase';
import { ListarEspecialistasUseCase } from '../../application/use-cases/listar-especialista.usecase';
import { CrearEspecialistaDto } from '../../application/dto/crear-especialista.dto';
import { Roles } from 'nest-keycloak-connect';

@Controller('especialistas')
export class EspecialistaController {
  constructor(
    private readonly crearEspecialista: CrearEspecialistaUseCase,
    private readonly listarEspecialistas: ListarEspecialistasUseCase,
  ) {}

  @Post()
  @Roles({ roles: ['ADMIN'] })
  async crear(@Body() dto: CrearEspecialistaDto) {
    return this.crearEspecialista.ejecutar(dto);
  }

  @Get()
  @Roles({ roles: ['ADMIN', 'ESPECIALISTA', 'PACIENTE'] })
  async listar() {
    return this.listarEspecialistas.ejecutar();
  }
}
