/*
  Warnings:

  - You are about to drop the column `Ihave` on the `shelf` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shelf" DROP COLUMN "Ihave",
ADD COLUMN     "iHave" BOOLEAN NOT NULL DEFAULT false;
