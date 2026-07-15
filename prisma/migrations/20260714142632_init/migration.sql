-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "biometriaHash" TEXT NOT NULL,
    "biometriaAtiva" BOOLEAN NOT NULL DEFAULT true,
    "email" TEXT,
    "telefone" TEXT,
    "tipo" TEXT NOT NULL DEFAULT 'ALUNO',
    "status" TEXT NOT NULL DEFAULT 'ATIVO',
    "ultimoAcesso" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_biometriaHash_key" ON "usuarios"("biometriaHash");
