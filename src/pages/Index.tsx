import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Atom, FlaskConical, Sparkles, ArrowRight } from "lucide-react";
import { PhysicsBackground } from "@/components/animations/PhysicsBackground";
const Index = () => {
  return <div className="min-h-screen bg-background relative">
      <PhysicsBackground />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 physics-grid opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
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
              
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{
            icon: "🎯",
            title: "Interaktiv simulyatsiyalar",
            description: "Mayatnik, erkin tushish, to'lqin harakati va boshqa mavzularda real vaqtda animatsiyalar"
          }, {
            icon: "🔬",
            title: "Virtual laboratoriyalar",
            description: "Maqsad, nazariya, asboblar va avtomatik hisoblashli jadvallar bilan to'liq laboratoriya ishlari"
          }, {
            icon: "⚡",
            title: "Parametrlarni boshqarish",
            description: "Massa, uzunlik, tezlik va boshqa parametrlarni o'zgartirib, natijalarni kuzating"
          }, {
            icon: "📊",
            title: "Avtomatik hisoblash",
            description: "Boshlang'ich qiymatlarni kiriting va tizim formulalar asosida natijalarni hisoblaydi"
          }].map((feature, i) => <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} delay={i} />)}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>© 2025 PhysicsLab - Interaktiv fizika platformasi</p>
        </div>
      </footer>
    </div>;
};
const FeatureCard = ({
  icon,
  title,
  description,
  delay
}: {
  icon: string;
  title: string;
  description: string;
  delay: number;
}) => <div className="glass-card p-6 hover:glow-border transition-all duration-500 group cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20 relative overflow-hidden fade-in-up" style={{
  animationDelay: `${delay * 0.1}s`
}}>
    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-accent/10 transition-all duration-500" />
    <div className="relative z-10">
      <div className="text-4xl mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 inline-block">{icon}</div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
      <p className="text-muted-foreground text-sm group-hover:text-foreground/80 transition-colors duration-300">{description}</p>
    </div>
  </div>;
export default Index;