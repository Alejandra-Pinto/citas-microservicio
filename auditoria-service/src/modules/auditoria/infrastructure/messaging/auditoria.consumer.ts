/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditoriaOrmEntity } from '../persistence/auditoria.orm-entity';
import { HistoriaClinicaSnapshotOrmEntity } from '../persistence/historia-clinica-snapshot.orm-entity';

@Controller()
export class AuditoriaConsumer {
  constructor(
    @InjectRepository(AuditoriaOrmEntity)
    private readonly auditoriaRepo: Repository<AuditoriaOrmEntity>,

    @InjectRepository(HistoriaClinicaSnapshotOrmEntity)
    private readonly historiaRepo: Repository<HistoriaClinicaSnapshotOrmEntity>,
  ) {}

  @EventPattern('historia_creada')
  async handleHistoriaCreada(data: any) {
    console.log('Evento recibido:', data);

    try {
      await this.historiaRepo.save({
        id: data.historiaId,
        citaId: data.citaId,
        pacienteId: data.pacienteId,
        especialistaId: data.especialistaId,
        fecha: data.fecha,
        descripcion: data.descripcion,
      });

      await this.auditoriaRepo.save({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        historiaId: data.historiaId,
        accion: 'CREAR',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        usuario: data.especialistaId || 'sistema',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        fecha: data.fecha,
      });

      console.log('Auditoría e historia guardadas');
    } catch (error) {
      console.error('Error guardando la información:', error);
    }
  }
}
