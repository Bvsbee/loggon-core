import { LoginDto } from 'src/user/Data-Transfer-Objects/LoginDto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRespository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {}

    //login method which authenticas a user and assigns jwt token
    async login(loginDto: LoginDto): Promise<{ userId: string; token: string }> {
        const { email, password } = loginDto;

    const user = await this.userRespository.findOne({
        where: {email}
    });

    if(!user || !(await bcrypt.compare(password, user.passwordHash ?? ''))) {
        throw new UnauthorizedException(' Invalid Credentials!')
    }

    const token = this.jwtService.sign({ 
        userId: user.id,
        email: user.email 
      });

      return {
        userId: user.id,
        token,
      };

}

//verifies if a user exists by ID
async validateUser(userId: string): Promise<any> {
    const user = await this.userRespository.findOne({
        where: { id: userId }
    });

    if (!user) {
        throw new UnauthorizedException('User Not Found');
    }

    return user;
}
}

