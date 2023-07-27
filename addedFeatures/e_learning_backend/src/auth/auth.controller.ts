import { Body, Controller, Get, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post("login")
  async login(@Body() loginData: LoginDto) {
    return await this.authService.login(loginData);
  }
  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
  @Post("validate_token")
  async validateToken(@Body("token") token: string) {
    // return token;
    return await this.authService.validateToken(token);
  }
}
