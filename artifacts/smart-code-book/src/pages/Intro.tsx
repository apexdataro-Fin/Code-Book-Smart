import { Shell } from '@/components/Shell';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BookText, Search, RotateCcw } from 'lucide-react';
import { incorrectQuestions, useQuizStats } from '@/lib/quiz';
import { useProgress } from '@/lib/progress';
import { overallProgress, totalUnitCount } from '@/lib/curriculum';

export default function Intro() {
  const [progress] = useProgress();
  const [stats] = useQuizStats();
  const overall = overallProgress(new Set(Object.keys(progress.completed)));
  const total = totalUnitCount();
  const incorrectCount = incorrectQuestions(999, stats).length;

  return (
    <Shell>
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-8 animate-in fade-in duration-500">
        <h1 className="text-4xl font-black text-primary mb-8 border-b pb-4">المقدمة</h1>

        <div className="prose dark:prose-invert prose-lg max-w-none space-y-6">
          <p className="lead text-xl text-foreground/80 font-medium">
            مرحباً بك في <strong>Smart Code</strong>. هذا الكتاب لم يُكتب ليعلمك مجرد أدوات، بل صُمم ليعلمك <em>كيف تفكر كمهندس</em>.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">لمن هذا الكتاب؟</h2>
          <p>
            هذا الكتاب موجه للجميع. لا يهم إن لم تكتب سطراً برمجياً في حياتك. سنبدأ معك من الصفر: من التفكير المنطقي وحل المشكلات، ثم أساسيات Python، وصولاً إلى بناء تطبيقات احترافية ونشرها على الإنترنت.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">كيف تستخدم هذا الكتاب؟</h2>
          <ul className="list-disc ms-6 space-y-2">
            <li><strong>لا تتخطَ المرحلة الأولى:</strong> حتى وإن بدت أساسية، فهي الأساس الذي يبني لغة التفكير الخوارزمي اللازمة لكل ما بعدها.</li>
            <li><strong>اكتب الكود بيدك:</strong> القراءة لا تكفي. انسخ الأكواد وجربها بنفسك، وعدّلها لترى ماذا سيحدث.</li>
            <li><strong>المراجعة النشطة (Active Recall):</strong> في نهاية كل وحدة ستجد أسئلة. حاول الإجابة عليها قبل فتح الجواب. هذا يثبت المعلومة في الدماغ.</li>
            <li><strong>استخدم الملاحق:</strong> ستجد مكتبة من الأوامر (Prompts) لتسأل الذكاء الاصطناعي بشكل احترافي ليساعدك في الفهم.</li>
            <li><strong>حمّل الكتاب:</strong> يمكنك تحميل الكتاب كاملاً بصيغة DOCX من زر "تحميل DOCX" في الشريط العلوي للقراءة دون إنترنت.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">خريطة التعلم</h2>
          <div className="grid gap-4 mt-4">
            <div className="p-4 border rounded-lg bg-card">
              <div className="font-bold text-primary mb-1">المرحلة 1: حل المشكلات والبرمجة بـ Python</div>
              <div className="text-sm text-muted-foreground">التفكير الخوارزمي، المتغيرات وأنواع البيانات، التحكم في التدفق، الدوال، ومجموعات البيانات.</div>
            </div>
            <div className="p-4 border rounded-lg bg-card">
              <div className="font-bold text-primary mb-1">المرحلة 2: مفاهيم متقدمة في البرمجة</div>
              <div className="text-sm text-muted-foreground">الخوارزميات وتحليل التعقيد (Big O)، البرمجة كائنية التوجه (OOP) بـ Java، معالجة الأخطاء، والعمل كفريق بـ Git.</div>
            </div>
            <div className="p-4 border rounded-lg bg-card">
              <div className="font-bold text-primary mb-1">المرحلة 3: الأنظمة والهيكلية</div>
              <div className="text-sm text-muted-foreground">TypeScript وبناء REST APIs، قواعد البيانات PostgreSQL، نشر التطبيقات بـ Docker، وأمن الويب.</div>
            </div>
            <div className="p-4 border rounded-lg bg-card">
              <div className="font-bold text-primary mb-1">المرحلة 4: المشهد التقني</div>
              <div className="text-sm text-muted-foreground">أطر العمل الحديثة، مبادئ التصميم SOLID، الاختبارات، و CI/CD، ثم بناء مسيرتك المهنية.</div>
            </div>
          </div>

          <div className="mt-8 p-5 border rounded-xl bg-muted/40 border-secondary/20">
            <p className="font-bold text-secondary mb-2">🤖 عن استخدام الذكاء الاصطناعي في الكتاب</p>
            <p className="text-sm">ستجد في كل وحدة تلميحات بأيقونة "✨" هي أوامر Prompts جاهزة يمكنك نسخها وإرسالها لـ ChatGPT أو Claude لتعميق الفهم وحل التمارين. الذكاء الاصطناعي ليس بديلاً عن التعلم، بل مرشدٌ يسرّعه.</p>
          </div>
        </div>

        {/* Quick links */}
        <div className="pt-8 mt-12 flex flex-wrap items-center justify-end gap-3 text-sm">
          <Link href="/roadmap" className="px-3 py-2 rounded-md border border-border bg-card hover:border-primary/40 hover:text-primary transition-colors flex items-center gap-2">
            <BookText className="w-4 h-4" />
            خارطة المنهج
          </Link>
          <Link href="/search" className="px-3 py-2 rounded-md border border-border bg-card hover:border-primary/40 hover:text-primary transition-colors flex items-center gap-2">
            <Search className="w-4 h-4" />
            بحث سريع
          </Link>
          {incorrectCount > 0 && (
            <Link href="/quiz/review" className="px-3 py-2 rounded-md border border-secondary/40 bg-secondary/5 text-secondary hover:bg-secondary/10 transition-colors flex items-center gap-2">
              <RotateCcw className="w-4 h-4" />
              مراجعة {incorrectCount} سؤالاً خاطئاً
            </Link>
          )}
        </div>

        <div className="pt-6 border-t mt-4 flex justify-end">
          <Link href="/stage/stage-1/unit/unit-2">
            <Button size="lg" className="gap-2">
              ابدأ بالوحدة الأولى
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {overall.done > 0 && (
          <p className="mt-6 text-xs text-center text-muted-foreground" dir="rtl">
            سمحت بإكمال {overall.done} من {total} وحدة ({overall.percent}%).
          </p>
        )}
      </div>
    </Shell>
  );
}
