import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get('/users')
    getUser(): any {
        return this.orderService.getUserById(1);
    }

    @Post()
    async createOrder(@Body() orderDetails: any) {
        await this.orderService.createOrder(orderDetails);
        return { message: 'Order created and event sent to Kafka' };
    }
}
