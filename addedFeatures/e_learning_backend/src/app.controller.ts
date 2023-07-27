import {Body, Controller, Get} from '@nestjs/common';
import { AppService } from './app.service';
import {CodeRunnerService} from "./code_runner/code_runner.service";

@Controller()
export class AppController {
  constructor(private readonly codeRunnerService: CodeRunnerService) {}


}
