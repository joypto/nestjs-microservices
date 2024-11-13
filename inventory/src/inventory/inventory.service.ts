import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
    decreaseStock(orderDetails: any) {
        console.log(`Decreasing stock for order: ${orderDetails.itemId}`);
    }
}
