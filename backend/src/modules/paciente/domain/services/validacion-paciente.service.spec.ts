import { ValidacionPacienteService } from './validacion-paciente.service';
import { Paciente } from '../entities/paciente.entity';

describe('ValidacionPacienteService', () => {
  let service: ValidacionPacienteService;

  beforeEach(() => {
    service = new ValidacionPacienteService();
  });

  describe('validarDocumento', () => {
    it('debería lanzar error si el documento es vacío', () => {
      expect(() => service.validarDocumento('')).toThrow(
        'El documento del paciente es obligatorio',
      );
    });

    it('debería lanzar error si el documento tiene menos de 6 caracteres', () => {
      expect(() => service.validarDocumento('12345')).toThrow(
        'El documento no es válido',
      );
    });
  });

  describe('validarCelular', () => {
    it('debería lanzar error si el celular tiene menos de 10 caracteres', () => {
      expect(() => service.validarCelular('300123')).toThrow(
        'El número de celular no es válido',
      );
    });
  });

  describe('validarPacienteActivo', () => {
    it('debería lanzar error si el paciente está desactivado', () => {
      // Creamos un mock rápido de la entidad paciente
      const pacienteMock = { activo: false } as Paciente;
      expect(() => service.validarPacienteActivo(pacienteMock)).toThrow(
        'El paciente se encuentra inactivo',
      );
    });

    it('no debería lanzar error si el paciente está activo', () => {
      const pacienteMock = { activo: true } as Paciente;
      expect(() => service.validarPacienteActivo(pacienteMock)).not.toThrow();
    });
  });
});
