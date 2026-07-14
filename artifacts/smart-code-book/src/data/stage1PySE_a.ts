import type { UnitDef } from './types';

/**
 * Smart Code — Python Software Engineering (Section A, part 1, lessons 1–6).
 *
 *   🆕 Additive only — these 6 units are appended to stage-1 in book.ts.
 *   🆕 Unique ids (`unit-pyse-1` … `unit-pyse-6`) avoid clashing with
 *      the book.ts sibling stages (stage-1..stage-4 use plain unit-2..unit-15).
 *   🆕 Unit numbers 100–105 sit above the existing global 1–14 sequence
 *      to guarantee cross-stage uniqueness.
 *   🆕 All 14 lesson-template steps present per unit, no step reduced to
 *      a header shell (per Smart Code convention).
 */
export const stage1PySeA: UnitDef[] = [
  // ─────────────────────────────────────────────────────────────────────
  // L1 — Project Structure (when one file isn't enough)
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'unit-pyse-1',
    stageId: 'stage-1',
    unitNumber: 100,
    title: 'بنية المشروع في Python',
    description:
      'متى تُقسِّم البرنامج إلى أكثر من ملف: __init__.py، الحزم (packages)، وأنماط الاستيراد absolute مقابل relative.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 1: بنية المشروع في Python' },
      {
        type: 'p',
        content:
          'يحتاج أي برنامج حقيقي يحتوي على أكثر من ~300 سطر إلى تقسيمه إلى ملفات. هذه الوحدة تشرح أنماط تنظيم المشروع الصحيحة في Python قبل أن تنتقل إلى الـ Testing والـ Deployment.',
      },
      {
        type: 'h2',
        content: '1. الفكرة (Concept)',
      },
      {
        type: 'p',
        content:
          'الحزمة (Package) في Python هي مجلد يحتوي ملف __init__.py (فارغ أو يحمل كود تهيئة). كل ملف ذو امتداد .py داخل الحزمة هو Module يمكن استيراد محتواه. يتيح لك هذا تجميع الدوال المرتبطة منطقياً في وحدة واحدة قابلة لإعادة الاستخدام.',
      },
      {
        type: 'h2',
        content: '2. لماذا يهم (Why It Matters)',
      },
      {
        type: 'p',
        content:
          'بحلول نهاية هذه السلسلة ستكون قد كتبت كوداً يستورد من عدة ملفات، يكتب سكريبتات CLI، يستخدم pytest، ويوزع مشروعك على PyPI. كل تلك الأدوات تفترض أن مشروعك منظَّم في بنية واضحة. مشاريع بدون بنية تتحول بسرعة إلى فوضى يصعب صيانتها أو مشاركتها مع الفريق.',
      },
      {
        type: 'h2',
        content: '3. النموذج الذهني (Mental Model)',
      },
      {
        type: 'ascii',
        content: `
my_project/
├── pyproject.toml          ← تعريف المشروع + التبعيات
├── README.md               ← توثيق
├── src/
│   └── my_project/         ← الحزمة الرئيسية
│       ├── __init__.py     ← يجعل المجلد package
│       ├── __main__.py     ← نقطة دخول python -m my_project
│       ├── cli.py          ← argparse
│       ├── core.py         ← منطق الأعمال
│       └── utils.py        ← دوال مساعدة
└── tests/
    ├── __init__.py
    └── test_core.py
`,
      },
      {
        type: 'h2',
        content: '4. مخطط Mermaid',
      },
      {
        type: 'code',
        language: 'mermaid',
        title: 'كيف يبحث Python عن الاستيراد',
        content: `flowchart LR
  A[import my_module] --> B{المسار في sys.path؟}
  B -- نعم --> C[تحميل my_module.py]
  B -- لا --> D[تحميل مجلد my_module/__init__.py]
  C --> E[تنفيذ الكود مرة واحدة]
  D --> E
  E --> F[ربط الاسم في namespace المستورد]`,
      },
      {
        type: 'h2',
        content: '5. مثال عملي (Code Example)',
      },
      {
        type: 'code',
        language: 'python',
        title: 'src/my_project/core.py',
        content: `"""منطق الأعمال للحاسبة."""

def add(a: float, b: float) -> float:
    return a + b

def subtract(a: float, b: float) -> float:
    return a - b

# متغير مستوى الوحدة — يتنفذ مرة واحدة عند أول استيراد
PI: float = 3.14159`,
      },
      {
        type: 'code',
        language: 'python',
        title: 'src/my_project/__init__.py',
        content: `"""نصدّر الواجهة العامة للحزمة."""
from .core import add, subtract

__all__ = ["add", "subtract"]
__version__ = "1.0.0"`,
      },
      {
        type: 'code',
        language: 'python',
        title: 'src/my_project/cli.py',
        content: `"""نقطة دخول CLI تستورد من core."""
from .core import add

def run() -> None:
    print(f"3 + 4 = {add(3, 4)}")`,
      },
      {
        type: 'h2',
        content: '6. شرح الكود (Walkthrough)',
      },
      {
        type: 'p',
        content:
          'لاحظ: core.py يحتوي دوالاً صرفة، __init__.py يصدّر واجهة عامة ضيقة (لا تصدّر _helpers الخاصة)، cli.py يستورد من core بنقطة (.) تدل على استيراد relative من نفس الحزمة. هذا الفصل يجعل الاستيراد من خارج الحزمة (from my_project import add) ممكناً ويخفي التفاصيل الداخلية.',
      },
      {
        type: 'h2',
        content: '7. أخطاء شائعة + أفضل الممارسات',
      },
      {
        type: 'ul',
        items: [
          [{ type: 'p', content: 'وضع __init__.py فارغاً تماماً مقبول — لا تكثر من المنطق فيه.' }],
          [{ type: 'p', content: 'الاستيراد المعماري: core لا يستورد من cli، لكن cli يستورد من core. اتجاه واحد.' }],
          [{ type: 'p', content: 'تجنّب from module import * — يكسر القراءة ويصعّب التتبع.' }],
        ],
      },
      {
        type: 'callout',
        calloutType: 'best-practice',
        title: 'قاعدة اتجاه الاستيراد',
        content: [
          {
            type: 'p',
            content:
              'الطبقات العليا (cli, app) تستورد من الأدنى (core, utils). الأدنى لا يعلم بوجود الأعلى. هذا يمنع الـ Circular imports ويسهّل الاختبار.',
          },
        ],
      },
      {
        type: 'h2',
        content: '8. مع الذكاء الاصطناعي (AI Tip)',
      },
      {
        type: 'callout',
        calloutType: 'ai-tip',
        title: 'Prompt مفيد',
        content: [
          {
            type: 'p',
            content:
              '«أعد تنظيم هذا السكريبت في حزمة Python مع __init__.py و cli.py و core.py. أبقِ الواجهة العامة كما هي. اشرح لي سبب كل تغيير قبل تطبيقه.» — تحقق دائماً أن الكود الناتج يعمل قبل الـ Commit.',
          },
        ],
      },
      {
        type: 'h2',
        content: '9. ملخص (Summary)',
      },
      {
        type: 'p',
        content:
          'الحزمة = مجلد بـ __init__.py. المجلدات الفرعية حزم فرعية. الاستيراد absolute يستخدم اسم الحزمة الكامل، relative يستخدم النقاط من موقع الملف الحالي. __all__ = الواجهة العامة. الاتجاه المعماري: cli → core → utils، وليس العكس.',
      },
      {
        type: 'active-recall',
        questions: [
          { q: 'ما الذي يجعل المجلد Python package؟', a: 'وجود ملف __init__.py داخل المجلد، حتى لو كان فارغاً.' },
          { q: 'متى تفضّل الاستيراد absolute ومتى relative؟', a: 'absolute بين الحزم المختلفة (from my_project.core import add)، وrelative داخل نفس الحزمة (from .core import add).' },
          { q: 'لماذا نضع __all__ في __init__.py؟', a: 'يحدد الواجهة العامة للحزمة، وعند from package import * يُصدّر فقط ما في __all__، ما يحمي التفاصيل الداخلية.' },
          { q: 'ما المشكلة في from module import * في الكود الإنتاجي؟', a: 'يدخل اسماً غير متوقع إلى الـ namespace، يصعّب قراءة الكود، ويصعّب تتبع مصدر أي دالة أو ثابت.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // L2 — if __name__ == "__main__" + argparse
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'unit-pyse-2',
    stageId: 'stage-1',
    unitNumber: 101,
    title: 'نقطة الدخول و argparse',
    description:
      '__name__ == "__main__"، __main__.py، وبناء CLI احترافي بمكتبة argparse المدمجة.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 2: نقطة الدخول و argparse' },
      {
        type: 'p',
        content:
          'كل مشروع Python يستحق نقطة دخول صريحة. هذه الوحدة تشرح __name__ و __main__.py وكيف تبني واجهة CLI حقيقية بـ argparse دون أي مكتبة خارجية.',
      },
      { type: 'h2', content: '1. الفكرة' },
      {
        type: 'p',
        content:
          'عند تشغيل ملف Python مباشرةً، __name__ يحمل "__main__". عند استيراده كوحدة، __name__ يحمل اسم الوحدة. هذا يتيح للملف الواحد أن يكون قابلاً للاستيراد وقابلاً للتشغيل: السلوك مختلف حسب طريقة الاستدعاء.',
      },
      { type: 'h2', content: '2. لماذا يهم' },
      {
        type: 'p',
        content:
          'بدون نقطة دخول واضحة، يصبح المشروع كومة من السكريبتات. argparse يتيح لك بناء CLI بمعطيات اختيارية وإلزامية، رسائل مساعدة، وأنواع مخصصة — مجاناً، بدون pip install.',
      },
      { type: 'h2', content: '3. النموذج الذهني' },
      {
        type: 'ascii',
        content: `
$ python script.py     → __name__ == "__main__"
$ import script        → __name__ == "script"
$ python -m my_pkg      → my_pkg/__main__.py يُشغَّل

if __name__ == "__main__":
    # هنا السلوك "التشغيلي": قراءة الوسائط، استدعاء main()
    pass
`,
      },
      { type: 'h2', content: '4. مخطط Mermaid' },
      {
        type: 'code',
        language: 'mermaid',
        title: 'دورة حياة argparse',
        content: `flowchart TD
  A[ArgumentParser] --> B[add_argument × N]
  B --> C[parse_args]
  C --> D{الوسائط صالحة؟}
  D -- نعم --> E[args namespace]
  D -- لا --> F[usage + exit 2]
  E --> G[main args]`,
      },
      { type: 'h2', content: '5. مثال عملي' },
      {
        type: 'code',
        language: 'python',
        title: 'src/my_project/cli.py — CLI احترافي',
        content: `"""نقطة دخول CLI مع argparse."""
from __future__ import annotations
import argparse
import sys
from pathlib import Path
from .core import add, subtract

def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(
        prog="calc",
        description="حاسبة بسيطة كـ CLI",
    )
    p.add_argument("a", type=float, help="الرقم الأول")
    p.add_argument("b", type=float, help="الرقم الثاني")
    p.add_argument(
        "--op", "-o",
        choices=["add", "sub"],
        default="add",
        help="العملية (افتراضي: add)",
    )
    p.add_argument(
        "--version", "-V",
        action="store_true",
        help="اطبع الإصدار واخرج",
    )
    return p

def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)

    if args.version:
        from . import __version__
        print(f"calc {__version__}")
        return 0

    result = add(args.a, args.b) if args.op == "add" else subtract(args.a, args.b)
    print(f"{args.a} {'+' if args.op == 'add' else '-'} {args.b} = {result}")
    return 0

if __name__ == "__main__":
    sys.exit(main())`,
      },
      { type: 'h2', content: '6. شرح الكود' },
      {
        type: 'p',
        content:
          'build_parser يفصل تعريف الوسائط عن التنفيذ، مما يسهّل اختبار الـ parser. main() يأخذ argv كمعطى (قابل للاختبار فارغ الوسيطات) ويُرجع exit code. sys.exit(main()) يسمح بإرجاع 0 للنجاح ورقم آخر للفشل، وهو ما تتوقعه أدوات الـ CI.',
      },
      { type: 'h2', content: '7. أخطاء شائعة' },
      {
        type: 'ul',
        items: [
          [{ type: 'p', content: 'تشغيل منطق بدون if __name__ == "__main__" — الكود يعمل عند الاستيراد كأثر جانبي.' }],
          [{ type: 'p', content: 'مزج print بـ argparse — استخدم stderr للأخطاء.' }],
          [{ type: 'p', content: 'نسيان نوع الوسيط (type=float) — النص يصبح string ويكسر الحساب.' }],
        ],
      },
      {
        type: 'callout',
        calloutType: 'best-practice',
        title: 'افصل parser عن التنفيذ',
        content: [
          {
            type: 'p',
            content:
              'اجعل build_parser() دالة مستقلة بحيث يمكنك اختبار الوسائط دون تشغيل main(). هذا نمط Arrange-Act-Assert الذي سنطبّقه لاحقاً على pytest.',
          },
        ],
      },
      { type: 'h2', content: '8. مع الذكاء الاصطناعي' },
      {
        type: 'callout',
        calloutType: 'ai-tip',
        title: 'Prompt مفيد',
        content: [
          {
            type: 'p',
            content:
              '«أضف واجهة argparse لهذا السكريبت بقبول معطى مطلوب path ووسيمتين -v/--verbose و --dry-run. اكتب اختبارات سريعة لبناء الـ parser قبل الكود.»',
          },
        ],
      },
      { type: 'h2', content: '9. ملخص' },
      {
        type: 'p',
        content:
          '__name__ == "__main__" هو البوابة بين "تشغيل مباشر" و"استيراد". argparse يبني CLI احترافياً بدون dependencies. main() يُرجع exit code. __main__.py يفعّل python -m.',
      },
      {
        type: 'active-recall',
        questions: [
          { q: 'ماذا تحتوي __name__ عند تشغيل الملف مباشرة؟', a: '"__main__". وعلامة "__" تشير إلى أن الاسم محجوز للنظام.' },
          { q: 'ما فائدة add_argument("a", type=float)؟', a: 'تحويل الوسيط النصي من sys.argv إلى float قبل تسليمه args، وإعطاء رسالة خطأ واضحة إن فشل التحويل.' },
          { q: 'لماذا نُرجع int من main()؟', a: 'إنه exit code: 0 للنجاح، غير صفر للخطأ. أدوات CI/scripts تعتمد عليه لاتخاذ القرار.' },
          { q: 'ما مزيج python -m my_project عن python my_project.py؟', a: 'الـ -m يستخدم __main__.py، يضيف مجلد المشروع إلى sys.path تلقائياً، ويعمل من حيثما كنت في المجلد.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // L3 — Virtual Environments (venv)
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'unit-pyse-3',
    stageId: 'stage-1',
    unitNumber: 102,
    title: 'البيئات الافتراضية',
    description: 'لماذا وكيف تُنشئ بيئة افتراضية مستقلة لكل مشروع عبر python -m venv.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 3: البيئات الافتراضية (venv)' },
      {
        type: 'p',
        content:
          'أول لحظة تُكمل فيها هذا الكتاب ستجد نفسك أمام خطأ ModuleNotFoundError لأن الحزمة غير مثبتة. السبب المعتاد: بيئة Python العالمية فارغة. هذه الوحدة تمنحك العادة التي ستُنقذك لبقية حياتك المهنية.',
      },
      { type: 'h2', content: '1. الفكرة' },
      {
        type: 'p',
        content:
          'البيئة الافتراضية هي مجلد يحتوي نسخة Python خاصة + مجلد site-packages مستقل. كل مشروع له بيئته، الحزم المثبتة فيه لا تتسرب إلى مشاريع أخرى ولا إلى النظام.',
      },
      { type: 'h2', content: '2. لماذا يهم' },
      {
        type: 'p',
        content:
          'بدون بيئة افتراضية، pip install requests يُثبّت requests عالمياً. لاحقاً مشروع آخر يحتاج requests==2.0 يكسر المشروع الأول. مع venv، كل مشروع له عالمه الخاص، قابل للتكرار بين الأجهزة، جاهز لـ CI/CD.',
      },
      { type: 'h2', content: '3. النموذج الذهني' },
      {
        type: 'ascii',
        content: `
النظام (System Python)
└── /usr/bin/python3     ← النسخة العامة

المشروع A
└── my_proj_a/.venv/
    ├── bin/python        ← نسخة خاصة
    └── lib/.../site-packages/
        ├── requests==2.31

المشروع B
└── my_proj_b/.venv/
    ├── bin/python
    └── lib/.../site-packages/
        ├── requests==2.28

لا تعارض. كل مشروع مستقل.
`,
      },
      { type: 'h2', content: '4. مخطط Mermaid' },
      {
        type: 'code',
        language: 'mermaid',
        title: 'متى تَستخدم بيئة جديدة',
        content: `flowchart TD
  A[مشروع جديد] --> B{هل يحتاج تبعيات؟}
  B -- لا --> Z[اترك النظام]
  B -- نعم --> C[python -m venv .venv]
  C --> D[source .venv/bin/activate]
  D --> E[pip install ...]
  E --> F[أضف .venv/ إلى .gitignore]
  F --> G[وثّق التبعيات في requirements.txt]`,
      },
      { type: 'h2', content: '5. مثال عملي' },
      {
        type: 'code',
        language: 'bash',
        title: 'إنشاء وتفعيل venv',
        content: `# إنشاء البيئة في مجلد .venv داخل المشروع
python3 -m venv .venv

# تفعيل على macOS / Linux
source .venv/bin/activate

# تفعيل على Windows (PowerShell)
.venv\\Scripts\\Activate.ps1

# اختبار التفعيل
which python     # يجب أن يُظهر .../my_proj/.venv/bin/python
python -m pip --version    # يجب أن يُشير إلى .venv/...

# الخروج من البيئة
deactivate`,
      },
      { type: 'h2', content: '6. شرح الكود' },
      {
        type: 'p',
        content:
          'python -m venv ينشئ المجلد فقط ولا يفعله. source activate يضيف .venv/bin إلى بداية PATH لتصبح أوامر python و pip تشير إلى النسخة المعزولة. ستلاحظ أن الـ prompt المعتاد يتحول ليُظهر (.venv). deactivate يُعيد PATH كما كان.',
      },
      { type: 'h2', content: '7. أخطاء شائعة' },
      {
        type: 'ul',
        items: [
          [{ type: 'p', content: 'نسيان إضافة .venv/ إلى .gitignore — رفع المجلد إلى Git ضخم وفوضوي.' }],
          [{ type: 'p', content: 'تفعيل بيئة خاطئة ثم تشغيل pip install — تُثبَّت في البيئة الخطأ.' }],
          [{ type: 'p', content: 'الاعتماد على النظام Python — لا تُكرّر أي مشروع يحوي تبعيات.' }],
        ],
      },
      {
        type: 'callout',
        calloutType: 'best-practice',
        title: '.venv واحد لكل مشروع',
        content: [
          {
            type: 'p',
            content:
              'اسم المجلد .venv هو المعيار المتفق عليه (نقطة في البداية تُخفيه في ls، git يتجاهله). لا تستخدم "venv" أو "env" أو "myenv" — التعارض مع الآخرين يضيع الوقت.',
          },
        ],
      },
      { type: 'h2', content: '8. مع الذكاء الاصطناعي' },
      {
        type: 'callout',
        calloutType: 'ai-tip',
        title: 'Prompt مفيد',
        content: [
          {
            type: 'p',
            content:
              '«أنشئ لي ملف README.md يشرح لمستخدم جديد: 1) كيفية إنشاء البيئة، 2) كيفية تفعيلها على macOS/Linux/Windows، 3) الأمر الذي يثبت كل التبعيات، 4) الأمر الذي يشغل الاختبارات.»',
          },
        ],
      },
      { type: 'h2', content: '9. ملخص' },
      {
        type: 'p',
        content:
          'python -m venv ينشئ، source activate يفعّل، deactivate يلغي. .venv/ يدخل .gitignore. كل مشروع بيئته الخاصة، لا حزم مشتركة مع النظام.',
      },
      {
        type: 'active-recall',
        questions: [
          { q: 'ما الفرق بين deactivate و rm -rf .venv؟', a: 'deactivate يلغي التفعيل دون حذف البيئة (يمكنك إعادة تفعيلها لاحقاً). rm -rf .venv يحذفها تماماً.' },
          { q: 'لماذا نستخدم python -m venv بدل venv مباشرة؟', a: 'الصيغة python -m venv تستخدم وحدة venv من المكتبة القياسية المرتبطة بنسخة Python المُستدعاة. هذا يضمن التوافق مع هذه النسخة تحديداً.' },
          { q: 'هل يجب رفع .venv/ إلى Git؟', a: 'لا. يجب إضافته إلى .gitignore. كل مطور ينشئ بيئته محلياً من requirements.txt.' },
          { q: 'متى تستخدم deactivate ومتى rm -rf؟', a: 'deactivate عند إيقاف العمل مؤقتاً. rm -rf عند تغيير تبعيات جذرية أو بدء مشروع جديد في نفس المجلد.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // L4 — pip + requirements.txt
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'unit-pyse-4',
    stageId: 'stage-1',
    unitNumber: 103,
    title: 'إدارة الحزم: pip و requirements.txt',
    description:
      'تثبيت التبعيات، تثبيت النسخ، pip freeze، ومتى تستخدم constraints vs requirements.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 4: إدارة الحزم (pip + requirements.txt)' },
      {
        type: 'p',
        content:
          'بعد إنشاء بيئة افتراضية، تحتاج تثبيت الحزم. pip هي الأداة القياسية، و requirements.txt هو ملف بسيط يوثّق ما يجب تثبيته. هذه الوحدة تجعل إعداد أي مشروع جديد قابلاً للتكرار بنسخة واحدة من أمر واحد.',
      },
      { type: 'h2', content: '1. الفكرة' },
      {
        type: 'p',
        content:
          'requirements.txt هو قائمة نصية، سطر لكل تبعية، بصيغة اسم الحزمة + قيد الإصدار. pip install -r requirements.txt يقرأ الملف ويُثبّت كل ما فيه. هذا يجعل "إعداد المشروع" قابلاً للتكرار بين المطورين، بين الأجهزة، وبين CI local.',
      },
      { type: 'h2', content: '2. لماذا يهم' },
      {
        type: 'p',
        content:
          'بدون requirements.txt، المطور الجديد يقضي يوماً يقرأ رسائل ModuleNotFoundError ليعرف ما ينقصه. مع CI، يبني المرآة Docker بنفس الطريقة في كل مرة. مع الإنتاج، يضمن فريق العمليات أن الحزم نفسها تعمل في كل مكان.',
      },
      { type: 'h2', content: '3. النموذج الذهني' },
      {
        type: 'ascii',
        content: `
              requirements.txt
              ┌─────────────────────────────┐
              │ requests==2.31.0            │
              │ pytest==8.0.0               │
              │ click>=8.1,<9               │
              │ -r dev-requirements.txt     │
              └─────────────────────────────┘
                              │
                              ▼
              pip install -r requirements.txt
                              │
                              ▼
              .venv/lib/.../site-packages/

النسخ المُثبّتة فعلياً تُلتقط عبر pip freeze.
`,
      },
      { type: 'h2', content: '4. مخطط Mermaid' },
      {
        type: 'code',
        language: 'mermaid',
        title: 'دورة كتابة requirements.txt',
        content: `flowchart LR
  A[اكتب الكود + pip install X] --> B[الكود يعمل محلياً]
  B --> C[أضف X==Y إلى requirements.txt]
  C --> D[git commit]
  D --> E[زميل آخر: pip install -r]
  E --> F{الكود يعمل؟}
  F -- نعم --> Z[تم]
  F -- لا --> C`,
      },
      { type: 'h2', content: '5. مثال عملي' },
      {
        type: 'code',
        language: 'text',
        title: 'requirements.txt',
        content: `# التبعيات الأساسية (production)
requests==2.31.0
pydantic==2.6.4

# تبعيات التطوير والاختبار — انقلها إلى dev-requirements.txt
-r dev-requirements.txt`,
      },
      {
        type: 'code',
        language: 'text',
        title: 'dev-requirements.txt',
        content: `pytest==8.0.0
pytest-cov==4.1.0
ruff==0.3.4`,
      },
      {
        type: 'code',
        language: 'bash',
        title: 'أوامر pip الشائعة',
        content: `# تثبيت حزمة واحدة
pip install requests

# تثبيت مع قيد إصدار
pip install "requests>=2.30,<3"

# تثبيت من ملف
pip install -r requirements.txt

# تثبيت قابل للتعديل (للتطوير على المكتبة نفسها)
pip install -e .

# قائمة الحزم المثبتة مع نسخها
pip freeze

# تجميد الإصدارات الفعلية في requirements
pip freeze > requirements.txt
pip freeze | grep -i requests >> requirements.txt

# إزالة تبعية
pip uninstall requests

# ترقية الكل (استخدم بحذر)
pip install --upgrade -r requirements.txt`,
      },
      { type: 'h2', content: '6. شرح الكود' },
      {
        type: 'p',
        content:
          '== تقيّد بدقة الإصدار (آمن لـ CI). >=,< يحدد مجالاً مقبولاً (مرن لكن قد يكسر عند إصدار جديد). -r يُدرج ملفاً آخر (تنظيم التبعيات الإنتاجية والـ dev في ملفين). -e . تثبيت قابل للتعديل يربط الحزمة بمجلد المشروع — يتيح تعديل المصدر دون إعادة التثبيت.',
      },
      { type: 'h2', content: '7. أخطاء شائعة' },
      {
        type: 'ul',
        items: [
          [{ type: 'p', content: 'كتابة pip freeze > requirements.txt دون تنسيق — يدخل pkg-resources والمكتبات العابرة.' }],
          [{ type: 'p', content: 'الإفراط في تقييد الإصدارات بـ == — يُصعّب الترقية.' }],
          [{ type: 'p', content: 'نسيان تحديث requirements.txt بعد إضافة pip install جديد.' }],
          [{ type: 'p', content: 'تثبيت على النظام بدل venv — فوضى البيئة.' }],
        ],
      },
      {
        type: 'callout',
        calloutType: 'best-practice',
        title: 'قيّد الإنتاج، اترك dev مرناً',
        content: [
          {
            type: 'p',
            content:
              'في requirements.txt للـ production: == أو ~= لقفل الإصدارات. في dev-requirements.txt: >= فقط. هذا يحقق التوازن بين الاستقرار ومرونة التطوير.',
          },
        ],
      },
      { type: 'h2', content: '8. مع الذكاء الاصطناعي' },
      {
        type: 'callout',
        calloutType: 'ai-tip',
        title: 'Prompt مفيد',
        content: [
          {
            type: 'p',
            content:
              '«افحص requirements.txt الحالي واقترح: 1) الحزم التي يجب ترقيتها للأمان، 2) الحزم التي يجب استبدالها بأخف، 3) الحزم المكررة. لا تغيّر شيئاً قبل موافقتي.»',
          },
        ],
      },
      { type: 'h2', content: '9. ملخص' },
      {
        type: 'p',
        content:
          'requirements.txt يوثّق التبعيات. pip install -r يُثبّتها. == للإنتاج، >= للـ dev. ملف منفصل للإنتاج والـ dev يقلّل المخاطر.',
      },
      {
        type: 'active-recall',
        questions: [
          { q: 'ما الفرق بين pip install و pip install -r؟', a: 'الأول يثبّت حزمة واحدة فقط. الثاني يقرأ ملفاً ويبثّت كل ما فيه.' },
          { q: 'متى تختار == ومتى >=؟', a: '== للإنتاج (تكرار دقيق). >= للـ dev ومرونة التجربة.' },
          { q: 'ماذا يفعل pip freeze؟', a: 'يعرض كل الحزم المثبتة بصيغة name==version، مفيد لتوليد requirements.txt دقيق.' },
          { q: 'لماذا تَفصل الإنتاج عن dev في ملفين؟', a: 'لتجنب تثبيت أدوات الاختبار في صورة Docker الإنتاجية، وللحفاظ على صورة صغيرة وآمنة.' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // L5 — pyproject.toml
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'unit-pyse-5',
    stageId: 'stage-1',
    unitNumber: 104,
    title: 'pyproject.toml الحديث',
    description: 'التعريف الموحَّد للمشروع: name، version، dependencies، scripts، tool config.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 5: pyproject.toml الحديث' },
      {
        type: 'p',
        content:
          'requirements.txt وحده لم يعد كافياً لمشاريع حقيقية. المعيار PEP 621 يتيح تعريف كل شيء في ملف واحد: التبعيات، نقطة الدخول، الإصدار، وأدوات التكوين. هذه الوحدة تشرح pyproject.toml وتضعك على المسار الحديث.',
      },
      { type: 'h2', content: '1. الفكرة' },
      {
        type: 'p',
        content:
          'pyproject.toml هو ملف بصيغة TOML يقرأه pip و build و ruff و pytest و أي أداة حديثة. قسم [project] يُعرّف الاسم والإصدار والتبعيات، قسم [project.scripts] يُسجّل الأوامر، قسم [tool.X] يُكوِّن أدوات مثل pytest و ruff في نفس الملف.',
      },
      { type: 'h2', content: '2. لماذا يهم' },
      {
        type: 'p',
        content:
          'كان setup.py القديم يمزج المنطق مع البيانات، بطيء، صعب التحقق. pyproject.toml بيانات فقط، يمكن قراءته دون تنفيذ Python، يدعمه أدوات منذ Python 3.11. يحل محل setup.py + setup.cfg + requirements.txt + pytest.ini + ruff.toml في ملف واحد.',
      },
      { type: 'h2', content: '3. النموذج الذهني' },
      {
        type: 'ascii',
        content: `
pyproject.toml
├── [build-system]       ← كيف يُبنى المشروع
│     requires = ["hatchling"]
│     build-backend = "hatchling.build"
├── [project]            ← البيانات التعريفية
│     name = "calc"
│     version = "1.0.0"
│     dependencies = [...]
├── [project.scripts]    ← أوامر CLI يُسجّلها pip install
│     calc = "my_project.cli:main"
└── [tool.pytest.ini_options]
      testpaths = ["tests"]
`,
      },
      { type: 'h2', content: '4. مخطط Mermaid' },
      {
        type: 'code',
        language: 'mermaid',
        title: 'تأثير pyproject.toml على الأدوات',
        content: `flowchart TD
  T[pyproject.toml] --> P{pip install .}
  P --> P1[يقرأ dependencies]
  P --> P2[يثبّت التبعيات]
  P --> P3[يُسجّل scripts في PATH]
  T --> R[ruff check]
  T --> Y[pytest]
  T --> B[build wheel]`,
      },
      { type: 'h2', content: '5. مثال عملي' },
      {
        type: 'code',
        language: 'toml',
        title: 'pyproject.toml كامل',
        content: `[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "calc"
version = "1.0.0"
description = "حاسبة CLI تعليمية"
readme = "README.md"
requires-python = ">=3.10"
license = {text = "MIT"}
authors = [{name = "Smart Code Lab"}]
keywords = ["cli", "calculator", "education"]
classifiers = [
    "Programming Language :: Python :: 3",
    "License :: OSI Approved :: MIT License",
]
dependencies = [
    "click>=8.1",
]

[project.optional-dependencies]
dev = [
    "pytest>=8",
    "pytest-cov>=4",
    "ruff>=0.3",
]

[project.scripts]
calc = "my_project.cli:main"

[project.urls]
Homepage = "https://example.com/calc"

[tool.pytest.ini_options]
minversion = "8.0"
testpaths = ["tests"]
addopts = "-ra -q --strict-markers"

[tool.ruff]
line-length = 100
target-version = "py310"

[tool.ruff.lint]
select = ["E", "F", "I", "B", "UP"]`,
      },
      { type: 'h2', content: '6. شرح الكود' },
      {
        type: 'p',
        content:
          '[build-system] يختار أداة البناء (hatchling أو setuptools أو poetry-core). [project] البيانات الرسمية. [project.scripts] يخبر pip أن يُنشئ أمر calc يستدعي main() بعد التثبيت — هذا ما يفعّل CLI على مستوى النظام. [project.optional-dependencies] مجموعات اختيارية (pip install calc[dev]). أدوات lint/format/config تعيش في [tool.X].',
      },
      { type: 'h2', content: '7. أخطاء شائعة' },
      {
        type: 'ul',
        items: [
          [{ type: 'p', content: 'تضارب بين [project.dependencies] و requirements.txt — اترك الأخير للإرث فقط.' }],
          [{ type: 'p', content: 'تثبيت نسخة قديمة من build-backend — العداد الدقيق للميزات.' }],
          [{ type: 'p', content: 'نسيان classifiers — يؤثر على PyPI searchability.' }],
        ],
      },
      {
        type: 'callout',
        calloutType: 'best-practice',
        title: 'مصدر واحد للحقيقة',
        content: [
          {
            type: 'p',
            content:
              'إذا كان لديك pyproject.toml، تجاهل setup.py و setup.cfg. إذا كان لديك pytest.ini منفصل بعد إضافة [tool.pytest.ini_options]، احذفه. هدفك: ملف تكوين واحد لكل مشروع.',
          },
        ],
      },
      { type: 'h2', content: '8. مع الذكاء الاصطناعي' },
      {
        type: 'callout',
        calloutType: 'ai-tip',
        title: 'Prompt مفيد',
        content: [
          {
            type: 'p',
            content:
              '«هذا pyproject.toml الحالي. اقترح: 1) الحزم التي يجب نقلها من dev إلى runtime، 2) classifiers مفقودة، 3) إصدارات يمكن ترقيتها. قدّم التغييرات كـ diff ولا تُطبّقها.»',
          },
        ],
      },
      { type: 'h2', content: '9. ملخص' },
      {
        type: 'p',
        content:
          'pyproject.toml هو المعيار الحديث. [project] للتعريف، [project.scripts] لـ CLI، [tool.X] لتكوين الأدوات. يقلل عدد ملفات التكوين ويزيد قابلية النقل.',
      },
      {
        type: 'active-recall',
        questions: [
          { q: 'ماذا يفعل [project.scripts]؟', a: 'يخبر pip أن ينشئ أمر CLI ينفذ main() بعد pip install. هذا هو الفرق بين سكربت تعمل يدوياً وأداة حقيقية في PATH.' },
          { q: 'متى تستخدم [project.optional-dependencies]؟', a: 'لحزم لا يحتاجها runtime (pytest، ruff، mypy) — تُثبّت عبر pip install calc[dev].' },
          { q: 'لماذا تختار [build-system] بدقة؟', a: 'build-backend يحدد كيفية بناء الـ wheel. اختيارات شائعة: hatchling (حديث، سريع)، setuptools (متوافق مع الإرث)، poetry-core (دمج poetry).' },
          { q: 'ما الفرق بين pyproject.toml و setup.py؟', a: 'pyproject.toml بيانات فقط (TOML)، لا شفرة Python. setup.py شفرة Python ديناميكية. الأول قابل للقراءة والتدقيق دون تنفيذ، الثاني أخطر (ينفذ عند البناء).' },
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // L6 — pytest — your first test
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'unit-pyse-6',
    stageId: 'stage-1',
    unitNumber: 105,
    title: 'pytest — أول اختبار لك',
    description: 'كتابة وتشغيل اختبارات pytest الأولية، Test Discovery، والأسماء الواضحة.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 6: pytest — أول اختبار' },
      {
        type: 'p',
        content:
          'الاختبار ليس هواية الأكاديميين — هو ما يفرّق بين كود يخاف صاحبه من تغييره، وكود يتطور بثقة. هذه الوحدة تؤسّس عادة pytest من أول درس، قبل أن يصبح مشروعك أكبر من أن يُختبر يدوياً.',
      },
      { type: 'h2', content: '1. الفكرة' },
      {
        type: 'p',
        content:
          'pytest تكتشف تلقائياً ملفات test_*.py و *_test.py في مجلد tests، وتُنفّذ كل دالة اسمها test_*. يكفي استخدام assert العادي بدل دوال تأكيد خاصة. الفشل يُظهر فرقاً واضحاً بين المتوقع والفعلي.',
      },
      { type: 'h2', content: '2. لماذا يهم' },
      {
        type: 'p',
        content:
          'بدون اختبار، كل تغيير قد يكسر شيئاً دون أن تدري. مع اختبار، التغيير الجريء يصبح آمناً. Junior Backend محترف يكتب اختباراً مع كل ميزة، لا بعد أسبوع من الإنتاج.',
      },
      { type: 'h2', content: '3. النموذج الذهني' },
      {
        type: 'ascii',
        content: `
my_project/
├── src/my_project/calc.py
└── tests/
    └── test_calc.py   ← pytest تكتشفه تلقائياً

تشغيل:
$ pytest
================ test session starts ================
tests/test_calc.py::test_add_simple PASSED
tests/test_calc.py::test_add_negative PASSED
================ 2 passed in 0.01s =================
`,
      },
      { type: 'h2', content: '4. مخطط Mermaid' },
      {
        type: 'code',
        language: 'mermaid',
        title: 'دورة TDD مختصرة',
        content: `flowchart LR
  A[🔴 اكتب اختبار فاشل] --> B[🟢 اكتب أقل كود ينجح]
  B --> C[🔵 أعد هيكلة]
  C --> A`,
      },
      { type: 'h2', content: '5. مثال عملي' },
      {
        type: 'code',
        language: 'python',
        title: 'src/my_project/calc.py',
        content: `def add(a: float, b: float) -> float:
    return a + b

def divide(a: float, b: float) -> float:
    if b == 0:
        raise ValueError("لا يمكن القسمة على صفر")
    return a / b`,
      },
      {
        type: 'code',
        language: 'python',
        title: 'tests/test_calc.py',
        content: `"""اختبارات pytest لوحدة calc."""
from my_project.calc import add, divide

def test_add_two_positives_returns_sum():
    assert add(2, 3) == 5

def test_add_zero_is_identity():
    assert add(0, 99) == 99

def test_add_negative_works():
    assert add(-5, 3) == -2

def test_divide_positive_returns_float():
    assert divide(10, 4) == 2.5

def test_divide_by_zero_raises():
    import pytest
    with pytest.raises(ValueError, match="لا يمكن القسمة على صفر"):
        divide(10, 0)`,
      },
      {
        type: 'code',
        language: 'bash',
        title: 'تشغيل pytest',
        content: `# تشغيل كل الاختبارات
pytest

# مع تفاصيل أكثر
pytest -v

# تشغيل اختبار واحد بالاسم
pytest -v tests/test_calc.py::test_add_two_positives_returns_sum

# تشغيل بنمط
pytest -k "divide"

# التغطية
pytest --cov=my_project --cov-report=term-missing`,
      },
      { type: 'h2', content: '6. شرح الكود' },
      {
        type: 'p',
        content:
          'pytest.raises(ValueError, match="...") يلتقط الاستثناء، ويعتبر الاختبار ناجحاً فقط إذا رُمي الاستثناء الصحيح بالنص الصحيح. -v (verbose) يعرض اسم كل اختبار. --cov يعرض نسبة الأسطر المغطاة بالاختبارات.',
      },
      { type: 'h2', content: '7. أخطاء شائعة' },
      {
        type: 'ul',
        items: [
          [{ type: 'p', content: 'اختبار بلا اسم واضح — test_1، test_func — تجعل التشخيص كابوساً.' }],
          [{ type: 'p', content: 'اختبار يَفعل الكثير — يجب أن يختبر سلوكاً واحداً.' }],
          [{ type: 'p', content: 'اختبار يعتمد على ترتيب تشغيل آخر — استخدم fixtures.' }],
          [{ type: 'p', content: 'عدم تشغيل pytest بانتظام — اجعلها جزءاً من كل commit.' }],
        ],
      },
      {
        type: 'callout',
        calloutType: 'best-practice',
        title: 'اسم اختبار يصف السلوك',
        content: [
          {
            type: 'p',
            content:
              'بدلاً من test_add، اكتب test_add_two_positives_returns_sum. الاسم يصف السلوك المتوقع، وعند الفشل تعرف فوراً ما الذي كسر.',
          },
        ],
      },
      { type: 'h2', content: '8. مع الذكاء الاصطناعي' },
      {
        type: 'callout',
        calloutType: 'ai-tip',
        title: 'Prompt مفيد',
        content: [
          {
            type: 'p',
            content:
              '«اكتب اختبارات pytest لهذه الدالة: divide_with_floor. غطِّ: الأعداد الموجبة، السالبة، القسمة على صفر، الأصفار، أكبر من int. اشرح لماذا كل اختبار ضروري.»',
          },
        ],
      },
      { type: 'h2', content: '9. ملخص' },
      {
        type: 'p',
        content:
          'pytest يكتشف اختباراتك تلقائياً. assert العادي يكفي. pytest.raises يلتقط الاستثناءات. الأسماء الواضحة + الاختبارات الصغيرة + pytest --cov مع كل commit = أساس الممارسة.',
      },
      {
        type: 'active-recall',
        questions: [
          { q: 'كيف تكتشف pytest ملف الاختبارات؟', a: 'تبحث عن ملفات تَبدأ بـ test_ أو تنتهي بـ _test.py داخل المجلدات التي تَبدأ بـ test_.' },
          { q: 'ماذا يفعل pytest.raises(ValueError, match="...")؟', a: 'يُنفّذ الكود داخل with ويتوقع ValueError بنص يطابق match. الاختبار ينجح إذا تحقق ذلك، وإلا يفشل برسالة واضحة.' },
          { q: 'لماذا نُفضّل assert العادي بدلاً من assertEqual؟', a: 'assert العادي أكثر بساطة وقراءته طبيعية. عند الفشل، pytest يطبع القيم الفعلية والمتوقعة تلقائياً.' },
          { q: 'ما الذي يَفعله --cov؟', a: 'يَحسب نسبة أسطر الكود التي تمر عبر اختبار، ويُظهر الأسطر غير المغطاة. 90%+ تغطية هدف جيد للمشاريع الجديدة.' },
        ],
      },
    ],
  },
];
