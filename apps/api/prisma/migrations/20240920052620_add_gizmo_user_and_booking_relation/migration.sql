/*
  Warnings:

  - Added the required column `gizmoAccountId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "gizmoAccountId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_gizmoAccountId_fkey" FOREIGN KEY ("gizmoAccountId") REFERENCES "GizmoUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
