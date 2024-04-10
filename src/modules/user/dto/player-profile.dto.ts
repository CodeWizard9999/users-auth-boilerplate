import { IsDateString, IsNotEmpty } from 'class-validator';

export class PlayerProfileDto {
  @IsDateString()
  @IsNotEmpty()
  readonly date_of_registration: Date;
}
