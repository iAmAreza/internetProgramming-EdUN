import { MiddlewareConsumer, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaService } from "./prisma/prisma.service";
import { ConfigModule } from "@nestjs/config";
import { CourseService } from "./course/course.service";
import { CourseController } from "./course/course.controller";
import { CourseModule } from "./course/course.module";
import { CodeRunnerService } from "./code_runner/code_runner.service";
import { CodeRunnerController } from "./code_runner/code_runner.controller";
import { QuizController } from "./quiz/quiz.controller";
import { QuizService } from "./quiz/quiz.service";
import { AuthMiddleware } from "./common/middleware/auth.middleware";
import { AuthService } from "./auth/auth.service";

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    CourseModule,
  ],
  controllers: [
    AppController,
    CourseController,
    CodeRunnerController,
    QuizController,
  ],
  providers: [
    AuthService,
    PrismaService,
    CourseService,
    CodeRunnerService,
    QuizService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // fixme This middleware is causing some delay in every request, Fix it.
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}
