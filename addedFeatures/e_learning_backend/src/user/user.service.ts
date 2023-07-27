import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {UpdatePasswordDto} from "./dto/update_password.dto";
import {Prisma} from "@prisma/client";

@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {
    }
    async update_password(email: string, update_password_dto:UpdatePasswordDto) {
        try {
            const user_data= await this.prismaService.user.findFirstOrThrow({
                where:{
                    email: email,
                    password: update_password_dto.current_password
                }
            })
            const updated_user_data = await this.prismaService.user.update({
                where: {
                    email:user_data.email,
                },
                data:{
                    password: update_password_dto.new_password
                }
            })
        }catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {

            }
            Logger.error(error)
            throw new HttpException({ message: "Internal Server Error." }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
