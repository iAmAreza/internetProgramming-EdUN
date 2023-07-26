import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

import { AuthService } from "../../auth/auth.service";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private auth_service: AuthService) {}

  async use(req: Request, res: Response, next: () => void) {
    try {
      req["user"] = "anonymous";
      const auth_header = req.header("authorization");
      if (!!auth_header) {
        const access_token = auth_header.split(" ")[1];
        let { user_data, error } = await this.auth_service.validateToken(
          access_token,
        );
        if (error === false) {
          req["user"] = user_data;
        }
        // Logger.log(user_data,error)
        // if (error === false) {
        //
        //     req['user'] = user_data;
        // }else{
        //     let {user, found} = await this.auth_service.check_valid_token(
        //         access_token,
        //     );
        //     if (found) {
        //         req['user'] = user;
        //     }
        // }
      }
    } catch (error) {
      // error.printStackTrace("");
      Logger.error(error);
    } finally {
      next();
    }
  }
}
