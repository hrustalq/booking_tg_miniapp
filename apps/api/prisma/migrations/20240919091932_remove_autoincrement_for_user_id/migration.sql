/*
  Warnings:

  - A unique constraint covering the columns `[branchId,internalId]` on the table `GizmoUser` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "GizmoUser_guid_key";

-- AlterTable
ALTER TABLE "GizmoUser" ADD COLUMN     "internalId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GizmoUser_branchId_internalId_key" ON "GizmoUser"("branchId", "internalId");
