import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Consumer');
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const url: string = config.get<string>('RABBITMQ_URI');
  const queue: string = config.get<string>('QUEUE_NAME');
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue: queue,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.startAllMicroservices().then(() => {
    logger.log({ message: 'Microservices listening' });
  });
}
bootstrap();
