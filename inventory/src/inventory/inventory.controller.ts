import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
    constructor(private readonly inventoryService: InventoryService) {}

    @MessagePattern('order_created')
    handleOrderCreatedEvent(orderDetails: any): void {
        console.log('Received OrderCreated Evnet: ', orderDetails);

        // 재고 차감 로직 (예: 재고에서 주문 수량 차감)
        this.inventoryService.decreaseStock(orderDetails);
    }
}
