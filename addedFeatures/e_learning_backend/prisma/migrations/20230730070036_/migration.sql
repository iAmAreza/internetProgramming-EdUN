/*
  Warnings:

  - Made the column `contestProblemId` on table `ContestProblemIO` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `programming_language` to the `ContestProblemUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `source_code` to the `ContestProblemUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ContestProblemIO" DROP CONSTRAINT "ContestProblemIO_contestProblemId_fkey";

-- AlterTable
ALTER TABLE "ContestProblemIO" ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "contestProblemId" SET NOT NULL;

-- AlterTable
ALTER TABLE "ContestProblemUser" ADD COLUMN     "programming_language" TEXT NOT NULL,
ADD COLUMN     "source_code" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ContestProblemIO" ADD CONSTRAINT "ContestProblemIO_contestProblemId_fkey" FOREIGN KEY ("contestProblemId") REFERENCES "ContestProblem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
