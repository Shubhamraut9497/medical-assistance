import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Hospitals table
export const hospitals = pgTable("hospitals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  specialization: text("specialization").notNull(), // e.g., "Cardiac", "Trauma", "Neurological"
  address: text("address").notNull(),
  distance: text("distance").notNull(), // e.g., "2.1 km"
  contactNumber: text("contact_number").notNull(),
  emergencyServices: text("emergency_services").array().notNull(), // e.g., ["24/7 Cardiac Care", "ICU", "Ambulance"]
  mapUrl: text("map_url").notNull(), // Google Maps link
  available: boolean("available").notNull().default(true),
  latitude: text("latitude"),
  longitude: text("longitude"),
});

// Condition analyses (for tracking and progress monitoring)
export const conditionAnalyses = pgTable("condition_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  conditionInput: text("condition_input").notNull(),
  analyzedCategory: text("analyzed_category").notNull(), // e.g., "Cardiac Emergency"
  severity: text("severity").notNull(), // e.g., "Critical", "Moderate", "Low"
  recommendedHospitals: text("recommended_hospitals").array().notNull(), // Array of hospital IDs
  geminiAnalysis: text("gemini_analysis").notNull(), // Full AI analysis
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Progress tracking (Gemini analyzes recommendation accuracy)
export const progressAnalyses = pgTable("progress_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  analysisId: varchar("analysis_id").notNull(),
  accuracyScore: integer("accuracy_score").notNull(), // 1-100
  geminiInsights: text("gemini_insights").notNull(),
  improvementSuggestions: text("improvement_suggestions").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Insert schemas
export const insertHospitalSchema = createInsertSchema(hospitals).omit({
  id: true,
});

export const insertConditionAnalysisSchema = createInsertSchema(conditionAnalyses).omit({
  id: true,
  createdAt: true,
});

export const insertProgressAnalysisSchema = createInsertSchema(progressAnalyses).omit({
  id: true,
  createdAt: true,
});

// Types
export type Hospital = typeof hospitals.$inferSelect;
export type InsertHospital = z.infer<typeof insertHospitalSchema>;

export type ConditionAnalysis = typeof conditionAnalyses.$inferSelect;
export type InsertConditionAnalysis = z.infer<typeof insertConditionAnalysisSchema>;

export type ProgressAnalysis = typeof progressAnalyses.$inferSelect;
export type InsertProgressAnalysis = z.infer<typeof insertProgressAnalysisSchema>;

// API Response types
export interface AnalyzeConditionResponse {
  analysis: ConditionAnalysis;
  hospitals: Hospital[];
}

export interface ProgressResponse {
  progressAnalysis: ProgressAnalysis;
  overallAccuracy: number;
  totalAnalyses: number;
}
