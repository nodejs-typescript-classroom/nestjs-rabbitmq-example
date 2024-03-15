import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import CONSTANTS from '../constants';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    {
      provide: CONSTANTS.ORDER_SERVICE,
      useFactory: (configService: ConfigService) => {
        const url: string = configService.get<string>('RABBITMQ_URI');
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [url],
            queue: configService.get<string>('QUEUE_NAME'),
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class OrdersModule {}
