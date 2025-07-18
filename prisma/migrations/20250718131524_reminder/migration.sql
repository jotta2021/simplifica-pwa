-- CreateTable
CREATE TABLE "Reminder" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date_hour" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reminder_pkey" PRIMARY KEY ("id")
);
