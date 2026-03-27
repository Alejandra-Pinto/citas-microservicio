/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { MarcarNoAsistioUseCase } from './noAsistida-cita.usecase';
import { Cita, EstadoCita, TipoCita } from '../../domain/entities/cita.entity';

describe('MarcarNoAsistioUseCase', () => {
  let useCase: MarcarNoAsistioUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      buscarPorId: jest.fn(),
      guardar: jest.fn(),
    };
    useCase = new MarcarNoAsistioUseCase(mockRepo);
  });

  it('debería marcar como NO_ASISTIO una cita que ya pasó', async () => {
    const fechaPasada = new Date('2020-01-01');
    const cita = new Cita('1', 'p1', 'e1', fechaPasada, 20, TipoCita.CONTROL);
    mockRepo.buscarPorId.mockResolvedValue(cita);

    const resultado = await useCase.ejecutar('1');

    expect(resultado.estado).toBe(EstadoCita.NO_ASISTIO);
    expect(mockRepo.guardar).toHaveBeenCalled();
  });

  it('debería lanzar error si la cita aún no ocurre', async () => {
    const fechaFutura = new Date();
    fechaFutura.setDate(fechaFutura.getDate() + 1);
    const cita = new Cita('1', 'p1', 'e1', fechaFutura, 20, TipoCita.CONTROL);
    mockRepo.buscarPorId.mockResolvedValue(cita);

    await expect(useCase.ejecutar('1')).rejects.toThrow(
      'La cita aún no ocurre',
    );
  });

  it('debería lanzar error si la cita ya estaba FINALIZADA', async () => {
    const cita = new Cita(
      '1',
      'p1',
      'e1',
      new Date('2020-01-01'),
      20,
      TipoCita.CONTROL,
    );
    cita.estado = EstadoCita.FINALIZADA;
    mockRepo.buscarPorId.mockResolvedValue(cita);

    await expect(useCase.ejecutar('1')).rejects.toThrow(
      'No se puede marcar como no asistió',
    );
  });
});
