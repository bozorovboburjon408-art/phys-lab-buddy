import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { AboutBackground } from "@/components/animations/AboutBackground";
import { Atom, Users, Target, BookOpen, Code, Heart, GraduationCap, Mail, Plus, Pencil, Trash2, ExternalLink, Upload, X, Award, Phone } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
interface TeamMember {
  id: string;
  name: string;
  username: string | null;
  avatar_url: string | null;
  social_link: string | null;
  sort_order: number;
}
interface Teacher {
  id: string;
  name: string;
  username: string | null;
  avatar_url: string | null;
  social_link: string | null;
  position: string | null;
  sort_order: number;
}
const About = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTeacherDialog, setShowTeacherDialog] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    avatar_url: "",
    social_link: ""
  });
  const [teacherFormData, setTeacherFormData] = useState({
    name: "",
    username: "",
    avatar_url: "",
    social_link: "",
    position: ""
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [teacherAvatarFile, setTeacherAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const {
    toast
  } = useToast();
  useEffect(() => {
    fetchTeamMembers();
    fetchTeachers();
  }, []);
  const fetchTeamMembers = async () => {
    const {
      data,
      error
    } = await supabase.from("team_members").select("*").order("sort_order", {
      ascending: true
    });
    if (!error && data) {
      setTeamMembers(data);
    }
  };
  const fetchTeachers = async () => {
    const {
      data,
      error
    } = await supabase.from("teachers").select("*").order("sort_order", {
      ascending: true
    });
    if (!error && data) {
      setTeachers(data);
    }
  };
  const handleAdminLogin = async () => {
    try {
      const {
        data,
        error
      } = await supabase.functions.invoke("lab-admin", {
        body: {
          password: adminPassword,
          action: "verify"
        }
      });
      if (error) throw error;
      if (data?.success) {
        setIsAdmin(true);
        setShowAdminDialog(false);
        toast({
          title: "Admin rejimi faollashtirildi"
        });
      } else {
        toast({
          title: "Noto'g'ri parol",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        variant: "destructive"
      });
    }
  };
  const resetForm = () => {
    setFormData({
      name: "",
      username: "",
      avatar_url: "",
      social_link: ""
    });
    setAvatarFile(null);
    setEditingMember(null);
  };
  const resetTeacherForm = () => {
    setTeacherFormData({
      name: "",
      username: "",
      avatar_url: "",
      social_link: "",
      position: ""
    });
    setTeacherAvatarFile(null);
    setEditingTeacher(null);
  };
  const uploadAvatar = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const {
      error
    } = await supabase.storage.from('team-avatars').upload(fileName, file);
    if (error) {
      console.error("Avatar upload error:", error);
      return null;
    }
    const {
      data: urlData
    } = supabase.storage.from('team-avatars').getPublicUrl(fileName);
    return urlData.publicUrl;
  };
  const handleSave = async () => {
    try {
      setUploading(true);
      const {
        data: authData
      } = await supabase.functions.invoke("lab-admin", {
        body: {
          password: adminPassword,
          action: "verify"
        }
      });
      if (!authData?.success) {
        toast({
          title: "Admin huquqi yo'q",
          variant: "destructive"
        });
        return;
      }
      let avatarUrl = formData.avatar_url;

      // Upload avatar if file is selected
      if (avatarFile) {
        const uploadedUrl = await uploadAvatar(avatarFile);
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        } else {
          toast({
            title: "Rasm yuklanmadi",
            variant: "destructive"
          });
          return;
        }
      }
      const memberData = {
        name: formData.name,
        username: formData.username || null,
        avatar_url: avatarUrl || null,
        social_link: formData.social_link || null
      };
      if (editingMember) {
        const {
          error
        } = await supabase.functions.invoke("lab-admin", {
          body: {
            password: adminPassword,
            action: "update-team-member",
            memberId: editingMember.id,
            memberData
          }
        });
        if (error) throw error;
        toast({
          title: "A'zo yangilandi"
        });
      } else {
        const {
          error
        } = await supabase.functions.invoke("lab-admin", {
          body: {
            password: adminPassword,
            action: "add-team-member",
            memberData
          }
        });
        if (error) throw error;
        toast({
          title: "A'zo qo'shildi"
        });
      }
      setShowAddDialog(false);
      resetForm();
      fetchTeamMembers();
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const {
        error
      } = await supabase.functions.invoke("lab-admin", {
        body: {
          password: adminPassword,
          action: "delete-team-member",
          memberId: id
        }
      });
      if (error) throw error;
      toast({
        title: "A'zo o'chirildi"
      });
      fetchTeamMembers();
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        variant: "destructive"
      });
    }
  };

  // Teacher CRUD functions
  const handleSaveTeacher = async () => {
    try {
      setUploading(true);
      const {
        data: authData
      } = await supabase.functions.invoke("lab-admin", {
        body: {
          password: adminPassword,
          action: "verify"
        }
      });
      if (!authData?.success) {
        toast({
          title: "Admin huquqi yo'q",
          variant: "destructive"
        });
        return;
      }
      let avatarUrl = teacherFormData.avatar_url;
      if (teacherAvatarFile) {
        const uploadedUrl = await uploadAvatar(teacherAvatarFile);
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
        } else {
          toast({
            title: "Rasm yuklanmadi",
            variant: "destructive"
          });
          return;
        }
      }
      const teacherData = {
        name: teacherFormData.name,
        username: teacherFormData.username || null,
        avatar_url: avatarUrl || null,
        social_link: teacherFormData.social_link || null,
        position: teacherFormData.position || null
      };
      if (editingTeacher) {
        const {
          error
        } = await supabase.functions.invoke("lab-admin", {
          body: {
            password: adminPassword,
            action: "update-teacher",
            teacherId: editingTeacher.id,
            teacherData
          }
        });
        if (error) throw error;
        toast({
          title: "Ustoz yangilandi"
        });
      } else {
        const {
          error
        } = await supabase.functions.invoke("lab-admin", {
          body: {
            password: adminPassword,
            action: "add-teacher",
            teacherData
          }
        });
        if (error) throw error;
        toast({
          title: "Ustoz qo'shildi"
        });
      }
      setShowTeacherDialog(false);
      resetTeacherForm();
      fetchTeachers();
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };
  const handleDeleteTeacher = async (id: string) => {
    try {
      const {
        error
      } = await supabase.functions.invoke("lab-admin", {
        body: {
          password: adminPassword,
          action: "delete-teacher",
          teacherId: id
        }
      });
      if (error) throw error;
      toast({
        title: "Ustoz o'chirildi"
      });
      fetchTeachers();
    } catch (error) {
      toast({
        title: "Xatolik yuz berdi",
        variant: "destructive"
      });
    }
  };
  const openEditTeacherDialog = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setTeacherFormData({
      name: teacher.name,
      username: teacher.username || "",
      avatar_url: teacher.avatar_url || "",
      social_link: teacher.social_link || "",
      position: teacher.position || ""
    });
    setTeacherAvatarFile(null);
    setShowTeacherDialog(true);
  };
  const openEditDialog = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      username: member.username || "",
      avatar_url: member.avatar_url || "",
      social_link: member.social_link || ""
    });
    setAvatarFile(null);
    setShowAddDialog(true);
  };
  return <div className="min-h-screen bg-background relative">
      <AboutBackground />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden z-[2]">
        <div className="container mx-auto relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="absolute inset-0 -mx-8 -my-4 bg-card/30 backdrop-blur-[2px] rounded-3xl border border-primary/10" />
            
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
      <section className="py-16 px-4 relative z-[2]">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 mb-8 fade-in-up bg-card/90">
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
              <div className="glass-card p-6 fade-in-up stagger-1 bg-card/90">
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

              <div className="glass-card p-6 fade-in-up stagger-2 bg-card/90">
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

              <div className="glass-card p-6 fade-in-up stagger-3 bg-card/90">
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

              <div className="glass-card p-6 fade-in-up stagger-4 bg-card/90">
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
            <div className="glass-card p-8 fade-in-up bg-card/90">
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
              
              <div className="flex flex-col items-center gap-4 p-4 rounded-xl bg-muted/30 text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl">
                  👨‍💻
                </div>
                <div>
                  <p className="font-semibold">Alpha jamoasi</p>
                  <p className="text-sm text-muted-foreground">O'zbekiston</p>
                </div>
              </div>
            </div>

            {/* Team Members Section */}
            <div className="glass-card p-8 mt-8 fade-in-up bg-card/90">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Jamoa A'zolari</h2>
                </div>
                
                {!isAdmin ? <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Admin</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Admin kirish</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div>
                          <Label>Parol</Label>
                          <Input type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} placeholder="Admin parolini kiriting" />
                        </div>
                        <Button onClick={handleAdminLogin} className="w-full">Kirish</Button>
                      </div>
                    </DialogContent>
                  </Dialog> : <Button onClick={() => {
                resetForm();
                setShowAddDialog(true);
              }} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    A'zo qo'shish
                  </Button>}
              </div>

              {teamMembers.length === 0 ? <p className="text-muted-foreground text-center py-8">
                  Hozircha jamoa a'zolari qo'shilmagan
                </p> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teamMembers.map(member => <div key={member.id} className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors group">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        {member.avatar_url ? <img src={member.avatar_url} alt={member.name} className="w-full h-full object-cover" /> : <span className="text-lg font-bold text-white">{member.name.charAt(0)}</span>}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{member.name}</p>
                        {member.social_link ? <a href={member.social_link.startsWith('http') ? member.social_link : `https://${member.social_link}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                            {member.username ? `@${member.username}` : 'Telegram'}
                            <ExternalLink className="w-3 h-3" />
                          </a> : member.username ? <p className="text-sm text-muted-foreground">@{member.username}</p> : null}
                      </div>
                      {isAdmin && <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(member)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>}
                    </div>)}
                </div>}
            </div>

            {/* Teachers Section */}
            <div className="glass-card p-8 mt-8 fade-in-up bg-card/90">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Award className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-2xl font-bold">Ustozlarimiz</h2>
                </div>
                
                {isAdmin && <Button onClick={() => {
                resetTeacherForm();
                setShowTeacherDialog(true);
              }} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Ustoz qo'shish
                  </Button>}
              </div>

              {teachers.length === 0 ? <p className="text-muted-foreground text-center py-8">
                  Hozircha ustozlar qo'shilmagan
                </p> : <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teachers.map(teacher => <div key={teacher.id} className="flex items-center gap-3 p-4 rounded-xl bg-muted/30 border border-border/50 hover:border-accent/30 transition-colors group">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                        {teacher.avatar_url ? <img src={teacher.avatar_url} alt={teacher.name} className="w-full h-full object-cover" /> : <span className="text-lg font-bold text-white">{teacher.name.charAt(0)}</span>}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{teacher.name}</p>
                        {teacher.position && <p className="text-xs text-accent">{teacher.position}</p>}
                        {teacher.social_link ? <a href={teacher.social_link.startsWith('http') ? teacher.social_link : `https://${teacher.social_link}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                            {teacher.username ? `@${teacher.username}` : 'Telegram'}
                            <ExternalLink className="w-3 h-3" />
                          </a> : teacher.username ? <p className="text-sm text-muted-foreground">@{teacher.username}</p> : null}
                      </div>
                      {isAdmin && <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button variant="ghost" size="icon" onClick={() => openEditTeacherDialog(teacher)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteTeacher(teacher.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>}
                    </div>)}
                </div>}
            </div>

            {/* Contact Section */}
            <div className="mt-8 text-center fade-in-up">
              <div className="glass-card p-6 inline-block bg-card/90">
                <div className="flex items-center gap-3 justify-center mb-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="font-medium">Aloqa</span>
                </div>
                <p className="text-muted-foreground text-sm mb-2">
                  Takliflar va savollar uchun biz bilan bog'laning
                </p>
                <div className="flex flex-col gap-1 items-center text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <a href="tel:+998912508281" className="text-foreground hover:text-primary transition-colors">
                      +998 91 250 82 81
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <a href="tel:+998886852277" className="text-foreground hover:text-primary transition-colors">
                      +998 88 685 22 77
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog} onOpenChange={open => {
      setShowAddDialog(open);
      if (!open) resetForm();
    }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingMember ? "A'zoni tahrirlash" : "Yangi a'zo qo'shish"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label>Ism</Label>
              <Input value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} placeholder="Masalan: Azamat Karimov" />
            </div>
            <div>
              <Label>Username (ixtiyoriy)</Label>
              <Input value={formData.username} onChange={e => setFormData({
              ...formData,
              username: e.target.value
            })} placeholder="Masalan: Azamat3434" />
            </div>
            <div>
              <Label>Rasm yuklash</Label>
              {formData.avatar_url && !avatarFile ? <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border">
                  <img src={formData.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                  <span className="flex-1 text-sm text-muted-foreground truncate">Joriy rasm</span>
                  <Button type="button" variant="ghost" size="icon" onClick={() => setFormData({
                ...formData,
                avatar_url: ""
              })} className="h-8 w-8 text-destructive hover:text-destructive">
                    <X className="w-4 h-4" />
                  </Button>
                </div> : <div className="flex items-center gap-2">
                  <Input type="file" accept="image/*" onChange={e => setAvatarFile(e.target.files?.[0] || null)} className="flex-1" />
                </div>}
              {avatarFile && <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-muted/50 border border-border">
                  <span className="flex-1 text-sm text-muted-foreground truncate">{avatarFile.name}</span>
                  <Button type="button" variant="ghost" size="icon" onClick={() => setAvatarFile(null)} className="h-8 w-8 text-destructive hover:text-destructive">
                    <X className="w-4 h-4" />
                  </Button>
                </div>}
            </div>
            <div>
              <Label>Ijtimoiy tarmoq havolasi (ixtiyoriy)</Label>
              <Input value={formData.social_link} onChange={e => setFormData({
              ...formData,
              social_link: e.target.value
            })} placeholder="https://t.me/username" />
            </div>
            <Button onClick={handleSave} className="w-full" disabled={uploading}>
              {uploading ? "Yuklanmoqda..." : editingMember ? "Saqlash" : "Qo'shish"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Teacher Dialog */}
      <Dialog open={showTeacherDialog} onOpenChange={open => {
      setShowTeacherDialog(open);
      if (!open) resetTeacherForm();
    }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTeacher ? "Ustozni tahrirlash" : "Yangi ustoz qo'shish"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label>Ism</Label>
              <Input value={teacherFormData.name} onChange={e => setTeacherFormData({
              ...teacherFormData,
              name: e.target.value
            })} placeholder="Masalan: Azamat Karimov" />
            </div>
            <div>
              <Label>Lavozim (ixtiyoriy)</Label>
              <Input value={teacherFormData.position} onChange={e => setTeacherFormData({
              ...teacherFormData,
              position: e.target.value
            })} placeholder="Masalan: Fizika o'qituvchisi" />
            </div>
            <div>
              <Label>Username (ixtiyoriy)</Label>
              <Input value={teacherFormData.username} onChange={e => setTeacherFormData({
              ...teacherFormData,
              username: e.target.value
            })} placeholder="Masalan: Azamat3434" />
            </div>
            <div>
              <Label>Rasm yuklash</Label>
              {teacherFormData.avatar_url && !teacherAvatarFile ? <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border">
                  <img src={teacherFormData.avatar_url} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                  <span className="flex-1 text-sm text-muted-foreground truncate">Joriy rasm</span>
                  <Button type="button" variant="ghost" size="icon" onClick={() => setTeacherFormData({
                ...teacherFormData,
                avatar_url: ""
              })} className="h-8 w-8 text-destructive hover:text-destructive">
                    <X className="w-4 h-4" />
                  </Button>
                </div> : <div className="flex items-center gap-2">
                  <Input type="file" accept="image/*" onChange={e => setTeacherAvatarFile(e.target.files?.[0] || null)} className="flex-1" />
                </div>}
              {teacherAvatarFile && <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-muted/50 border border-border">
                  <span className="flex-1 text-sm text-muted-foreground truncate">{teacherAvatarFile.name}</span>
                  <Button type="button" variant="ghost" size="icon" onClick={() => setTeacherAvatarFile(null)} className="h-8 w-8 text-destructive hover:text-destructive">
                    <X className="w-4 h-4" />
                  </Button>
                </div>}
            </div>
            <div>
              <Label>Ijtimoiy tarmoq havolasi (ixtiyoriy)</Label>
              <Input value={teacherFormData.social_link} onChange={e => setTeacherFormData({
              ...teacherFormData,
              social_link: e.target.value
            })} placeholder="https://t.me/username" />
            </div>
            <Button onClick={handleSaveTeacher} className="w-full" disabled={uploading}>
              {uploading ? "Yuklanmoqda..." : editingTeacher ? "Saqlash" : "Qo'shish"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border relative z-[2]">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>© 2025 PhysicsLab - Interaktiv fizika platformasi</p>
        </div>
      </footer>
    </div>;
};
export default About;