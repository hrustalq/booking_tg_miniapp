-- AlterTable
ALTER TABLE "GizmoUser" ADD COLUMN     "branchId" TEXT;

-- AddForeignKey
ALTER TABLE "GizmoUser" ADD CONSTRAINT "GizmoUser_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
