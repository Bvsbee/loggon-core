import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    Param,
    Get,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { AWSService } from './AWS.service'; 
  import { ProductImage } from 'src/product/product.image.entity';
  
  
  @Controller()
  export class AWSController {
    constructor(private readonly awsService: AWSService) {}
  
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
      return this.awsService.uploadFile(file);
    }

   @Get(':key')
   getFileUrl(@Param('key') key: string) {
      const image_url = this.awsService.getFileUrl(key);
      return image_url;
    }

    @Get('/signed-url/:key')
    getSignedUrl(@Param('key') key: string) {
      const signed_url = this.awsService.getPresignedSignedUrl(key);
      return signed_url;
    }

    @Get('images')// Must be tailored for each species of wood available on the site 
    findAll(): Promise<ProductImage[]>{
      return this.awsService.findAll();
    }
    
  }