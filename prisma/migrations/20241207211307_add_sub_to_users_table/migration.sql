-- AlterTable
ALTER TABLE "users" ADD COLUMN     "sub" UUID NOT NULL DEFAULT gen_random_uuid();
