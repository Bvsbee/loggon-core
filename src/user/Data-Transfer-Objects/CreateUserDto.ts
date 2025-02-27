import { IsNotEmpty, IsString, Matches, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @Matches(/^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/)
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(14)
  password: string;

  



}
