/*
  Warnings:

  - You are about to drop the column `imageId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_imageId_fkey";

-- DropIndex
DROP INDEX "Image_originalName_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "imageId";

-- CreateTable
CREATE TABLE "UserPhoto" (
    "id" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "imageInBase64" TEXT NOT NULL,
    "userId" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" TIMESTAMP(3),

    CONSTRAINT "UserPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPhoto_userId_key" ON "UserPhoto"("userId");

-- AddForeignKey
ALTER TABLE "UserPhoto" ADD CONSTRAINT "UserPhoto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
