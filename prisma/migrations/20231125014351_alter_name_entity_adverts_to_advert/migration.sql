/*
  Warnings:

  - You are about to drop the `Adverts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Adverts" DROP CONSTRAINT "Adverts_ownerId_fkey";

-- DropTable
DROP TABLE "Adverts";

-- CreateTable
CREATE TABLE "Advert" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "longDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "specificPhone" TEXT,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Advert_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Advert" ADD CONSTRAINT "Advert_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
