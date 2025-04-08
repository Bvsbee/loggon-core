import { forwardRef, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => CategoryModule), // Fix circular dependency
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductModule, ProductService, TypeOrmModule],
})
export class ProductModule {}
