import { Body, Controller, Get, Post } from '@nestjs/common';
import { CrearEspecialistaUseCase } from '../../application/use-cases/crear-especialista.usecase';
import { ListarEspecialistasUseCase } from '../../application/use-cases/listar-especialista.usecase';
import { CrearEspecialistaDto } from '../../application/dto/crear-especialista.dto';

@Controller('especialistas')
export class EspecialistaController {
  constructor(
    private readonly crearEspecialista: CrearEspecialistaUseCase,
    private readonly listarEspecialistas: ListarEspecialistasUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearEspecialistaDto) {
    return this.crearEspecialista.ejecutar(dto);
  }

  @Get()
  async listar() {
    return this.listarEspecialistas.ejecutar();
  }
}
