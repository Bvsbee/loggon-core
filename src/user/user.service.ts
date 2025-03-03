import { Body, ConflictException, Inject, Injectable, Param } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './Data-Transfer-Objects/CreateUserDto';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const checkExistingUser = await this.userRepository.findOne({ where: { email }});
    if(checkExistingUser){
      throw new ConflictException("Email already in use!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email, 
      passwordHash: hashedPassword,
    });
    
    await this.userRepository.save(user);

    const token = this.jwtService.sign({ userId: user.id});

    return {
      userId: user.id,
      token,
    };
  }

}
