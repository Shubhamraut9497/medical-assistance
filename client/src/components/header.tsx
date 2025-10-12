import { Activity, Phone } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
            <Activity className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground" data-testid="text-app-name">
              MediAssist
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">AI-Powered Emergency Care</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            data-testid="button-emergency-call"
            asChild
          >
            <a href="tel:911">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">911</span>
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
