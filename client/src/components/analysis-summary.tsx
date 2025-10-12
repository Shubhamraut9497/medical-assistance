import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ConditionAnalysis } from "@shared/schema";

interface AnalysisSummaryProps {
  analysis: ConditionAnalysis;
}

const severityConfig = {
  "Critical": {
    color: "bg-emergency/10 text-emergency border-emergency/20",
    icon: AlertCircle,
  },
  "Moderate": {
    color: "bg-warning/10 text-warning border-warning/20",
    icon: TrendingUp,
  },
  "Low": {
    color: "bg-success/10 text-success border-success/20",
    icon: CheckCircle2,
  },
};

export function AnalysisSummary({ analysis }: AnalysisSummaryProps) {
  const config = severityConfig[analysis.severity as keyof typeof severityConfig] || severityConfig["Moderate"];
  const Icon = config.icon;

  return (
    <Card className="border-2 bg-card/50">
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <CardTitle className="text-xl md:text-2xl flex-1" data-testid="text-analysis-category">
            {analysis.analyzedCategory}
          </CardTitle>
          <Badge className={`${config.color} border font-medium gap-1`} data-testid="badge-severity">
            <Icon className="h-3 w-3" />
            {analysis.severity} Priority
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Your Input:</p>
            <p className="text-base" data-testid="text-condition-input">"{analysis.conditionInput}"</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">AI Analysis:</p>
            <p className="text-sm leading-relaxed" data-testid="text-gemini-analysis">
              {analysis.geminiAnalysis}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
