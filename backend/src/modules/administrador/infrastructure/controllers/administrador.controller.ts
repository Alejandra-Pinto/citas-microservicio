import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
// Importación de Casos de Uso
import { ConfigurarAgendaUseCase } from '../../application/use-cases/configurar.agenda.usecase';
import { ConfigurarSistemaUseCase } from '../../application/use-cases/configurar.sistema.usecase';
import { ObtenerAgendaEspecialistaUseCase } from '../../application/use-cases/obtener.agenda.usecase';
import { ObtenerConfiguracionSistemaUseCase } from '../../application/use-cases/obtener.configuracion.sistema.usecase';
// Importación de DTOs
import { CrearConfiguracionDto } from '../../application/dto/crear-configuracion.dto';
import { ActualizarReglasGlobalesDto } from '../../application/dto/actualizar-reglas-globales.dto';

@Controller('administrador')
export class AdministradorController {
  constructor(
    private readonly configurarAgendaUC: ConfigurarAgendaUseCase,
    private readonly actualizarGlobalUC: ConfigurarSistemaUseCase,
    private readonly obtenerAgendaUC: ObtenerAgendaEspecialistaUseCase,
    private readonly obtenerGlobalUC: ObtenerConfiguracionSistemaUseCase,
  ) {}

  // --- RUTAS PARA ESPECIALISTAS ---

  @Get('especialista/:id/agenda')
  async verAgendaMedico(@Param('id') id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.obtenerAgendaUC.execute(id);
  }

  @Patch('especialista/:id/configurar-agenda')
  async actualizarAgendaMedico(
    @Param('id') id: string,
    @Body() dto: CrearConfiguracionDto,
  ) {
    return await this.configurarAgendaUC.execute(
      id,
      dto.intervaloAtencion,
      dto.horarioAtencion,
    );
  }

  // --- RUTAS PARA EL SISTEMA (GLOBAL) ---

  @Get('configuracion-global')
  async verConfiguracionSistema() {
    return await this.obtenerGlobalUC.execute();
  }

  @Patch('configuracion-global')
  async actualizarSistema(@Body() dto: ActualizarReglasGlobalesDto) {
    return await this.actualizarGlobalUC.execute(
      dto.ventanaHabilitacionSemanas,
    );
  }
}
