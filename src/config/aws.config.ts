import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  userAccessKeyId: process.env.AWS_USER_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_USER_SECRET_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
  s3BucketName: process.env.S3_BUCKET_NAME,
}));
