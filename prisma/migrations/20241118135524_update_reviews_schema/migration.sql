/*
  Warnings:

  - You are about to alter the column `humidity` on the `weather_history` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - A unique constraint covering the columns `[raceId,date]` on the table `weather_history` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Terrain" AS ENUM ('ROAD', 'TRAIL', 'MIXED');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "races" ADD COLUMN     "distance" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "elevation" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "technicalLevel" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "terrain" "Terrain" NOT NULL DEFAULT 'ROAD';

-- AlterTable
-- ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;
ALTER TABLE "reviews" ALTER COLUMN "rating" TYPE FLOAT USING rating::float;
ALTER TABLE "reviews" ADD COLUMN "title" TEXT NOT NULL DEFAULT 'Review Title';
ALTER TABLE "reviews" ALTER COLUMN "title" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isVerifiedRunner" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "weather_history" ADD COLUMN     "pressure" DOUBLE PRECISION,
ADD COLUMN     "rainfall" DOUBLE PRECISION,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "visibility" DOUBLE PRECISION,
ALTER COLUMN "humidity" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "achievements" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "realName" TEXT NOT NULL,
    "idNumber" TEXT NOT NULL,
    "raceResults" JSONB NOT NULL,
    "socialMedia" JSONB,
    "status" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "weather_history_raceId_date_key" ON "weather_history"("raceId", "date");

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_requests" ADD CONSTRAINT "verification_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
