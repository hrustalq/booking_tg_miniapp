/*
  Warnings:

  - Added the required column `apiUrl` to the `Branch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "apiUrl" TEXT NOT NULL;
