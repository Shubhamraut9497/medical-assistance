import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { ConditionForm } from "@/components/condition-form";
import { HospitalCard } from "@/components/hospital-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { AnalysisSummary } from "@/components/analysis-summary";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { AnalyzeConditionResponse } from "@shared/schema";
import { Activity, Sparkles, Info } from "lucide-react";

export default function Home() {
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (condition: string) => {
      const response = await apiRequest<AnalyzeConditionResponse>(
        "POST",
        "/api/analyze-condition",
        { condition }
      );
      return response;
    },
    onSuccess: () => {
      setHasSearched(true);
      queryClient.invalidateQueries({ queryKey: ["/api/latest-analysis"] });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: error.message || "Failed to analyze condition. Please try again.",
      });
    },
  });

  const { data: latestAnalysis } = useQuery<AnalyzeConditionResponse>({
    queryKey: ["/api/latest-analysis"],
    enabled: hasSearched,
  });

  const handleAnalyze = (condition: string) => {
    analyzeMutation.mutate(condition);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-12 md:py-16 px-4 md:px-6">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center space-y-4 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                <Sparkles className="h-4 w-4" />
                Powered by Gemini AI
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                Find the Right Hospital, Fast
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                AI-powered emergency hospital recommendations based on your condition
              </p>
            </div>

            <ConditionForm 
              onSubmit={handleAnalyze} 
              isLoading={analyzeMutation.isPending} 
            />
          </div>
        </section>

        {/* Loading State */}
        {analyzeMutation.isPending && (
          <section className="py-8">
            <LoadingSkeleton />
          </section>
        )}

        {/* Results Section */}
        {latestAnalysis && !analyzeMutation.isPending && (
          <>
            <section className="py-8 px-4 md:px-6 bg-muted/30">
              <div className="container mx-auto max-w-7xl">
                <AnalysisSummary analysis={latestAnalysis.analysis} />
              </div>
            </section>

            <section className="py-8 px-4 md:px-6">
              <div className="container mx-auto max-w-7xl">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                    Recommended Hospitals
                  </h2>
                  <p className="text-muted-foreground">
                    {latestAnalysis.hospitals.length} specialized {latestAnalysis.hospitals.length === 1 ? 'hospital' : 'hospitals'} found for your condition
                  </p>
                </div>

                {latestAnalysis.hospitals.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {latestAnalysis.hospitals.map((hospital, index) => (
                      <HospitalCard key={hospital.id} hospital={hospital} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Info className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground">
                      No hospitals found for this condition. Please try a different search.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {/* How It Works Section */}
        {!hasSearched && (
          <section className="py-12 md:py-16 px-4 md:px-6 bg-muted/30">
            <div className="container mx-auto max-w-7xl">
              <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
                How It Works
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Activity className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">1. Describe Symptoms</h3>
                  <p className="text-muted-foreground">
                    Enter your symptoms or medical condition in plain language
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">2. AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Our Gemini AI analyzes and categorizes your emergency type
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <Info className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">3. Get Recommendations</h3>
                  <p className="text-muted-foreground">
                    Receive specialized hospital matches with navigation and contact info
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
