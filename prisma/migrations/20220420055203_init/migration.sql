-- CreateTable
CREATE TABLE "Url" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tracked" BOOLEAN NOT NULL DEFAULT false,
    "redirect_id" TEXT NOT NULL,
    "long_url" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Url_redirect_id_key" ON "Url"("redirect_id");
