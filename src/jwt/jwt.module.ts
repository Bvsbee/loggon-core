import { Module } from "@nestjs/common";
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]), 
        NestJwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1hr' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [JwtStrategy],
    exports: [NestJwtModule],
})
export class JwtModule {}