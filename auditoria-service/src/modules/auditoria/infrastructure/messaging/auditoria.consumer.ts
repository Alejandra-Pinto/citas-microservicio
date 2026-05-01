/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditoriaOrmEntity } from '../persistence/auditoria.orm-entity';

@Controller()
export class AuditoriaConsumer {
  constructor(
    @InjectRepository(AuditoriaOrmEntity)
    private readonly auditoriaRepo: Repository<AuditoriaOrmEntity>,
  ) {}

  @EventPattern('historia_creada')
  async handleHistoriaCreada(data: any) {
    console.log('Evento recibido:', data);

    try {
      await this.auditoriaRepo.save({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        historiaId: data.historiaId,
        accion: 'CREAR',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        usuario: data.especialistaId || 'sistema',
        fecha: new Date(),
      });

      console.log('Auditoría guardada correctamente');
    } catch (error) {
      console.error('Error guardando auditoría:', error);
    }
  }
}
