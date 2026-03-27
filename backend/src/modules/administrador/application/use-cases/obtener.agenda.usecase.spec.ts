/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ObtenerAgendaEspecialistaUseCase } from './obtener.agenda.usecase';
import { NotFoundException } from '@nestjs/common';

describe('ObtenerAgendaEspecialistaUseCase', () => {
  let useCase: ObtenerAgendaEspecialistaUseCase;
  let mockPort: any;

  beforeEach(() => {
    mockPort = { obtenerPorId: jest.fn() };
    useCase = new ObtenerAgendaEspecialistaUseCase(mockPort);
  });

  it('debería retornar los datos del especialista si se encuentra', async () => {
    const datosFake = { id: 'esp-1', nombres: 'Dr. House' };
    mockPort.obtenerPorId.mockResolvedValue(datosFake);

    const resultado = await useCase.execute('esp-1');

    expect(resultado).toEqual(datosFake);
  });

  it('debería lanzar NotFoundException si el especialista no existe', async () => {
    mockPort.obtenerPorId.mockResolvedValue(null);

    await expect(useCase.execute('999')).rejects.toThrow(NotFoundException);
  });
});
