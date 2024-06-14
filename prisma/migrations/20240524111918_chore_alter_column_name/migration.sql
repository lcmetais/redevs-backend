/*
  Warnings:

  - You are about to drop the column `imageInBase64` on the `Image` table. All the data in the column will be lost.
  - Added the required column `imageStorageUrl` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "imageInBase64",
ADD COLUMN     "imageStorageUrl" TEXT NOT NULL;
