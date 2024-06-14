/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Advert" DROP CONSTRAINT "Advert_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_advertId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Advert" ADD CONSTRAINT "Advert_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_advertId_fkey" FOREIGN KEY ("advertId") REFERENCES "Advert"("id") ON DELETE CASCADE ON UPDATE CASCADE;
