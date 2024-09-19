/*
  Warnings:

  - A unique constraint covering the columns `[internalId,branchId]` on the table `Zone` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Zone_name_branchId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Zone_internalId_branchId_key" ON "Zone"("internalId", "branchId");
