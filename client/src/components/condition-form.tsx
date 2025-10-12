import { useState } from "react";
import { Search, Loader2, Heart, Brain, Stethoscope, Flame, Droplet, Bone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ConditionFormProps {
  onSubmit: (condition: string) => void;
  isLoading: boolean;
}

const quickConditions = [
  { label: "Chest Pain", icon: Heart, color: "text-emergency" },
  { label: "Stroke Symptoms", icon: Brain, color: "text-info" },
  { label: "Breathing Issues", icon: Stethoscope, color: "text-warning" },
  { label: "Severe Burn", icon: Flame, color: "text-emergency" },
  { label: "Heavy Bleeding", icon: Droplet, color: "text-emergency" },
  { label: "Fracture", icon: Bone, color: "text-muted-foreground" },
];

export function ConditionForm({ onSubmit, isLoading }: ConditionFormProps) {
  const [condition, setCondition] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (condition.trim()) {
      onSubmit(condition.trim());
    }
  };

  const handleQuickCondition = (label: string) => {
    setCondition(label);
    onSubmit(label);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Describe symptoms or condition (e.g., chest pain and difficulty breathing)"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            disabled={isLoading}
            className="pl-12 pr-32 h-14 text-base md:text-lg border-2 focus-visible:ring-2"
            data-testid="input-condition"
          />
          <Button
            type="submit"
            disabled={isLoading || !condition.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 gap-2"
            data-testid="button-analyze"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing
              </>
            ) : (
              "Find Hospitals"
            )}
          </Button>
        </div>
      </form>

      <div>
        <p className="text-sm text-muted-foreground mb-3 text-center">Quick access to common emergencies</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickConditions.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.label}
                className="p-4 cursor-pointer transition-all hover-elevate active-elevate-2 border"
                onClick={() => handleQuickCondition(item.label)}
                data-testid={`card-quick-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md bg-muted ${item.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
