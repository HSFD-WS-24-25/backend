/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `permissions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `roles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "permissions" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "permissions_id_seq";

-- AlterTable
ALTER TABLE "roles" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "roles_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "permissions_id_key" ON "permissions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "roles_id_key" ON "roles"("id");
