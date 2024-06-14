-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimetype" TEXT,
    "buffer" BYTEA NOT NULL,
    "advertId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_advertId_fkey" FOREIGN KEY ("advertId") REFERENCES "Advert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
