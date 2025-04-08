import { Module } from '@nestjs/common';
import {AWSController} from './AWS.controller';
import {AWSService} from './AWS.service';


@Module({
  imports: [],
  controllers: [AWSController],
  providers: [AWSController],
})
export class AWSModule {}
