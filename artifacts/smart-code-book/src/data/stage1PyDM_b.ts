import type { UnitDef } from './types';

/**
 * Smart Code — Python Data Modeling + Bridges (Sections B + C).
 *   pydm-1..pydm-3 unitNumbers 120–122; pybr-1, pybr-2 unitNumbers 130–131.
 */
export const stage1PyDmB: UnitDef[] = [
  // ─── L13 — dataclasses ────────────────────────────────────────────────
  {
    id: 'pydm-1',
    stageId: 'stage-1',
    unitNumber: 120,
    title: 'dataclasses: سجلات بلا ضوضاء',
    description:
      '@dataclass، field، asdict، __post_init__، و frozen.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 13: dataclasses' },
      { type: 'p', content: 'في كل backend تَحتاج نماذج بيانات: User, Order, Ticket. كتابة __init__ و __repr__ و __eq__ يدوياً 30 سطراً مملاً لكل نوع. dataclass يَولّد كل ذلك تلقائياً.' },
      { type: 'h2', content: '1. الفكرة' },
      { type: 'p', content: '@dataclass يَأخذ class عادي و يَولّد __init__, __repr__, __eq__. fields() يَرجع الحقول. asdict() يَحول لـ dict. كل ما تحتاج لإضافة: تعريف الحقول بـ type hints.' },
      { type: 'h2', content: '2. لماذا يهم' },
      { type: 'p', content: 'النماذج هي بنية كل backend. dataclass يَجعلها واضحة ومختصرة وقابلة للمقارنة. أقل كود = أقل bugs. متوافق مع type checkers مثل mypy.' },
      { type: 'h2', content: '3. النموذج الذهني' },
      { type: 'ascii', content: '@dataclass\nclass User:\n    name: str\n    age: int\n\n    ↓ يَولّد تلقائياً:\n__init__(self, name, age)\n__repr__(self) ==> "User(name=..., age=...)"\n__eq__(self, other) ==> مقارنة قيمة بـ قيمة' },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: 'flowchart LR\n  A[class User: name, age] --> B[@dataclass]\n  B --> C[+ __init__]\n  B --> D[+ __repr__]\n  B --> E[+ __eq__]' },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'python', content: 'from dataclasses import dataclass, field, asdict\nfrom datetime import datetime\n\n@dataclass\nclass Order:\n    id: str\n    total: float\n    items: list[str] = field(default_factory=list)\n    created_at: datetime = field(default_factory=datetime.now)\n    is_paid: bool = False\n\n    def __post_init__(self) -> None:\n        if self.total < 0:\n            raise ValueError("total cannot be negative")\n\no = Order("O001", 99.5, ["هاتف"])\nprint(o)                  # Order(id="O001", total=99.5, ...)\nassert asdict(o)["id"] == "O001"\n\n# frozen=True — immutable\no.status = "shipped"       # OK\n# @dataclass(frozen=True)\n# o2.status = "..."        # FrozenInstanceError' },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'default=list بدل default_factory=list — يَشارك نفس القائمة بين كل الكائنات (الأخطر!).' }],
        [{ type: 'p', content: 'نسيان type hints — dataclass يَحتاجها لتوليد __init__.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'استخدم default_factory مع collections', content: [{ type: 'p', content: 'field(default_factory=list) يَستدعي list() عند كل نسخة، يتجنب الـ shared-state bug في default=list.' }] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [{ type: 'p', content: '«حوّل هذا class بـ __init__ يدوي إلى @dataclass مع validation في __post_init__. حافظ على نفس الـ API.»' }] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: '@dataclass يَولّد __init__/__repr__/__eq__. field(default_factory=...) للقوائم. __post_init__ للتحقق. frozen=True لـ immutable.' },
      { type: 'active-recall', questions: [
        { q: 'لماذا default_factory بدل default للقوائم؟', a: 'default يَقيّم مرة واحدة، كل الكائنات تَشارك نفس الـ list. default_factory يَستدعي list() لكل instance.' },
        { q: 'متى تَستخدم __post_init__؟', a: 'لـ validation تتطلب كل الحقول، أو لـ derived fields من الأخرى.' },
        { q: 'ماذا يفعل frozen=True؟', a: 'يَمنع تَعيين أي حقل بعد __init__ — يَحول الـ class إلى immutable.' },
      ] },
    ],
  },

  // ─── L14 — typing advanced ────────────────────────────────────────────
  {
    id: 'pydm-2',
    stageId: 'stage-1',
    unitNumber: 121,
    title: 'وحدة typing المتقدمة',
    description:
      'Optional، Union، Literal، Protocol، TypeGuard، وإعداد mypy.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 14: typing المتقدمة' },
      { type: 'p', content: 'تَعلّمت type hints مع int و str. الـ typing module يَمنحك مفردات إضافية تُجبر مكاتبك على تَوقيع واضح. Junior backend يَكتب hint، Senior يَكتب typing متقدمة + mypy.' },
      { type: 'h2', content: '1. الفكرة' },
      { type: 'p', content: 'Optional[int] = int or None. Union[int, str] = int or str. Literal["draft","published"] = فقط النصوص المسموحة. Protocol يَعطي duck typing بصيغة صريحة. TypeGuard يَخبرك النوع بعد فحص.' },
      { type: 'h2', content: '2. لماذا يهم' },
      { type: 'p', content: 'مكتبات Backend تَستقبل JSON من API خارجي. الـ typing module يَمنعك من تَجاهل القيم المفقودة. code review و IDE autocomplete يَستفيدان. mypy يَكتشف bugs قبل التشغيل.' },
      { type: 'h2', content: '3. النموذج الذهني' },
      { type: 'ascii', content: 'Optional[T]       = T | None\nUnion[T1, T2]     = T1 | T2 (Python 3.10+: T1 | T2)\nLiteral["a","b"]  = فقط "a" أو "b"\nProtocol          = duck typing صريح\nTypeGuard         = "بعد هذا الفحص، النوع X"'\n}\n# dataclass يحول全体で العمل\ndef calc_total(items: list[str], prices: list[float]) -> float:\n    return sum(prices)\n\n# dataclass Test: dict اختباري\no = Order("O001", 99.5, ["هاتف"])\nprint(asdict(o))' },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: 'flowchart LR\n  A[def f(x: int)] --> B[Pyright/mypy يحلّل]\n  B --> C[Assign str to x?]\n  C -- yes --> D[error]\n  C -- no --> E[OK]' },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'python', content: 'from typing import Optional, Literal, Protocol, TypeGuard\n\nStatus = Literal["draft", "published", "archived"]\n\ndef get_status(code: str) -> Status:\n    if code not in ("draft", "published", "archived"):\n        raise ValueError(code)\n    return code  # type: ignore[return-value]  # narrowed\n\n# Protocol — duck typing official\nclass SupportsRead(Protocol):\n    def read(self) -> str: ...\n\ndef consume(src: SupportsRead) -> str:\n    return src.read()\n\n# TypeGuard\ndef is_paid(o) -> TypeGuard["Order"]:\n    return hasattr(o, "is_paid") and o.is_paid' },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'Optional[int] بدون معالجة None — TypeError في وقت التشغيل.' }],
        [{ type: 'p', content: 'عدم تشغيل mypy — types بدون فحص = تَعليقات تَفشل.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'Type hints + mypy', content: [{ type: 'p', content: 'pip install mypy && mypy src/ يَكتشف mismatches قبل التشغيل. أضفه لـ CI.' }] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [{ type: 'p', content: '«أضف type hints كاملة لهذه الدوال. إذا وُجد dict بـ keys معروفة، استبدله بـ TypedDict. شغّل mypy عقلياً وأَبلِغ عن mismatches.»' }] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: 'Optional, Union, Literal, Protocol, TypeGuard يَبْنون vocabulary. mypy يَحول الـ hints إلى أخطاء وقت compile.' },
      { type: 'active-recall', questions: [
        { q: 'الفرق بين Optional[int] وint | None؟', a: 'في Python 3.10+ متطابقان. قبل 3.10، Optional[int] هو الصياغة المعتمدة.' },
        { q: 'متى تَستخدم Protocol؟', a: 'لتَحديد سلوك (duck typing) بدون وراثة. مثال: SupportsRead لأي class يَحتوي read().' },
        { q: 'لماذا mypy دون تشغيل tَفشل؟', a: 'type hints بدون مُحقق تَبقى تَعليقات. mypy يَحولها إلى errors.' },
      ] },
    ],
  },

  // ─── L15 — small Python class (bridge to Java OOP) ───────────────────
  {
    id: 'pydm-3',
    stageId: 'stage-1',
    unitNumber: 122,
    title: 'صف صغير في Python',
    description:
      '__init__, __repr__, __eq__, methods, بدون وراثة — جسر لجافا.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 15: صف صغير في Python' },
      { type: 'p', content: 'وحدة Java OOP القادمة تَتعمق. قبلها تَركّز Python يَفهم صف بسيط بدون وراثة. كتاب Python يَستبدل بـ dataclass + functions للحالات البسيطة. الصنف الصغير موضع واضح.' },
      { type: 'h2', content: '1. الفكرة' },
      { type: 'p', content: '__init__ يَبني الكائن. __repr__ يَعرض تمثيلاً للمطور (Python REPL). __eq__ يَقارن قيمة بـ قيمة. method عادية تَستخدم self.' },
      { type: 'h2', content: '2. لماذا يهم' },
      { type: 'p', content: 'مكتبات Backend (Django, SQLAlchemy, Pydantic) تَعتمد على class و methods. بدون فهم الطبقات، تَبْقى متلقياً لابداعات الغير، لا صانعاً لها.' },
      { type: 'h2', content: '3. النموذج الذهني' },
      { type: 'ascii', content: 'class Ticket:\n    def __init__(self, id_, title): ...\n    def __repr__(self): ...        # للمطور\n    def __eq__(self, other): ...   # للمساواة\n    def assign_to(self, user): ... # سلوك\n    def close(self, reason): ...   # سلوك' },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: 'flowchart LR\n  A[Ticket id, title] --> B[__init__]\n  A --> C[__repr__ developer]\n  A --> D[__eq__ value eq]\n  A --> E[methods: assign_to, close]' },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'python', content: 'class Ticket:\n    """Ticket قصير لجسر OOP — لا وراثة، لا abstract."""\n    def __init__(self, id_: str, title: str) -> None:\n        self.id = id_\n        self.title = title\n        self.assignee = None\n        self.status = "open"\n\n    def __repr__(self) -> str:\n        return f"Ticket(id={self.id!r}, title={self.title!r}, status={self.status!r})"\n\n    def __eq__(self, other: object) -> bool:\n        if not isinstance(other, Ticket):\n            return NotImplemented\n        return (self.id, self.title) == (other.id, other.title)\n\n    def assign_to(self, user: str) -> None:\n        self.assignee = user\n        print(f"[{self.id}] assigned to {user}")\n\n    def close(self, reason: str) -> None:\n        if self.status == "closed":\n            print(f"[{self.id}] already closed")\n            return\n        self.status = "closed"\n        print(f"[{self.id}] closed: {reason}")\n\nt = Ticket("T001", "Cannot log in")\nprint(t)             # Ticket(id="T001", title="Cannot log in", status="open")\nt.assign_to("أحمد")\nt.close("password reset solved")' },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'نسيان isinstance في __eq__ — كود غير متوقع يَكسر المقارنة.' }],
        [{ type: 'p', content: '__repr__ يَرجع str بدون repr — لا يمكن نسخها من الكونسول.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'repr قابل للنسخ', content: [{ type: 'p', content: '__repr__ يَجب أن يَكون كود Python صالح ينشئ الكائن نفسه. !r على النصوص يُظهر "..." بدل ...' }] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [{ type: 'p', content: '«أضف __hash__ بنفس قواعد __eq__ ليَعمل مع set/dict. تحقق أن == و hash متناسقان.»' }] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: '__init__ يَبني. __repr__ للمطور. __eq__ للمساواة. methods للسلوك. لا وراثة هنا — Java OOP يدخل في مرحلة متقدمة.' },
      { type: 'active-recall', questions: [
        { q: 'متى NotImplemented بدل False في __eq__؟', a: 'عندما الـ other من نوع آخر — يَدع Python تَجرب __eq__ على other قبل إعلان NotImplemented.' },
        { q: 'لماذا !r في repr؟', a: '!r يَستدعي repr() للنصوص، يَعرض "..." بدل ... — repr قابل للنسخ.' },
        { q: 'الفرق بين __repr__ و __str__؟', a: '__repr__ للمطور (REPL, logs). __str__ للمستخدم النهائي (print). إذا وُجد __repr__ فقط، print يَستخدمه.' },
      ] },
    ],
  },

  // ─── L16 — enum + constants ──────────────────────────────────────────
  {
    id: 'pybr-1',
    stageId: 'stage-1',
    unitNumber: 130,
    title: 'enum و الثوابت المُهيكلة',
    description:
      'Enum، StrEnum (3.11+)، auto()، Sentinel patterns، بدل magic strings.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 16: enum و ثوابت مُهيكلة' },
      { type: 'p', content: 'status = "draft" أو status = 3؟ كلتا الطريقتين سهلة الخطأ. enum يَمنحك أسماءً قابلة للقراءة بـ IDE autocomplete، والقيم يمكن أن تَكون str أو int.' },
      { type: 'h2', content: '1. الفكرة' },
      { type: 'p', content: 'Enum = class تَحتوي ثوابت مرقّمة (أو مُسمّاة) مع اسم وقيمة. StrEnum (3.11+) يَجعل كل ثابت str، y تتعامل كـ str عادي. auto() يَولّد int بالترتيب.' },
      { type: 'h2', content: '2. لماذا يهم' },
      { type: 'p', content: 'magic strings ("draft", "published", "archived") = typos. السلسلة الخاطئة تَمر بأمان، والـ API يَتجاهلها بصمت. enum يَكسر ذلك: كل ثابت مسمى. مطابق + IDE autocomplete + mypy.' },
      { type: 'h2', content: '3. النموذج الذهني' },
      { type: 'ascii', content: 'str  -> "draft" / "published" / "archived"\nEnum -> Status.DRAFT / Status.PUBLISHED / Status.ARCHIVED\n        ↑ tَدقيق المُحرر، آمن type-wise\n\nفي DB أو API: يَبقى "draft" str — StrEnum يَحول تلقائياً.' },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: 'flowchart LR\n  A[set_status code] --> B{in Status?}\n  B -- yes --> C[Status enum]\n  B -- no --> D[ValueError]\n  C --> E[json.dumps → string]' },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'python', content: 'from enum import Enum, auto\n\n# Python 3.11+\nclass Status(StrEnum):\n    DRAFT = "draft"\n    PUBLISHED = "published"\n    ARCHIVED = "archived"\n\n# لـ 3.10 وما قبل\nclass Status(str, Enum):\n    DRAFT = "draft"\n    PUBLISHED = "published"\n    ARCHIVED = "archived"\n\ns = Status.PUBLISHED\nprint(s.value)             # "published"\nprint(s == "published")    # True (StrEnum يَعمل كـ str)\nprint(s in {Status.DRAFT, Status.PUBLISHED})  # True\n\n# Sentinel — قيمة فريدة لـ marker\nclass _Missing(Enum):\n    VALUE = auto()\n\ndef get(name, default=_Missing.VALUE):\n    if name == "user":\n        return "أحمد"\n    if default is _Missing.VALUE:\n        raise KeyError(name)\n    return default' },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'مقارنة Status == "draft" بدل Status.DRAFT — يَعمل مع StrEnum لكن خطر في تطورات future.' }],
        [{ type: 'p', content: 'تَعديل enum بعد تعريفه — Enum يَمنع ذلك، يَرمي TypeError.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'StrEnum للـ JSON', content: [{ type: 'p', content: 'StrEnum y serialize كـ str مع json.dumps، ويتقبل str من API خارجي. UI/Database و Python code متطابقان.' }] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [{ type: 'p', content: '«استبدل كل magic strings في هذا الملف بـ StrEnum. تأكد أن الـ API الخارجي يَقبل نفس القيم كنص.»' }] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: 'StrEnum للقيم النصية، enum الكلاسيكي للأرقام. auto() يَولّد int. Sentinel بـ Enum يَستبدل None كـ marker. JSON serialization مع StrEnum مجاني.' },
      { type: 'active-recall', questions: [
        { q: 'الفرق بين Enum و StrEnum؟', a: 'StrEnum كل ثابت str فعلياً، يُقارن كـ str. Enum الكلاسيكي كل ثابت كائن منفصل.' },
        { q: 'لماذا class Status(str, Enum) بدل Status(Enum)؟', a: 'هذا النمط مَوجود لتعريف StrEnum في Python < 3.11. يَجعل كل ثابت isinstance str.' },
        { q: 'متى تَستخدم Sentinel Enum؟', a: 'لـ default غير None في kwargs، الفريد لا يَتشابه مع أي قيمة يَمررها المستخدم.' },
      ] },
    ],
  },

  // ─── L17 — comprehensions deep + any/all/zip/enumerate ────────────────
  {
    id: 'pybr-2',
    stageId: 'stage-1',
    unitNumber: 131,
    title: 'شاملات متقدمة + any/all/zip/enumerate',
    description:
      'Nested/nested-if comprehensions، generator expressions، أدوات functional.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 17: شاملات متقدمة + functional tools' },
      { type: 'p', content: 'list comprehension يَومض في كل كود Python. لكن nested، generator، وادوات functional (any/all/zip/enumerate) يَفتحون idiom متقدم. Junior يفهم comprehension، Mid يَكتب multi-loop comprehension.' },
      { type: 'h2', content: '1. الفكرة' },
      { type: 'p', content: 'comprehension = loop + filter + map في سطر. generator expression = نفس البناء لكن lazy. any/all يُرجعان bool. zip يُدمج قائمتين. enumerate يُضيف index.' },
      { type: 'h2', content: '2. لماذا يهم' },
      { type: 'p', content: 'تحدّ coding interviews ما يُطلب فيه أي شي آخر. كود Python محترف يَتْسارع بـ comprehension. readability يَتحسن أكثر من loop صريح، لـ conditions simple.' },
      { type: 'h2', content: '3. النموذج الذهني' },
      { type: 'ascii', content: 'List comprehension    : [f(x) for x in xs if cond(x)]\nDict comprehension    : {k: v for k, v in items if cond}\nSet comprehension    : {f(x) for x in xs if cond}\nGenerator expression : (f(x) for x in xs if cond)   → lazy\nNested                : [[f(r,c) for c in cols] for r in rows]' },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: 'flowchart LR\n  A[xs iterable] --> B[for x in xs]\n  B --> C{cond x?}\n  C -- yes --> D[compute f x]\n  D --> E[append to result]' },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'python', content: 'scores = [85, 92, 78, 65, 95]\nnames  = ["أحمد", "سارة", "محمد", "علي", "نورة"]\n\n# Filter + transform\npassing = [s for s in scores if s >= 70]\nprint(f"معدل النجاح: {sum(passing)/len(passing):.1f}%")\n\n# أي طالب فوق 90؟\nhas_excellent = any(s > 90 for s in scores)\nprint(f"متفوق: {has_excellent}")\n\n# الكل ناجح؟\nall_pass = all(s >= 50 for s in scores)\nprint(f"كلهم ناجحون: {all_pass}")\n\n# zip + enumerate — جدول\nprint(f"{'#':<3} {"الاسم":<10} {"الدرجة"}")\nfor i, (n, s) in enumerate(zip(names, scores), start=1):\n    grade = "ممتاز" if s >= 90 else "جيد" if s >= 70 else "يحتاج تحسين"\n    print(f"{i:<3} {n:<10} {s} ({grade})")\n\n# Nested comprehension — ضرب جدول 9\ntable_9 = [[i * 9 for i in range(1, 11)] if j == 0 else [] for j in range(1)]\nprint(table_9[0])\n\n# Generator يَحفظ الذاكرة عند ملايين العناصر\nsum_big = sum(x*x for x in range(10_000_000))  # yَعالج lazy' },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'شاملات متداخلة 3+ levels — اكتب loop صريح بدلاً.' }],
        [{ type: 'p', content: 'استخدام list comprehension حيث generator يكفي — يَهدر ذاكرة.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'نطاق القاعدة: جدول متعدد', content: [{ type: 'p', content: 'limit العمي nesting إلى 2 levels. أكثر من ذلك، ارجع لـ loop مع break واضح.' }] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [{ type: 'p', content: '«حوّل هذا for loop إلى list comprehension إن أمكن. إذا كان nesting أو side effects، ابق loop.»' }] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: 'comprehension مزيج loop+filter+map. generator expression lazy. any/all للـ boolean. zip/enumerate لـ index+parallel iteration.' },
      { type: 'active-recall', questions: [
        { q: 'الفرق بين generator و list comprehension؟', a: 'generator async lazy، يحسب sums فقط عند الحاجة. list comprehension materializes كل list في الذاكرة.' },
        { q: 'متى تستخدم all بدل حلقات for؟', a: 'أي شرط يَتطلب كل العناصر تحقق شرط. مثل "كل الطلبات مدفوعة".' },
        { q: 'ليش enumerate(names, start=1) أفضل من range(len(names))؟', a: 'enumerate يَتجنب index variable manual، clear أكثر، يَعمل مع أي iterable.' },
      ] },
    ],
  },
];
