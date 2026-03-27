/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CancelarCitaUseCase } from './cancelar-cita.usecase';
import { Cita, EstadoCita, TipoCita } from '../../domain/entities/cita.entity';

describe('CancelarCitaUseCase', () => {
  let useCase: CancelarCitaUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      buscarPorId: jest.fn(),
      guardar: jest.fn(),
    };
    useCase = new CancelarCitaUseCase(mockRepo);
  });

  it('debería cancelar una cita exitosamente', async () => {
    const citaFake = new Cita(
      '1',
      'p1',
      'e1',
      new Date(),
      20,
      TipoCita.CONTROL,
    );
    mockRepo.buscarPorId.mockResolvedValue(citaFake);

    const resultado = await useCase.ejecutar('1');

    expect(resultado.estado).toBe(EstadoCita.CANCELADA);
    expect(mockRepo.guardar).toHaveBeenCalledWith(citaFake);
  });

  it('debería lanzar error si la cita no existe', async () => {
    mockRepo.buscarPorId.mockResolvedValue(null);
    await expect(useCase.ejecutar('999')).rejects.toThrow('Cita no encontrada');
  });
});
