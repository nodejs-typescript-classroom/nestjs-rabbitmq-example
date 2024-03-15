import { Module } from '@nestjs/common';
// import { ProducerController } from './producer.controller';
// import { ProducerService } from './producer.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { OrdersModule } from './orders/orders.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['./.env', './.env.producer'],
      validationSchema: Joi.object({
        RABBITMQ_URI: Joi.string().required(),
        QUEUE_NAME: Joi.string().required(),
      }),
    }),
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class ProducerModule {}
