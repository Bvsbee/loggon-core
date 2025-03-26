import { IsEmail, IsString, IsNotEmpty, isNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}