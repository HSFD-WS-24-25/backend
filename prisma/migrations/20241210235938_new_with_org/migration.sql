-- AlterTable
ALTER TABLE "events" ADD COLUMN     "onlineLink" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "organization_id" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "organizations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "organizations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
