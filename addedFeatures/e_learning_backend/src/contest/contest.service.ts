import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateContestDto} from "./dto/create_contest.dto";

@Injectable()
export class ContestService {
    constructor(private prisma_service:PrismaService) {}
   async get_all_contest() {
       try {
const all_contest=           await this.prisma_service.contest.findMany();
return all_contest;
       }catch (e) {
           Logger.error("Error in get_all_contest");
             throw new HttpException("Internal Server Error",HttpStatus.INTERNAL_SERVER_ERROR);
       }
   }
    async get_contest_by_id() {}
    async create_contest(create_contest_dto:CreateContestDto) {
        try {
            Logger.log("create_contest_dto ");
            Logger.log(create_contest_dto);
            const new_contest=await this.prisma_service.contest.create({
                data:{
                    name:create_contest_dto.name,
                    description:create_contest_dto.description,
                    start_time:create_contest_dto.start_time,
                    end_time:create_contest_dto.end_time
                }
            });
            return new_contest;
        }catch (e) {
            Logger.error("Error in create_contest");
            throw new HttpException("Internal Server Error",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update_contest() {}
    async delete_contest() {}

}
