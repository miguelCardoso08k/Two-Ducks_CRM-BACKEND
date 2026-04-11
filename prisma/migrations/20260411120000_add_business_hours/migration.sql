-- CreateEnum
CREATE TYPE "Weekday" AS ENUM (
    'SUNDAY',
    'MONDAY',
    'TUESDAY',
    'WEDNESDAY',
    'THURSDAY',
    'FRIDAY',
    'SATURDAY'
);

-- CreateTable
CREATE TABLE "business_hours" (
    "id" TEXT NOT NULL,
    "company_id" TEXT NOT NULL,
    "day_of_week" "Weekday" NOT NULL,
    "opens_at" TEXT NOT NULL,
    "closes_at" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_hours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "business_hours_company_id_idx" ON "business_hours"("company_id");

-- CreateIndex
CREATE INDEX "business_hours_company_id_day_of_week_idx" ON "business_hours"("company_id", "day_of_week");

-- CreateIndex
CREATE UNIQUE INDEX "business_hours_company_id_day_of_week_opens_at_closes_at_key"
ON "business_hours"("company_id", "day_of_week", "opens_at", "closes_at");

-- AddForeignKey
ALTER TABLE "business_hours"
ADD CONSTRAINT "business_hours_company_id_fkey"
FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
