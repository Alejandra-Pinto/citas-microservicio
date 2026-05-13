import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditoriaOrmEntity } from './modules/auditoria/infrastructure/persistence/auditoria.orm-entity';
import { AuditoriaConsumer } from './modules/auditoria/infrastructure/messaging/auditoria.consumer';
import { AuditoriaController } from './modules/auditoria/infrastructure/controllers/auditoria.controller';
import { AuditoriaService } from './modules/auditoria/application/auditoria.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '020406',
      database: 'auditoria_db',
      entities: [AuditoriaOrmEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([AuditoriaOrmEntity]),
  ],
  controllers: [AuditoriaConsumer, AuditoriaController],
  providers: [AuditoriaService],
})
export class AppModule {}
