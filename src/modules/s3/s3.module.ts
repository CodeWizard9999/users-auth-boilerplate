import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { ConfigModule } from '@nestjs/config';
import awsConfig from 'src/config/aws.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [awsConfig],
    }),
  ],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
