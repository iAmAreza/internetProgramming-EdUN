import {Body, Controller, Get, Post, Query, Req, UseGuards} from '@nestjs/common';
import {ProblemService} from "./problem.service";
import {GetProblemsOfContestDto} from "./dto/get_problem_of_contest.dto";
import {CreateProblemDto} from "./dto/create_problem.dto";
import {AddTestCaseToProblemDto} from "./dto/add_test_case_to_problem.dto";
import {SubmitProblemDto} from "./dto/submit_problem.dto";
import {AuthGuard} from "../../common/guard/auth.guard";

@UseGuards(AuthGuard)
@Controller('problem')
export class ProblemController {
    constructor( private problem_service:ProblemService) {}
    @Post("get_all_problem_of_contest")
    async get_all_problem_of_contest(@Body() get_problem_of_contest_dto:GetProblemsOfContestDto) {
        return await this.problem_service.get_all_problem_of_contest(get_problem_of_contest_dto);
    }
    @Get("get_if_user_solved_problem")
    async get_if_user_solved_problem(@Query('problem_id') problem_id:string,@Req() req:Request) {
        return await this.problem_service.get_if_user_solved_problem(problem_id,req['user']['email']);
    }
    @Get("get_problem_by_id")
    async get_problem_by_id() {}
    @Post("create_problem")
    async create_problem( @Body() create_problem_dto:CreateProblemDto) {
       return await this.problem_service.create_problem(create_problem_dto);
    }
    @Post("add_test_case_to_problem")
    async add_test_case_to_problem(@Body() add_test_case_to_problem_dto:AddTestCaseToProblemDto) {
        return await this.problem_service.add_test_case_to_problem(add_test_case_to_problem_dto);

    }
    @Post("submit_problem")
    async submit_problem(@Req() req:Request,@Body() submit_problem_dto:SubmitProblemDto) {
        // return req;
        return await this.problem_service.submit_problem(submit_problem_dto,req['user']['email']);
    }
    async update_problem() {}
    async delete_problem() {}
}
