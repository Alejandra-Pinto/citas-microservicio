import { Cita, EstadoCita, TipoCita } from './cita.entity';

describe('Cita Entity', () => {
  const fechaFutura = new Date();
  fechaFutura.setDate(fechaFutura.getDate() + 1);

  it('debería crear una cita con estado inicial PROGRAMADA', () => {
    const cita = new Cita('1', 'p1', 'e1', fechaFutura, 20, TipoCita.CONTROL);
    expect(cita.estado).toBe(EstadoCita.PROGRAMADA);
  });

  it('debería lanzar error si la duración es 0 o negativa', () => {
    expect(
      () => new Cita('1', 'p1', 'e1', fechaFutura, 0, TipoCita.CONTROL),
    ).toThrow('La duración debe ser mayor a 0');
  });

  it('debería cambiar estado a CANCELADA al ejecutar cancelar()', () => {
    const cita = new Cita('1', 'p1', 'e1', fechaFutura, 20, TipoCita.CONTROL);
    cita.cancelar();
    expect(cita.estado).toBe(EstadoCita.CANCELADA);
  });

  it('no debería permitir reagendar a una fecha pasada', () => {
    const cita = new Cita('1', 'p1', 'e1', fechaFutura, 20, TipoCita.CONTROL);
    const fechaPasada = new Date('2020-01-01');
    expect(() => cita.reagendar(fechaPasada)).toThrow(
      'No se puede reagendar a una fecha pasada',
    );
  });
});
