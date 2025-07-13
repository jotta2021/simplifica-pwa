-- AlterTable
ALTER TABLE "user" ADD COLUMN     "curentPlan" TEXT,
ADD COLUMN     "renewAt" TIMESTAMP(3),
ADD COLUMN     "subscriptionId" TEXT,
ADD COLUMN     "subscriptionStatus" TEXT,
ADD COLUMN     "trial" BOOLEAN DEFAULT true;
