import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './Data-Transfer-Objects/CreateUserDto';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ userId: string; token: string }> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.userService.findOne(req.user.userId);
  }
}
