-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "Transactions" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
