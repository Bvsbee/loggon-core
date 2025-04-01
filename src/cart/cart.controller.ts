import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getCart(@Request() req) {
    return this.cartService.getCart(req.user);
  }

  @Post()
  addToCart(@Request() req, @Body() body) {
    return this.cartService.addToCart(req.user, body.productId, body.quantity);
  }

  @Delete(':id')
  removeItem(@Param('id') id: string) {
    return this.cartService.removeItem(id);
  }

  @Delete()
  clearCart(@Request() req) {
    return this.cartService.clearCart(req.user);
  }
}
