/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { BuscarPacienteUseCase } from './buscar-paciente.usecase';

describe('BuscarPacienteUseCase', () => {
  let useCase: BuscarPacienteUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findById: jest.fn(),
    };
    useCase = new BuscarPacienteUseCase(mockRepo);
  });

  it('debería retornar el paciente si el repositorio lo encuentra', async () => {
    const pacienteFake = { documento: '12345', nombres: 'Carlos' };
    mockRepo.findById.mockResolvedValue(pacienteFake);

    const resultado = await useCase.ejecutar('12345');

    expect(mockRepo.findById).toHaveBeenCalledWith('12345');
    expect(resultado).toEqual(pacienteFake);
  });

  it('debería retornar null si el paciente no existe', async () => {
    mockRepo.findById.mockResolvedValue(null);
    const resultado = await useCase.ejecutar('999');
    expect(resultado).toBeNull();
  });
});
