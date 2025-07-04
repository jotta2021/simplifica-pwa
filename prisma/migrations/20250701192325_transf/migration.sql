-- AlterEnum
ALTER TYPE "CategoryType" ADD VALUE 'TRANSFER';

-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "toAccountWalletId" TEXT;

-- CreateIndex
CREATE INDEX "Transactions_accountWalletId_idx" ON "Transactions"("accountWalletId");

-- CreateIndex
CREATE INDEX "Transactions_toAccountWalletId_idx" ON "Transactions"("toAccountWalletId");

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_toAccountWalletId_fkey" FOREIGN KEY ("toAccountWalletId") REFERENCES "AccountWallet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
