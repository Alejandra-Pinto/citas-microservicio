/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ObtenerConfiguracionSistemaUseCase } from './obtener.configuracion.sistema.usecase';

describe('ObtenerConfiguracionSistemaUseCase', () => {
  let useCase: ObtenerConfiguracionSistemaUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = { obtenerConfiguracionGlobal: jest.fn() };
    useCase = new ObtenerConfiguracionSistemaUseCase(mockRepo);
  });

  it('debería retornar la configuración de la base de datos si existe', async () => {
    const configFake = { ventanaHabilitacionSemanas: 10 };
    mockRepo.obtenerConfiguracionGlobal.mockResolvedValue(configFake);

    const resultado = await useCase.execute();

    expect(resultado.ventanaHabilitacionSemanas).toBe(10);
  });

  it('debería retornar los valores por defecto si no hay configuración en la BD', async () => {
    mockRepo.obtenerConfiguracionGlobal.mockResolvedValue(null);

    const resultado = (await useCase.execute()) as any;

    expect(resultado.ventanaHabilitacionSemanas).toBe(4);
    expect(resultado.mensaje).toBe('Valores por defecto');
  });
});
