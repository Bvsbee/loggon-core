import {
  Body,
  ConflictException,
  Inject,
  Injectable,
  Param,
} from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './Data-Transfer-Objects/CreateUserDto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ userId: string; token: string }> {
    const { email, password, firstName, lastName } = createUserDto;

    const checkExistingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (checkExistingUser) {
      throw new ConflictException('Email already in use!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      id: uuidv4(),
      email,
      firstName,
      lastName,
      passwordHash: hashedPassword,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.userRepository.save(user);

    const token = this.jwtService.sign({ userId: user.id });

    return {
      userId: user.id,
      token,
    };
  }
}
