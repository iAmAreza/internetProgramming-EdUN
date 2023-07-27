import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CodeRunnerService } from "./code_runner.service";
import { CreateSubmissionDto } from "./dto/create_submission.dto";
import { GetSubmissionDto } from "./dto/get_submission.dto";
import { AuthGuard } from "../common/guard/auth.guard";

@Controller("coderunner")
export class CodeRunnerController {
  constructor(private codeRunnerService: CodeRunnerService) {}
  @Post("create_submission")
  async create_submission(@Body() createSubmissionDto: CreateSubmissionDto) {
    return await this.codeRunnerService.create_submission(createSubmissionDto);
  }
  @Get("get_submission")
  async get_submission(@Body() getSubmissionDto: GetSubmissionDto) {
    return await this.codeRunnerService.get_submission(getSubmissionDto);
  }
  @UseGuards(AuthGuard)
  @Get("get_languages")
  async get_languages() {
    return await this.codeRunnerService.get_languages();
  }
}
