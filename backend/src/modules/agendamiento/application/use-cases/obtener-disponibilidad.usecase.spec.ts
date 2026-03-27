/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ObtenerDisponibilidadUseCase } from './obtener-disponibilidad.usecase';
import { BadRequestException } from '@nestjs/common';

describe('ObtenerDisponibilidadUseCase', () => {
  let useCase: ObtenerDisponibilidadUseCase;
  let mockRepo: any;
  let mockEspecialistaPort: any;
  let mockDispService: any;

  beforeEach(() => {
    mockRepo = { buscarPorProfesionalYFecha: jest.fn().mockResolvedValue([]) };
    mockEspecialistaPort = { obtenerPorId: jest.fn() };
    mockDispService = {
      estaEnVentanaPermitida: jest.fn().mockResolvedValue(true),
      calcularHorariosDisponibles: jest.fn().mockReturnValue([new Date()]),
    };

    useCase = new ObtenerDisponibilidadUseCase(
      mockRepo,
      mockEspecialistaPort,
      mockDispService,
    );
  });

  it('debería lanzar BadRequest si el especialista no existe o está inactivo', async () => {
    mockEspecialistaPort.obtenerPorId.mockResolvedValue(null); // No existe

    await expect(useCase.ejecutar('e1', '2026-05-10')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('debería retornar la lista de horarios disponibles correctamente', async () => {
    mockEspecialistaPort.obtenerPorId.mockResolvedValue({
      activo: true,
      intervaloAtencion: 20,
      horarioAtencion: { horaInicio: '08:00', horaFin: '12:00' },
    });

    const resultado = await useCase.ejecutar('e1', '2026-05-10');

    expect(resultado).toBeInstanceOf(Array);
    expect(mockDispService.calcularHorariosDisponibles).toHaveBeenCalled();
  });

  it('debería fallar si la fecha está fuera de la ventana de tiempo permitida', async () => {
    mockDispService.estaEnVentanaPermitida.mockResolvedValue(false);

    await expect(useCase.ejecutar('e1', '2026-05-10')).rejects.toThrow(
      'La fecha solicitada no está habilitada para agendamiento',
    );
  });
});
