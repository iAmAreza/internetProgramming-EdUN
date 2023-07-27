import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaService } from "../prisma/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import {jwtConstants} from "./constants"
import { Passport } from "passport";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService,],
})
export class AuthModule {}
