/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ListarPacientesUseCase } from './listar-pacientes.usecase';

describe('ListarPacientesUseCase', () => {
  let useCase: ListarPacientesUseCase;
  let mockRepo: any;

  beforeEach(() => {
    mockRepo = {
      findAll: jest.fn(),
    };
    useCase = new ListarPacientesUseCase(mockRepo);
  });

  it('debería retornar un arreglo de pacientes del repositorio', async () => {
    const listaFake = [
      { documento: '1', nombres: 'Paciente A' },
      { documento: '2', nombres: 'Paciente B' },
    ];
    mockRepo.findAll.mockResolvedValue(listaFake);

    const resultado = await useCase.ejecutar();

    expect(resultado).toHaveLength(2);
    expect(mockRepo.findAll).toHaveBeenCalled();
  });
});
