-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'PAYMENT_REQUIRED', 'PAID', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PCStatus" AS ENUM ('AVAILABLE', 'OCCUPIED', 'MAINTENANCE', 'OUT_OF_ORDER');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'USER', 'GUEST');

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "userId" INTEGER,
    "pcId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "paymentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "summary" TEXT,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "imageUrl" TEXT,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "senderCredentialsId" INTEGER,
    "receiverCredentialsId" INTEGER,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentCredentials" (
    "id" SERIAL NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "cardHolderName" TEXT NOT NULL,
    "cardHolderSurname" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PC" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "PCStatus" NOT NULL DEFAULT 'AVAILABLE',
    "location" TEXT,
    "branchId" TEXT NOT NULL,
    "zoneId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PC_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GizmoUser" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "telegramUserId" TEXT,

    CONSTRAINT "GizmoUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TelegramUser" (
    "id" INTEGER NOT NULL,
    "is_bot" BOOLEAN,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT,
    "username" TEXT,
    "language_code" TEXT,
    "is_premium" BOOLEAN,
    "photo_url" TEXT,
    "added_to_attachment_menu" BOOLEAN,
    "allows_write_to_pm" BOOLEAN,
    "role" "Role" NOT NULL DEFAULT 'GUEST',
    "gizmoProfileId" TEXT,

    CONSTRAINT "TelegramUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zone" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "hourlyRate" DOUBLE PRECISION NOT NULL,
    "branchId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_NewsToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_userId_key" ON "Booking"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_paymentId_key" ON "Booking"("paymentId");

-- CreateIndex
CREATE INDEX "Booking_userId_idx" ON "Booking"("userId");

-- CreateIndex
CREATE INDEX "Booking_pcId_idx" ON "Booking"("pcId");

-- CreateIndex
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");

-- CreateIndex
CREATE INDEX "News_publishedAt_idx" ON "News"("publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "PC_status_idx" ON "PC"("status");

-- CreateIndex
CREATE UNIQUE INDEX "GizmoUser_telegramUserId_key" ON "GizmoUser"("telegramUserId");

-- CreateIndex
CREATE INDEX "GizmoUser_telegramUserId_idx" ON "GizmoUser"("telegramUserId");

-- CreateIndex
CREATE UNIQUE INDEX "TelegramUser_gizmoProfileId_key" ON "TelegramUser"("gizmoProfileId");

-- CreateIndex
CREATE INDEX "TelegramUser_gizmoProfileId_idx" ON "TelegramUser"("gizmoProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "Zone_name_branchId_key" ON "Zone"("name", "branchId");

-- CreateIndex
CREATE UNIQUE INDEX "_NewsToTag_AB_unique" ON "_NewsToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_NewsToTag_B_index" ON "_NewsToTag"("B");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TelegramUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_pcId_fkey" FOREIGN KEY ("pcId") REFERENCES "PC"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TelegramUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_senderCredentialsId_fkey" FOREIGN KEY ("senderCredentialsId") REFERENCES "PaymentCredentials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_receiverCredentialsId_fkey" FOREIGN KEY ("receiverCredentialsId") REFERENCES "PaymentCredentials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "TelegramUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "TelegramUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentCredentials" ADD CONSTRAINT "PaymentCredentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "TelegramUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PC" ADD CONSTRAINT "PC_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PC" ADD CONSTRAINT "PC_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TelegramUser" ADD CONSTRAINT "TelegramUser_gizmoProfileId_fkey" FOREIGN KEY ("gizmoProfileId") REFERENCES "GizmoUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zone" ADD CONSTRAINT "Zone_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsToTag" ADD CONSTRAINT "_NewsToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsToTag" ADD CONSTRAINT "_NewsToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
