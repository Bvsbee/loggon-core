import { Injectable, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AWSService {
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

  /*this.s3.getObject(
    { Bucket: this.AWS_S3_BUCKET, Key: this.configService.get('S3_SECRET_ACCESS_KEY') || '' },
    function (error, data) {
      if (error != null) {
        alert("Failed to retrieve an object: " + error);
      } else {
        alert("Loaded " + data.ContentLength + " bytes");
        // do something with data.Body
      }
    }

  );*/
}