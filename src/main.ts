import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  // Pipes configuration
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  app.enableCors();

  app.use(bodyParser.json({ limit: '50000kb' }));
  app.use(bodyParser.urlencoded({ limit: '50000kb', extended: true }));
  app.use(json());

  // servidor HTTP
  const server = app.getHttpServer();
  // timeout em milissegundos que equivale a 60segundos
  server.setTimeout(60000);

  await app.listen(port);
}
bootstrap();
