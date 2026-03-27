import { ObtenerCitasUseCase } from './obtener-citas.usecase';
import { EstadoCita } from '../../domain/entities/cita.entity';

describe('ObtenerCitasUseCase', () => {
  let useCase: ObtenerCitasUseCase;
  let mockRepo: any;

  const citasFalsas = [
    {
      id: '1',
      estado: EstadoCita.PROGRAMADA,
      fechaHora: new Date('2030-01-01'),
    },
    {
      id: '2',
      estado: EstadoCita.CANCELADA,
      fechaHora: new Date('2020-01-01'),
    },
    {
      id: '3',
      estado: EstadoCita.FINALIZADA,
      fechaHora: new Date('2020-01-01'),
    },
  ];

  beforeEach(() => {
    mockRepo = { buscarTodas: jest.fn().mockResolvedValue(citasFalsas) };
    useCase = new ObtenerCitasUseCase(mockRepo);
  });

  it('debería filtrar solo las citas CANCELADAS', async () => {
    const resultado = await useCase.ejecutar({ tipo: 'CANCELADAS' } as any);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].estado).toBe(EstadoCita.CANCELADA);
  });

  it('debería filtrar solo las citas PROXIMAS (programadas y fecha futura)', async () => {
    const resultado = await useCase.ejecutar({ tipo: 'PROXIMAS' } as any);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].id).toBe('1');
  });

  it('debería retornar todas las citas si el tipo es TODAS', async () => {
    const resultado = await useCase.ejecutar({ tipo: 'TODAS' } as any);
    expect(resultado).toHaveLength(3);
  });
});
