/*
  Warnings:

  - Added the required column `accountWalletId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "accountWalletId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AccountWallet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AccountWallet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AccountWallet" ADD CONSTRAINT "AccountWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_accountWalletId_fkey" FOREIGN KEY ("accountWalletId") REFERENCES "AccountWallet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
