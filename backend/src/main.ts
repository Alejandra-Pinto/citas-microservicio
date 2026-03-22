import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ACTIVAR VALIDACIÓN GLOBAL PARA TODOS LOS DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // convierte JSON → DTO real
      whitelist: true, // elimina campos que no están en el DTO
      forbidNonWhitelisted: true, // lanza error si mandan campos extra
    }),
  );

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Piedra Azul')
    .setDescription('API para gestión de citas médicas')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
