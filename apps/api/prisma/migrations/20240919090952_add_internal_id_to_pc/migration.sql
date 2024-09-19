/*
  Warnings:

  - A unique constraint covering the columns `[internalId,branchId]` on the table `PC` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PC" ADD COLUMN     "internalId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PC_internalId_branchId_key" ON "PC"("internalId", "branchId");
