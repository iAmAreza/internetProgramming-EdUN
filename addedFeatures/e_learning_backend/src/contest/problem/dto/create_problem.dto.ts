import {IsDate, IsDateString, IsInt, IsNotEmpty, IsOptional} from "class-validator";

export class CreateProblemDto{
    @IsNotEmpty()
    @IsInt()
    contest_id:number;
    @IsNotEmpty()
    problem_statement:string;
    @IsNotEmpty()
    samples:[
        {
            input:string;
            output:string;
        }
    ]

}