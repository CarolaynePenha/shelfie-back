/*
  Warnings:

  - A unique constraint covering the columns `[shelfId]` on the table `ratings` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ratings_shelfId_key" ON "ratings"("shelfId");
