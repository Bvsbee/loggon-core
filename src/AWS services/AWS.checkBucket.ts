import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class checkBucketService {
    constructor() { }

    async getPreSignedURLToViewObject(bucketName: string, key: string) {
        const region = process.env.AWS_BUCKET_REGION;
        const accessKey = process.env.AWS_ACCESS_KEY;
        const secretKey = process.env.AWS_SECRET_KEY;

        try {
            const s3 = new S3({
                region: region,
                accessKeyId: accessKey,
                secretAccessKey: secretKey
            });

            let params = {
                Bucket: bucketName,
                Key: key,
                Expires: 300
            };

            return await s3.getSignedUrlPromise('getObject', params);
        } catch (error) {
            throw error;
        }
    }
}