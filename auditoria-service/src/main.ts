import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'auditoria_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();

  await app.listen(3001);

  console.log('Microservicio auditoría corriendo en puerto 3001');
}

bootstrap();
