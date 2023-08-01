import {IsNotEmpty} from "class-validator";

export class GetContestByIdDto{
    @IsNotEmpty()
    contest_id:string;
}