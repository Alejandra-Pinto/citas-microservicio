import { DisponibilidadAgendamientoService } from './disponibilidad-agendamiento.service';
import { ConfiguracionSistemaPort } from '../ports/configuracionSistema.port';
import { Cita, TipoCita } from '../entities/cita.entity';

describe('DisponibilidadAgendamientoService', () => {
  let service: DisponibilidadAgendamientoService;
  let mockPort: Partial<ConfiguracionSistemaPort>;

  beforeEach(() => {
    mockPort = {
      obtenerConfiguracion: jest.fn().mockResolvedValue({ ventanaSemanas: 2 }),
    };
    service = new DisponibilidadAgendamientoService(
      mockPort as ConfiguracionSistemaPort,
    );
  });

  describe('existeConflicto', () => {
    it('debería retornar true si una cita se solapa con otra', () => {
      const fechaBase = new Date('2026-05-10T10:00:00Z');
      const citaExistente = new Cita(
        '1',
        'p1',
        'e1',
        fechaBase,
        30,
        TipoCita.CONTROL,
      );

      // Nueva cita a las 10:15 (choca porque la anterior dura 30 min)
      const tieneConflicto = service.existeConflicto(
        new Date('2026-05-10T10:15:00Z'),
        20,
        [citaExistente],
      );

      expect(tieneConflicto).toBe(true);
    });

    it('debería retornar false si no hay solapamiento', () => {
      const fechaBase = new Date('2026-05-10T10:00:00Z');
      const citaExistente = new Cita(
        '1',
        'p1',
        'e1',
        fechaBase,
        30,
        TipoCita.CONTROL,
      );

      // Nueva cita a las 10:30 (justo cuando termina la otra)
      const tieneConflicto = service.existeConflicto(
        new Date('2026-05-10T10:30:00Z'),
        20,
        [citaExistente],
      );

      expect(tieneConflicto).toBe(false);
    });
  });
});
