import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { config } from 'dotenv';
const delta = config({
  path: ['.env.local', '.env'],
});
if (delta.error) {
  console.error('Error loading config');
}

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Game Clicker')
    .setDescription('Game clicker service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(helmet());

  app.enableCors({
    methods: 'GET,POST',
    origin: ['*'],
  });

  await app.listen(8010);
}
bootstrap();
