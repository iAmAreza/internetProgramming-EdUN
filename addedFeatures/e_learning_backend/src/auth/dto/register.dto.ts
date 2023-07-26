import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";

export class RegisterDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @IsOptional()
  name: string;
}
