import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Is invalid email' })
  readonly email: string;

  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'not less and longer than 4 and 16 chars' })
  readonly password: string;
}
