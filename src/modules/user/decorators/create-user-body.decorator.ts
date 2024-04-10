import { ValidationPipe } from '@nestjs/common';
import { CustomBody } from 'src/decorators/custom-body.decorator';
import { CheckProfilePipe } from '../pipes/check-profile.pipe';

export const RegisterUserBody = () =>
  CustomBody(
    new CheckProfilePipe(),
    new ValidationPipe({
      validateCustomDecorators: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
