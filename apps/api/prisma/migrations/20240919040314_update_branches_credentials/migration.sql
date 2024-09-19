/*
  Warnings:

  - A unique constraint covering the columns `[guid]` on the table `GizmoUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `guid` to the `GizmoUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "acceptsCards" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasWifi" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "workingHours" TEXT[];

-- AlterTable
ALTER TABLE "GizmoUser" ADD COLUMN     "guid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GizmoUser_guid_key" ON "GizmoUser"("guid");
