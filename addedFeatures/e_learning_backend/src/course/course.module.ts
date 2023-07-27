import { Module } from "@nestjs/common";

import { PrismaService } from "../prisma/prisma.service";

import {CourseService} from "./course.service";
import {CourseController} from "./course.controller";
import { ConfigService } from "@nestjs/config";


@Module({
    controllers: [CourseController],

    providers: [CourseService, PrismaService,ConfigService],
})
export class CourseModule {}
