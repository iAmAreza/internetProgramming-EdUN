import {IsNotEmpty} from "class-validator";

export class AddTestCaseToProblemDto{
    @IsNotEmpty()
    problem_id:number;
    @IsNotEmpty()
    input:string;
    @IsNotEmpty()
    output:string;
}