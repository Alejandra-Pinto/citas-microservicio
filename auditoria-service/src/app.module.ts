import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditoriaOrmEntity } from './modules/auditoria/infrastructure/persistence/auditoria.orm-entity';
import { AuditoriaConsumer } from './modules/auditoria/infrastructure/messaging/auditoria.consumer';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '020406',
      database: 'piedra_azul',
      entities: [AuditoriaOrmEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([AuditoriaOrmEntity]),
  ],
  controllers: [AuditoriaConsumer],
})
export class AppModule {}
