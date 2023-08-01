import {IsDate, IsDateString, IsInt, IsNotEmpty, IsOptional} from "class-validator";

export class SubmitProblemDto{
    @IsNotEmpty()
    @IsInt()
    problem_id:number;
    @IsNotEmpty()
    programming_language:string;
    @IsNotEmpty()
    source_code:string;
}