import {IsNotEmpty, IsStrongPassword, MinLength} from "class-validator";

export class UpdatePasswordDto{
    current_password: string;
    @MinLength(8)
    @IsNotEmpty()
    @IsStrongPassword()
    new_password: string;
}