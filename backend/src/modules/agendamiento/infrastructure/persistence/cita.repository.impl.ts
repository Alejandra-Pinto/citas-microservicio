import { Injectable } from '@nestjs/common';
import { CitaRepository } from '../../domain/repositories/cita.repository';
import { Cita } from '../../domain/entities/cita.entity';

@Injectable()
export class CitaRepositoryImpl implements CitaRepository {
  private citas: Cita[] = [];

  guardar(cita: Cita): Promise<void> {
    this.citas.push(cita);
    return Promise.resolve();
  }

  buscarPorProfesionalYFecha(
    especialistaId: string,
    fecha: string,
  ): Promise<Cita[]> {
    const resultado = this.citas.filter((c) => {
      const fechaCita = new Date(c.fechaHora).toISOString().split('T')[0];

      return c.especialistaId === especialistaId && fechaCita === fecha;
    });

    return Promise.resolve(resultado);
  }

  existeCitaEnHorario(
    especialistaId: string,
    fechaHora: Date,
  ): Promise<boolean> {
    const existe = this.citas.some(
      (c) =>
        c.especialistaId === especialistaId &&
        c.fechaHora.getTime() === fechaHora.getTime(),
    );

    return Promise.resolve(existe);
  }
}
