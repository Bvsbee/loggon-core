import { forwardRef, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ProductModule } from 'src/product/product.module';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    forwardRef(() => ProductModule), // Fix circular dependency
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryModule, CategoryService, TypeOrmModule],
})
export class CategoryModule {}
