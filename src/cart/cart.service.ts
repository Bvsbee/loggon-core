import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart, CartItem } from './cart.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem) private cartItemRepo: Repository<CartItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  async getCart(user: User) {
    return this.cartRepo.findOne({
      where: { user },
      relations: ['items', 'items.product'],
    });
  }

  async addToCart(user: User, productId: string, quantity: number) {
    let cart = await this.cartRepo.findOne({
      where: { user },
      relations: ['items'],
    });
    if (!cart) {
      cart = this.cartRepo.create({
        user,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await this.cartRepo.save(cart);
    }

    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) throw new Error('Product not found');

    let cartItem = cart.items.find((item) => item.product.id === productId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartItemRepo.create({ cart, product, quantity });
      cart.items.push(cartItem);
    }
    await this.cartItemRepo.save(cartItem);
    return cart;
  }

  async removeItem(cartItemId: string) {
    return this.cartItemRepo.delete(cartItemId);
  }

  async clearCart(user: User) {
    const cart = await this.getCart(user);
    if (cart) await this.cartRepo.remove(cart);
  }
}
