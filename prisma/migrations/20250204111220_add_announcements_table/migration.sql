-- CreateTable
CREATE TABLE "announcements" (
    "id" SERIAL NOT NULL,
    "titel" TEXT NOT NULL,
    "methode" TEXT NOT NULL,
    "date_start" TIMESTAMP(3) NOT NULL,
    "date_end" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "announcements_pkey" PRIMARY KEY ("id")
);
