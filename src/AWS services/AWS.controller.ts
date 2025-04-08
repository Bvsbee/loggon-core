import {
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { AWSService } from './AWS.service';
  
  
  @Controller()
  export class AWSController {
    constructor(private readonly appService: AWSService) {}
  
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
      return this.appService.uploadFile(file);
    }

    /*@Get(':key')
 async getFileUrl(@Param('key') key: string) {
    return this.appService.getFileUrl(key);
  }*/

    /*@Get('/signed-url/:key')
  async getSingedUrl(@Param('key') key: string) {
    return this.dmsService.getPresignedSignedUrl(key);
  }*/
    
  }