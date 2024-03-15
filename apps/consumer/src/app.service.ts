import { Injectable, Logger } from '@nestjs/common';
import { OrderDto } from './order.dto';

@Injectable()
export class AppService {
  private orders: OrderDto[] = [];
  private logger: Logger = new Logger(AppService.name);
  handleOrderPlaced(order: OrderDto) {
    this.logger.log({ message: 'received a new order', order });
    this.orders.push(order);
  }

  getOrders() {
    return this.orders;
  }
}
