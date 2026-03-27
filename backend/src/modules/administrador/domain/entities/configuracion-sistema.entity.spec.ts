import { ConfiguracionSistema } from './configuracion-sistema.entity';

describe('ConfiguracionSistema Entity', () => {
  it('debería crear una configuración válida', () => {
    const fecha = new Date();
    const config = new ConfiguracionSistema('global-id', 4, fecha);

    expect(config.ventanaHabilitacionSemanas).toBe(4);
    expect(config.id).toBe('global-id');
  });

  it('debería actualizar la ventana y la fecha de actualización', () => {
    const config = new ConfiguracionSistema('1', 2, new Date('2026-01-01'));

    config.actualizarVentana(8);

    expect(config.ventanaHabilitacionSemanas).toBe(8);
    expect(config.fechaUltimaActualizacion.getTime()).toBeGreaterThan(
      new Date('2026-01-01').getTime(),
    );
  });

  it('debería lanzar error si se intenta poner una ventana de 0 o menos', () => {
    const config = new ConfiguracionSistema('1', 4, new Date());

    expect(() => config.actualizarVentana(0)).toThrow(
      'La ventana debe ser al menos de 1 semana',
    );
    expect(() => config.actualizarVentana(-1)).toThrow(
      'La ventana debe ser al menos de 1 semana',
    );
  });
});
