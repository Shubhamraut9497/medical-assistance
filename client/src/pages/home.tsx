import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Header } from "@/components/header";
import { ConditionForm } from "@/components/condition-form";
import { HospitalCard } from "@/components/hospital-card";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { AnalysisSummary } from "@/components/analysis-summary";
import { DiseaseInfo } from "@/components/disease-info";
import { Footer } from "@/components/footer";
import { useToast } from "@/hooks/use-toast";
import { useGeolocation } from "@/hooks/use-geolocation";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { AnalyzeConditionResponse } from "@shared/schema";
import { Activity, Sparkles, Info, Ambulance, MapPin, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();
  const { latitude, longitude, error: locationError, loading: locationLoading } = useGeolocation();

  const analyzeMutation = useMutation({
    mutationFn: async (condition: string) => {
      const userLocation = latitude && longitude ? {
        latitude,
        longitude,
        address: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`
      } : undefined;

      const response = await apiRequest(
        "POST",
        "/api/analyze-condition",
        { condition, userLocation }
      );
      return await response.json();
    },
    onSuccess: (data) => {
      setHasSearched(true);
      // Store the analysis result directly in the query cache
      queryClient.setQueryData(["/api/latest-analysis"], data);
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

            {/* Disease Information */}
            {latestAnalysis.diseaseInfo && (
              <section className="py-8 px-4 md:px-6">
                <div className="container mx-auto max-w-7xl">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                      Disease Information
                    </h2>
                    <p className="text-muted-foreground">
                      Important information about {latestAnalysis.diseaseInfo.name}
                    </p>
                  </div>
                  <DiseaseInfo disease={latestAnalysis.diseaseInfo} />
                </div>
              </section>
            )}

            {/* Nearby Ambulances */}
            {latestAnalysis.nearbyAmbulances && latestAnalysis.nearbyAmbulances.length > 0 && (
              <section className="py-8 px-4 md:px-6 bg-muted/30">
                <div className="container mx-auto max-w-7xl">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                      Nearby Ambulances
                    </h2>
                    <p className="text-muted-foreground">
                      Available emergency services in your area
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {latestAnalysis.nearbyAmbulances.map((ambulance, index) => (
                      <Card key={ambulance.id} className="border-2">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Ambulance className="h-5 w-5 text-emergency" />
                              <h3 className="text-lg font-semibold">Ambulance {index + 1}</h3>
                            </div>
                            <Badge variant={ambulance.available ? "default" : "secondary"}>
                              {ambulance.available ? "Available" : "Busy"}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>ETA: {ambulance.estimatedTime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>Nearby Location</span>
                          </div>
                          <Button 
                            className="w-full gap-2" 
                            variant={ambulance.available ? "default" : "outline"}
                            disabled={!ambulance.available}
                            asChild
                          >
                            <a href={`tel:${ambulance.contact.replace(/\D/g, '')}`}>
                              <Ambulance className="h-4 w-4" />
                              Call Ambulance
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* User Location */}
            {latestAnalysis.userLocation && (
              <section className="py-8 px-4 md:px-6">
                <div className="container mx-auto max-w-7xl">
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                      Your Location
                    </h2>
                    <p className="text-muted-foreground">
                      Current location for distance calculations
                    </p>
                  </div>
                  <Card className="border-2">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 text-lg">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>{latestAnalysis.userLocation.address}</span>
                      </div>
                      {latestAnalysis.estimatedArrivalTime && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                          <Clock className="h-4 w-4" />
                          <span>Estimated arrival time: {latestAnalysis.estimatedArrivalTime}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </section>
            )}

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
