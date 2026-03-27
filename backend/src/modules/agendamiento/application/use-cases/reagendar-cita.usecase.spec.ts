/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ReagendarCitaUseCase } from './reagendar-cita.usecase';
import { Cita, TipoCita } from '../../domain/entities/cita.entity';

describe('ReagendarCitaUseCase', () => {
  let useCase: ReagendarCitaUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      buscarPorId: jest.fn(),
      buscarPorProfesionalYFecha: jest.fn(),
      guardar: jest.fn(),
    };
    useCase = new ReagendarCitaUseCase(mockRepo);
  });

  it('debería lanzar error si hay solapamiento con otra cita', async () => {
    const citaExistente = new Cita(
      '1',
      'p1',
      'e1',
      new Date(),
      20,
      TipoCita.CONTROL,
    );
    const otraCita = new Cita(
      '2',
      'p2',
      'e1',
      new Date('2026-06-01T10:00:00'),
      20,
      TipoCita.CONTROL,
    );

    mockRepo.buscarPorId.mockResolvedValue(citaExistente);
    mockRepo.buscarPorProfesionalYFecha.mockResolvedValue([otraCita]);

    const nuevaFecha = new Date('2026-06-01T10:10:00'); // Choca con la cita de las 10:00
    await expect(useCase.ejecutar('1', nuevaFecha)).rejects.toThrow(
      'Horario no disponible',
    );
  });
});
