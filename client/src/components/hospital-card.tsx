import { Phone, MapPin, Navigation, Clock, Ambulance } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Hospital } from "@shared/schema";

interface HospitalCardProps {
  hospital: Hospital;
  index: number;
}

const specializationColors: Record<string, string> = {
  "Cardiac": "bg-emergency/10 text-emergency border-emergency/20",
  "Trauma": "bg-warning/10 text-warning border-warning/20",
  "Neurological": "bg-info/10 text-info border-info/20",
  "Respiratory": "bg-success/10 text-success border-success/20",
  "Burn": "bg-emergency/10 text-emergency border-emergency/20",
  "Orthopedic": "bg-muted/50 text-foreground border-border",
  "General": "bg-primary/10 text-primary border-primary/20",
};

export function HospitalCard({ hospital, index }: HospitalCardProps) {
  const badgeColor = specializationColors[hospital.specialization] || specializationColors["General"];

  return (
    <Card 
      className="overflow-hidden hover-elevate transition-all border-2" 
      data-testid={`card-hospital-${index}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-1" data-testid={`text-hospital-name-${index}`}>
              {hospital.name}
            </h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {hospital.address}
            </p>
          </div>
          <Badge className={`${badgeColor} border font-medium`} data-testid={`badge-specialization-${index}`}>
            {hospital.specialization}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Distance</p>
            <p className="text-2xl font-bold text-primary" data-testid={`text-distance-${index}`}>
              {hospital.distance}
            </p>
          </div>
          {hospital.available && (
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              <Clock className="h-3 w-3 mr-1" />
              Available Now
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Emergency Services:</p>
          <div className="flex flex-wrap gap-2">
            {hospital.emergencyServices.map((service, idx) => (
              <Badge 
                key={idx} 
                variant="secondary" 
                className="text-xs"
                data-testid={`badge-service-${index}-${idx}`}
              >
                {service.includes("Ambulance") && <Ambulance className="h-3 w-3 mr-1" />}
                {service}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button
            variant="outline"
            className="gap-2"
            data-testid={`button-call-${index}`}
            asChild
          >
            <a href={`tel:${hospital.contactNumber.replace(/\D/g, '')}`}>
              <Phone className="h-4 w-4" />
              Call Now
            </a>
          </Button>
          <Button
            className="gap-2 bg-primary hover:bg-primary/90"
            data-testid={`button-navigate-${index}`}
            asChild
          >
            <a href={hospital.mapUrl} target="_blank" rel="noopener noreferrer">
              <Navigation className="h-4 w-4" />
              Navigate
            </a>
          </Button>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Phone className="h-3 w-3" />
            <span className="font-mono" data-testid={`text-contact-${index}`}>{hospital.contactNumber}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
