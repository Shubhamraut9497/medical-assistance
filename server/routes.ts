import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeCondition, analyzeProgress } from "./gemini";
import type { AnalyzeConditionResponse, ProgressResponse } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Analyze condition and get hospital recommendations
  app.post("/api/analyze-condition", async (req, res) => {
    try {
      const { condition } = req.body;

      if (!condition || typeof condition !== "string") {
        return res.status(400).json({ error: "Condition is required" });
      }

      console.log(`Analyzing condition: ${condition}`);

      // Use Gemini AI to analyze the condition
      const geminiResult = await analyzeCondition(condition);

      console.log(`Gemini recommended specializations: ${geminiResult.recommendedSpecializations.join(', ')}`);

      // Normalize specialization names to match database (fallback mapping)
      const specializationMapping: Record<string, string> = {
        'Cardiology': 'Cardiac',
        'Emergency Medicine': 'General',
        'Neurology': 'Neurological',
        'Pulmonology': 'Respiratory',
        'Orthopedics': 'Orthopedic',
      };

      const normalizedSpecializations = geminiResult.recommendedSpecializations.map(spec => 
        specializationMapping[spec] || spec
      );

      console.log(`Normalized specializations: ${normalizedSpecializations.join(', ')}`);

      // Get hospitals matching the recommended specializations
      let recommendedHospitals = await storage.getHospitalsBySpecializations(
        normalizedSpecializations
      );

      // If no hospitals found, add General hospitals as fallback
      if (recommendedHospitals.length === 0) {
        console.log('No matching hospitals found, adding General hospitals as fallback');
        const generalHospitals = await storage.getHospitalsBySpecialization('General');
        recommendedHospitals = generalHospitals;
      }

      // Store the analysis in the database
      const analysis = await storage.createConditionAnalysis({
        conditionInput: condition,
        analyzedCategory: geminiResult.category,
        severity: geminiResult.severity,
        recommendedHospitals: recommendedHospitals.map(h => h.id),
        geminiAnalysis: geminiResult.analysis,
      });

      // Create progress analysis using Gemini
      const progressInsights = await analyzeProgress(
        condition,
        geminiResult.category,
        recommendedHospitals.map(h => h.id)
      );

      await storage.createProgressAnalysis({
        analysisId: analysis.id,
        accuracyScore: progressInsights.accuracyScore,
        geminiInsights: progressInsights.insights,
        improvementSuggestions: progressInsights.improvementSuggestions,
      });

      const response: AnalyzeConditionResponse = {
        analysis,
        hospitals: recommendedHospitals,
      };

      res.json(response);
    } catch (error) {
      console.error("Error analyzing condition:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to analyze condition" 
      });
    }
  });

  // Get latest analysis
  app.get("/api/latest-analysis", async (req, res) => {
    try {
      const analysis = await storage.getLatestConditionAnalysis();
      
      if (!analysis) {
        return res.status(404).json({ error: "No analysis found" });
      }

      // Fetch hospitals by their stored IDs
      const hospitals = await storage.getHospitalsByIds(analysis.recommendedHospitals);

      const response: AnalyzeConditionResponse = {
        analysis,
        hospitals,
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching latest analysis:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to fetch analysis" 
      });
    }
  });

  // Get all hospitals
  app.get("/api/hospitals", async (req, res) => {
    try {
      const allHospitals = await storage.getAllHospitals();
      res.json(allHospitals);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to fetch hospitals" 
      });
    }
  });

  // Get progress analytics
  app.get("/api/progress", async (req, res) => {
    try {
      const allAnalyses = await storage.getAllConditionAnalyses();
      const allProgress = await storage.getAllProgressAnalyses();

      const totalAnalyses = allAnalyses.length;
      const overallAccuracy = totalAnalyses > 0
        ? Math.round(
            allProgress.reduce((sum, p) => sum + p.accuracyScore, 0) / totalAnalyses
          )
        : 0;

      const latestProgress = allProgress[0];

      const response: ProgressResponse = {
        progressAnalysis: latestProgress,
        overallAccuracy,
        totalAnalyses,
      };

      res.json(response);
    } catch (error) {
      console.error("Error fetching progress:", error);
      res.status(500).json({ 
        error: error instanceof Error ? error.message : "Failed to fetch progress" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
