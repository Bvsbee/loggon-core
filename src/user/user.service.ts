import { Body, Inject, Injectable, Param } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './Data-Transfer-Objects/CreateUserDto';

@Injectable()
export class UserService {
  constructor(
    @Inject(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const regex = '';
  }

}
