import { Module } from '@nestjs/common';
import { ProblemService } from './problem/problem.service';
import { ProblemController } from './problem/problem.controller';
import {PrismaService} from "../prisma/prisma.service";
import {CodeRunnerService} from "../code_runner/code_runner.service";


@Module({
  providers: [ProblemService,PrismaService,CodeRunnerService],
  controllers: [ProblemController],
  imports: []
})
export class ContestModule {}
