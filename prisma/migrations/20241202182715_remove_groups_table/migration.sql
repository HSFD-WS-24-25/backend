/*
  Warnings:

  - You are about to drop the column `group_id` on the `roles` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `groups` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_group_id_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_group_id_fkey";

-- AlterTable
ALTER TABLE "roles" DROP COLUMN "group_id";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "group_id";

-- DropTable
DROP TABLE "groups";
