import { Module } from '@nestjs/common';
import { ProductModule } from 'src/product/product.module';
import { UsersModule } from 'src/user/user.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ProductModule,
    CategoryModule,
    UsersModule,
    JwtModule,
    AdminModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, UserService, ProductService],
  exports: [AdminService],
})
export class AdminModule {}
