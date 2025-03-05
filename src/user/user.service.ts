import {
  Body,
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
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

    //Hashes password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Creates new user entity
    const user = this.userRepository.create({
      id: uuidv4(), //unique uuid
      email,
      firstName,
      lastName,
      passwordHash: hashedPassword,
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    //saves user to database
    await this.userRepository.save(user);

    //creates jwt payload with user info
    const payload = {
      userId: user.id,
      email: user.email,
      isAdmin: user.isAdmin
    }

    //generates jwt token
    const token = this.jwtService.sign({payload});

    return {
      userId: user.id,
      token,
    };
  }

  //method to retrieve user by id
  async findOne(userId: string): Promise<any>{
    const user = await this.userRepository.findOne({
      where: {id:userId},
    });

    if(!user){
      throw new NotFoundException('User Not Found')
    }

    //removes passwordhash from response for security
    const {passwordHash, ...result} = user;
    return result;
  }
}
