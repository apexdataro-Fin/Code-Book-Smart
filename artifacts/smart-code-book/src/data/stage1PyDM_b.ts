import type { UnitDef } from './types';

/**
 * Smart Code — Python Data Modeling + Bridges (Sections B + C).
 *   pydm-1..pydm-3 unitNumbers 120–122; pybr-1, pybr-2 unitNumbers 130–131.
 *
 *   🆕 Additive only.
 *   🆕 Backtick template literals used for ALL content strings so that
 *      internal `"` / `'` / `\n` characters never break the TS parser.
 */
export const stage1PyDmB: UnitDef[] = [
  // ─── L13 — dataclasses ────────────────────────────────────────────────
  {
    id: 'pydm-1',
    stageId: 'stage-1',
    unitNumber: 120,
    title: 'dataclasses: سجلات بلا ضوضاء',
    description: '@dataclass، field، asdict، __post_init__، و frozen.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 13: dataclasses' },
      { type: 'p', content: 'في كل backend تحتاج نماذج بيانات: User و Order و Ticket. كتابة __init__ و __repr__ و __eq__ يدوياً 30 سطراً لكل نوع. dataclass يولّد كل ذلك تلقائياً.' },
      { type: 'h2', content: '1. الفكرة (Concept)' },
      { type: 'p', content: '@dataclass يأخذ class عادياً ويولّد __init__ و __repr__ و __eq__. fields() يرجع الحقول. asdict() يحوّل لـ dict. كل ما تحتاج لإضافته: تعريف الحقول بـ type hints.' },
      { type: 'h2', content: '2. لماذا يهم (Why It Matters)' },
      { type: 'p', content: 'النماذج هي بنية كل backend. dataclass يجعلها واضحة ومختصرة وقابلة للمقارنة. أقل كود = أقل bugs. متوافق مع mypy.' },
      { type: 'h2', content: '3. النموذج الذهني' },
      { type: 'ascii', content: `@dataclass
class User:
    name: str
    age: int

    ↓ يولّد تلقائياً:
__init__(self, name, age)
__repr__(self) -> "User(name=..., age=...)"
__eq__(self, other) -> مقارنة قيمة بـ قيمة` },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: `flowchart LR
  A[class User: name, age] --> B[@dataclass]
  B --> C[+ __init__]
  B --> D[+ __repr__]
  B --> E[+ __eq__]` },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'python', content: `from dataclasses import dataclass, field, asdict
from datetime import datetime

@dataclass
class Order:
    id: str
    total: float
    items: list[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.now)
    is_paid: bool = False

    def __post_init__(self) -> None:
        if self.total < 0:
            raise ValueError("total cannot be negative")

o = Order("O001", 99.5, ["هاتف"])
print(o)                  # Order(id='O001', total=99.5, ...)
assert asdict(o)["id"] == "O001"

# frozen=True يجعل الـ class غير قابل للتعديل بعد الإنشاء
@dataclass(frozen=True)
class Status:
    code: str
# s = Status("draft")
# s.code = "..."          # FrozenInstanceError` },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'default=list بدل default_factory=list: يشارك نفس القائمة بين كل الكائنات.' }],
        [{ type: 'p', content: 'نسيان type hints — dataclass يحتاجها لإنشاء __init__.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'default_factory مع collections', content: [
        { type: 'p', content: 'field(default_factory=list) يستدعي list() عند كل نسخة، يتجنب الـ shared-state bug.' },
      ] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي (AI Tip)' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [
        { type: 'p', content: 'حوّل هذا class بـ __init__ يدوي إلى @dataclass مع validation في __post_init__. حافظ على نفس الـ API.' },
      ] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: '@dataclass يولّد __init__/__repr__/__eq__. field(default_factory=...) للقوائم. __post_init__ للتحقق. frozen=True لـ immutable.' },
      { type: 'active-recall', questions: [
        { q: 'لماذا default_factory بدل default للقوائم؟', a: 'default يقيّم مرة واحدة وتتشارك كل الكائنات نفس الـ list، بينما default_factory يستدعي list() لكل instance.' },
        { q: 'متى تستخدم __post_init__؟', a: 'للتحقق من صحة الحقول أو لحقول مشتقة تعتمد على أخرى.' },
        { q: 'ماذا يفعل frozen=True؟', a: 'يمنع تعيين أي حقل بعد __init__، فيحول الـ class إلى immutable.' },
      ] },
    ],
  },

  // ─── L14 — typing advanced ────────────────────────────────────────────
  {
    id: 'pydm-2',
    stageId: 'stage-1',
    unitNumber: 121,
    title: 'وحدة typing المتقدمة',
    description: 'Optional، Union، Literal، Protocol، TypeGuard، و إعداد mypy.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 14: typing المتقدمة' },
      { type: 'p', content: 'تعلمت type hints مع int و str. الـ typing module يمنحك مفردات إضافية تجبر مكتبتك على توقيع واضح. Junior backend يكتب hint، Senior يكتب typing متقدمة + mypy.' },
      { type: 'h2', content: '1. الفكرة (Concept)' },
      { type: 'p', content: 'Optional[int] هي int أو None. Union[int, str] هي int أو str. Literal["draft","published"] يسمح فقط بقيم محددة. Protocol يعطي duck typing بصيغة صريحة. TypeGuard يخبر المحقق بالضبط بعد الفحص.' },
      { type: 'h2', content: '2. لماذا يهم (Why It Matters)' },
      { type: 'p', content: 'مكتبات Backend تستقبل JSON من API خارجي. الـ typing module يمنعك من تجاهل القيم المفقودة. mypy يكتشف bugs قبل التشغيل، و IDE autocomplete يَستفيد.' },
      { type: 'h2', content: '3. النموذج الذهني (Mental Model)' },
      { type: 'ascii', content: `Optional[T]      = T | None
Union[T1, T2]    = T1 | T2  (Python 3.10+: T1 | T2)
Literal["a","b"] = فقط "a" أو "b"
Protocol         = duck typing مع توقيع صريح
TypeGuard        = "بعد هذا الفحص النوع X"` },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: `flowchart LR
  A[def f(x: int)] --> B[Pyright/mypy يحلّل]
  B --> C{Assign str to x?}
  C -- yes --> D[error]
  C -- no --> E[OK]` },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'python', content: `from typing import Optional, Literal, Protocol, TypeGuard

Status = Literal["draft", "published", "archived"]

def get_status(code: str) -> Status:
    if code not in ("draft", "published", "archived"):
        raise ValueError(code)
    return code  # type narrowed via the if/raise above

# Protocol: duck typing مع توقيع صريح
class SupportsRead(Protocol):
    def read(self) -> str: ...

def consume(src: SupportsRead) -> str:
    return src.read()

# TypeGuard: بعد هذا الفحص، النوع مضمون
def is_paid(o) -> TypeGuard["Order"]:
    return hasattr(o, "is_paid") and o.is_paid` },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'Optional[int] بدون معالجة None — TypeError في وقت التشغيل.' }],
        [{ type: 'p', content: 'عدم تشغيل mypy — types بدون فحص تبقى تعليقات.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'Type hints + mypy', content: [
        { type: 'p', content: 'شغّل mypy على src/ في كل CI. الـ hints بدون فحص لا تكتشف bug.' },
      ] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي (AI Tip)' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [
        { type: 'p', content: 'أضف type hints كاملة لهذه الدوال. إذا وُجد dict بـ keys معروفة، استبدله بـ TypedDict. شغّل mypy عقلياً وأبلغ عن mismatches.' },
      ] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: 'Optional و Union و Literal و Protocol و TypeGuard يبني vocabulary. mypy يحوّل الـ hints إلى أخطاء وقت compile.' },
      { type: 'active-recall', questions: [
        { q: 'الفرق بين Optional[int] و int | None؟', a: 'في Python 3.10+ متطابقان، قبل 3.10 Optional هو الصياغة المعتمدة.' },
        { q: 'متى تستخدم Protocol؟', a: 'لتحديد سلوك (duck typing) بدون وراثة صريحة، مثل SupportsRead لأي class فيه read().' },
        { q: 'لماذا mypy دون تشغيل يفشل في مهمته؟', a: 'type hints بدون محقق تبقى تعليقات؛ mypy يحوّلها إلى errors حقيقية.' },
      ] },
    ],
  },

  // ─── L15 — small Python class (bridge to Java OOP) ───────────────────
  {
    id: 'pydm-3',
    stageId: 'stage-1',
    unitNumber: 122,
    title: 'صف صغير في Python',
    description: '__init__ و __repr__ و __eq__ و methods بدون وراثة: جسر لجافا.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 15: صف صغير في Python' },
      { type: 'p', content: 'وحدة Java OOP القادمة تتعمق. قبلها يركّز Python على صف بسيط بدون وراثة. dataclass يستبدل class للحالات البسيطة، فالفئة الصغيرة موضع واضح.' },
      { type: 'h2', content: '1. الفكرة (Concept)' },
      { type: 'p', content: '__init__ يبني الكائن. __repr__ يعرض تمثيلاً للمطور (REPL). __eq__ يقارن قيمة بقيمة. method عادية تستخدم self.' },
      { type: 'h2', content: '2. لماذا يهم (Why It Matters)' },
      { type: 'p', content: 'مكتبات Backend (Django و SQLAlchemy و Pydantic) تعتمد على class و methods. بدون فهم الطبقات تبقى متلقياً لابتكارات الغير لا صانعاً لها.' },
      { type: 'h2', content: '3. النموذج الذهني' },
      { type: 'ascii', content: `class Ticket:
    def __init__(self, id_, title): ...
    def __repr__(self): ...        # للمطور
    def __eq__(self, other): ...   # للمساواة البنيوية
    def assign_to(self, user): ... # سلوك
    def close(self, reason): ...   # سلوك` },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: `flowchart LR
  A[Ticket id, title] --> B[__init__]
  A --> C[__repr__ developer]
  A --> D[__eq__ value eq]
  A --> E[methods assign_to, close]` },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'python', content: `class Ticket:
    """Ticket قصير لجسر OOP: لا وراثة، لا abstract."""

    def __init__(self, id_: str, title: str) -> None:
        self.id = id_
        self.title = title
        self.assignee = None
        self.status = "open"

    def __repr__(self) -> str:
        return f"Ticket(id={self.id!r}, title={self.title!r}, status={self.status!r})"

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Ticket):
            return NotImplemented
        return (self.id, self.title) == (other.id, other.title)

    def assign_to(self, user: str) -> None:
        self.assignee = user
        print(f"[{self.id}] assigned to {user}")

    def close(self, reason: str) -> None:
        if self.status == "closed":
            print(f"[{self.id}] already closed")
            return
        self.status = "closed"
        print(f"[{self.id}] closed: {reason}")

t = Ticket("T001", "Cannot log in")
print(t)             # repr قابل للنسخ
t.assign_to("أحمد")
t.close("password reset solved")` },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'نسيان isinstance في __eq__: كائن من نوع آخر يكسر المقارنة.' }],
        [{ type: 'p', content: '__repr__ يرجع نصاً غير قابل للنسخ: لا يمكن إعادة بناء الكائن منه.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'repr قابل للنسخ', content: [
        { type: 'p', content: '__repr__ يجب أن يكون كود Python صالح ينشئ الكائن نفسه. استخدم !r للنصوص ليظهر "..." بدل ...' },
      ] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي (AI Tip)' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [
        { type: 'p', content: 'أضف __hash__ بنفس قواعد __eq__ ليعمل مع set/dict. تحقق أن == و hash متناسقان.' },
      ] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: '__init__ يبني. __repr__ للمطور. __eq__ للمساواة. methods للسلوك. لا وراثة هنا — Java OOP يدخل في مرحلة متقدمة.' },
      { type: 'active-recall', questions: [
        { q: 'متى NotImplemented بدل False في __eq__؟', a: 'عندما other من نوع آخر؛ NotImplemented يَدع Python يُجرب __eq__ على other أولاً.' },
        { q: 'لماذا !r في repr؟', a: '!r يستدعي repr() للنصوص، فيظهر "..." بدل ... — repr قابل للنسخ.' },
        { q: 'الفرق بين __repr__ و __str__؟', a: '__repr__ للمطور (REPL، logs)، __str__ للمستخدم النهائي (print). إذا وُجد __repr__ فقط يستخدم print.' },
      ] },
    ],
  },

  // ─── L16 — enum + constants ──────────────────────────────────────────
  {
    id: 'pybr-1',
    stageId: 'stage-1',
    unitNumber: 130,
    title: 'enum و الثوابت المُهيكلة',
    description: 'Enum و StrEnum (3.11+) و auto() و Sentinel patterns بدل magic strings.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 16: enum و ثوابت مُهيكلة' },
      { type: 'p', content: 'status = "draft" أو status = 3؟ كلتا الطريقتين سهلة الخطأ. enum يمنحك أسماء قابلة للقراءة مع autocomplete، والقيم يمكن أن تكون str أو int.' },
      { type: 'h2', content: '1. الفكرة (Concept)' },
      { type: 'p', content: 'Enum = class تحوي ثوابت مرقّمة (أو مسماة) مع اسم وقيمة. StrEnum (3.11+) يجعل كل ثابت str، فيتعامل كـ str عادي. auto() يولّد int بالترتيب.' },
      { type: 'h2', content: '2. لماذا يهم (Why It Matters)' },
      { type: 'p', content: 'magic strings ("draft" و "published" و "archived") عرضة لـ typos. السلسلة الخاطئة تمر بأمان ويتجاهلها API بصمت. enum يكسر ذلك: كل ثابت مسمى. مطابق للقيم str العادية + IDE autocomplete + mypy.' },
      { type: 'h2', content: '3. النموذج الذهني' },
      { type: 'ascii', content: `str   -> "draft" / "published" / "archived"
Enum  -> Status.DRAFT / Status.PUBLISHED / Status.ARCHIVED
         ↑ تدقيق المحرر، آمن type-wise

في DB أو API: يبقى "draft" str — StrEnum يُحوّل تلقائياً.` },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: `flowchart LR
  A[set_status code] --> B{in Status?}
  B -- yes --> C[Status enum]
  B -- no --> D[ValueError]
  C --> E[json.dumps → string]` },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'python', content: `from enum import Enum, auto

# Python 3.11+
class Status(StrEnum):
    DRAFT = "draft"
    PUBLISHED = "published"
    ARCHIVED = "archived"

# لـ 3.10 وما قبل
class Status_(str, Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    ARCHIVED = "archived"

s = Status.PUBLISHED
print(s.value)             # "published"
print(s == "published")    # True — StrEnum يتصرف كـ str
print(s in {Status.DRAFT, Status.PUBLISHED})  # True

# Sentinel: قيمة فريدة لـ marker
class _Missing(Enum):
    VALUE = auto()

def get(name, default=_Missing.VALUE):
    if name == "user":
        return "أحمد"
    if default is _Missing.VALUE:
        raise KeyError(name)
    return default` },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'مقارنة Status == "draft" بدل Status.DRAFT: يعمل مع StrEnum لكنه يخفف الضمان type-wise.' }],
        [{ type: 'p', content: 'تعديل enum بعد تعريفه: Enum يمنع ذلك ويرمي TypeError.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'StrEnum للـ JSON', content: [
        { type: 'p', content: 'StrEnum يسلسل كـ str مع json.dumps، ويقبل str من API خارجي. UI/Database و Python code متطابقان.' },
      ] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي (AI Tip)' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [
        { type: 'p', content: 'استبدل كل magic strings في هذا الملف بـ StrEnum. تأكد أن API الخارجي يقبل نفس القيم كنص.' },
      ] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: 'StrEnum للقيم النصية، Enum للأرقام. auto() يولّد int. Sentinel بـ Enum يستبدل None كـ marker. JSON serialization مع StrEnum مجاني.' },
      { type: 'active-recall', questions: [
        { q: 'الفرق بين Enum و StrEnum؟', a: 'StrEnum كل ثابت str فعلياً يقارن كـ str؛ Enum الكلاسيكي كل ثابت كائن منفصل.' },
        { q: 'لماذا class Status(str, Enum) بدل Status(Enum)؟', a: 'النمط لتعريف StrEnum في Python < 3.11؛ يجعل كل ثابت isinstance str.' },
        { q: 'متى تستخدم Sentinel Enum؟', a: 'لـ default غير None في kwargs، الفريد لا يتشابه مع أي قيمة يمررها المستخدم.' },
      ] },
    ],
  },

  // ─── L17 — comprehensions deep + any/all/zip/enumerate ────────────────
  {
    id: 'pybr-2',
    stageId: 'stage-1',
    unitNumber: 131,
    title: 'شاملات متقدمة + any/all/zip/enumerate',
    description: 'Nested comprehensions، generator expressions، أدوات functional.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 17: شاملات متقدمة + functional tools' },
      { type: 'p', content: 'list comprehension يومض في كل كود Python. لكن nested و generator والأدوات functional (any/all/zip/enumerate) يفتحون idiom متقدماً. Junior يفهم comprehension، Mid يكتب multi-loop comprehension بأمان.' },
      { type: 'h2', content: '1. الفكرة (Concept)' },
      { type: 'p', content: 'comprehension = loop + filter + map في سطر. generator expression نفس البناء لكن lazy. any/all يرجعان bool. zip يدمج قائمتين. enumerate يضيف index.' },
      { type: 'h2', content: '2. لماذا يهم (Why It Matters)' },
      { type: 'p', content: 'كود Python محترف يتسارع بـ comprehension. readability تتحسن أكثر من loop صريح للشروط البسيطة. الأسئلة اليومية في coding interviews تدور حول أي/all/zip/enumerate.' },
      { type: 'h2', content: '3. النموذج الذهني' },
      { type: 'ascii', content: `List comprehension    : [f(x) for x in xs if cond(x)]
Dict comprehension    : {k: v for k, v in items if cond}
Set comprehension    : {f(x) for x in xs if cond}
Generator expression : (f(x) for x in xs if cond)   → lazy
Nested                : [[f(r,c) for c in cols] for r in rows]` },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: `flowchart LR
  A[xs iterable] --> B[for x in xs]
  B --> C{cond x?}
  C -- yes --> D[compute f x]
  D --> E[append to result]` },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'python', content: `scores = [85, 92, 78, 65, 95]
names  = ["أحمد", "سارة", "محمد", "علي", "نورة"]

# Filter + transform
passing = [s for s in scores if s >= 70]
print(f"معدل النجاح: {sum(passing)/len(passing):.1f}%")

# هل يوجد متفوق؟
has_excellent = any(s > 90 for s in scores)
print(f"متفوق: {has_excellent}")

# كلهم ناجحون؟
all_pass = all(s >= 50 for s in scores)
print(f"كلهم ناجحون: {all_pass}")

# zip + enumerate — جدول
header = "# | الاسم | الدرجة"
print(header)
for i, (n, s) in enumerate(zip(names, scores), start=1):
    grade = "ممتاز" if s >= 90 else "جيد" if s >= 70 else "يحتاج تحسين"
    print(f"{i} | {n} | {s} ({grade})")

# Nested comprehension — جدول ضرب 9
table_9 = [i * 9 for i in range(1, 11)]
print(table_9)

# Generator يحفظ الذاكرة عند ملايين العناصر
sum_big = sum(x * x for x in range(10_000_000))  # lazy` },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'شاملات متداخلة 3+ levels: اكتب loop صريح بدلاً.' }],
        [{ type: 'p', content: 'استخدام list comprehension حيث generator يكفي: يهدر ذاكرة.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'قاعدة الـ nesting', content: [
        { type: 'p', content: 'حدّ عمق الـ nesting إلى 2 levels. أكثر من ذلك، ارجع لـ loop مع break واضح.' },
      ] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي (AI Tip)' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [
        { type: 'p', content: 'حوّل هذا for loop إلى list comprehension إن أمكن. إذا كان nesting أو side effects، أبقِ loop.' },
      ] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: 'comprehension مزيج loop + filter + map. generator expression lazy. any/all للـ boolean. zip/enumerate للمؤشر + الإيمتيشن المتوازي.' },
      { type: 'active-recall', questions: [
        { q: 'الفرق بين generator و list comprehension؟', a: 'generator lazy، يحسب sums فقط عند الحاجة. list comprehension يُنشئ الـ list كاملة في الذاكرة.' },
        { q: 'متى تستخدم all بدل حلقات for؟', a: 'أي شرط يتطلب كل العناصر تحقق شرطاً، مثل كل الطلبات مدفوعة.' },
        { q: 'ليش enumerate(names, start=1) أفضل من range(len(names))؟', a: 'enumerate يتجنب index متغير يدوي، أوضح، يعمل مع أي iterable وليس فقط list.' },
      ] },
    ],
  },
];
