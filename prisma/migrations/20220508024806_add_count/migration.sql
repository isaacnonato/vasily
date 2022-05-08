-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Url" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tracked" BOOLEAN NOT NULL DEFAULT false,
    "redirect_id" TEXT NOT NULL,
    "long_url" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Url" ("created", "id", "long_url", "redirect_id", "tracked") SELECT "created", "id", "long_url", "redirect_id", "tracked" FROM "Url";
DROP TABLE "Url";
ALTER TABLE "new_Url" RENAME TO "Url";
CREATE UNIQUE INDEX "Url_redirect_id_key" ON "Url"("redirect_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
