import { Link, useLocation } from "wouter";
import { book } from "@/data/book";
import { BookOpen, List, GraduationCap, Menu, X, TerminalSquare, BookMarked, CodeXml, Moon, Sun, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { downloadDocx } from "@/lib/docxExport";

export function Sidebar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [location] = useLocation();
  const [completedUnits, setCompletedUnits] = useState<string[]>([]);

  useEffect(() => {
    const load = () => {
      try {
        const saved = localStorage.getItem("smart_code_progress");
        if (saved) setCompletedUnits(JSON.parse(saved));
      } catch (e) {}
    };
    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const totalUnits = book.stages.reduce((acc, stage) => acc + stage.units.length, 0);
  const progressPercent = totalUnits > 0 ? Math.round((completedUnits.length / totalUnits) * 100) : 0;

  const NavItem = ({ href, icon: Icon, label, isActive, onClick }: { href: string; icon: React.ComponentType<{className?: string}>; label: string; isActive: boolean; onClick?: () => void }) => (
    <Link href={href} onClick={onClick}>
      <span className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer ${
        isActive
          ? "bg-primary/10 text-primary font-semibold"
          : "hover:bg-muted text-foreground/80 hover:text-foreground"
      }`}>
        <Icon className="w-4 h-4 shrink-0" />
        <span className="truncate">{label}</span>
      </span>
    </Link>
  );

  const closeIfMobile = () => {
    if (window.innerWidth < 1024) setOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar — desktop slides off-screen when closed, mobile slides on */}
      <aside className={`fixed top-0 bottom-0 right-0 z-50 w-72 bg-card border-l border-border flex flex-col transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}>

        <div className="h-14 border-b border-border flex items-center px-4 justify-between shrink-0">
          <Link href="/">
            <span className="font-bold text-lg text-primary flex items-center gap-2 cursor-pointer">
              <CodeXml className="w-5 h-5" />
              Smart Code
            </span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} title="إغلاق القائمة">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 border-b border-border shrink-0 bg-muted/30">
          <div className="text-xs font-semibold mb-2 text-muted-foreground">نسبة الإنجاز: {progressPercent}%</div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          <div className="space-y-1">
            <NavItem href="/" icon={BookOpen} label="غلاف الكتاب" isActive={location === "/"} onClick={closeIfMobile} />
            <NavItem href="/intro" icon={GraduationCap} label="المقدمة" isActive={location === "/intro"} onClick={closeIfMobile} />
            <NavItem href="/toc" icon={List} label="الفهرس التفصيلي" isActive={location === "/toc"} onClick={closeIfMobile} />
          </div>

          {book.stages.map((stage) => (
            <div key={stage.id} className="space-y-1">
              <div className="text-xs font-bold text-muted-foreground mb-2 px-3 uppercase tracking-wider">
                المرحلة {stage.stageNumber}: {stage.title}
              </div>
              {stage.units.map((unit) => {
                const unitPath = `/stage/${stage.id}/unit/${unit.id}`;
                const isCurrent = location === unitPath;
                const isCompleted = completedUnits.includes(unit.id);

                return (
                  <Link key={unit.id} href={unitPath} onClick={closeIfMobile}>
                    <span className={`flex items-start gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer text-sm ${
                      isCurrent
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted text-foreground/80 hover:text-foreground"
                    }`}>
                      <span className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] mt-0.5 ${
                        isCompleted
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-muted-foreground/30 text-muted-foreground"
                      }`}>
                        {isCompleted ? "✓" : unit.unitNumber}
                      </span>
                      <span className="leading-snug">{unit.title}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          ))}

          <div className="space-y-1 border-t border-border pt-4">
            <NavItem href="/prompts" icon={TerminalSquare} label="مكتبة الـ Prompts" isActive={location === "/prompts"} onClick={closeIfMobile} />
            <NavItem href="/appendix" icon={BookMarked} label="الملاحق المرجعية" isActive={location === "/appendix"} onClick={closeIfMobile} />
            <NavItem href="/capstone" icon={GraduationCap} label="المشروع النهائي" isActive={location === "/capstone"} onClick={closeIfMobile} />
          </div>
        </div>
      </aside>
    </>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  // P1 fix: sidebar is now toggleable on BOTH mobile and desktop,
  // persisted in localStorage. Desktop users regain ~290px of reading
  // width when they collapse the sidebar via the header button.
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('sc_sidebar_open');
    if (saved !== null) return saved === 'true';
    // On small screens default to closed (drawer pattern); on desktop
    // default to open so the existing layout is preserved.
    return window.innerWidth >= 1024;
  });
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sc_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('sc_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('sc_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    try {
      localStorage.setItem('sc_sidebar_open', String(sidebarOpen));
    } catch (e) {
      /* localStorage unavailable — ignore */
    }
  }, [sidebarOpen]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadDocx();
    } catch (e) {
      console.error('DOCX generation failed', e);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* P1 fix: sidebar right-padding tracks `sidebarOpen` on desktop too.
          Fully closed on desktop collapses to 0 padding for maximum reading
          width. On mobile the sidebar slides over content, so no padding. */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        sidebarOpen ? 'lg:pr-72' : 'lg:pr-0'
      }`}>
        <header className="h-14 border-b border-border bg-card/80 backdrop-blur sticky top-0 z-30 flex items-center justify-between px-4 no-print">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(v => !v)}
              title={sidebarOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={isDownloading}
              className="gap-2 text-sm text-muted-foreground hover:text-foreground"
              title="تحميل الكتاب بصيغة Word"
            >
              <Download className="w-4 h-4" />
              {isDownloading ? "جاري التحميل..." : "تحميل DOCX"}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDark(d => !d)}
              title={isDark ? "الوضع النهاري" : "الوضع الليلي"}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
