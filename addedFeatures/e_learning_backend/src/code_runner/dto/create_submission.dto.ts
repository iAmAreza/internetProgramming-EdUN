import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateSubmissionDto {
  // @IsString()
  // @IsNotEmpty()
  // source_code: string;
  // @IsNotEmpty()
  // @IsInt()
  // language_id: number;
  // @IsString()
  // @IsNotEmpty()
  //  input: string;
  // @IsString()
  // @IsNotEmpty()
  // expected_output: number;
  script: string;
  language: string;
  versionIndex: number;
  stdin: string;
}
