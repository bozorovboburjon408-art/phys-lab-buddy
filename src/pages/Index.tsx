import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Atom, FlaskConical, Sparkles, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 physics-grid opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8">
              <Sparkles className="w-4 h-4" />
              Interaktiv fizika platformasi
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Fizikani</span>
              <br />
              <span className="text-foreground">mustaqil o'rganing</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              20+ interaktiv animatsiya va laboratoriya ishlari bilan fizika qonunlarini 
              amaliy o'rganing. Parametrlarni o'zgartiring va natijalarni real vaqtda kuzating.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/animations">
                <Button variant="glow" size="lg" className="w-full sm:w-auto">
                  <Atom className="w-5 h-5 mr-2" />
                  Animatsiyalar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/laboratories">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <FlaskConical className="w-5 h-5 mr-2" />
                  Laboratoriyalar
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon="🎯"
              title="Interaktiv simulyatsiyalar"
              description="Mayatnik, erkin tushish, to'lqin harakati va boshqa mavzularda real vaqtda animatsiyalar"
            />
            <FeatureCard
              icon="🔬"
              title="Virtual laboratoriyalar"
              description="Maqsad, nazariya, asboblar va avtomatik hisoblashli jadvallar bilan to'liq laboratoriya ishlari"
            />
            <FeatureCard
              icon="⚡"
              title="Parametrlarni boshqarish"
              description="Massa, uzunlik, tezlik va boshqa parametrlarni o'zgartirib, natijalarni kuzating"
            />
            <FeatureCard
              icon="📊"
              title="Avtomatik hisoblash"
              description="Boshlang'ich qiymatlarni kiriting va tizim formulalar asosida natijalarni hisoblaydi"
            />
          </div>
        </div>
      </section>

      {/* Topics Preview */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Mavzular ro'yxati
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Oddiy mayatnik",
              "Gorizontal otilgan jism",
              "Prujinali tebranish",
              "To'lqin harakati",
              "Erkin tushish",
              "Elastik to'qnashuv",
              "Qiya tekislik",
              "Aylana bo'ylab harakat",
            ].map((topic, i) => (
              <div
                key={topic}
                className="glass-card p-4 text-center hover:glow-border transition-all duration-300"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-sm">{topic}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link to="/animations">
              <Button variant="ghost" className="text-primary">
                Barcha mavzularni ko'rish
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>© 2024 PhysicsLab - Interaktiv fizika platformasi</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => (
  <div className="glass-card p-6 hover:glow-border transition-all duration-300 group">
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

export default Index;
