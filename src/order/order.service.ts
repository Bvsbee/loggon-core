import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderItem } from './order.entity';
import { CartService } from '../cart/cart.service';
import { User } from '../user/user.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    private cartService: CartService,
  ) {}

  async checkout(user: User) {
    const cart = await this.cartService.getCart(user);
    if (!cart || cart.items.length === 0) throw new Error('Cart is empty');

    const order = this.orderRepo.create({
      user,
      subtotal: cart.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
      tax:
        0.1 *
        cart.items.reduce(
          (sum, item) => sum + item.product.price * item.quantity,
          0,
        ),
      shipping: 5.99,
      total: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      orderItems: [],
    });
    order.total = order.subtotal + order.tax + order.shipping;

    order.orderItems = cart.items.map((cartItem) =>
      this.orderItemRepo.create({
        order,
        product: cartItem.product,
        quantity: cartItem.quantity,
        price: cartItem.product.price,
      }),
    );
    await this.orderRepo.save(order);
    await this.cartService.clearCart(user);
    return order;
  }
}
