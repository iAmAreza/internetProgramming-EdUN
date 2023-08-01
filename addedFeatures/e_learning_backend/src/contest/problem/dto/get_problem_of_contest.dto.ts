import {IsDate, IsDateString, IsInt, IsNotEmpty, IsOptional} from "class-validator";

export class GetProblemsOfContestDto{
    @IsNotEmpty()
    @IsInt()
    contest_id:number;

}