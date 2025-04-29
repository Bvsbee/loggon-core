import { Injectable, Req, Res, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import {
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductImage } from 'src/product/product.image.entity';


@Injectable()
export class AWSService {
  constructor(@InjectRepository(ProductImage)
  private ProductImageRepository: Repository<ProductImage>,){}

  private readonly configService: ConfigService
  AWS_S3_BUCKET = 'loggonbucket';
  s3 = new AWS.S3({
    accessKeyId: 'AKIAQ4NSBLMTMLZAJDG4',
    secretAccessKey: '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',
  });

  async uploadFile(file) {
    console.log(file);
    const { originalname } = file;

    return await this.s3_upload(
      file.buffer,
      this.AWS_S3_BUCKET,
      originalname,
      file.mimetype,
    );
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'us-east-1',
      },
    };

    try {
      let s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }

  async getFileUrl(key: string) {
    return { url: `https://${this.AWS_S3_BUCKET}.s3.amazonaws.com/${key}` };
  }

  async getPresignedSignedUrl(key: string) {
    const parameters = {
      Bucket: this.AWS_S3_BUCKET, 
      Key: 'AKIAQ4NSBLMTMLZAJDG4',
      expiresIn: 60 * 60 * 24 * 7, // 7 day
    };
    try {
      
      
      
      const url = this.s3.getSignedUrl('getObject', parameters);
      return { url };
        
    } catch (error) {
      
      throw new InternalServerErrorException(error);
    }
  }

  async deleteFile(key: string) {
    const param = { 
      Bucket: this.AWS_S3_BUCKET,
      Key: key 
    }
    try {
      await this.s3.deleteObject(param).promise();
      return { message: 'File deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll(): Promise<ProductImage[]>{//Must be tailored to find all images under a given species 
    return this.ProductImageRepository.find();
  }



}