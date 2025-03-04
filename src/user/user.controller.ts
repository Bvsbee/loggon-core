import { Controller, Post, Body } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './Data-Transfer-Objects/CreateUserDto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ userId: string; token: string }> {
    return this.userService.create(createUserDto);
  }
}
