-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "authLogin" TEXT NOT NULL DEFAULT 'Admin',
ADD COLUMN     "authPassword" TEXT NOT NULL DEFAULT 'admin';
