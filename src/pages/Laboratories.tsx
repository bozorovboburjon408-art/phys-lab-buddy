import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { LabTable } from "@/components/laboratory/LabTable";
import { laboratories } from "@/data/laboratories";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Target, Wrench, BookOpen, ListOrdered, Table } from "lucide-react";

const Laboratories = () => {
  const [selectedLab, setSelectedLab] = useState(laboratories[0]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Laboratoriya ishlari</h1>
            <p className="text-muted-foreground">
              Tajribani tanlang, nazariyani o'qing va jadvalga qiymatlarni kiritib natijalarni kuzating
            </p>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            {/* Sidebar - Lab List */}
            <div className="space-y-2">
              <h2 className="text-sm font-medium text-muted-foreground mb-4 px-2">
                LABORATORIYA ISHLARI
              </h2>
              <div className="space-y-1">
                {laboratories.map((lab, index) => (
                  <button
                    key={lab.id}
                    onClick={() => setSelectedLab(lab)}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg transition-all duration-200",
                      "hover:bg-secondary/80",
                      selectedLab.id === lab.id
                        ? "bg-primary/10 border border-primary/30 text-primary"
                        : "bg-card border border-transparent text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-mono">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium">{lab.titleUz}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              {/* Lab Header */}
              <div className="glass-card p-6 glow-border">
                <h2 className="text-2xl font-bold mb-2">{selectedLab.titleUz}</h2>
                <p className="text-muted-foreground">{selectedLab.title}</p>
              </div>

              {/* Lab Sections */}
              <Accordion type="multiple" defaultValue={["purpose", "equipment", "theory", "procedure", "table"]} className="space-y-4">
                {/* Purpose */}
                <AccordionItem value="purpose" className="glass-card border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Ishning maqsadi</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-foreground">{selectedLab.purposeUz}</p>
                    <p className="text-muted-foreground text-sm mt-2">{selectedLab.purpose}</p>
                  </AccordionContent>
                </AccordionItem>

                {/* Equipment */}
                <AccordionItem value="equipment" className="glass-card border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Wrench className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Kerakli asbob va uskunalar</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <ul className="space-y-2">
                      {selectedLab.equipmentUz.map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                {/* Theory */}
                <AccordionItem value="theory" className="glass-card border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Nazariy qism</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-foreground leading-relaxed">{selectedLab.theoryUz}</p>
                    <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                      <p className="text-sm text-muted-foreground italic">{selectedLab.theory}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Procedure */}
                <AccordionItem value="procedure" className="glass-card border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <ListOrdered className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Ishni bajarish tartibi</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <ol className="space-y-3">
                      {selectedLab.procedureUz.map((step, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-mono shrink-0">
                            {i + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </AccordionContent>
                </AccordionItem>

                {/* Table */}
                <AccordionItem value="table" className="glass-card border-none">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <Table className="w-5 h-5 text-primary" />
                      <span className="font-semibold">Natijalar jadvali</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-muted-foreground text-sm mb-4">
                      Boshlang'ich qiymatlarni kiriting. Tizim avtomatik ravishda hisoblangan qiymatlarni to'ldiradi.
                    </p>
                    <LabTable
                      columns={selectedLab.tableColumns}
                      calculations={selectedLab.calculations}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Laboratories;
