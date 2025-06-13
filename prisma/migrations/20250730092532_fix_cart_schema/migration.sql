/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sessionCartId]` on the table `Cart` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cart" ALTER COLUMN "sessionCartId" DROP NOT NULL,
ALTER COLUMN "itemsPrice" SET DEFAULT 0,
ALTER COLUMN "totalPrice" SET DEFAULT 0,
ALTER COLUMN "shippingPrice" SET DEFAULT 0,
ALTER COLUMN "taxPrice" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_sessionCartId_key" ON "Cart"("sessionCartId");
