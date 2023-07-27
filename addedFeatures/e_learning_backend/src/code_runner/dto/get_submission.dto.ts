import {IsInt, IsNotEmpty, IsString} from "class-validator";

export class GetSubmissionDto{
    @IsString()
    @IsNotEmpty()
    token: string;

}