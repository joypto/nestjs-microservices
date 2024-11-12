import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderService } from './order/order.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly orderService: OrderService,
  ) {}

  @Get('/user')
  async getHello(): Promise<any> {
    return this.orderService.getUserById(1);
  }
}
