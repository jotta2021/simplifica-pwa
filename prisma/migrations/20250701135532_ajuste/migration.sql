/*
  Warnings:

  - You are about to drop the column `type` on the `AccountWallet` table. All the data in the column will be lost.
  - Added the required column `image` to the `AccountWallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccountWallet" DROP COLUMN "type",
ADD COLUMN     "image" TEXT NOT NULL;
