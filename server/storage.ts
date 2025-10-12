import { 
  hospitals,
  conditionAnalyses,
  progressAnalyses,
  diseases,
  type Hospital,
  type InsertHospital,
  type ConditionAnalysis,
  type InsertConditionAnalysis,
  type ProgressAnalysis,
  type InsertProgressAnalysis,
  type Disease,
  type InsertDisease
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Hospitals
  getAllHospitals(): Promise<Hospital[]>;
  getHospitalsBySpecialization(specialization: string): Promise<Hospital[]>;
  getHospitalsBySpecializations(specializations: string[]): Promise<Hospital[]>;
  getHospitalsByIds(ids: string[]): Promise<Hospital[]>;
  createHospital(hospital: InsertHospital): Promise<Hospital>;
  getHospitalsWithAmbulance(): Promise<Hospital[]>;
  getHospitalsNearby(latitude: number, longitude: number, radiusKm: number): Promise<Hospital[]>;

  // Condition Analyses
  createConditionAnalysis(analysis: InsertConditionAnalysis): Promise<ConditionAnalysis>;
  getLatestConditionAnalysis(): Promise<ConditionAnalysis | undefined>;
  getAllConditionAnalyses(): Promise<ConditionAnalysis[]>;

  // Progress Analyses
  createProgressAnalysis(progress: InsertProgressAnalysis): Promise<ProgressAnalysis>;
  getProgressByAnalysisId(analysisId: string): Promise<ProgressAnalysis | undefined>;
  getAllProgressAnalyses(): Promise<ProgressAnalysis[]>;

  // Diseases
  getAllDiseases(): Promise<Disease[]>;
  getDiseaseByName(name: string): Promise<Disease | undefined>;
  getDiseasesByCategory(category: string): Promise<Disease[]>;
  createDisease(disease: InsertDisease): Promise<Disease>;
}

export class DatabaseStorage implements IStorage {
  // Hospitals
  async getAllHospitals(): Promise<Hospital[]> {
    return await db.select().from(hospitals);
  }

  async getHospitalsBySpecialization(specialization: string): Promise<Hospital[]> {
    return await db
      .select()
      .from(hospitals)
      .where(eq(hospitals.specialization, specialization));
  }

  async getHospitalsBySpecializations(specializations: string[]): Promise<Hospital[]> {
    const allHospitals = await db.select().from(hospitals);
    return allHospitals.filter(h => specializations.includes(h.specialization));
  }

  async getHospitalsByIds(ids: string[]): Promise<Hospital[]> {
    const allHospitals = await db.select().from(hospitals);
    return allHospitals.filter(h => ids.includes(h.id));
  }

  async createHospital(insertHospital: InsertHospital): Promise<Hospital> {
    const [hospital] = await db
      .insert(hospitals)
      .values(insertHospital)
      .returning();
    return hospital;
  }

  // Condition Analyses
  async createConditionAnalysis(insertAnalysis: InsertConditionAnalysis): Promise<ConditionAnalysis> {
    const [analysis] = await db
      .insert(conditionAnalyses)
      .values(insertAnalysis)
      .returning();
    return analysis;
  }

  async getLatestConditionAnalysis(): Promise<ConditionAnalysis | undefined> {
    const [analysis] = await db
      .select()
      .from(conditionAnalyses)
      .orderBy(desc(conditionAnalyses.createdAt))
      .limit(1);
    return analysis || undefined;
  }

  async getAllConditionAnalyses(): Promise<ConditionAnalysis[]> {
    return await db
      .select()
      .from(conditionAnalyses)
      .orderBy(desc(conditionAnalyses.createdAt));
  }

  // Progress Analyses
  async createProgressAnalysis(insertProgress: InsertProgressAnalysis): Promise<ProgressAnalysis> {
    const [progress] = await db
      .insert(progressAnalyses)
      .values(insertProgress)
      .returning();
    return progress;
  }

  async getProgressByAnalysisId(analysisId: string): Promise<ProgressAnalysis | undefined> {
    const [progress] = await db
      .select()
      .from(progressAnalyses)
      .where(eq(progressAnalyses.analysisId, analysisId));
    return progress || undefined;
  }

  async getAllProgressAnalyses(): Promise<ProgressAnalysis[]> {
    return await db
      .select()
      .from(progressAnalyses)
      .orderBy(desc(progressAnalyses.createdAt));
  }

  // New methods for enhanced features
  async getHospitalsWithAmbulance(): Promise<Hospital[]> {
    return await db
      .select()
      .from(hospitals)
      .where(eq(hospitals.ambulanceAvailable, true));
  }

  async getHospitalsNearby(latitude: number, longitude: number, radiusKm: number): Promise<Hospital[]> {
    // For now, return all hospitals. In production, implement proper geospatial query
    const allHospitals = await db.select().from(hospitals);
    return allHospitals; // Simplified for demo
  }

  // Diseases
  async getAllDiseases(): Promise<Disease[]> {
    return await db
      .select()
      .from(diseases)
      .orderBy(desc(diseases.createdAt));
  }

  async getDiseaseByName(name: string): Promise<Disease | undefined> {
    const [disease] = await db
      .select()
      .from(diseases)
      .where(eq(diseases.name, name));
    return disease || undefined;
  }

  async getDiseasesByCategory(category: string): Promise<Disease[]> {
    return await db
      .select()
      .from(diseases)
      .where(eq(diseases.category, category));
  }

  async createDisease(disease: InsertDisease): Promise<Disease> {
    const [newDisease] = await db
      .insert(diseases)
      .values(disease)
      .returning();
    return newDisease;
  }
}

export const storage = new DatabaseStorage();
