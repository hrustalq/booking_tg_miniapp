/*
  Warnings:

  - The primary key for the `PC` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `PC` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `pcId` on the `Booking` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_pcId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "pcId",
ADD COLUMN     "pcId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PC" DROP CONSTRAINT "PC_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PC_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "Booking_pcId_idx" ON "Booking"("pcId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_pcId_fkey" FOREIGN KEY ("pcId") REFERENCES "PC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
