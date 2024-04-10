import { IsDateString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class AdminProfileDto {
  @IsDateString()
  @IsNotEmpty()
  readonly date_of_birth: Date;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly contact_number: string;
}
