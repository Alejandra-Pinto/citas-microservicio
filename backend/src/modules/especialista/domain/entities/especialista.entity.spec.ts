import {
  Especialista,
  TipoProfesional,
  Especialidad,
  HorarioAtencion,
} from './especialista.entity';

describe('Especialista Entity', () => {
  const horarioValido: HorarioAtencion = {
    diaSemana: ['Lunes', 'Miércoles'],
    horaInicio: '08:00',
    horaFin: '12:00',
  };

  const crearEspecialistaValido = () =>
    new Especialista(
      '123',
      'Juan Pérez',
      TipoProfesional.MEDICO,
      Especialidad.TERAPIA_NEURAL,
      20,
      horarioValido,
    );

  describe('Constructor', () => {
    it('debería crear una instancia válida de Especialista', () => {
      const especialista = crearEspecialistaValido();

      expect(especialista).toBeDefined();
      expect(especialista.id).toBe('123');
      expect(especialista.activo).toBe(true); // Valor por defecto
    });

    it('debería lanzar un error si el intervalo de atención es 0', () => {
      expect(() => {
        new Especialista(
          '123',
          'Juan Pérez',
          TipoProfesional.MEDICO,
          Especialidad.TERAPIA_NEURAL,
          0,
          horarioValido,
        );
      }).toThrow('El intervalo debe ser mayor a 0');
    });

    it('debería lanzar un error si el intervalo de atención es negativo', () => {
      expect(() => {
        new Especialista(
          '123',
          'Juan Pérez',
          TipoProfesional.MEDICO,
          Especialidad.TERAPIA_NEURAL,
          -15,
          horarioValido,
        );
      }).toThrow('El intervalo debe ser mayor a 0');
    });
  });

  describe('Gestión de Estado (activar/desactivar)', () => {
    it('debería cambiar el estado a inactivo al llamar a desactivar()', () => {
      const especialista = crearEspecialistaValido();
      especialista.desactivar();
      expect(especialista.activo).toBe(false);
    });

    it('debería cambiar el estado a activo al llamar a activar()', () => {
      const especialista = crearEspecialistaValido();
      especialista.desactivar(); // Lo ponemos en false primero
      especialista.activar();
      expect(especialista.activo).toBe(true);
    });
  });

  describe('actualizarConfiguracionAgenda', () => {
    it('debería actualizar el intervalo y los horarios correctamente', () => {
      const especialista = crearEspecialistaValido();
      const nuevoHorario: HorarioAtencion = {
        diaSemana: ['Viernes'],
        horaInicio: '14:00',
        horaFin: '18:00',
      };
      const nuevoIntervalo = 40;

      especialista.actualizarConfiguracionAgenda(nuevoIntervalo, nuevoHorario);

      expect(especialista.intervaloAtencion).toBe(40);
      expect(especialista.horarioAtencion).toEqual(nuevoHorario);
      expect(especialista.horarioAtencion.diaSemana).toContain('Viernes');
    });
  });
});
