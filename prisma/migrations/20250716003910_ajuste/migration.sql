-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "FixedBill" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
