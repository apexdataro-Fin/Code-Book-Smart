import { Shell } from "@/components/Shell";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { BookOpen } from "lucide-react";

export default function Cover() {
  return (
    <Shell>
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-6 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-2xl w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">

          {/* Cover Art */}
          <div className="w-32 h-32 mx-auto bg-primary text-primary-foreground rounded-2xl flex items-center justify-center rotate-3 shadow-xl mb-12">
            <div className="text-5xl font-mono font-bold">&lt;/&gt;</div>
          </div>

          <div className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-sm tracking-widest border border-secondary/20">
              إصدار 2026
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-primary tracking-tight">
              Smart Code
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold text-foreground/80 mt-4 leading-relaxed">
              هندسة البرمجيات والبرمجة بمساعدة الذكاء الاصطناعي
            </h2>

            <p className="text-lg text-muted-foreground max-w-lg mx-auto pt-6 leading-relaxed">
              دليل شامل من حل المشكلات بـ Python وحتى بناء أنظمة احترافية. تعلم التفكير المنطقي، اكتب كوداً نظيفاً، واستخدم الذكاء الاصطناعي لتضاعف إنتاجيتك.
            </p>
          </div>

          <div className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/intro">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8 h-14 rounded-xl">
                <BookOpen className="w-5 h-5" />
                ابدأ القراءة
              </Button>
            </Link>
            <Link href="/toc">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8 h-14 rounded-xl">
                تصفح الفهرس
              </Button>
            </Link>
          </div>

          <div className="pt-16 text-sm text-muted-foreground font-medium">
            14 وحدة · 4 مراحل · مشروع نهائي متكامل
          </div>

        </div>
      </div>
    </Shell>
  );
}
