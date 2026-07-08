import { Shell } from "@/components/Shell";
import { Link } from "wouter";
import { book, getUnit } from "@/data/book";
import { ContentRenderer } from "@/components/Renderer";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function UnitPage({ params }: { params: { stageId: string; unitId: string } }) {
  const unit = getUnit(params.stageId, params.unitId);

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!unit) return;
    try {
      const saved = localStorage.getItem("smart_code_progress");
      if (saved) {
        const parsed = JSON.parse(saved);
        setIsCompleted(parsed.includes(unit.id));
      } else {
        setIsCompleted(false);
      }
    } catch (e) {}
    window.scrollTo(0, 0);
  }, [unit]);

  const toggleComplete = () => {
    if (!unit) return;
    try {
      const saved = localStorage.getItem("smart_code_progress");
      let parsed: string[] = saved ? JSON.parse(saved) : [];

      if (isCompleted) {
        parsed = parsed.filter(id => id !== unit.id);
      } else {
        if (!parsed.includes(unit.id)) parsed.push(unit.id);
      }

      localStorage.setItem("smart_code_progress", JSON.stringify(parsed));
      setIsCompleted(!isCompleted);
      window.dispatchEvent(new Event('storage'));
    } catch (e) {}
  };

  if (!unit) {
    return (
      <Shell>
        <div className="p-12 text-center text-muted-foreground">
          <h2 className="text-2xl font-bold mb-2 text-foreground">عفواً، هذه الوحدة غير موجودة.</h2>
          <Link href="/toc" className="text-primary hover:underline">العودة للفهرس</Link>
        </div>
      </Shell>
    );
  }

  // Calculate prev/next
  const allUnits: { sId: string; uId: string; title: string }[] = [];
  book.stages.forEach(s => s.units.forEach(u => allUnits.push({ sId: s.id, uId: u.id, title: u.title })));

  const currentIndex = allUnits.findIndex(u => u.uId === unit.id);
  const prevUnit = currentIndex > 0 ? allUnits[currentIndex - 1] : null;
  const nextUnit = currentIndex < allUnits.length - 1 ? allUnits[currentIndex + 1] : null;

  return (
    <Shell>
      <div className="max-w-3xl mx-auto px-6 py-10 lg:py-16 page-break">

        {/* Header */}
        <div className="mb-10 text-center animate-in slide-in-from-bottom-4 duration-500">
          <div className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-sm font-bold tracking-wider mb-4 border border-border">
            الوحدة {unit.unitNumber}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4 leading-tight">
            {unit.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            {unit.description}
          </p>
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert prose-lg max-w-none text-foreground/90">
          <ContentRenderer nodes={unit.content} />
        </div>

        {/* Completion */}
        <div className="mt-16 p-6 bg-card border border-border rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 no-print shadow-sm">
          <div>
            <h3 className="font-bold text-lg mb-1">هل أتممت هذه الوحدة بنجاح؟</h3>
            <p className="text-sm text-muted-foreground">اضغط لتعليم الوحدة كمكتملة وتحديث شريط تقدمك.</p>
          </div>
          <Button
            size="lg"
            variant={isCompleted ? "default" : "outline"}
            className={`gap-2 min-w-[200px] ${isCompleted ? 'bg-green-600 hover:bg-green-700 text-white border-green-600' : ''}`}
            onClick={toggleComplete}
          >
            <CheckCircle className={`w-5 h-5 ${isCompleted ? 'opacity-100' : 'opacity-50'}`} />
            {isCompleted ? "مكتملة ✓" : "تحديد كمكتملة"}
          </Button>
        </div>

        {/* Prev / Next Navigation */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
          {nextUnit ? (
            <Link href={`/stage/${nextUnit.sId}/unit/${nextUnit.uId}`}>
              <Button variant="ghost" className="gap-2 w-full sm:w-auto h-auto py-3 text-right justify-start group">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs text-muted-foreground uppercase">التالي</span>
                  <span className="font-bold">{nextUnit.title}</span>
                </div>
              </Button>
            </Link>
          ) : (
            <div />
          )}

          {prevUnit ? (
            <Link href={`/stage/${prevUnit.sId}/unit/${prevUnit.uId}`}>
              <Button variant="ghost" className="gap-2 w-full sm:w-auto h-auto py-3 text-left justify-end group">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-muted-foreground uppercase">السابق</span>
                  <span className="font-bold">{prevUnit.title}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:text-background transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                </div>
              </Button>
            </Link>
          ) : (
            <div />
          )}
        </div>

      </div>
    </Shell>
  );
}
