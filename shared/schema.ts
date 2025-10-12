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
  // New fields for enhanced features
  imageUrl: text("image_url"), // Hospital image
  rating: integer("rating"), // Hospital rating (1-5)
  description: text("description"), // Hospital description
  ambulanceAvailable: boolean("ambulance_available").notNull().default(false),
  ambulanceContact: text("ambulance_contact"), // Ambulance booking number
  facilities: text("facilities").array().notNull().default([]), // Additional facilities
  insuranceAccepted: text("insurance_accepted").array().notNull().default([]), // Insurance providers
  visitingHours: text("visiting_hours"), // Visiting hours
  emergencyWaitTime: text("emergency_wait_time"), // Average wait time
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

// Disease information table
export const diseases = pgTable("diseases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  category: text("category").notNull(), // e.g., "Cardiac", "Neurological"
  symptoms: text("symptoms").array().notNull(), // Common symptoms
  severity: text("severity").notNull(), // "Critical", "Moderate", "Low"
  description: text("description").notNull(),
  firstAid: text("first_aid").notNull(), // First aid instructions
  whenToSeekHelp: text("when_to_seek_help").notNull(), // When to seek immediate help
  prevention: text("prevention").notNull(), // Prevention tips
  relatedSpecializations: text("related_specializations").array().notNull(), // Related hospital specializations
  emergencyLevel: integer("emergency_level").notNull(), // 1-5 emergency level
  imageUrl: text("image_url"), // Disease illustration
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

export const insertDiseaseSchema = createInsertSchema(diseases).omit({
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

export type Disease = typeof diseases.$inferSelect;
export type InsertDisease = z.infer<typeof insertDiseaseSchema>;

// API Response types
export interface AnalyzeConditionResponse {
  analysis: ConditionAnalysis;
  hospitals: Hospital[];
  diseaseInfo?: Disease; // Related disease information
  userLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  estimatedArrivalTime?: string; // Estimated arrival time
  nearbyAmbulances?: {
    id: string;
    available: boolean;
    estimatedTime: string;
    contact: string;
  }[];
}

export interface ProgressResponse {
  progressAnalysis: ProgressAnalysis;
  overallAccuracy: number;
  totalAnalyses: number;
}

export interface DiseaseInfoResponse {
  disease: Disease;
  relatedHospitals: Hospital[];
  emergencyLevel: number;
}

export interface LocationResponse {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  country: string;
}
