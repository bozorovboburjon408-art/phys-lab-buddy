import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Sparkles, Globe } from "lucide-react";

const AIAssistant = () => {
  const [customUrl, setCustomUrl] = useState("");

  const handleOpenGemini = () => {
    window.open("https://gemini.google.com/app", "_blank");
  };

  const handleOpenCustomUrl = () => {
    if (!customUrl.trim()) return;
    let url = customUrl.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
            AI Yordamchi
          </h1>
          
          {/* Google Gemini Card */}
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

          {/* Custom URL Card */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Globe className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Boshqa sayt</h3>
                <p className="text-sm text-muted-foreground">O'z saytingizni kiriting</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="https://chatgpt.com"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleOpenCustomUrl()}
              />
              <Button onClick={handleOpenCustomUrl} disabled={!customUrl.trim()}>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AIAssistant;
