import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { Prisma } from "@prisma/client";
import { JwtService } from "@nestjs/jwt";
import * as constants from "./constants";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    try {
      const user = await this.prismaService.user.findFirstOrThrow({
        where: {
          email: email,
          password: password,
        },
      });
      const payload = { email: user.email, sub: user.id };
      return {
        id: user.id,
        email: user.email,
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      //return error;
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
          throw new HttpException({ message: "User not found" }, 404);
        }
      }
      Logger.error(error);
      throw new HttpException(
        { message: "Internal Server Error." },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateUser(access_token: string) {
    try {
      await this.jwtService.verifyAsync(access_token, {
        secret: constants.jwtConstants.secret,
      });
    } catch (error) {}
  }

  // async validateUser(email: string, password: string) {
  //     try {
  //         let user = await this.prismaService.user.findFirstOrThrow({
  //             where: {
  //                 email: email,
  //                 password: password
  //             }
  //         });
  //         user.password = undefined;
  //         return user;
  //     } catch (error) {
  //         return null
  //     }
  //
  //     // TODO: Generate a JWT and return it here
  //     // instead of the user object
  //     // return result;
  // }

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: email,
          password: password,
        },
      });
      return {
        id: user.id,
        email: user.email,
        access_token: "dummy_token",
        refresh_token: "dummy_token",
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new HttpException(
            {
              message: `User with ${email} is already registered in the system`,
            },
            404,
          );
        }
      }
      return error;
    }
  }

  async validateToken(token: string) {
    // console.log("token", token);
    try {
      const user_data = await this.jwtService.verifyAsync(token, {
        secret: constants.jwtConstants.secret,
      });
      return {
        user_data: user_data,
        error: false,
      };
    } catch (error) {
      return {
        user_data: null,
        error: true,
      };
    }
  }
}
