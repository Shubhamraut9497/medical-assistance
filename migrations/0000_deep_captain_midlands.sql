CREATE TABLE "condition_analyses" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"condition_input" text NOT NULL,
	"analyzed_category" text NOT NULL,
	"severity" text NOT NULL,
	"recommended_hospitals" text[] NOT NULL,
	"gemini_analysis" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hospitals" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"specialization" text NOT NULL,
	"address" text NOT NULL,
	"distance" text NOT NULL,
	"contact_number" text NOT NULL,
	"emergency_services" text[] NOT NULL,
	"map_url" text NOT NULL,
	"available" boolean DEFAULT true NOT NULL,
	"latitude" text,
	"longitude" text
);
--> statement-breakpoint
CREATE TABLE "progress_analyses" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"analysis_id" varchar NOT NULL,
	"accuracy_score" integer NOT NULL,
	"gemini_insights" text NOT NULL,
	"improvement_suggestions" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
