/*
  Warnings:

  - The primary key for the `Zone` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Zone` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `zoneId` on the `PC` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "PC" DROP CONSTRAINT "PC_zoneId_fkey";

-- AlterTable
ALTER TABLE "PC" DROP COLUMN "zoneId",
ADD COLUMN     "zoneId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Zone" DROP CONSTRAINT "Zone_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Zone_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "PC" ADD CONSTRAINT "PC_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
