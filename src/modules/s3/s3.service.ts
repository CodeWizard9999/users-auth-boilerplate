import { S3 } from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  constructor(private readonly configService: ConfigService) {}
  public async addFile(
    file: Express.Multer.File,
    s3Params?: S3.Types.PutObjectRequest,
  ): Promise<string> {
    const region = this.configService.get<string>('aws.region');
    const { filename, mimetype } = file;
    const fileKey = uuid() + filename;

    const awsS3 = new S3({
      accessKeyId: this.configService.get<string>('aws.userAccessKeyId'),
      secretAccessKey: this.configService.get<string>('aws.secretAccessKey'),
      region,
    });

    const params = {
      ...{
        ACL: 'public-read',
        ContentDisposition: 'inline',
        Bucket: this.configService.get<string>('aws.s3BucketName'),
        Key: fileKey,
        Body: fs.createReadStream(file.path),
        ContentType: mimetype,
      },
      ...s3Params,
    };

    await awsS3.upload(params).promise();

    return `https://${params.Bucket}.s3.${region}.amazonaws.com/${fileKey}`;
  }
}
