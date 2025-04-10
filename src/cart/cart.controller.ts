import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Retrieves a user's cart by passing a User object in the request body.
  @Get()
  getCart(@Query('userId') userId: string) {
    console.log('User Id', userId);
    return this.cartService.getCart(userId);
  }

  // Adds a product to the user's cart.
  // Expects a body containing the user, productId, and quantity.
  @Post()
  addToCart(
    @Body()
    body: {
      user: User;
      productId: string;
      quantity: number;
    },
  ) {
    const { user, productId, quantity } = body;
    return this.cartService.addToCart(user, productId, quantity);
  }

  // Removes an individual cart item by its id.
  @Delete(':id')
  removeItem(@Param('id') id: string) {
    return this.cartService.removeItem(id);
  }

  // Clears a user's cart by passing a User object in the request body.
  @Delete()
  clearCart(@Body() user: User) {
    return this.cartService.clearCart(user);
  }
}
CartService;
