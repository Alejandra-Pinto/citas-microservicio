/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ConfigurarSistemaUseCase } from './configurar.sistema.usecase';
import { ConfiguracionSistema } from '../../domain/entities/configuracion-sistema.entity';

describe('ConfigurarSistemaUseCase', () => {
  let useCase: ConfigurarSistemaUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = { obtenerConfiguracionGlobal: jest.fn(), save: jest.fn() };
    useCase = new ConfigurarSistemaUseCase(mockRepo);
  });

  it('debería crear una nueva configuración si no existe la global', async () => {
    mockRepo.obtenerConfiguracionGlobal.mockResolvedValue(null);

    await useCase.execute(6);

    expect(mockRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'GLOBAL_001',
        ventanaHabilitacionSemanas: 6,
      }),
    );
  });

  it('debería actualizar la configuración existente si ya existe', async () => {
    const configExistente = new ConfiguracionSistema(
      'GLOBAL_001',
      4,
      new Date(),
    );
    mockRepo.obtenerConfiguracionGlobal.mockResolvedValue(configExistente);

    await useCase.execute(8);

    expect(configExistente.ventanaHabilitacionSemanas).toBe(8);
    expect(mockRepo.save).toHaveBeenCalledWith(configExistente);
  });
});
