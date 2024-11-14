-- First add the columns as nullable
ALTER TABLE "Post" 
ADD COLUMN "createdAt" TIMESTAMP(3),
ADD COLUMN "updatedAt" TIMESTAMP(3);

ALTER TABLE "User" 
ADD COLUMN "createdAt" TIMESTAMP(3),
ADD COLUMN "updatedAt" TIMESTAMP(3);

-- Update existing records with current timestamp
UPDATE "Post"
SET "createdAt" = CURRENT_TIMESTAMP,
    "updatedAt" = CURRENT_TIMESTAMP;

UPDATE "User"
SET "createdAt" = CURRENT_TIMESTAMP,
    "updatedAt" = CURRENT_TIMESTAMP;

-- Make the columns required
ALTER TABLE "Post" 
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

ALTER TABLE "User" 
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- Add default values for new records
ALTER TABLE "Post" 
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE "User" 
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;