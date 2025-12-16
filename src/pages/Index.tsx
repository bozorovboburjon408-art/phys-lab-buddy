import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Atom, FlaskConical, Sparkles, ArrowRight } from "lucide-react";
import { PhysicsBackground } from "@/components/animations/PhysicsBackground";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <PhysicsBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 physics-grid opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Semi-transparent backdrop for better readability */}
            <div className="absolute inset-0 -mx-8 -my-4 bg-background/60 backdrop-blur-sm rounded-3xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8 fade-in-up">
                <Sparkles className="w-4 h-4" />
                Interaktiv fizika platformasi
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 fade-in-up stagger-1">
                <span className="gradient-text drop-shadow-lg">Fizikani</span>
                <br />
                <span className="text-foreground drop-shadow-md">mustaqil o'rganing</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto fade-in-up stagger-2 drop-shadow-sm">
                20+ interaktiv animatsiya va laboratoriya ishlari bilan fizika qonunlarini 
                amaliy o'rganing. Parametrlarni o'zgartiring va natijalarni real vaqtda kuzating.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up stagger-3">
                <Link to="/animations">
                  <Button variant="glow" size="lg" className="w-full sm:w-auto group">
                    <Atom className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                    Animatsiyalar
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/laboratories">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto group">
                    <FlaskConical className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Laboratoriyalar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🎯", title: "Interaktiv simulyatsiyalar", description: "Mayatnik, erkin tushish, to'lqin harakati va boshqa mavzularda real vaqtda animatsiyalar" },
              { icon: "🔬", title: "Virtual laboratoriyalar", description: "Maqsad, nazariya, asboblar va avtomatik hisoblashli jadvallar bilan to'liq laboratoriya ishlari" },
              { icon: "⚡", title: "Parametrlarni boshqarish", description: "Massa, uzunlik, tezlik va boshqa parametrlarni o'zgartirib, natijalarni kuzating" },
              { icon: "📊", title: "Avtomatik hisoblash", description: "Boshlang'ich qiymatlarni kiriting va tizim formulalar asosida natijalarni hisoblaydi" },
            ].map((feature, i) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Topics Preview */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 slide-in-bottom">
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
                className="glass-card p-4 text-center hover:glow-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 fade-in-up cursor-pointer group"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="text-sm group-hover:text-primary transition-colors">{topic}</span>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8 fade-in-up" style={{ animationDelay: '0.5s' }}>
            <Link to="/animations">
              <Button variant="ghost" className="text-primary group">
                Barcha mavzularni ko'rish
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
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
  delay,
}: {
  icon: string;
  title: string;
  description: string;
  delay: number;
}) => (
  <div 
    className="glass-card p-6 hover:glow-border transition-all duration-500 group cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 relative overflow-hidden fade-in-up"
    style={{ animationDelay: `${delay * 0.1}s` }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-accent/10 transition-all duration-500" />
    <div className="relative z-10">
      <div className="text-4xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 inline-block">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">{description}</p>
    </div>
  </div>
);

export default Index;