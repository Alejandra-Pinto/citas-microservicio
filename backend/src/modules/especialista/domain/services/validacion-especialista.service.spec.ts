import { ValidacionEspecialistaService } from './validacion-especialista.service';
import { Especialista } from '../entities/especialista.entity';

describe('ValidacionEspecialistaService', () => {
  let service: ValidacionEspecialistaService;

  beforeEach(() => {
    service = new ValidacionEspecialistaService();
  });

  describe('validarDocumento', () => {
    it('debería lanzar error si el documento es vacío o corto', () => {
      expect(() => service.validarDocumento('')).toThrow(
        'El documento del especialista es obligatorio',
      );
      expect(() => service.validarDocumento('123')).toThrow(
        'El documento no es válido',
      );
    });
  });

  describe('validarCelular', () => {
    it('debería lanzar error si el celular tiene menos de 10 dígitos', () => {
      expect(() => service.validarCelular('12345')).toThrow(
        'El número de celular no es válido',
      );
    });
  });

  describe('validarActivo', () => {
    it('debería lanzar error si el especialista está inactivo', () => {
      const esp = { activo: false } as Especialista;
      expect(() => service.validarActivo(esp)).toThrow(
        'El especialista se encuentra inactivo',
      );
    });
  });

  describe('validarEspecialidad', () => {
    it('debería lanzar error si la especialidad no existe', () => {
      expect(() => service.validarEspecialidad('')).toThrow(
        'La especialidad es obligatoria',
      );
    });
  });
});
