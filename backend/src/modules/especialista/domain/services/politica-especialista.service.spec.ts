import { PoliticaEspecialistaService } from './politica-especialista.service';
import { Especialista } from '../entities/especialista.entity';

describe('PoliticaEspecialistaService', () => {
  let service: PoliticaEspecialistaService;

  beforeEach(() => {
    service = new PoliticaEspecialistaService();
  });

  it('debería lanzar error si el intervalo es 0 o menor', () => {
    expect(() => service.validarIntervalo(0)).toThrow(
      'El intervalo de atención debe ser mayor a 0',
    );
    expect(() => service.validarIntervalo(-5)).toThrow(
      'El intervalo de atención debe ser mayor a 0',
    );
  });

  it('debería lanzar error si el especialista está inactivo', () => {
    const espInactivo = { activo: false } as Especialista;
    expect(() => service.validarEspecialistaActivo(espInactivo)).toThrow(
      'El especialista está inactivo',
    );
  });

  it('no debería lanzar error si el especialista está activo', () => {
    const espActivo = { activo: true } as Especialista;
    expect(() => service.validarEspecialistaActivo(espActivo)).not.toThrow();
  });
});
