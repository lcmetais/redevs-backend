/*
  Warnings:

  - Made the column `userId` on table `UserPhoto` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "UserPhoto" DROP CONSTRAINT "UserPhoto_userId_fkey";

-- AlterTable
ALTER TABLE "UserPhoto" ALTER COLUMN "userId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "UserPhoto" ADD CONSTRAINT "UserPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
