/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ConfigurarAgendaEspecialistaUseCase } from './configurar-agenda-especialista.usecase';
import {
  Especialista,
  TipoProfesional,
  Especialidad,
} from '../../domain/entities/especialista.entity';
import { NotFoundException } from '@nestjs/common';

describe('ConfigurarAgendaEspecialistaUseCase', () => {
  let useCase: ConfigurarAgendaEspecialistaUseCase;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      update: jest.fn(),
    };
    useCase = new ConfigurarAgendaEspecialistaUseCase(mockRepository);
  });

  it('debería actualizar la agenda exitosamente', async () => {
    const especialista = new Especialista(
      '123',
      'Dr. Smith',
      TipoProfesional.MEDICO,
      Especialidad.QUIROPRAXIA,
      20,
      { diaSemana: ['Lunes'], horaInicio: '08:00', horaFin: '12:00' },
    );
    mockRepository.findById.mockResolvedValue(especialista);

    const nuevosHorarios = {
      diaSemana: ['Martes'],
      horaInicio: '09:00',
      horaFin: '13:00',
    };
    const resultado = await useCase.execute('123', 30, nuevosHorarios);

    expect(mockRepository.update).toHaveBeenCalled();
    expect(especialista.intervaloAtencion).toBe(30);
    expect(resultado.message).toContain('éxito');
  });

  it('debería lanzar NotFoundException si el especialista no existe', async () => {
    mockRepository.findById.mockResolvedValue(null);
    await expect(useCase.execute('999', 20, {} as any)).rejects.toThrow(
      NotFoundException,
    );
  });
});
