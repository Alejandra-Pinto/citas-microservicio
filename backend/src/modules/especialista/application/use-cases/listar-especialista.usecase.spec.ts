/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ListarEspecialistasUseCase } from './listar-especialista.usecase';

describe('ListarEspecialistasUseCase', () => {
  let useCase: ListarEspecialistasUseCase;
  let mockRepository: any;

  beforeEach(() => {
    mockRepository = { findAll: jest.fn() };
    useCase = new ListarEspecialistasUseCase(mockRepository);
  });

  it('debería retornar una lista de especialistas', async () => {
    const listaFake = [{ id: '1' }, { id: '2' }];
    mockRepository.findAll.mockResolvedValue(listaFake);

    const resultado = await useCase.ejecutar();

    expect(resultado).toHaveLength(2);
    expect(mockRepository.findAll).toHaveBeenCalled();
  });
});
