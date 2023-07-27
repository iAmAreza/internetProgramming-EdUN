import { IsNotEmpty, IsNumber } from "class-validator";

export class GetCourseDto{
    @IsNotEmpty()
    @IsNumber()
    course_id: number;
}