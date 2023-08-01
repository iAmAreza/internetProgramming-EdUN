import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ContestService} from "./contest.service";
import {CreateContestDto} from "./dto/create_contest.dto";
import {AuthGuard} from "../common/guard/auth.guard";

@UseGuards(AuthGuard)
@Controller('contest')
export class ContestController {
    constructor( private contest_service:ContestService) {}
    @Get("get_all_contest")
   async get_all_contest() {
        return await this.contest_service.get_all_contest();
    }
    @Get("get_scoreboard_of_contest")
    async get_scoreboard_of_contest(@Param('contest_id') contest_id:number) {
        console.log(contest_id);
        return await this.contest_service.get_scoreboard_of_contest(contest_id);

    }
    @Get("get_contest_by_id")
    async get_contest_by_id() {}
    @Post("create_contest")
    async create_contest(@Body() create_contest_dto:CreateContestDto) {
        return await this.contest_service.create_contest(create_contest_dto);
    }
    @Post("update_contest")
    async update_contest() {}
    @Post("delete_contest")
    async delete_contest() {}

}
