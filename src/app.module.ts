import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { UsersModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), UsersModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}

//Monkey Brain prevented me from pushing/pulling, my bad mike lol