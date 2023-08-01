import {IsDate, IsDateString, IsNotEmpty, IsOptional} from "class-validator";

export class CreateContestDto{
    @IsNotEmpty()
    name:string;
    @IsOptional()
    description:string;
    @IsNotEmpty()
    @IsDateString()
    start_time:Date;
    @IsNotEmpty()
    @IsDateString()
    end_time:Date;

}