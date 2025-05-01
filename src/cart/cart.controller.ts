import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { CartService } from './cart.service';
import { AddToCartDto } from './create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Retrieves a user's cart by passing a User object in the request body.
  @Get()
  getCart(@Query('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  // Adds a product to the user's cart.
  // Expects a body containing the user, productId, and quantity.
  @Post()
  addToCart(
    @Body()
    body: AddToCartDto,
  ) {
    const { userId, productId, quantity } = body;

    return this.cartService.addToCart(userId, productId, quantity);
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

  @Post('orderComplete')
  cartCheckout(@Query('userId') userId: string) {
    return this.cartService.cartCheckout(userId);
  }
}
CartService;
