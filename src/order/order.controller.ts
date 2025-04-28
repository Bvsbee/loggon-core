//Controller meant for inventory(possibly orders?)
import { Controller, Param, Post, Request } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('checkout')
  checkout(@Param('userId') userId: string) {
    return this.orderService.checkout(userId);
  }
}
