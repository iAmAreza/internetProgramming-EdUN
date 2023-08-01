/*
  Warnings:

  - You are about to drop the column `date` on the `Contest` table. All the data in the column will be lost.
  - You are about to drop the column `lessonId` on the `Contest` table. All the data in the column will be lost.
  - You are about to drop the `Exam` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Problem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `end_time` to the `Contest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `Contest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contest" DROP CONSTRAINT "Contest_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_contestId_fkey";

-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_examId_fkey";

-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_lessonId_fkey";

-- AlterTable
ALTER TABLE "Contest" DROP COLUMN "date",
DROP COLUMN "lessonId",
ADD COLUMN     "end_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_time" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Exam";

-- DropTable
DROP TABLE "Problem";

-- DropEnum
DROP TYPE "ProblemType";

-- CreateTable
CREATE TABLE "ContestProblemUser" (
    "id" SERIAL NOT NULL,
    "contestId" INTEGER NOT NULL,
    "problemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ContestProblemUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestProblem" (
    "id" SERIAL NOT NULL,
    "problem_statement" TEXT NOT NULL,
    "contestId" INTEGER NOT NULL,

    CONSTRAINT "ContestProblem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContestProblemIO" (
    "id" SERIAL NOT NULL,
    "input" TEXT NOT NULL,
    "output" TEXT NOT NULL,
    "contestProblemId" INTEGER,

    CONSTRAINT "ContestProblemIO_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContestProblemUser" ADD CONSTRAINT "ContestProblemUser_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestProblemUser" ADD CONSTRAINT "ContestProblemUser_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "ContestProblem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestProblemUser" ADD CONSTRAINT "ContestProblemUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestProblem" ADD CONSTRAINT "ContestProblem_contestId_fkey" FOREIGN KEY ("contestId") REFERENCES "Contest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestProblemIO" ADD CONSTRAINT "ContestProblemIO_contestProblemId_fkey" FOREIGN KEY ("contestProblemId") REFERENCES "ContestProblem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
