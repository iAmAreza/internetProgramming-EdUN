import {IsOptional} from "class-validator";

export class CreateCourseDto{
    name:string;
    description:string;
    @IsOptional()
    youtube_playlist_url:string;
}