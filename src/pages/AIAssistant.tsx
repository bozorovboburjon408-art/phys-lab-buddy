import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";

const AIAssistant = () => {
  const handleOpenGemini = () => {
    window.open("https://gemini.google.com/app", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
            AI Yordamchi
          </h1>
          
          <Card className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                Google Gemini AI
              </h2>
              <p className="text-muted-foreground">
                Fizika savollari bo'yicha yordam olish uchun Google Gemini AI dan foydalaning.
                U sizga formulalar, tushuntirishlar va masalalar yechishda yordam beradi.
              </p>
            </div>

            <Button 
              size="lg" 
              onClick={handleOpenGemini}
              className="gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Gemini AI ga o'tish
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AIAssistant;
