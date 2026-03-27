/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ConfigurarAgendaUseCase } from './configurar.agenda.usecase';

describe('ConfigurarAgendaUseCase', () => {
  let useCase: ConfigurarAgendaUseCase;
  let mockPort: any;

  beforeEach(() => {
    mockPort = { actualizarConfiguracion: jest.fn() };
    useCase = new ConfigurarAgendaUseCase(mockPort);
  });

  it('debería delegar la actualización al puerto con los parámetros correctos', async () => {
    const horario = {
      diaSemana: ['Lunes'],
      horaInicio: '08:00',
      horaFin: '12:00',
    };

    await useCase.execute('esp-1', 20, horario);

    // Lo más importante es que los datos llegaron al puerto
    expect(mockPort.actualizarConfiguracion).toHaveBeenCalledWith(
      'esp-1',
      20,
      horario,
    );
  });
});
