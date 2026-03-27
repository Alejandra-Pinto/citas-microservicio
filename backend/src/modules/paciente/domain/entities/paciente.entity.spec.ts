import { Paciente, GeneroEnum } from './paciente.entity';

describe('Paciente Entity', () => {
  const datosValidos = {
    documento: '12345678',
    nombres: 'Carlos',
    apellidos: 'Restrepo',
    celular: '3001234567',
    genero: GeneroEnum.MASCULINO,
    fechaNacimiento: new Date('1990-05-15'),
  };

  it('debería crear un paciente válido', () => {
    const paciente = new Paciente(
      datosValidos.documento,
      datosValidos.nombres,
      datosValidos.apellidos,
      datosValidos.celular,
      datosValidos.genero,
      datosValidos.fechaNacimiento,
    );

    expect(paciente.nombreCompleto()).toBe('Carlos Restrepo');
    expect(paciente.activo).toBe(true);
  });

  it('debería lanzar error si el documento es muy corto', () => {
    expect(() => {
      new Paciente('12', 'A', 'B', '3001234567', GeneroEnum.OTRO);
    }).toThrow('El documento debe tener al menos 5 caracteres');
  });

  it('debería lanzar error si el celular es inválido', () => {
    expect(() => {
      new Paciente('123456', 'A', 'B', '123', GeneroEnum.OTRO);
    }).toThrow('El celular debe tener al menos 10 dígitos');
  });

  it('debería calcular la edad correctamente', () => {
    const fechaNacimiento = new Date();
    fechaNacimiento.setFullYear(fechaNacimiento.getFullYear() - 25);

    const paciente = new Paciente(
      '123456',
      'A',
      'B',
      '3001234567',
      GeneroEnum.OTRO,
      fechaNacimiento,
    );

    expect(paciente.calcularEdad()).toBe(25);
  });

  it('debería lanzar error si la fecha de nacimiento es futura', () => {
    const fechaFutura = new Date();
    fechaFutura.setFullYear(fechaFutura.getFullYear() + 1);

    expect(() => {
      new Paciente(
        '123456',
        'A',
        'B',
        '3001234567',
        GeneroEnum.OTRO,
        fechaFutura,
      );
    }).toThrow('La fecha de nacimiento no puede ser en el futuro');
  });

  it('debería cambiar el estado de activo a inactivo', () => {
    const paciente = new Paciente(
      '123456',
      'A',
      'B',
      '3001234567',
      GeneroEnum.OTRO,
    );
    paciente.desactivar();
    expect(paciente.activo).toBe(false);
  });
});
