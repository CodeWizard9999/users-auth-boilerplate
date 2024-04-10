import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto';

@Injectable()
export class CheckProfilePipe implements PipeTransform {
  transform(createUserDto: RegisterUserDto) {
    const { admin_profile, player_profile } = createUserDto;

    if (
      (admin_profile && !player_profile) ||
      (player_profile && !admin_profile)
    )
      return createUserDto;

    throw new BadRequestException(
      'One of the fields (admin_profile or player_profile) is required.',
    );
  }
}
