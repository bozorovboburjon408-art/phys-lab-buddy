import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sparkles, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AIAssistant = () => {
  const [link, setLink] = useState("");
  const { toast } = useToast();

  const handleOpen = () => {
    if (!link.trim()) {
      toast({
        title: "Xatolik",
        description: "Iltimos, linkni kiriting",
        variant: "destructive",
      });
      return;
    }

    // Add https:// if not present
    let url = link.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleOpen();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-2">AI Yordamchi</h1>
            <p className="text-muted-foreground">
              O'zingizning AI xizmatingizga kirish
            </p>
          </div>

          {/* Link Input Card */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm p-8">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground">
                Linkni kiriting
              </label>
              <Input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="https://gemini.google.com"
                className="text-base"
              />
              <Button
                onClick={handleOpen}
                className="w-full"
                size="lg"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Ochish
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AIAssistant;
