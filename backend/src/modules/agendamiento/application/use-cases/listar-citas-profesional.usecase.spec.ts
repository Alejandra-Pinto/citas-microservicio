/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ListarCitasProfesionalUseCase } from './listar-citas-profesional.usecase';
import { Cita, TipoCita } from '../../domain/entities/cita.entity';

describe('ListarCitasProfesionalUseCase', () => {
  let useCase: ListarCitasProfesionalUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = { buscarPorProfesionalYFecha: jest.fn() };
    useCase = new ListarCitasProfesionalUseCase(mockRepo);
  });

  it('debería lanzar error si el formato de fecha es inválido', async () => {
    await expect(useCase.ejecutar('esp-1', '10-05-2026')).rejects.toThrow(
      'Formato de fecha inválido',
    );
  });

  it('debería retornar citas ordenadas por hora', async () => {
    const citaTarde = new Cita(
      '1',
      'p1',
      'e1',
      new Date('2026-05-10T15:00:00'),
      20,
      TipoCita.CONTROL,
    );
    const citaManana = new Cita(
      '2',
      'p2',
      'e1',
      new Date('2026-05-10T08:00:00'),
      20,
      TipoCita.CONTROL,
    );

    mockRepo.buscarPorProfesionalYFecha.mockResolvedValue([
      citaTarde,
      citaManana,
    ]);

    const resultado = await useCase.ejecutar('esp-1', '2026-05-10');
    expect(resultado[0].id).toBe('2'); // La de las 8:00 debe ir primero
  });
});
