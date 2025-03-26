import {
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Matches(/^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/)
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(14)
  password: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
