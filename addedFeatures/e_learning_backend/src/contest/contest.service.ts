import {HttpException, HttpStatus, Injectable, Logger} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateContestDto} from "./dto/create_contest.dto";
import {arrayUnique} from "class-validator";

@Injectable()
export class ContestService {
    constructor(private prisma_service: PrismaService) {
    }

    async get_all_contest() {
        try {
            const all_contest = await this.prisma_service.contest.findMany({
                include:{
                    ContestUser:{
                        where:{
                            is_accepted:true,
                        }
                    }
                }
            });
            return all_contest;
        } catch (e) {
            Logger.error("Error in get_all_contest");
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async get_contest_by_id() {
    }

    async create_contest(create_contest_dto: CreateContestDto) {
        try {
            Logger.log("create_contest_dto ");
            Logger.log(create_contest_dto);
            const new_contest = await this.prisma_service.contest.create({
                data: {
                    name: create_contest_dto.name,
                    description: create_contest_dto.description,
                    start_time: create_contest_dto.start_time,
                    end_time: create_contest_dto.end_time
                }
            });
            return new_contest;
        } catch (e) {
            Logger.error("Error in create_contest");
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update_contest() {
    }

    async delete_contest() {
    }

    async get_scoreboard_of_contest(contest_id: string) {
        try {
            const [solution_data,contest_data] = await Promise.all([this.prisma_service.contestProblemUser.findMany({
                where: {
                    contestId: Number.parseInt(contest_id)
                },
                include: {
                    user: true,
                }
            }), this.prisma_service.contest.findUnique({
                where: {id: Number.parseInt(contest_id)},
                include:{
                    codingProblems:true,
                }
            })])
            let score_map = new Map<string, Map<number, number>>();
            for (let i = 0; i < solution_data.length; i++) {
                let user_mail = solution_data[i].user.email;
                let problem_id = solution_data[i].problemId;
                if (solution_data[i].is_accepted) {
                    let problem_id_solved = score_map.get(user_mail);
                    if(!problem_id_solved){
                        let score=new Map<number,number>();
                        score.set(problem_id,0);
                        score_map.set(user_mail,score);
                    }
                    let problem = score_map.get(user_mail).get(problem_id);
                    score_map.get(user_mail).set(problem_id, problem + 1);
                }
            }
            console.log("score map", score_map)
            let ret_data= [];
            for (let [key, value] of score_map) {
                let problem_solved = 0;
                for (let [key1, value1] of value) {
                    if (value1 > 0) {
                        problem_solved++;
                    }
                }
                ret_data.push({
                    key,
                    problem_solved
                })
            }
            return {
                solution_data:ret_data,
                contest_data
            };
        } catch (e) {
            Logger.error("Error in get_scoreboard_of_contest");
            console.log(e)
            throw new HttpException("Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
