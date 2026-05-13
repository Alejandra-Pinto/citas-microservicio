import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditoriaOrmEntity } from './modules/auditoria/infrastructure/persistence/auditoria.orm-entity';
import { AuditoriaConsumer } from './modules/auditoria/infrastructure/messaging/auditoria.consumer';
import { AuditoriaController } from './modules/auditoria/infrastructure/controllers/auditoria.controller';
import { AuditoriaService } from './modules/auditoria/application/auditoria.service';
import { HistoriaClinicaSnapshotOrmEntity } from './modules/auditoria/infrastructure/persistence/historia-clinica-snapshot.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '020406',
      database: 'auditoria_db',
      entities: [AuditoriaOrmEntity, HistoriaClinicaSnapshotOrmEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      AuditoriaOrmEntity,
      HistoriaClinicaSnapshotOrmEntity,
    ]),
  ],
  controllers: [AuditoriaConsumer, AuditoriaController],
  providers: [AuditoriaService],
})
export class AppModule {}
