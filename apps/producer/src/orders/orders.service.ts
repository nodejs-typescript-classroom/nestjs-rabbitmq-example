import {
  Inject,
  Injectable,
  Logger,
  OnApplicationBootstrap,
  RequestTimeoutException,
} from '@nestjs/common';
import { OrderDto } from './order.dto';
import CONSTANTS from '../constants';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, TimeoutError, catchError, timeout } from 'rxjs';
@Injectable()
export class OrdersService implements OnApplicationBootstrap {
  private logger: Logger = new Logger(OrdersService.name);
  constructor(
    @Inject(CONSTANTS.ORDER_SERVICE)
    private readonly rabbitmqClient: ClientProxy,
  ) {}
  async onApplicationBootstrap() {
    try {
      await this.rabbitmqClient.connect();
    } catch (error) {
      this.logger.error(error);
    }
  }
  placeOrder(order: OrderDto) {
    this.rabbitmqClient.emit('order-placed', order);

    return { message: 'Order Placed' };
  }
  getOrders(): Observable<OrderDto[]> {
    return this.rabbitmqClient
      .send<OrderDto[]>({ cmd: 'fetch-orders' }, {})
      .pipe(
        timeout(5000),
        catchError((err) => {
          if (err instanceof TimeoutError) {
            throw new RequestTimeoutException();
          }
          throw err;
        }),
      );
  }
}
