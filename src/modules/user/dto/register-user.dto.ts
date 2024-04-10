import { UserGender } from '../types/enum';
import { AdminProfileDto } from './admin-profile.dto';
import { PlayerProfileDto } from './player-profile.dto';
import {
  IsNotEmpty,
  MaxLength,
  ValidateNested,
  IsString,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RegisterUserDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsEnum(UserGender)
  @IsNotEmpty()
  readonly gender: UserGender;

  @ValidateNested()
  @Type(() => AdminProfileDto)
  readonly admin_profile: AdminProfileDto;

  @ValidateNested()
  @Type(() => PlayerProfileDto)
  readonly player_profile: PlayerProfileDto;
}
