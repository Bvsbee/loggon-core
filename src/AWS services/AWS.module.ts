import { Module } from '@nestjs/common';
import {AWSController} from './AWS.controller';
import {AWSService} from './AWS.service';
//import { Product } from 'src/product/product.entity';


@Module({
  imports: [],
  controllers: [AWSController],
  providers: [AWSService],
})
export class AWSModule {}
