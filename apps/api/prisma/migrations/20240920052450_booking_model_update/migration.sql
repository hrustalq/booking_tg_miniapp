/*
  Warnings:

  - Made the column `userId` on table `Booking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `branchId` on table `Booking` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_branchId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropIndex
DROP INDEX "Booking_userId_key";

-- DropIndex
DROP INDEX "GizmoUser_telegramUserId_key";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "startTime" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "endTime" DROP NOT NULL,
ALTER COLUMN "branchId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TelegramUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
