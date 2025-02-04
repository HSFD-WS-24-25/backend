/*
  Warnings:

  - You are about to drop the column `method` on the `announcements` table. All the data in the column will be lost.
  - Added the required column `target` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" DROP COLUMN "method",
ADD COLUMN     "target" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
