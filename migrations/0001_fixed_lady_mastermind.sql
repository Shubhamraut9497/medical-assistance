CREATE TABLE "diseases" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"symptoms" text[] NOT NULL,
	"severity" text NOT NULL,
	"description" text NOT NULL,
	"first_aid" text NOT NULL,
	"when_to_seek_help" text NOT NULL,
	"prevention" text NOT NULL,
	"related_specializations" text[] NOT NULL,
	"emergency_level" integer NOT NULL,
	"image_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hospitals" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "hospitals" ADD COLUMN "rating" integer;--> statement-breakpoint
ALTER TABLE "hospitals" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "hospitals" ADD COLUMN "ambulance_available" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "hospitals" ADD COLUMN "ambulance_contact" text;--> statement-breakpoint
ALTER TABLE "hospitals" ADD COLUMN "facilities" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "hospitals" ADD COLUMN "insurance_accepted" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "hospitals" ADD COLUMN "visiting_hours" text;--> statement-breakpoint
ALTER TABLE "hospitals" ADD COLUMN "emergency_wait_time" text;