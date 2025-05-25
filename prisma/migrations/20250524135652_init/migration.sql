-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ThirdPartyRequest" (
    "requestId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "thirdPartyRequestId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ThirdPartyRequest_pkey" PRIMARY KEY ("requestId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Request_id_key" ON "Request"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ThirdPartyRequest_requestId_key" ON "ThirdPartyRequest"("requestId");

-- CreateIndex
CREATE UNIQUE INDEX "ThirdPartyRequest_thirdPartyRequestId_key" ON "ThirdPartyRequest"("thirdPartyRequestId");
