CREATE TABLE "collectes" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "statut" TEXT NOT NULL,
    "dateCollecte" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "collectes_pkey" PRIMARY KEY ("id")
);