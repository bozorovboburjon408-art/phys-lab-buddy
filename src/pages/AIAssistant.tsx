import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ExternalLink, Sparkles, Globe, Plus, X, MessageCircle } from "lucide-react";

const AIAssistant = () => {
  const [customUrl, setCustomUrl] = useState("");
  const defaultSites = [{ name: "grok.com", url: "https://grok.com" }];
  const [savedSites, setSavedSites] = useState<{ name: string; url: string }[]>(defaultSites);

  useEffect(() => {
    // Reset to default (only grok.com)
    localStorage.setItem("savedAISites", JSON.stringify(defaultSites));
    setSavedSites(defaultSites);
  }, []);

  const handleOpenGemini = () => {
    window.open("https://gemini.google.com/app", "_blank");
  };

  const handleOpenGrok = () => {
    window.open("https://grok.com", "_blank");
  };

  const handleOpenCustomUrl = () => {
    if (!customUrl.trim()) return;
    let url = customUrl.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    window.open(url, "_blank");
  };

  const handleSaveSite = () => {
    if (!customUrl.trim()) return;
    let url = customUrl.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    const name = url.replace(/^https?:\/\//, "").split("/")[0];
    const newSites = [...savedSites, { name, url }];
    setSavedSites(newSites);
    localStorage.setItem("savedAISites", JSON.stringify(newSites));
    setCustomUrl("");
  };

  const handleRemoveSite = (index: number) => {
    const newSites = savedSites.filter((_, i) => i !== index);
    setSavedSites(newSites);
    localStorage.setItem("savedAISites", JSON.stringify(newSites));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-2xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-foreground mb-6 text-center">
            AI Yordamchi
          </h1>
          
          {/* Grok Chat Card */}
          <Card className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-foreground">
                Grok Chat
              </h2>
              <p className="text-muted-foreground">
                Fizika savollari bo'yicha yordam olish uchun Grok AI dan foydalaning.
              </p>
            </div>

            <Button 
              size="lg" 
              onClick={handleOpenGrok}
              className="gap-2"
            >
              <ExternalLink className="w-5 h-5" />
              Grok ga o'tish
            </Button>
          </Card>

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
                <h3 className="font-semibold text-foreground">Sayt qo'shish</h3>
                <p className="text-sm text-muted-foreground">Saytni kiriting va saqlang</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input
                placeholder="https://chatgpt.com"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveSite()}
              />
              <Button onClick={handleOpenCustomUrl} disabled={!customUrl.trim()} variant="outline">
                <ExternalLink className="w-4 h-4" />
              </Button>
              <Button onClick={handleSaveSite} disabled={!customUrl.trim()}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Saved Sites */}
            {savedSites.length > 0 && (
              <div className="space-y-2 pt-2">
                <p className="text-sm text-muted-foreground">Saqlangan saytlar:</p>
                <div className="flex flex-wrap gap-2">
                  {savedSites.map((site, index) => (
                    <div key={index} className="flex items-center gap-1 bg-secondary rounded-lg pl-3 pr-1 py-1">
                      <button
                        onClick={() => window.open(site.url, "_blank")}
                        className="text-sm text-foreground hover:text-primary"
                      >
                        {site.name}
                      </button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleRemoveSite(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AIAssistant;
