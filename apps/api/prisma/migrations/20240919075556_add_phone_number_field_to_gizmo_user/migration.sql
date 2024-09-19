/*
  Warnings:

  - The primary key for the `GizmoUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GizmoUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `telegramUserId` column on the `GizmoUser` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `gizmoProfileId` on the `TelegramUser` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TelegramUser" DROP CONSTRAINT "TelegramUser_gizmoProfileId_fkey";

-- DropIndex
DROP INDEX "TelegramUser_gizmoProfileId_idx";

-- DropIndex
DROP INDEX "TelegramUser_gizmoProfileId_key";

-- AlterTable
ALTER TABLE "GizmoUser" DROP CONSTRAINT "GizmoUser_pkey",
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '',
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "telegramUserId",
ADD COLUMN     "telegramUserId" INTEGER,
ADD CONSTRAINT "GizmoUser_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TelegramUser" DROP COLUMN "gizmoProfileId";

-- CreateIndex
CREATE UNIQUE INDEX "GizmoUser_telegramUserId_key" ON "GizmoUser"("telegramUserId");

-- CreateIndex
CREATE INDEX "GizmoUser_telegramUserId_idx" ON "GizmoUser"("telegramUserId");

-- AddForeignKey
ALTER TABLE "GizmoUser" ADD CONSTRAINT "GizmoUser_telegramUserId_fkey" FOREIGN KEY ("telegramUserId") REFERENCES "TelegramUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
