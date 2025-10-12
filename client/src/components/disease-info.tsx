import { AlertTriangle, Heart, Brain, Wind, Shield, Clock, Phone } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Disease } from "@shared/schema";

interface DiseaseInfoProps {
  disease: Disease;
}

const emergencyLevelColors = {
  1: "bg-green-100 text-green-800 border-green-200",
  2: "bg-yellow-100 text-yellow-800 border-yellow-200", 
  3: "bg-orange-100 text-orange-800 border-orange-200",
  4: "bg-red-100 text-red-800 border-red-200",
  5: "bg-red-200 text-red-900 border-red-300",
};

const categoryIcons = {
  "Cardiac": Heart,
  "Neurological": Brain,
  "Respiratory": Wind,
  "Trauma": Shield,
  "Burn": AlertTriangle,
  "Orthopedic": Shield,
};

export function DiseaseInfo({ disease }: DiseaseInfoProps) {
  const Icon = categoryIcons[disease.category as keyof typeof categoryIcons] || Shield;
  const emergencyColor = emergencyLevelColors[disease.emergencyLevel as keyof typeof emergencyLevelColors];

  return (
    <Card className="border-2">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">{disease.name}</h3>
          </div>
          <div className="flex flex-col gap-1">
            <Badge className={`${emergencyColor} border font-medium`}>
              Level {disease.emergencyLevel} Emergency
            </Badge>
            <Badge variant="outline" className="text-xs">
              {disease.severity}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <div>
          <h4 className="font-semibold mb-2">Description</h4>
          <p className="text-muted-foreground">{disease.description}</p>
        </div>

        {/* Symptoms */}
        <div>
          <h4 className="font-semibold mb-2">Common Symptoms</h4>
          <div className="flex flex-wrap gap-2">
            {disease.symptoms.map((symptom, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {symptom}
              </Badge>
            ))}
          </div>
        </div>

        {/* First Aid */}
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            First Aid Instructions
          </h4>
          <p className="text-muted-foreground bg-muted/50 p-3 rounded-lg">
            {disease.firstAid}
          </p>
        </div>

        {/* When to Seek Help */}
        <div>
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-emergency" />
            When to Seek Immediate Help
          </h4>
          <p className="text-emergency bg-emergency/10 p-3 rounded-lg border border-emergency/20">
            {disease.whenToSeekHelp}
          </p>
        </div>

        {/* Prevention */}
        <div>
          <h4 className="font-semibold mb-2">Prevention Tips</h4>
          <p className="text-muted-foreground">{disease.prevention}</p>
        </div>

        {/* Emergency Actions */}
        <div className="pt-4 border-t">
          <div className="flex gap-2">
            <Button className="flex-1 bg-emergency hover:bg-emergency/90 gap-2">
              <Phone className="h-4 w-4" />
              Call 911
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Clock className="h-4 w-4" />
              Find Hospitals
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
