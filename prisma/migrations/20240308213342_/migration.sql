/*
  Warnings:

  - A unique constraint covering the columns `[bookId,userId]` on the table `shelf` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shelf_bookId_userId_key" ON "shelf"("bookId", "userId");
