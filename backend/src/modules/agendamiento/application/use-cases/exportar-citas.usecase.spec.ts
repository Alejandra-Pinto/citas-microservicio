/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ExportarCitasUseCase } from './exportar-citas.usecase';

describe('ExportarCitasUseCase', () => {
  let useCase: ExportarCitasUseCase;
  let mockRepo: any;
  let mockExportador: any;

  beforeEach(() => {
    mockRepo = { buscarPorProfesionalYFecha: jest.fn().mockResolvedValue([]) };
    mockExportador = {
      generarExcel: jest.fn().mockResolvedValue(Buffer.from('excel-data')),
      generarPdf: jest.fn().mockResolvedValue(Buffer.from('pdf-data')),
    };
    useCase = new ExportarCitasUseCase(mockRepo, mockExportador);
  });

  it('debería llamar a generarExcel cuando el formato es excel', async () => {
    const resultado = await useCase.ejecutar('esp-1', '2026-05-10', 'excel');
    expect(mockExportador.generarExcel).toHaveBeenCalled();
    expect(resultado).toBeInstanceOf(Buffer);
  });

  it('debería llamar a generarPdf cuando el formato es pdf', async () => {
    await useCase.ejecutar('esp-1', '2026-05-10', 'pdf');
    expect(mockExportador.generarPdf).toHaveBeenCalled();
  });
});
