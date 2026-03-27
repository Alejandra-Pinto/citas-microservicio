/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CrearEspecialistaUseCase } from './crear-especialista.usecase';
import { BadRequestException } from '@nestjs/common';
import {
  TipoProfesional,
  Especialidad,
} from '../../domain/entities/especialista.entity';

describe('CrearEspecialistaUseCase', () => {
  let useCase: CrearEspecialistaUseCase;
  let mockRepository: any;
  let mockPolitica: any;
  let mockValidacion: any;

  beforeEach(() => {
    mockRepository = { findById: jest.fn(), save: jest.fn() };
    mockPolitica = { validarIntervalo: jest.fn() };
    mockValidacion = {
      validarDocumento: jest.fn(),
      validarEspecialidad: jest.fn(),
    };

    useCase = new CrearEspecialistaUseCase(
      mockRepository,
      mockPolitica,
      mockValidacion,
    );
  });

  it('debería crear un especialista exitosamente', async () => {
    mockRepository.findById.mockResolvedValue(null); // No existe previamente

    const dto = {
      id: '102030',
      nombres: 'Dra. Quinn',
      tipo: TipoProfesional.MEDICO,
      especialidad: Especialidad.TERAPIA_NEURAL,
      intervaloAtencion: 20,
      horarioAtencion: {
        diaSemana: ['Lunes'],
        horaInicio: '08:00',
        horaFin: '12:00',
      },
    };

    const resultado = await useCase.ejecutar(dto);

    expect(mockValidacion.validarDocumento).toHaveBeenCalledWith(dto.id);
    expect(mockRepository.save).toHaveBeenCalled();
    expect(resultado.nombres).toBe('Dra. Quinn');
  });

  it('debería lanzar BadRequestException si el especialista ya existe', async () => {
    mockRepository.findById.mockResolvedValue({ id: '102030' }); // Ya existe

    const dto = { id: '102030' } as any;
    await expect(useCase.ejecutar(dto)).rejects.toThrow(BadRequestException);
  });
});
