import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CrearPacienteUseCase } from '../../application/use-cases/crear-paciente.usecase';
import { ListarPacientesUseCase } from '../../application/use-cases/listar-pacientes.usecase';
import { BuscarPacienteUseCase } from './../../application/use-cases/buscar-paciente.usecase';
import { CrearPacienteDto } from '../../application/dto/crear-paciente.dto';

@Controller('pacientes')
export class PacienteController {
  constructor(
    private readonly crearPaciente: CrearPacienteUseCase,
    private readonly listarPaciente: ListarPacientesUseCase,
    private readonly buscarPaciente: BuscarPacienteUseCase,
  ) {}

  @Post()
  async crear(@Body() dto: CrearPacienteDto) {
    return this.crearPaciente.ejecutar(dto);
  }

  @Get()
  async listar() {
    return this.listarPaciente.ejecutar();
  }

  @Get(':documento')
  async buscarPorDocumento(@Param('documento') documento: string) {
    return this.buscarPaciente.ejecutar(documento);
  }
}
