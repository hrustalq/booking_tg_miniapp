/*
  Warnings:

  - The primary key for the `Zone` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "PC" DROP CONSTRAINT "PC_zoneId_fkey";

-- AlterTable
ALTER TABLE "PC" ALTER COLUMN "zoneId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Zone" DROP CONSTRAINT "Zone_pkey",
ADD COLUMN     "internalId" SERIAL NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Zone_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Zone_id_seq";

-- AddForeignKey
ALTER TABLE "PC" ADD CONSTRAINT "PC_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
