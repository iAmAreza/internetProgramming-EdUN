import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request["user"] === "anonymous") {
      return false;
    }
    // console.log("USER: ",request['user'].user_type)
    // return (request['user'].user_type === type_of_user.super_admin);
    return true;
  }
}
