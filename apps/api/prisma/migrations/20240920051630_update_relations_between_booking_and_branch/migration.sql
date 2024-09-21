/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Booking` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_paymentId_fkey";

-- DropIndex
DROP INDEX "Booking_paymentId_key";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "paymentId",
ADD COLUMN     "branchId" TEXT;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
