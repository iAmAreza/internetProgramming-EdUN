import {Injectable, Logger} from "@nestjs/common";
import axios from "axios";
import {ConfigService} from "@nestjs/config";
import {CreateSubmissionDto} from "./dto/create_submission.dto";
import {GetSubmissionDto} from "./dto/get_submission.dto";

@Injectable()
export class CodeRunnerService {
    constructor(private configService: ConfigService) {
    }

    // async create_submission(createSubmissionDto:CreateSubmissionDto) {
    //     const {
    //         language_id,
    //         expected_output,
    //         source_code,
    //         input
    //     }=createSubmissionDto;
    //     const options = {
    //         method: 'POST',
    //         url: 'https://judge0-ce.p.rapidapi.com/submissions',
    //         params: {
    //             base64_encoded: 'true',
    //             fields: '*',
    //         },
    //         headers: {
    //             'content-type': 'application/json',
    //             'Content-Type': 'application/json',
    //             'X-RapidAPI-Key': this.configService.get('XRapidAPIKey'),
    //             'X-RapidAPI-Host': this.configService.get('XRapidAPIHost')
    //         },
    //         data: {
    //             language_id: language_id,
    //             source_code: source_code,
    //             stdin: input,
    //             expected_output: expected_output,
    //         }
    //     };
    //
    //     try {
    //         const response = await axios.request(options);
    //         return response.data;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }
    async create_submission(createSubmissionDto: CreateSubmissionDto) {
        // let temp_data="<?php echo \"hello\"; ?>";
        //     console.log(temp_data);
        //     console.log(createSubmissionDto.script)
        //     console.log(createSubmissionDto.script===temp_data)
        const options = {
            method: "POST",
            url: "https://api.jdoodle.com/v1/execute",
            params: {
                base64_encoded: false,
                fields: "*",
            },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Key": this.configService.get("XRapidAPIKey"),
                "X-RapidAPI-Host": this.configService.get("XRapidAPIHost"),
            },
            data: {
                language: createSubmissionDto.language,
                script: createSubmissionDto.script,
                stdin: createSubmissionDto.stdin,
                clientId: this.configService.get("jDoodleClientId"),
                clientSecret: this.configService.get("jDoodleClientSecret"),
            },
        };

        try {
            const response = await axios.request(options);
            // console.log(response);
            return response.data;
        } catch (error) {
            Logger.error(error['message'],"CodeRunnerService create_submission");
        }
    }
    // async submit_problem_solution(source_code:string,programming_language:string){
    //   const options = {
    //     method: "POST",
    //     url: "https://api.jdoodle.com/v1/execute",
    //     params: {
    //       base64_encoded: "true",
    //       fields: "*",
    //     },
    //     headers: {
    //       "content-type": "application/json",
    //       "Content-Type": "application/json",
    //       "X-RapidAPI-Key": this.configService.get("XRapidAPIKey"),
    //       "X-RapidAPI-Host": this.configService.get("XRapidAPIHost"),
    //     },
    //     data: {
    //       language: programming_language,
    //       script: ,
    //       stdin: createSubmissionDto.stdin,
    //       clientId: this.configService.get("jDoodleClientId"),
    //       clientSecret: this.configService.get("jDoodleClientSecret"),
    //     },
    //   };
    //
    //   try {
    //     const response = await axios.request(options);
    //     return response.data;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    async get_submission(getSubmissionDto: GetSubmissionDto) {
        const options = {
            method: "GET",
            url:
                "https://judge0-ce.p.rapidapi.com/submissions/" +
                getSubmissionDto.token,
            params: {
                base64_encoded: "true",
                fields: "*",
            },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Key": this.configService.get("XRapidAPIKey"),
                "X-RapidAPI-Host": this.configService.get("XRapidAPIHost"),
            },
        };

        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async get_languages() {
        const options = {
            method: "GET",
            url: "https://judge0-ce.p.rapidapi.com/languages",
            params: {
                base64_encoded: "false",
                fields: "*",
            },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Key": this.configService.get("XRapidAPIKey"),
                "X-RapidAPI-Host": this.configService.get("XRapidAPIHost"),
            },
        };

        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}
