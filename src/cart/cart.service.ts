import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartItem } from './cart.entity';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async getCart(userId: string): Promise<Cart | null> {
    // Fetch the cart based on userId
    const cart = await this.cartRepo.findOne({
      where: { user: { id: userId } }, // Searching by userId in the related User entity
      relations: ['items', 'items.product'],
    });

    return cart;
  }

  async addToCart(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart | null> {
    let cart = await this.getCart(userId);

    if (!cart) {
      cart = this.cartRepo.create({
        user: { id: userId },
        items: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      cart = await this.cartRepo.save(cart);
    }

    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new Error('Product not found');
    }

    let cartItem = cart.items.find((item) => item.product.id === productId);

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartItemRepo.create({ cart, product, quantity });
      cart.items.push(cartItem);
    }

    await this.cartItemRepo.save(cartItem);

    cart.updatedAt = new Date();
    await this.cartRepo.save(cart);

    return this.getCart(userId); // return fresh copy with relations
  }

  async cartCheckout(userId: string): Promise<string> {
    const cart = await this.getCart(userId);

    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User was not found');
    }

    if (!cart || cart.items.length === 0) {
      throw new Error('Cart is empty or does not exist');
    }

    for (const item of cart.items) {
      const product = await this.productRepo.findOne({
        where: { id: item.product.id },
      });

      if (!product) {
        throw new Error(`Product with ID ${item.product.id} not found`);
      }

      if (product.quantity < item.quantity) {
        throw new Error(`Not enough stock for product ${product.name}`);
      }

      // Subtract quantity from product stock
      product.quantity -= item.quantity;
      await this.productRepo.save(product);
    }

    // Increment user's total orders
    user.totalOrders = (user.totalOrders ?? 0) + 1;
    await this.userRepo.save(user);

    // Empty the cart after checkout
    cart.items = [];
    cart.updatedAt = new Date();
    await this.cartRepo.save(cart);

    return 'Checkout completed successfully';
  }

  async removeItem(itemId: string) {
    return this.cartItemRepo.delete(itemId);
  }

  async clearCart(user: User) {
    const cart = await this.getCart(user.id);
    if (cart) {
      await this.cartItemRepo.delete({ cart: { id: cart.id } }); // delete items only
      cart.items = [];
      cart.updatedAt = new Date();
      await this.cartRepo.save(cart);
    }
    return { message: 'Cart cleared' };
  }
}
