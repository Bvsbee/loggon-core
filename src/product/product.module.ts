import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from 'src/app.service';
import { Product } from './product.entity';
import { AppController } from 'src/app.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [AppService],
    controllers: [AppController],
    exports: [],
  })
export class ProductModule {}

