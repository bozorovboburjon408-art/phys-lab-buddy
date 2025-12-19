import { Header } from "@/components/layout/Header";
import { AboutBackground } from "@/components/animations/AboutBackground";
import { Atom, Users, Target, BookOpen, Code, Heart, GraduationCap, Mail } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <AboutBackground />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden">
        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="absolute inset-0 -mx-8 -my-4 bg-background/60 backdrop-blur-sm rounded-3xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8 fade-in-up">
                <Atom className="w-4 h-4" />
                Ilova haqida
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 fade-in-up stagger-1">
                <span className="gradient-text">PhysicsLab</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto fade-in-up stagger-2">
                O'zbek yoshlari uchun interaktiv fizika o'rganish platformasi. 
                Fizika qonunlarini amaliy tajribalar orqali o'rganing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 mb-8 fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Maqsadimiz</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                PhysicsLab - bu fizikani sodda va qiziqarli tarzda o'rgatish uchun yaratilgan bepul platformadir. 
                Biz har bir o'quvchiga fizika qonunlarini nafaqat nazariy, balki amaliy jihatdan ham tushunish 
                imkoniyatini berishni maqsad qilganmiz. Interaktiv animatsiyalar va virtual laboratoriyalar 
                orqali murakkab tushunchalarni oson o'zlashtirishingiz mumkin.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="glass-card p-6 fade-in-up stagger-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">20+ Interaktiv Animatsiyalar</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Mayatnik harakati, erkin tushish, to'lqinlar, elektr maydon va boshqa ko'plab 
                  fizik hodisalarni real vaqtda kuzating.
                </p>
              </div>

              <div className="glass-card p-6 fade-in-up stagger-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">Virtual Laboratoriyalar</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  To'liq jihozlangan virtual laboratoriyalarda tajribalar o'tkazing, ma'lumotlarni 
                  yig'ing va natijalarni tahlil qiling.
                </p>
              </div>

              <div className="glass-card p-6 fade-in-up stagger-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Code className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">Avtomatik Hisoblash</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Boshlang'ich qiymatlarni kiriting va tizim formulalar asosida barcha 
                  natijalarni avtomatik hisoblaydi.
                </p>
              </div>

              <div className="glass-card p-6 fade-in-up stagger-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold">Barcha Uchun Bepul</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Platformadan foydalanish butunlay bepul. Hech qanday ro'yxatdan o'tish 
                  yoki to'lov talab qilinmaydi.
                </p>
              </div>
            </div>

            {/* Developer Section */}
            <div className="glass-card p-8 fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Yaratuvchi haqida</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Ushbu platforma O'zbekistondagi o'quvchilar va talabalar uchun fizikani 
                oson va qiziqarli o'rganish imkoniyatini berish maqsadida yaratilgan. 
                Loyiha doimiy rivojlanmoqda va yangi animatsiyalar, laboratoriya ishlari 
                qo'shilmoqda.
              </p>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl">
                  👨‍💻
                </div>
                <div>
                  <p className="font-semibold">PhysicsLab Jamoasi</p>
                  <p className="text-sm text-muted-foreground">O'zbekiston</p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mt-8 text-center fade-in-up">
              <div className="glass-card p-6 inline-block">
                <div className="flex items-center gap-3 justify-center mb-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="font-medium">Aloqa</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Takliflar va savollar uchun biz bilan bog'laning
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>© 2025 PhysicsLab - Interaktiv fizika platformasi</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
