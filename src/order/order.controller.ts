//Controller meant for inventory(possibly orders?)
import { Controller, Post, Request } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post('checkout')
  checkout(@Request() req) {
    return this.orderService.checkout(req.user);
  }
}
