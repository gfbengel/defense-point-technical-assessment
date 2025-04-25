ALTER TABLE "recipes" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
CREATE INDEX "is_favorite_idx" ON "recipes" USING btree ("is_favorite");