import {IsEmail, IsMobilePhone, IsNotEmpty, MinLength} from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
