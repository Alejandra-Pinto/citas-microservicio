// src/modules/agendamiento/application/use-cases/exportar-citas.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import type { CitaRepository } from '../../domain/repositories/cita.repository';
import { ExportadorCitasPort } from '../../domain/ports/exportador-citas.port';

@Injectable()
export class ExportarCitasUseCase {
  constructor(
    @Inject('CitaRepository')
    private readonly citaRepository: CitaRepository,
    // Eliminamos @Inject string porque usamos la clase abstracta como token
    private readonly exportador: ExportadorCitasPort,
  ) {}

  async ejecutar(
    especialistaId: string,
    fecha: string,
    formato: 'pdf' | 'excel',
  ): Promise<Buffer> {
    // <--- CRÍTICO: Define el tipo de retorno aquí
    const citas = await this.citaRepository.buscarPorProfesionalYFecha(
      especialistaId,
      fecha,
    );

    // El linter ahora sabe que esto devuelve un Buffer
    if (formato === 'excel') {
      return await this.exportador.generarExcel(citas);
    }

    return await this.exportador.generarPdf(citas);
  }
}
