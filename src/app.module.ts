import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration.factory';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      load: [configuration],
    }),
    MongooseModule.forRoot(`${process.env.MONGO_HOST}/game-clicker`),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
