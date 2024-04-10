import { IsNotEmpty, MaxLength, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
