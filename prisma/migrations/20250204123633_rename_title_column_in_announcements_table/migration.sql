/*
  Warnings:

  - You are about to drop the column `methode` on the `announcements` table. All the data in the column will be lost.
  - You are about to drop the column `titel` on the `announcements` table. All the data in the column will be lost.
  - Added the required column `method` to the `announcements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `announcements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "announcements" DROP COLUMN "methode",
DROP COLUMN "titel",
ADD COLUMN     "method" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
