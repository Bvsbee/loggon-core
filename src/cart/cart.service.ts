import { Injectable } from '@nestjs/common';
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
    user: User,
    productId: string,
    quantity: number,
  ): Promise<Cart | null> {
    let cart = await this.getCart(user.id);

    if (!cart) {
      cart = this.cartRepo.create({
        user,
        items: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      cart = await this.cartRepo.save(cart);
    }

    console.log('ProductID: ', { productId });

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

    return this.getCart(user.id); // return fresh copy with relations
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
