import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());

  app.enableCors({
    methods: 'GET,POST',
    origin: ['*'],
  });

  await app.listen(8010);
}
bootstrap();
