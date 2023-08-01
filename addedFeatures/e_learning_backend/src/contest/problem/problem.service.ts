import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {PrismaService} from "../../prisma/prisma.service";
import {GetProblemsOfContestDto} from "./dto/get_problem_of_contest.dto";
import {CreateProblemDto} from "./dto/create_problem.dto";
import {AddTestCaseToProblemDto} from "./dto/add_test_case_to_problem.dto";
import {Prisma} from "@prisma/client";
import {SubmitProblemDto} from "./dto/submit_problem.dto";
import {CodeRunnerService} from "../../code_runner/code_runner.service";

@Injectable()
export class ProblemService {
    constructor(private prisma_service: PrismaService, private code_runner: CodeRunnerService) {

    }

    async get_all_problem_of_contest(get_problem_of_contest_dto: GetProblemsOfContestDto) {
        try {
            const contest_data = await this.prisma_service.contest.findUniqueOrThrow({
                where: {
                    id: get_problem_of_contest_dto.contest_id
                },
                include: {
                    codingProblems: {
                        include: {
                            inputoutput: true
                        }
                    }
                }
            })
            return contest_data;
        } catch (e) {
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async get_problem_by_id() {
    }

    async create_problem(create_problem_dto: CreateProblemDto) {
        try {
            const new_problem = await this.prisma_service.contestProblem.create({
                data: {
                    problem_statement: create_problem_dto.problem_statement,
                    contest: {
                        connect: {
                            id: create_problem_dto.contest_id
                        }
                    }
                }
            })
            const promise_array = [];
            for (let i = 0; i < create_problem_dto.samples.length; i++) {
                promise_array.push(this.prisma_service.contestProblemIO.create({
                    data: {
                        input: create_problem_dto.samples[i].input,
                        output: create_problem_dto.samples[i].output,
                        contestProblem: {
                            connect: {
                                id: new_problem.id
                            }
                        }
                    }
                }))
            }
            const problem_set = await Promise.all(promise_array);

            return {
                ...new_problem,
                samples: problem_set
            }
        } catch (e) {

        }
    }

    async add_test_case_to_problem(add_test_case_to_problem_dto: AddTestCaseToProblemDto) {
        try {
            const updated_problem = await this.prisma_service.contestProblemIO.create({
                data: {
                    input: add_test_case_to_problem_dto.input,
                    output: add_test_case_to_problem_dto.output,
                    contestProblem: {
                        connect: {
                            id: add_test_case_to_problem_dto.problem_id
                        }
                    }
                }
            })
            return updated_problem
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code == "P2025") {
                    throw new HttpException("Problem Not Found", HttpStatus.NOT_FOUND)
                }

            }
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async submit_problem(submit_problem_dto: SubmitProblemDto, user_email: string) {
        try {
            const problem_data = await this.prisma_service.contestProblem.findUnique({
                where: {
                    id: submit_problem_dto.problem_id
                },
                include: {
                    inputoutput: true
                }
            })
            const promise_array = [];
            for (let i = 0; i < Math.min(problem_data.inputoutput.length, 2); i++) {
                promise_array.push(
                    this.code_runner.create_submission({
                        script: submit_problem_dto.source_code,
                        language: submit_problem_dto.programming_language,
                        stdin: problem_data.inputoutput[i].input,
                        versionIndex: 0,
                    })
                )
            }
            const judged_data = await Promise.all(promise_array);
            let verdict = true;
            judged_data.forEach((data, index) => {
                console.log(judged_data[index])
                if (judged_data[index].output != problem_data.inputoutput[index].output) {
                    verdict = false;
                }
            });
            await this.prisma_service.contestProblemUser.create({
                data: {
                    source_code: submit_problem_dto.source_code,
                    programming_language: submit_problem_dto.programming_language,
                    is_accepted: verdict,
                    contest: {
                        connect: {
                            id: problem_data.contestId,
                        }
                    },
                    problem: {
                        connect: {
                            id: problem_data.id,
                        }
                    },
                    user: {
                        connect: {
                            email: user_email,
                        }
                    }
                }
            })

            if (verdict) {
                return {
                    message: "Accepted"
                };
            } else {
                return {
                    message: "Wrong Answer"
                };
            }
        } catch (e) {
            console.log(e);
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code == "P2025") {
                    throw new HttpException("Problem Not Found", HttpStatus.NOT_FOUND)
                }
            }
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async update_problem() {
    }

    async delete_problem() {
    }
}
