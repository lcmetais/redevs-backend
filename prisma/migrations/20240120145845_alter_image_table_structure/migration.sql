/*
  Warnings:

  - You are about to drop the column `buffer` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `mimetype` on the `Image` table. All the data in the column will be lost.
  - Added the required column `imageInBase64` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "buffer",
DROP COLUMN "mimetype",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "imageInBase64" TEXT NOT NULL;
