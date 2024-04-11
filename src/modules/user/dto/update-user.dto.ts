import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
