import { AlertTriangle, Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-emergency" />
              <h3 className="font-semibold text-foreground">Emergency Disclaimer</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              MediAssist is an AI-powered recommendation tool. In critical emergencies, 
              <strong className="text-foreground"> always call 911 immediately</strong>. 
              This app provides guidance but should not replace professional medical advice or emergency services.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Powered by AI</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Our recommendations are powered by Google's Gemini AI to analyze your symptoms and 
              match you with specialized hospitals. Hospital data is continuously updated for accuracy.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} MediAssist. All rights reserved.</p>
          <p className="flex items-center gap-2">
            Emergency Hotline: 
            <a href="tel:911" className="font-mono font-semibold text-emergency hover:underline">
              911
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
