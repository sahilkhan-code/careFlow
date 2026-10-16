-- CreateTable
CREATE TABLE "QueueCounter" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "lastNumber" INTEGER NOT NULL,

    CONSTRAINT "QueueCounter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QueueCounter_doctorId_date_key" ON "QueueCounter"("doctorId", "date");

-- AddForeignKey
ALTER TABLE "QueueCounter" ADD CONSTRAINT "QueueCounter_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
