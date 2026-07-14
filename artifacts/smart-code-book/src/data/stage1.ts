import { StageDef } from './types';

export const stage1: StageDef = {
  id: "stage-1",
  stageNumber: 1,
  title: "حل المشكلات والبرمجة بـ Python",
  units: [
    {
      id: "unit-2",
      stageId: "stage-1",
      unitNumber: 1,
      title: "تحليل المشكلات والتفكير الخوارزمي",
      description: "التفكير الخوارزمي، الشيفرة الزائفة (Pseudocode) والمخططات الانسيابية.",
      content: [
        { type: "h1", content: "الوحدة 1: تحليل المشكلات والتفكير الخوارزمي" },
        { type: "p", content: "أي برنامج هو ببساطة نظام يتلقى مدخلات (Inputs)، يقوم بمعالجتها (Process)، ثم يخرج نتيجة (Outputs) في ظل قيود معينة (Constraints). قبل كتابة أي سطر كود، يجب أن تفهم المشكلة بعمق وترسم خطة واضحة. المبرمجون المحترفون يقضون أحياناً أكثر من نصف وقتهم في التفكير والتخطيط قبل الكتابة، لأن الخطأ في التصميم أغلى بكثير من الخطأ في الكود." },
        { type: "p", content: "مهارة التفكير الخوارزمي هي ما تميز مهندس البرمجيات عن مجرد كاتب كود. يستطيع المهندس الحقيقي أن يأخذ مشكلة معقدة وغامضة، يفككها إلى مشكلات أصغر قابلة للحل، ثم يبني الحل خطوة بخطوة بأسلوب منهجي قابل للاختبار والتطوير." },

        { type: "h2", content: "1. التفكير الخوارزمي" },
        { type: "p", content: "الخوارزمية هي سلسلة من الخطوات المنطقية الواضحة والمحددة لحل مشكلة ما. لكل خوارزمية صالحة خصائص: يجب أن تكون محددة (كل خطوة واضحة لا غموض فيها)، منتهية (تتوقف بعد عدد محدود من الخطوات)، وفعّالة (تنتج النتيجة الصحيحة في وقت معقول)." },
        { type: "p", content: "لتطوير مهارة التفكير الخوارزمي، اعتَدْ على طرح هذه الأسئلة عند مواجهة أي مشكلة: ما المدخلات الممكنة؟ ما الحالات الحدية (Edge Cases) التي قد تكسر الحل؟ هل هناك مشكلة مشابهة حللتها من قبل؟ هل يمكن تبسيط المشكلة؟" },
        { type: "callout", calloutType: "note", title: "ما هي الخوارزمية؟", content: [
          { type: "p", content: "الخوارزمية لا تختص بالبرمجة فحسب. وصفة الطبخ خوارزمية، وخطوات ترتيب الملابس خوارزمية. في البرمجة، نحتاج خوارزميات دقيقة لأن الحاسوب لا يفهم الغموض ولا يستطيع الاجتهاد." }
        ]},

        { type: "h2", content: "2. الشيفرة الزائفة (Pseudocode)" },
        { type: "p", content: "الشيفرة الزائفة هي كتابة خطوات الحل بلغة شبه بشرية، تقع بين اللغة الطبيعية والكود البرمجي. لا قواعد صارمة لها، لكن يجب أن تكون واضحة وقابلة للترجمة لأي لغة برمجية. كتابة الـ Pseudocode قبل الكود تساعدك على التفكير في المنطق بمعزل عن قواعد اللغة البرمجية." },
        { type: "p", content: "عند كتابة الـ Pseudocode، فكر بثلاثة أشياء: التسلسل (الخطوات بالترتيب)، التفرع (القرارات: إذا كان كذا افعل كذا)، والتكرار (كرر حتى يتحقق شرط ما). هذه الثلاثة هي أساس كل برنامج مهما كانت تعقيده." },
        { type: "code", language: "text", title: "Pseudocode: حساب خصم", content: `START
  INPUT price
  IF price > 100 THEN
    discount = price * 0.10
  ELSE
    discount = 0
  END IF
  final_price = price - discount
  OUTPUT final_price
END` },
        { type: "code", language: "text", title: "Pseudocode: البحث عن أكبر عنصر في قائمة", content: `START
  INPUT list_of_numbers
  SET max = list_of_numbers[0]   -- ابدأ بافتراض أن الأول هو الأكبر
  FOR EACH number IN list_of_numbers DO
    IF number > max THEN
      max = number
    END IF
  END FOR
  OUTPUT max
END` },

        { type: "h2", content: "3. المخططات الانسيابية (Flowcharts)" },
        { type: "p", content: "هي تمثيل بصري للخوارزمية باستخدام أشكال هندسية متفق عليها عالمياً. الميزة الكبرى للمخططات الانسيابية أنها تكشف الثغرات المنطقية بسرعة — أحياناً ترسم المخطط وتكتشف أنك نسيت معالجة حالة معينة." },
        { type: "ascii", content: `
  ( Start / End )  → أشكال بيضاوية (Oval)
  [ Process ]      → مستطيل (للحسابات والتعيينات)
  / Input-Output / → متوازي أضلاع (Parallelogram)
  < Decision >     → معين (Diamond) للأسئلة نعم/لا
  ─────────────────────────────────────────────────
  الأسهم (Arrows) تربط الأشكال وتحدد اتجاه التنفيذ

  مثال: مخطط حساب درجة طالب
  (Start)
     │
  / Input: score /
     │
  < score >= 60? >
   Yes │      │ No
       │      │
  [Grade=Pass] [Grade=Fail]
       │      │
       └──┬───┘
          │
  / Output: Grade /
          │
       (End)
` },

        { type: "h2", content: "4. تحليل المشكلة بمنهجية IPO" },
        { type: "p", content: "منهجية IPO (Input-Process-Output) هي أبسط وأقوى إطار لتحليل أي مشكلة برمجية. قبل كتابة سطر كود واحد، يجب أن تعرف بالضبط ما الذي يدخل، وما الذي يُعالَج، وما الذي يخرج." },
        { type: "table", headers: ["المرحلة", "السؤال", "مثال: حساب مرتب موظف"], rows: [
          ["Input (مدخلات)", "ما البيانات التي يحتاجها البرنامج؟", "الراتب الأساسي، عدد ساعات العمل الإضافي، نسبة الضريبة"],
          ["Process (معالجة)", "ما الحسابات أو القرارات المطلوبة؟", "صافي الراتب = الأساسي + (ساعات إضافية × 1.5) - الضريبة"],
          ["Output (مخرجات)", "ما الذي يجب أن يظهر للمستخدم؟", "الراتب الصافي، تفاصيل الخصومات"]
        ]},

        { type: "h2", content: "5. التفكير العودي (Recursive Thinking) — مقدمة" },
        { type: "p", content: "أحد أجمل الأساليب في التفكير الخوارزمي هو الأسلوب العودي: تحل المشكلة الكبيرة بردّها إلى نسخة أصغر من نفس المشكلة، حتى تصل إلى حالة بسيطة تعرف حلها مباشرة (تُسمى الحالة الأساسية أو Base Case)." },
        { type: "p", content: "مثال: حساب مضروب العدد 5 (5!) = 5 × 4 × 3 × 2 × 1. التفكير العودي: 5! = 5 × 4!، و 4! = 4 × 3!، وهكذا حتى نصل إلى 1! = 1 (الحالة الأساسية التي نعرف إجابتها مباشرة)." },
        { type: "code", language: "text", title: "Pseudocode: المضروب العودي", content: `FUNCTION factorial(n):
  -- الحالة الأساسية: نعرف الجواب مباشرة
  IF n <= 1 THEN
    RETURN 1
  END IF
  -- الحالة العودية: ردّ المشكلة لنسخة أصغر
  RETURN n * factorial(n - 1)

-- factorial(5) = 5 * factorial(4)
--              = 5 * 4 * factorial(3)
--              = 5 * 4 * 3 * factorial(2)
--              = 5 * 4 * 3 * 2 * factorial(1)
--              = 5 * 4 * 3 * 2 * 1 = 120` },

        { type: "h2", content: "6. التعقيد الزمني — نظرة أولى" },
        { type: "p", content: "ليس كل حل صحيح جيد! الحل الجيد هو الذي يحل المشكلة بكفاءة. تخيل أن لديك قائمة تحتوي مليون اسم، وتريد البحث عن اسم معين. إذا فحصت كل اسم واحداً بواحد في أسوأ الحالات ستحتاج مليون خطوة. لكن لو كانت القائمة مرتبة وبحثت بالتقسيم للنصف في كل خطوة، ستحتاج فقط 20 خطوة!" },
        { type: "table", headers: ["أسلوب البحث", "عدد الخطوات مع مليون عنصر", "الملاحظة"], rows: [
          ["البحث التسلسلي (فحص كل عنصر)", "حتى 1,000,000 خطوة", "بطيء جداً مع البيانات الكبيرة"],
          ["البحث الثنائي (التقسيم لنصفين)", "حتى 20 خطوة فقط", "سريع جداً لكن يشترط ترتيب البيانات"]
        ]},
        { type: "callout", calloutType: "ai-tip", title: "استخدم الذكاء الاصطناعي للتفكير", content: [
          { type: "p", content: "جرب هذا الـ Prompt: «أريد بناء [وصف مشروعك]. ساعدني في تحليل المشكلة باستخدام منهجية IPO، ثم اكتب Pseudocode للخوارزمية الرئيسية، ثم حدد الحالات الحدية (Edge Cases) التي يجب التعامل معها.»" }
        ]},

        { type: "project", title: "تحليل نظام صراف آلي (ATM)", content: [
          { type: "p", content: "دعنا نحلل خوارزمية سحب نقود بمنهجية IPO كاملة ثم نترجمها لـ Pseudocode مفصل يتضمن معالجة الأخطاء:" },
          { type: "code", language: "text", content: `-- ═══ تحليل IPO ═══
-- Input:  رقم PIN, المبلغ المطلوب سحبه
-- Process: التحقق من PIN, فحص الرصيد, تحديث الرصيد, تسجيل العملية
-- Output:  النقود أو رسالة خطأ واضحة

START
  attempts = 0
  max_attempts = 3

  WHILE attempts < max_attempts DO
    INPUT pin_code
    IF pin_code IS correct THEN
      BREAK  -- الخروج من حلقة المحاولات
    ELSE
      attempts = attempts + 1
      IF attempts < max_attempts THEN
        OUTPUT "رمز PIN خاطئ. بقي " + (max_attempts - attempts) + " محاولات"
      END IF
    END IF
  END WHILE

  IF attempts >= max_attempts THEN
    LOCK card
    OUTPUT "تم حجب البطاقة لأمانك"
    STOP
  END IF

  INPUT amount_to_withdraw

  -- التحقق من صحة المبلغ
  IF amount_to_withdraw <= 0 THEN
    OUTPUT "المبلغ يجب أن يكون موجباً"
    STOP
  END IF

  IF amount_to_withdraw > daily_limit THEN
    OUTPUT "تجاوزت الحد اليومي للسحب: " + daily_limit
    STOP
  END IF

  IF balance >= amount_to_withdraw THEN
    balance = balance - amount_to_withdraw
    LOG transaction(amount, timestamp)
    DISPENSE cash
    OUTPUT "تمت العملية بنجاح. رصيدك الجديد: " + balance
  ELSE
    OUTPUT "رصيد غير كافٍ. رصيدك: " + balance
  END IF
END` }
        ]},

        { type: "active-recall", questions: [
          { q: "ما هي الخوارزمية؟ أعطِ مثالاً من الحياة اليومية.", a: "سلسلة خطوات واضحة ومحددة ومنتهية لحل مشكلة. مثال: خطوات تحضير القهوة: 1) أضف الماء للغلاية، 2) أضف البن للفلتر، 3) اضغط زر التشغيل، 4) انتظر حتى الانتهاء، 5) صبّ القهوة في الكوب." },
          { q: "ما الفرق بين Pseudocode والكود البرمجي الحقيقي؟", a: "الـ Pseudocode لغة بشرية مرنة يفهمها الإنسان ولا قواعد صارمة لها، أما الكود الحقيقي فله قواعد صارمة يفهمها الحاسوب. الـ Pseudocode يسبق الكود الحقيقي كمرحلة تخطيط ويساعد على التركيز على المنطق بمعزل عن تفاصيل اللغة." },
          { q: "ما الشكل الهندسي المستخدم لاتخاذ قرار (if) في المخطط الانسيابي؟", a: "المعين (Diamond Shape) — يحتوي على سؤال يُجاب بنعم أو لا، ومنه يتفرع الرسم في اتجاهين." },
          { q: "ما الخطوات الثلاث لمنهجية IPO؟", a: "Input (المدخلات: ما تأخذه البرنامج) → Process (المعالجة: ما تفعله البرنامج بالبيانات) → Output (المخرجات: ما تُظهره أو تُعيده)." },
          { q: "ما المقصود بالحالة الأساسية (Base Case) في الخوارزمية العودية؟", a: "هي الحالة البسيطة التي يعرف البرنامج إجابتها مباشرة دون الحاجة للتكرار. بدونها ستدور الخوارزمية العودية إلى الأبد. مثال في حساب المضروب: الحالة الأساسية هي factorial(1) = 1." },
          { q: "لماذا البحث الثنائي أسرع بكثير من البحث التسلسلي مع البيانات الكبيرة؟", a: "لأنه يتخلص من نصف البيانات في كل خطوة. مع مليون عنصر: البحث التسلسلي قد يحتاج مليون خطوة، أما البحث الثنائي فيحتاج فقط 20 خطوة (log₂ 1,000,000 ≈ 20). لكنه يشترط أن تكون البيانات مرتبة." }
        ]}
      ]
    },
    {
      id: "unit-3",
      stageId: "stage-1",
      unitNumber: 2,
      title: "المتغيرات وأنواع البيانات في Python",
      description: "الأرقام، النصوص، المتغيرات، والعمليات الأساسية في Python.",
      content: [
        { type: "h1", content: "الوحدة 2: المتغيرات وأنواع البيانات في Python" },
        { type: "p", content: "ننتقل الآن لكتابة كود حقيقي باستخدام Python، أكثر لغات البرمجة انتشاراً في الذكاء الاصطناعي وهندسة البيانات وأتمتة المهام. Python تشتهر بقراءتها السهلة وتعتمد على أقل قدر من الرموز المعقدة مقارنة بلغات أخرى. الكود المكتوب بـ Python يشبه كثيراً اللغة الإنجليزية العادية، مما يجعل التعلم أسرع والتركيز على المنطق لا على القواعد." },
        { type: "p", content: "Python لغة ذات كتابة ديناميكية (Dynamically Typed) — لا تحتاج أن تُعلن عن نوع المتغير مسبقاً، Python تكتشفه تلقائياً من القيمة المخصصة. هذا يختلف عن Java أو C++ التي تتطلب تحديد النوع صراحة. ميزة هذا: كتابة أسرع. العيب: الأخطاء تظهر أحياناً في وقت التشغيل بدل وقت الكتابة." },

        { type: "callout", calloutType: "note", title: "لماذا Python أولاً؟", content: [
          { type: "p", content: "Python هي لغة المبتدئين العالمية، لكنها أيضاً لغة OpenAI وGoogle وNetflix وInstagram. تعلّمها الآن يفتح لك أبواب: الذكاء الاصطناعي، أتمتة المهام، بناء APIs، وتحليل البيانات." }
        ]},

        { type: "h2", content: "1. المتغير: صندوق في الذاكرة" },
        { type: "p", content: "تخيل المتغير كصندوق ذو اسم لصيق تضع فيه بيانات لتستخدمها لاحقاً. حين تكتب name = 'Ahmed' فأنت تطلب من الحاسوب أن يحجز مساحة في الذاكرة العشوائية (RAM)، يضع فيها النص 'Ahmed'، ويلصق عليها لافتة اسمها name. في أي وقت لاحق، حين تكتب name يذهب الحاسوب لذلك الصندوق ويحضر ما بداخله." },
        { type: "p", content: "في Python، كل شيء هو كائن (Object). حتى الأرقام البسيطة هي كائنات لها خصائص ودوال. هذا يعني أن المتغير في Python ليس الصندوق نفسه، بل هو لافتة (مرجع) تشير للكائن المخزن في الذاكرة — ولهذا يمكن أن تشير عدة متغيرات لنفس الكائن." },
        { type: "code", language: "python", content: `user_name = "Ahmed"
age = 25
salary = 5000.50
is_active = True

print(user_name)   # Ahmed
print(age)         # 25
print(salary)      # 5000.5
print(is_active)   # True

# يمكن تغيير قيمة المتغير في أي وقت
age = 26           # الآن age يشير لقيمة جديدة
print(age)         # 26

# تخصيص متعدد في سطر واحد (Pythonic Style)
x, y, z = 1, 2, 3
first = last = 0   # كلاهما يبدآن بـ 0` },
        { type: "callout", calloutType: "best-practice", content: [
          { type: "p", content: "في Python نستخدم snake_case لتسمية المتغيرات: كلمات صغيرة مفصولة بشرطة سفلية. مثال: student_first_name أفضل من StudentFirstName أو studentfirstname. الأسماء يجب أن تكون واضحة: user_age أوضح من u أو temp." }
        ]},

        { type: "h2", content: "2. أنواع البيانات (Data Types)" },
        { type: "p", content: "Python تدعم أنواعاً متعددة من البيانات. فهم الفرق بينها مهم لأن كل نوع له عمليات مختلفة وسلوك مختلف في الذاكرة. الأنواع الأساسية البسيطة (Primitives) هي: الأرقام الصحيحة، الأرقام العشرية، النصوص، والقيم المنطقية." },
        { type: "table", headers: ["النوع", "الرمز", "مثال", "الاستخدام"], rows: [
          ["أرقام صحيحة", "int", "age = 25", "العمر، الترتيب، العدد، أي رقم بدون كسر"],
          ["أرقام عشرية", "float", "price = 29.99", "الأسعار، الدرجات، القياسات، النسب المئوية"],
          ["نصوص", "str", "name = 'Ali'", "الأسماء، الرسائل، الروابط، أي سلسلة أحرف"],
          ["منطقي", "bool", "is_active = True", "الحالات نعم/لا، تفعيل/تعطيل، نتائج المقارنات"],
          ["لا شيء", "None", "result = None", "قيمة غائبة أو لم تُحدد بعد (مثل null في لغات أخرى)"]
        ]},

        { type: "h2", content: "3. القيم الثابتة مقابل المتغيرة: Mutable vs Immutable" },
        { type: "p", content: "أنواع البيانات في Python تنقسم إلى نوعين مهمين جداً: الثابتة (Immutable) التي لا يمكن تعديلها بعد إنشائها مثل الأرقام والنصوص والـ Tuples، والمتغيرة (Mutable) التي يمكن تعديلها مثل القوائم والقواميس. هذا الفرق يؤثر على كيفية التعامل مع البيانات وأداء البرنامج." },
        { type: "code", language: "python", content: `# Immutable: الأرقام والنصوص لا تتغير، يُنشأ كائن جديد عند التعديل
name = "Ahmed"
name = name + " Ali"   # ليس تعديلاً للنص الأصلي، بل إنشاء نص جديد
print(name)            # Ahmed Ali

# دليل على Immutability:
a = "hello"
b = a          # a وb يشيران لنفس الكائن
b = b + "!"    # Python تنشئ كائناً جديداً، لا تعدل الأصل
print(a)       # hello — لم يتغير!
print(b)       # hello!

# المتغيرات المنطقية هي كائنات singleton في Python
print(True is True)   # True — نفس الكائن دائماً
print(1 == True)      # True — bool يرث من int في Python!
print(0 == False)     # True` },
        { type: "callout", calloutType: "warning", content: [
          { type: "p", content: "تحذير دقيق: في Python، bool هو نوع فرعي من int. هذا يعني أن True يساوي 1 وFalse يساوي 0 في العمليات الحسابية. print(True + True) يطبع 2. هذا صحيح لكنه مربك — تجنب استخدام bool في حسابات رقمية." }
        ]},

        { type: "h2", content: "4. العمليات الحسابية" },
        { type: "p", content: "Python تدعم جميع العمليات الحسابية الأساسية، وتضيف عمليتين مفيدتين: القسمة الصحيحة والباقي. عامل الباقي (%) مفيد جداً في البرمجة لفحص الأعداد الزوجية والفردية، والتحقق من دورية الأرقام." },
        { type: "code", language: "python", content: `x = 10
y = 3

print(x + y)   # 13  — جمع
print(x - y)   # 7   — طرح
print(x * y)   # 30  — ضرب
print(x / y)   # 3.333... — قسمة عادية (دائماً float حتى لو النتيجة صحيحة)
print(x // y)  # 3   — قسمة صحيحة (Floor Division، تتجاهل الكسور)
print(x % y)   # 1   — باقي القسمة (Modulo) — مفيد جداً!
print(x ** y)  # 1000 — الأس (10 مرفوعة للقوة 3)

# تطبيق عملي لعامل الباقي:
for i in range(10):
    if i % 2 == 0:
        print(f"{i} زوجي")
    else:
        print(f"{i} فردي")

# العمليات المختصرة (Augmented Assignment)
score = 100
score += 10    # score = score + 10
score -= 5     # score = score - 5
score *= 2     # score = score * 2
print(score)   # 210` },
        { type: "callout", calloutType: "mistake", content: [
          { type: "p", content: "لا تخلط بين = (للتخصيص: ضع هذه القيمة في المتغير) وبين == (للمقارنة: هل هذان المتغيران متساويان؟). الخطأ الأول للمبتدئين هو كتابة if x = 5 بدلاً من if x == 5 — Python ترفض ذلك بخطأ SyntaxError." }
        ]},

        { type: "h2", content: "5. النصوص (Strings) وعملياتها" },
        { type: "p", content: "النص في Python كائن غني بالدوال المدمجة. تتعامل Python مع النص كقائمة أحرف مرقّمة (مرتبة)، مما يتيح الوصول لأي حرف بموقعه (Index) والحصول على أجزاء منه (Slicing)." },
        { type: "code", language: "python", content: `name = "Sara"
score = 95

# f-strings: الطريقة الحديثة والأسهل (Python 3.6+)
message = f"الطالبة {name} حصلت على درجة {score}"
print(message)
# الطالبة Sara حصلت على درجة 95

# يمكن وضع تعبيرات كاملة داخل {}
print(f"الدرجة مئوياً: {score / 100:.0%}")  # 95%
print(f"مضاعف الدرجة: {score * 2}")          # 190

# عمليات مفيدة على النصوص
print(name.upper())           # SARA — تحويل لكبيرة
print(name.lower())           # sara — تحويل لصغيرة
print(name.title())           # Sara — أول حرف كبير
print(len(name))              # 4   — طول النص
print(name[0])                # S   — أول حرف (Index يبدأ من 0)
print(name[-1])               # a   — آخر حرف (سالب من النهاية)
print(name[1:3])              # ar  — Slicing: من index 1 حتى 3 (لا يشمل 3)
print("Sara" in "Hello Sara!")# True — البحث في نص

# دوال نصية مفيدة
text = "  مرحباً بالعالم  "
print(text.strip())           # حذف المسافات من الطرفين
words = "apple,banana,cherry"
print(words.split(","))       # ['apple', 'banana', 'cherry']
print("-".join(["a", "b", "c"]))  # a-b-c
print("hello world".replace("world", "Python"))  # hello Python
print("hello".startswith("he"))  # True` },

        { type: "h2", content: "6. تحويل الأنواع (Type Conversion)" },
        { type: "p", content: "أحياناً تحتاج تحويل بيانات من نوع لآخر. مثلاً، input() في Python دائماً ترجع نصاً حتى لو أدخل المستخدم رقماً — يجب تحويله صراحةً. هذا مصدر خطأ شائع للمبتدئين." },
        { type: "code", language: "python", content: `# التحويل الصريح (Explicit Conversion)
age_text = "25"
age_num = int(age_text)     # نص → رقم صحيح
price = float("29.99")      # نص → عشري
result = str(100)           # رقم → نص

# معرفة النوع
print(type(25))       # <class 'int'>
print(type(3.14))     # <class 'float'>
print(type("Hello"))  # <class 'str'>
print(type(True))     # <class 'bool'>

# خطأ شائع مع input()
# user_age = input("أدخل عمرك: ")   # هذا نص دائماً!
# print(user_age + 1)  # خطأ! لا يمكن جمع نص ورقم
# الصحيح:
# user_age = int(input("أدخل عمرك: "))
# print(user_age + 1)  # يعمل

# تحويل لا يعمل دائماً — يجب التعامل مع الأخطاء
try:
    invalid = int("hello")  # سيرمي ValueError
except ValueError:
    print("لا يمكن تحويل 'hello' لرقم")` },

        { type: "callout", calloutType: "ai-tip", title: "Prompt مفيد", content: [
          { type: "p", content: "«اشرح لي الفرق بين int و float في Python. متى يجب استخدام كل منهما؟ وما الأخطاء الشائعة عند التحويل بينهما؟ أعطني أمثلة عملية من مشاريع حقيقية.»" }
        ]},

        { type: "active-recall", questions: [
          { q: "ما نوع البيانات للقيمة 3.14؟", a: "float (رقم عشري). Python تخزنه كـ IEEE 754 double precision floating-point number." },
          { q: "ما نتيجة العملية 10 % 3؟", a: "1 — لأن 10 = 3×3 + 1، والباقي هو 1. عامل % (Modulo) يُرجع باقي القسمة." },
          { q: "ما الفائدة من f-strings؟", a: "تسمح بدمج المتغيرات والتعبيرات داخل النص بوضع اسم المتغير أو التعبير بين {} مسبوقاً بحرف f قبل النص. هي أوضح وأسرع من استخدام + لدمج النصوص." },
          { q: "ما الفرق بين Immutable وMutable في Python؟", a: "Immutable (ثابت): لا يمكن تعديله بعد إنشائه (int, str, float, tuple). Mutable (متغير): يمكن تعديله في مكانه (list, dict, set). المتغير ذو النوع Immutable لا يُعدَّل بل تُنشأ قيمة جديدة." },
          { q: "لماذا input() دائماً ترجع نصاً حتى لو أدخل المستخدم رقماً؟", a: "لأن Python لا تستطيع معرفة قصد المستخدم مسبقاً. الحل: تحويل صريح int(input(...)) أو float(input(...)) مع معالجة استثناء ValueError لحالات الإدخال الخاطئ." }
        ]}
      ]
    },
    {
      id: "unit-4",
      stageId: "stage-1",
      unitNumber: 3,
      title: "التحكم في التدفق والمنطق",
      description: "الشروط (if/else) والحلقات التكرارية (Loops) في Python.",
      content: [
        { type: "h1", content: "الوحدة 3: التحكم في التدفق والمنطق" },
        { type: "p", content: "حتى الآن كتبنا كوداً ينفذ من الأعلى للأسفل سطراً بسطر. لكن البرامج الحقيقية تتخذ قرارات وتكرر مهام. هذا ما يتيحه التحكم في التدفق (Control Flow) — القدرة على توجيه البرنامج لاتخاذ مسارات مختلفة بناءً على شروط، وتكرار أجزاء من الكود أعداداً مختلفة من المرات." },
        { type: "p", content: "التحكم في التدفق هو ما يجعل البرنامج 'ذكياً'. برنامج بدون شروط وحلقات هو مجرد آلة حاسبة بسيطة. بإضافة if وfor وwhile تحوّله إلى نظام يستجيب للبيانات ويتعامل مع سيناريوهات متعددة." },

        { type: "h2", content: "1. الشروط (if / elif / else)" },
        { type: "p", content: "نستخدم if لتنفيذ كود معين عندما تتحقق حالة ما. elif يعني 'وإلا إن كان' ويُفحص بالترتيب. else يعني 'وإلا في جميع الحالات الأخرى'. المهم: Python تفحص الشروط بالترتيب وتتوقف عند أول شرط صحيح." },
        { type: "code", language: "python", content: `grade = 85

if grade >= 90:
    print("ممتاز")
elif grade >= 80:
    print("جيد جداً")
elif grade >= 70:
    print("جيد")
elif grade >= 60:
    print("مقبول")
else:
    print("يحتاج لتحسين")
# الناتج: جيد جداً

# الشرط الثلاثي (Ternary) — في سطر واحد
status = "ناجح" if grade >= 60 else "راسب"
print(status)  # ناجح` },
        { type: "callout", calloutType: "note", content: [
          { type: "p", content: "لاحظ المسافة البادئة (Indentation) — 4 مسافات أو tab واحد — قبل print. Python تعتمد على المسافات لتحديد ما يوجد داخل الشرط. نسيان المسافة = خطأ IndentationError. هذا يختلف عن C وJava اللتان تستخدمان الأقواس {}." }
        ]},

        { type: "h2", content: "2. الشروط المتشعبة (Nested Conditions)" },
        { type: "p", content: "يمكن وضع شرط داخل شرط آخر. لكن احذر من التعشيش العميق (Deep Nesting) — يجعل الكود صعب القراءة. الحكمة البرمجية: إذا وجدت نفسك تكتب if داخل if داخل if، غالباً هناك طريقة أوضح." },
        { type: "code", language: "python", content: `age = 25
has_license = True
has_car = False

# تشعب بسيط ومقروء
if age >= 18:
    if has_license:
        if has_car:
            print("يمكنك القيادة")
        else:
            print("تحتاج سيارة")
    else:
        print("تحتاج رخصة قيادة")
else:
    print("لا تزال دون السن القانونية")

# أسلوب أفضل: دمج الشروط بـ and
if age >= 18 and has_license and has_car:
    print("يمكنك القيادة")
elif age >= 18 and has_license:
    print("تحتاج سيارة")
elif age >= 18:
    print("تحتاج رخصة قيادة")
else:
    print("لا تزال دون السن القانونية")` },

        { type: "h2", content: "3. Match/Case — Python 3.10+ (الـ Switch الحديث)" },
        { type: "p", content: "Python 3.10 أضافت match/case كبديل أنيق لسلاسل if/elif الطويلة عند مطابقة قيمة واحدة بقيم ثابتة متعددة. إنها أقوى من Switch في لغات أخرى لأنها تدعم مطابقة الأنماط (Pattern Matching)." },
        { type: "code", language: "python", content: `def get_day_type(day: str) -> str:
    match day.lower():
        case "saturday" | "sunday":
            return "عطلة نهاية الأسبوع"
        case "monday" | "tuesday" | "wednesday" | "thursday" | "friday":
            return "يوم عمل"
        case _:  # الحالة الافتراضية (مثل else)
            return "يوم غير معروف"

print(get_day_type("Saturday"))  # عطلة نهاية الأسبوع

# Pattern Matching المتقدم مع Dictionaries
def process_command(command: dict):
    match command:
        case {"action": "create", "name": name}:
            print(f"إنشاء مستخدم: {name}")
        case {"action": "delete", "id": user_id}:
            print(f"حذف مستخدم رقم: {user_id}")
        case {"action": action}:
            print(f"أمر غير معروف: {action}")` },

        { type: "h2", content: "4. المعاملات المنطقية (Logical Operators)" },
        { type: "table", headers: ["المعامل", "المعنى", "مثال", "الناتج"], rows: [
          ["and", "صحيح إذا كلاهما صحيح", "True and False", "False"],
          ["or", "صحيح إذا أحدهما صحيح", "True or False", "True"],
          ["not", "عكس القيمة", "not True", "False"],
          [">", "أكبر من", "5 > 3", "True"],
          ["==", "يساوي", "5 == 5", "True"],
          ["!=", "لا يساوي", "5 != 3", "True"],
          ["in", "موجود ضمن مجموعة", "'a' in 'apple'", "True"],
          ["is", "نفس الكائن في الذاكرة", "x is None", "True/False"]
        ]},
        { type: "code", language: "python", content: `is_weekend = True
has_homework = False

if is_weekend and not has_homework:
    print("يمكنك اللعب!")
else:
    print("عليك إنجاز المهام.")

# فحص مجال رقمي — Python تدعم الكتابة الرياضية المباشرة
age = 25
if 18 <= age <= 65:
    print("مؤهل للتوظيف")

# التقييم القصير (Short-circuit Evaluation)
# Python تتوقف عند أول نتيجة حاسمة
name = None
# لو كتبنا name.upper() مباشرة سيرمي AttributeError
# لكن بسبب Short-circuit: إذا name is None فلن تُفحص الشرط الثاني
if name is not None and name.upper() == "AHMED":
    print("مرحباً أحمد")` },

        { type: "h2", content: "5. حلقة for" },
        { type: "p", content: "for تكرر كوداً لكل عنصر في مجموعة قابلة للتكرار (Iterable): قائمة، نطاق، نص، قاموس، وغيرها. هي الأكثر استخداماً في Python عند معرفة عدد التكرارات أو عند الدوران على مجموعة." },
        { type: "code", language: "python", content: `# الدوران على نطاق أرقام
for i in range(5):
    print(i)           # 0, 1, 2, 3, 4

# range(start, stop, step)
for i in range(1, 10, 2):
    print(i)           # 1, 3, 5, 7, 9

# range عكسي
for i in range(10, 0, -1):
    print(i)           # 10, 9, 8, ... 1

# الدوران على قائمة
fruits = ["تفاح", "موز", "برتقال"]
for fruit in fruits:
    print(f"الفاكهة: {fruit}")

# enumerate: الحصول على Index والعنصر معاً
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")   # 1. تفاح  2. موز  3. برتقال

# zip: دوران على قائمتين في نفس الوقت
names = ["علي", "سارة", "محمد"]
scores = [85, 92, 78]
for name, score in zip(names, scores):
    print(f"{name}: {score}")` },

        { type: "h2", content: "6. حلقة while" },
        { type: "p", content: "while تستمر طالما الشرط صحيح. مناسبة عندما لا تعرف عدد التكرارات مسبقاً: انتظار إدخال صحيح، قراءة حتى نهاية ملف، تشغيل اللعبة حتى الفوز أو الخسارة." },
        { type: "code", language: "python", content: `counter = 5
while counter > 0:
    print(counter)
    counter -= 1      # ضروري لتجنب الحلقة اللانهائية!
print("انطلاق! 🚀")

# مثال عملي: التحقق من إدخال صحيح
while True:
    user_input = input("أدخل رقماً موجباً: ")
    if user_input.isdigit() and int(user_input) > 0:
        number = int(user_input)
        break    # الإدخال صحيح، اخرج من الحلقة
    print("إدخال غير صالح، حاول مجدداً")

print(f"الرقم المدخل: {number}")` },
        { type: "callout", calloutType: "warning", title: "الحلقة اللانهائية (Infinite Loop)", content: [
          { type: "p", content: "إذا نسيت تحديث المتغير في while أو كان الشرط لن يصبح False أبداً، سيعمل البرنامج إلى الأبد ويجمّد الجهاز. وقفه: Ctrl+C في الـ Terminal. حلقة while True مقصودة أحياناً (خوادم الويب تعمل للأبد) لكنها يجب أن تحتوي break للخروج عند حالة معينة." }
        ]},

        { type: "h2", content: "7. break و continue و else في الحلقات" },
        { type: "code", language: "python", content: `# break: توقف الحلقة فوراً
for i in range(10):
    if i == 5:
        break          # نتوقف عند الوصول لـ 5
    print(i)           # 0, 1, 2, 3, 4

# continue: تتخطى باقي الكود في هذه الدورة فقط
for i in range(10):
    if i % 2 == 0:
        continue       # تخطى الأرقام الزوجية
    print(i)           # 1, 3, 5, 7, 9

# else في الحلقة: ينفذ إذا انتهت الحلقة بشكل طبيعي (بدون break)
numbers = [1, 3, 5, 7, 9]
target = 6
for num in numbers:
    if num == target:
        print(f"وجدت {target}")
        break
else:
    print(f"لم أجد {target} في القائمة")  # هذا سيُطبع` },

        { type: "h2", content: "8. الـ itertools — قوة الحلقات المتقدمة" },
        { type: "p", content: "مكتبة itertools المدمجة في Python توفر أدوات قوية لإنشاء تسلسلات وتكرارات متقدمة بكفاءة عالية. إنها مفيدة جداً عند التعامل مع البيانات الكبيرة لأنها لا تولّد كل العناصر في الذاكرة دفعة واحدة." },
        { type: "code", language: "python", content: `import itertools

# chain: دمج عدة قوائم
list1 = [1, 2, 3]
list2 = [4, 5, 6]
for item in itertools.chain(list1, list2):
    print(item)   # 1 2 3 4 5 6

# combinations: جميع التوليفات الممكنة
teams = ["A", "B", "C", "D"]
for match in itertools.combinations(teams, 2):
    print(match)  # كل جدول المباريات الممكنة بين 4 فرق

# islice: أخذ عدد محدد من عناصر iterator لا نهائي
def fibonacci():
    a, b = 0, 1
    while True:      # generator لا نهائي
        yield a
        a, b = b, a + b

# خذ فقط أول 10 أرقام فيبوناتشي
first_10 = list(itertools.islice(fibonacci(), 10))
print(first_10)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]` },

        { type: "project", title: "لعبة تخمين الرقم المحسّنة", content: [
          { type: "p", content: "مشروع يجمع: المتغيرات + الشروط + حلقة while + إحصاءات اللعبة + نظام تسجيل النقاط." },
          { type: "code", language: "python", content: `import random

def play_game(max_attempts: int = 7) -> dict:
    """تشغيل جولة واحدة من لعبة التخمين وإرجاع نتائجها."""
    secret = random.randint(1, 100)
    attempts = 0
    hints_used = 0

    print(f"\\n🎮 لعبة تخمين الرقم! عندك {max_attempts} محاولات.")
    print("الرقم بين 1 و 100\\n")

    while attempts < max_attempts:
        user_input = input(f"المحاولة {attempts + 1}/{max_attempts}: ")

        if not user_input.isdigit():
            print("أدخل رقماً صحيحاً من فضلك")
            continue

        guess = int(user_input)
        attempts += 1

        if guess == secret:
            score = (max_attempts - attempts + 1) * 10 - hints_used * 2
            print(f"🎉 صحيح! وجدته في {attempts} محاولات!")
            print(f"نقاطك: {score}")
            return {"won": True, "attempts": attempts, "score": score}
        elif guess < secret:
            diff = secret - guess
            if diff <= 5:
                print("⬆️  قريب جداً! الرقم أكبر بقليل")
                hints_used += 1
            else:
                print(f"⬆️  الرقم أكبر. بقي {max_attempts - attempts} محاولات.")
        else:
            diff = guess - secret
            if diff <= 5:
                print("⬇️  قريب جداً! الرقم أصغر بقليل")
                hints_used += 1
            else:
                print(f"⬇️  الرقم أصغر. بقي {max_attempts - attempts} محاولات.")

    print(f"❌ انتهت المحاولات. الرقم كان {secret}.")
    return {"won": False, "attempts": attempts, "score": 0}

# تشغيل عدة جولات
wins = 0
total_score = 0
rounds = 3

for round_num in range(1, rounds + 1):
    print(f"\\n=== الجولة {round_num} ===")
    result = play_game()
    if result["won"]:
        wins += 1
    total_score += result["score"]

print(f"\\n📊 النتيجة النهائية: {wins}/{rounds} فوز | إجمالي النقاط: {total_score}")` }
        ]},

        { type: "active-recall", questions: [
          { q: "ما الفرق بين if وelif؟", a: "if يُفحص دائماً كأول شرط. elif يُفحص فقط إذا فشل كل شرط if وelif سبقه — تسلسلي." },
          { q: "ما الفرق بين for وwhile؟", a: "for للتكرار على مجموعة أو عدد محدد من المرات (تعرفه مسبقاً). while للتكرار طالما شرط ما محقق (لا تعرف العدد مسبقاً)." },
          { q: "ماذا يفعل break في الحلقة؟", a: "يوقف الحلقة فوراً ويخرج منها بالكامل، حتى لو الشرط لا يزال محققاً. مختلف عن continue الذي يتخطى فقط بقية الكود في الدورة الحالية." },
          { q: "ما استخدام match/case في Python 3.10؟", a: "بديل أنيق لسلاسل if/elif الطويلة عند مطابقة قيمة واحدة بقيم أو أنماط متعددة. أقوى من Switch التقليدي لأنه يدعم Pattern Matching." },
          { q: "ما الفرق بين in و is كمعاملات منطقية؟", a: "in يفحص وجود عنصر داخل مجموعة ('a' in 'apple'). is يفحص ما إذا كان متغيران يشيران لنفس الكائن في الذاكرة (مفيد للمقارنة مع None: x is None)." }
        ]}
      ]
    },
    {
      id: "unit-5",
      stageId: "stage-1",
      unitNumber: 4,
      title: "الدوال والنمطية",
      description: "تنظيم الكود وإعادة استخدامه عبر الدوال (Functions).",
      content: [
        { type: "h1", content: "الوحدة 4: الدوال والنمطية" },
        { type: "p", content: "كلما كبر البرنامج، أصبح الكود معقداً وصعب الصيانة. الدوال تسمح لك بتغليف جزء من الكود، إعطائه اسماً، واستدعائه متى شئت. هذا يطبق مبدأ DRY (Don't Repeat Yourself — لا تكرر نفسك)، وهو من أهم مبادئ هندسة البرمجيات." },
        { type: "p", content: "الدالة الجيدة تفعل شيئاً واحداً وتفعله جيداً. تخيل الدوال كأدوات في صندوق أدواتك: كل أداة لها غرض محدد. برغي لربط المسامير، مفك لإزالتها. لو صنعت أداة تقوم بعشرة أشياء مختلفة تصبح معقدة وصعبة الاستخدام." },

        { type: "h2", content: "1. تعريف الدالة واستدعاؤها" },
        { type: "p", content: "def اختصار define — أعرّف. بعدها نكتب اسم الدالة، ثم الوسائط بين قوسين، ثم نقطتان فالكود المُغلَّف بمسافة بادئة." },
        { type: "code", language: "python", content: `# def: اختصار define (تعريف)
def greet(name):           # name: Parameter (وسيط)
    """تطبع تحية للمستخدم."""
    print(f"مرحباً {name}!")

greet("أحمد")              # "أحمد": Argument (معطى)
greet("سارة")              # يمكن استدعاؤها مرات لا تُحصى
greet("محمد")

# دالة بمعطيين
def add_numbers(a, b):
    """تجمع عددين وتطبع الناتج."""
    result = a + b
    print(f"{a} + {b} = {result}")

add_numbers(5, 3)    # 5 + 3 = 8
add_numbers(10, -4)  # 10 + -4 = 6` },

        { type: "h2", content: "2. الإرجاع (return) مقابل الطباعة (print)" },
        { type: "callout", calloutType: "warning", content: [
          { type: "p", content: "هذا أهم فرق يحتاج تفكيراً عميقاً: print تُظهر النتيجة على الشاشة للإنسان فقط — البرنامج نفسه لا يستفيد منها. return ترجع النتيجة للبرنامج ليستخدمها في حسابات أخرى. الدوال الجيدة تستخدم return لتكون قابلة للتركيب." }
        ]},
        { type: "code", language: "python", content: `def add(a, b):
    return a + b        # ترجع القيمة للمستدعي

# النتيجة محفوظة ويمكن استخدامها في حسابات
result = add(5, 3)
bigger_result = add(result, 10)   # add(8, 10) = 18
print(bigger_result)              # 18

# تركيب الدوال
total = add(add(1, 2), add(3, 4))  # add(3, 7) = 10
print(total)  # 10

# مثال خاطئ:
def bad_add(a, b):
    print(a + b)        # لا تُرجع شيئاً

x = bad_add(5, 3)     # x = None !!
# total = bad_add(1,2) + bad_add(3,4)  # خطأ TypeError: لا يمكن جمع None` },

        { type: "h2", content: "3. القيم الافتراضية وتمرير المعطيات بالاسم" },
        { type: "p", content: "يمكن تحديد قيم افتراضية للوسائط، تُستخدم عندما لا يمرر المستدعي قيمة. كما يمكن تمرير المعطيات بالاسم (Keyword Arguments) لتوضيح المعنى وتغيير الترتيب." },
        { type: "code", language: "python", content: `def power(base, exponent=2):   # exponent افتراضياً 2
    return base ** exponent

print(power(5))        # 25  — يستخدم القيمة الافتراضية
print(power(5, 3))     # 125 — تجاوز القيمة الافتراضية
print(power(3, 4))     # 81

# Keyword Arguments: تمرير بالاسم
def create_profile(name, age, city="الرياض"):
    return f"{name}، {age} سنة، من {city}"

# الطرق المختلفة للاستدعاء:
p1 = create_profile("أحمد", 25)              # يستخدم الافتراضي
p2 = create_profile("سارة", 22, "جدة")       # بالترتيب
p3 = create_profile(age=28, name="محمد")     # بالاسم (أي ترتيب)
print(p1)  # أحمد، 25 سنة، من الرياض
print(p2)  # سارة، 22 سنة، من جدة
print(p3)  # محمد، 28 سنة، من الرياض

# *args و **kwargs: وسائط متغيرة العدد
def sum_all(*numbers):
    """تجمع أي عدد من الأرقام."""
    return sum(numbers)

print(sum_all(1, 2, 3, 4, 5))     # 15
print(sum_all(10, 20))            # 30` },

        { type: "h2", content: "4. نطاق المتغيرات (Scope)" },
        { type: "p", content: "المتغيرات المعرفة داخل دالة (Local Variables) تعيش فيها فقط وتختفي بعد انتهاء الدالة. المتغيرات المعرفة خارج أي دالة (Global Variables) تُرى من أي مكان. هذا التصميم يمنع الدوال من التأثير على بعضها عن طريق الخطأ." },
        { type: "code", language: "python", content: `global_var = "متاح للجميع"
counter = 0

def my_func():
    local_var = "داخلي فقط"
    print(global_var)       # يعمل ✓ — يرى المتغير العام
    # print(other_local)    # خطأ ✗ — لا يرى متغيرات دالة أخرى

my_func()
# print(local_var)  # خطأ NameError ✗ — local_var لا توجد هنا

# تعديل المتغير العام من داخل دالة (يُنصح بتجنبه)
def increment():
    global counter         # صرّح أنك تريد تعديل المتغير العام
    counter += 1

increment()
increment()
print(counter)  # 2

# الأفضل: دوال تأخذ وتُرجع بدل الاعتماد على المتغيرات العامة
def increment_value(val):
    return val + 1

counter = increment_value(counter)  # أوضح وأأمن` },

        { type: "h2", content: "5. الدوال المجهولة (Lambda)" },
        { type: "p", content: "Lambda هي دوال مختصرة في سطر واحد بدون اسم. مفيدة حين تحتاج دالة بسيطة لمرة واحدة، خاصة مع دوال مثل sorted() وmap() وfilter()." },
        { type: "code", language: "python", content: `# دالة عادية
def double(x):
    return x * 2

# نفسها بـ Lambda
double_lambda = lambda x: x * 2

print(double(5))        # 10
print(double_lambda(5)) # 10

# الاستخدام الحقيقي لـ Lambda: مع sorted
students = [
    {"name": "Ali", "grade": 85},
    {"name": "Sara", "grade": 95},
    {"name": "Mohammed", "grade": 78}
]

# ترتيب حسب الدرجة (تصاعدي)
sorted_students = sorted(students, key=lambda s: s["grade"])
print(sorted_students[0]["name"])  # Mohammed (الأدنى)

# ترتيب تنازلي
sorted_desc = sorted(students, key=lambda s: s["grade"], reverse=True)
print(sorted_desc[0]["name"])  # Sara (الأعلى)` },

        { type: "h2", content: "6. map وfilter — برمجة وظيفية" },
        { type: "p", content: "map وfilter هما دالتان عاليتا الرتبة (Higher-Order Functions) تأخذان دالة كوسيط وتطبقانها على مجموعة من العناصر. هذا الأسلوب يُسمى البرمجة الوظيفية (Functional Programming)." },
        { type: "code", language: "python", content: `numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map: طبّق دالة على كل عنصر
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# filter: احتفظ فقط بالعناصر التي تحقق شرطاً
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8, 10]

# الطريقة الأكثر Pythonicية: List Comprehension
squared_comp = [x ** 2 for x in numbers]
evens_comp = [x for x in numbers if x % 2 == 0]

# مثال عملي: معالجة قائمة أسماء
names = ["  ahmed  ", "SARA", "mohammed  "]
clean_names = list(map(lambda n: n.strip().title(), names))
print(clean_names)  # ['Ahmed', 'Sara', 'Mohammed']` },

        { type: "h2", content: "7. الإغلاق (Closures) — دوال تتذكر" },
        { type: "p", content: "الإغلاق هو دالة تتذكر متغيرات من البيئة التي أُنشئت فيها، حتى بعد انتهاء تلك البيئة. هذا مفهوم قوي يُستخدم في بناء دوال مصنعة (Factory Functions) وفي الـ Decorators." },
        { type: "code", language: "python", content: `def make_multiplier(factor):
    """تُنشئ دالة تضرب في عدد محدد."""
    def multiplier(x):
        return x * factor   # تتذكر 'factor' من النطاق الخارجي
    return multiplier

# إنشاء دوال متخصصة
double = make_multiplier(2)
triple = make_multiplier(3)
times_ten = make_multiplier(10)

print(double(5))     # 10
print(triple(5))     # 15
print(times_ten(5))  # 50

# مثال عملي: دالة مع عداد
def make_counter():
    count = 0
    def counter():
        nonlocal count    # تعديل المتغير في النطاق الخارجي
        count += 1
        return count
    return counter

my_counter = make_counter()
print(my_counter())  # 1
print(my_counter())  # 2
print(my_counter())  # 3` },

        { type: "h2", content: "8. توثيق الكود: Type Hints و Docstrings" },
        { type: "p", content: "كتابة كود نظيف موثق هو ما يميز المحترف عن المبتدئ. الـ Type Hints تُخبر المستخدمين والأدوات بأنواع المعطيات والقيم المرجعة. الـ Docstrings تشرح الغرض والاستخدام." },
        { type: "code", language: "python", content: `def calculate_average(grades: list[float]) -> float:
    """
    تحسب المتوسط الحسابي لقائمة من الدرجات.

    Args:
        grades: قائمة تحتوي على درجات عشرية

    Returns:
        المتوسط الحسابي كرقم عشري، أو 0.0 إذا كانت القائمة فارغة

    Raises:
        TypeError: إذا كانت القائمة تحتوي على قيم غير رقمية

    Example:
        >>> calculate_average([85, 90, 78])
        84.33
    """
    if not grades:
        return 0.0
    return sum(grades) / len(grades)

result = calculate_average([85, 90, 78, 92])
print(f"المتوسط: {result:.2f}")  # المتوسط: 86.25` },
        { type: "callout", calloutType: "best-practice", content: [
          { type: "p", content: "قاعدة الوظيفة الواحدة (Single Responsibility): كل دالة تقوم بمهمة واحدة فقط. إذا وجدت نفسك تكتب 'و' في اسم الدالة (calculateAndPrint) فهذه إشارة للفصل إلى دالتين." }
        ]},

        { type: "project", title: "نظام تحليل المبيعات", content: [
          { type: "p", content: "نبني نظاماً متكاملاً يُطبّق الدوال والبرمجة الوظيفية وتحليل البيانات:" },
          { type: "code", language: "python", content: `from typing import Optional

# بيانات المبيعات
sales_data = [
    {"product": "هاتف",  "qty": 50,  "price": 999.99, "region": "الرياض"},
    {"product": "حاسب",  "qty": 30,  "price": 1499.0, "region": "جدة"},
    {"product": "سماعة", "qty": 120, "price": 199.99,  "region": "الرياض"},
    {"product": "ساعة",  "qty": 80,  "price": 349.99,  "region": "الدمام"},
    {"product": "حاسب",  "qty": 20,  "price": 1499.0, "region": "الرياض"},
]

def calculate_revenue(item: dict) -> float:
    """تحسب إيراد عنصر واحد."""
    return item["qty"] * item["price"]

def filter_by_region(data: list[dict], region: str) -> list[dict]:
    """تُرجع المبيعات في منطقة معينة."""
    return [item for item in data if item["region"] == region]

def total_revenue(data: list[dict]) -> float:
    """تحسب إجمالي الإيرادات."""
    revenues = map(calculate_revenue, data)
    return sum(revenues)

def top_product(data: list[dict]) -> Optional[dict]:
    """تُرجع المنتج ذا أعلى إيراد."""
    if not data:
        return None
    return max(data, key=calculate_revenue)

def generate_report(data: list[dict]) -> None:
    """تولّد تقريراً مفصلاً للمبيعات."""
    regions = set(item["region"] for item in data)

    print("=" * 50)
    print("تقرير المبيعات الإجمالي")
    print("=" * 50)
    print(f"إجمالي الإيرادات: {total_revenue(data):,.2f} ريال")
    print(f"عدد المنتجات المباعة: {len(data)}")

    best = top_product(data)
    if best:
        print(f"أعلى إيراد: {best['product']} ({calculate_revenue(best):,.2f} ريال)")

    print("\\n--- الإيرادات حسب المنطقة ---")
    for region in sorted(regions):
        region_data = filter_by_region(data, region)
        rev = total_revenue(region_data)
        print(f"  {region}: {rev:,.2f} ريال")

generate_report(sales_data)` }
        ]},

        { type: "active-recall", questions: [
          { q: "ما الفرق بين Parameter و Argument؟", a: "الـ Parameter هو المتغير في تعريف الدالة def add(a, b): — a وb هما Parameters. الـ Argument هو القيمة الفعلية الممررة عند الاستدعاء add(5, 3) — 5 و3 هما Arguments." },
          { q: "ماذا يحدث للكود الموجود بعد return في نفس الدالة؟", a: "لا يُنفّذ أبداً. return تنهي الدالة فوراً وترجع القيمة. أي كود بعد return في نفس الفرع هو Dead Code." },
          { q: "لماذا Type Hints مفيدة؟", a: "تساعد محررات الكود (VS Code) في اكتشاف الأخطاء قبل التشغيل، وتوثّق ما تتوقعه الدالة من أنواع، وتجعل الكود أسهل للفهم من قِبل الزملاء." },
          { q: "ما هو Closure وما استخدامه العملي؟", a: "دالة تتذكر متغيرات من البيئة التي أُنشئت فيها حتى بعد انتهائها. الاستخدام: بناء دوال مصنعة، عدادات، وتطبيق الـ Decorators." },
          { q: "ما الفرق بين map() وlist comprehension؟", a: "كلاهما يطبق عملية على كل عنصر. list comprehension أكثر قراءة وأكثر Pythonicية للحالات البسيطة. map() مناسب أكثر عند استخدام دالة معرّفة مسبقاً. في الأداء هما متقاربان." }
        ]}
      ]
    },
    {
      id: "unit-6",
      stageId: "stage-1",
      unitNumber: 5,
      title: "مجموعات البيانات: القوائم والقواميس",
      description: "هياكل البيانات الأساسية في Python: Lists وDictionaries وأكثر.",
      content: [
        { type: "h1", content: "الوحدة 5: مجموعات البيانات" },
        { type: "p", content: "في الواقع العملي لا نتعامل مع رقم واحد أو نص واحد، بل مع بيانات كثيرة: قائمة طلاب، سجل مشتريات، إعدادات مستخدم، نتائج استعلام من قاعدة بيانات. نحتاج هياكل بيانات (Data Structures) لتنظيم هذه المعلومات بطريقة تجعل الوصول إليها وتعديلها سهلاً وسريعاً." },
        { type: "p", content: "اختيار هيكل البيانات المناسب هو قرار هندسي مهم يؤثر على أداء برنامجك. نفس المشكلة يمكن حلها بقائمة أو قاموس أو مجموعة، لكن الأداء قد يختلف من ثوانٍ إلى أجزاء من الثانية. هذه الوحدة تمنحك أدوات التفكير الصحيحة لاتخاذ هذه القرارات." },

        { type: "h2", content: "1. القوائم (Lists)" },
        { type: "p", content: "القائمة (List) هي أكثر هياكل البيانات استخداماً في Python. تخزن عناصر مرتبة يمكن تعديلها، وكل عنصر يُصل إليه برقم ترتيبه (Index) يبدأ من الصفر. تصلح لتخزين أي نوع من البيانات، حتى قوائم داخل قوائم (Nested Lists)." },
        { type: "code", language: "python", content: `fruits = ["تفاح", "موز", "برتقال", "عنب"]

# الوصول بالـ Index (يبدأ من 0)
print(fruits[0])       # تفاح — العنصر الأول
print(fruits[-1])      # عنب  — الأخير (سالب يعد من النهاية)
print(fruits[1:3])     # ['موز', 'برتقال'] — Slicing
print(fruits[::2])     # ['تفاح', 'برتقال'] — كل عنصر ثانٍ
print(fruits[::-1])    # ['عنب','برتقال','موز','تفاح'] — عكس القائمة

# التعديل
fruits.append("مانجو")    # إضافة للآخر — O(1)
fruits.insert(1, "كيوي") # إضافة في موضع محدد — O(n)
fruits.remove("موز")      # حذف بالقيمة (أول ظهور) — O(n)
removed = fruits.pop(0)   # حذف بالـ Index ويُرجع العنصر المحذوف

print(len(fruits))         # عدد العناصر
print("تفاح" in fruits)   # True/False — البحث O(n)
print(fruits.count("عنب")) # عدد تكرار عنصر

# الفرز
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
numbers.sort()             # يُعدّل القائمة في مكانها
print(numbers)             # [1, 1, 2, 3, 4, 5, 6, 9]
sorted_copy = sorted(numbers, reverse=True)  # يُنشئ نسخة مرتبة جديدة` },

        { type: "h2", content: "2. القوائم متعددة الأبعاد (Nested Lists)" },
        { type: "p", content: "القوائم يمكن أن تحتوي على قوائم، مما يُنشئ بنيات ثنائية وثلاثية الأبعاد. هذا مفيد لتمثيل جداول البيانات، لوحات الألعاب، المصفوفات الرياضية." },
        { type: "code", language: "python", content: `# جدول درجات طلاب: كل صف [الاسم، رياضيات، علوم، إنجليزي]
grades_table = [
    ["أحمد",   90, 85, 88],
    ["سارة",   95, 98, 92],
    ["محمد",   75, 70, 80],
]

# الوصول: grades_table[row][column]
print(grades_table[0][0])   # أحمد — الاسم
print(grades_table[1][1])   # 95   — رياضيات سارة

# طباعة الجدول
for student in grades_table:
    name = student[0]
    avg = sum(student[1:]) / 3
    print(f"{name}: متوسط {avg:.1f}")

# لوحة تيك-تاك-تو 3×3
board = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["O", "X", "O"]
]

# فحص ما إذا كانت كل الصفوف X (مبسط)
def check_winner(board, player):
    for row in board:
        if all(cell == player for cell in row):
            return True
    return False` },

        { type: "h2", content: "3. القواميس (Dictionaries)" },
        { type: "p", content: "القاموس يخزن البيانات كأزواج (Key: Value). سريع جداً في البحث لأنه يستخدم Hash Map داخلياً — البحث عن مفتاح يستغرق O(1) بغض النظر عن حجم القاموس. هذا يجعله الخيار المثالي لأي عملية تحتاج 'معرفة معلومات عن شيء ما'." },
        { type: "code", language: "python", content: `student = {
    "name": "سالم",
    "age": 20,
    "major": "علوم حاسب",
    "gpa": 3.8,
    "courses": ["Python", "Algorithms", "OOP"]  # قيم يمكن أن تكون أي نوع
}

# الوصول — يُرجع خطأ KeyError إذا المفتاح غير موجود
print(student["name"])

# الوصول الآمن — يُرجع None أو قيمة افتراضية
print(student.get("email", "لا يوجد"))   # لا يوجد

# التعديل والإضافة
student["age"] = 21
student["email"] = "salem@example.com"

# حذف
del student["gpa"]
removed = student.pop("age", None)  # حذف آمن مع قيمة افتراضية

# الدوران — الأكثر استخداماً
for key, value in student.items():
    print(f"{key}: {value}")

# فحص الوجود
if "email" in student:
    print("لدى الطالب بريد إلكتروني")

# دمج قاموسين (Python 3.9+)
defaults = {"city": "الرياض", "country": "السعودية"}
full_profile = student | defaults   # دمج مع إعطاء الأولوية لـ student` },
        { type: "callout", calloutType: "ai-tip", content: [
          { type: "p", content: "القاموس في Python يعمل داخلياً باستخدام Hash Map. هذا يعني أن البحث عن مفتاح يستغرق O(1) — وقتاً ثابتاً مهما كبر القاموس — مقارنة بالقائمة التي تحتاج O(n) للبحث. استخدم القاموس عندما تحتاج بحثاً متكرراً." }
        ]},

        { type: "h2", content: "4. المجموعات (Sets) والـ Tuples" },
        { type: "p", content: "الـ Set هو مجموعة من القيم الفريدة بدون ترتيب، مثالي لحذف المكررات وعمليات المجموعات (الاتحاد، التقاطع، الفرق). الـ Tuple هو قائمة ثابتة غير قابلة للتعديل، مناسب للبيانات التي لا يجب أن تتغير." },
        { type: "code", language: "python", content: `# Set: مجموعة فريدة (لا تكرار، بدون ترتيب)
unique_items = {1, 2, 3, 3, 2}
print(unique_items)    # {1, 2, 3} — التكرار يحذف تلقائياً

# حذف المكررات من قائمة
names = ["Ali", "Sara", "Ali", "Mohammed"]
unique_names = list(set(names))
print(unique_names)  # ترتيب غير مضمون

# عمليات المجموعات
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}
print(a | b)   # {1, 2, 3, 4, 5, 6} — الاتحاد
print(a & b)   # {3, 4}             — التقاطع
print(a - b)   # {1, 2}             — الفرق (في a وليس في b)
print(a ^ b)   # {1, 2, 5, 6}       — الفرق المتماثل

# Tuple: قائمة ثابتة لا تتغير (Immutable)
coordinates = (25.2048, 55.2708)  # خط العرض والطول لدبي
rgb_red = (255, 0, 0)
point_3d = (1, 2, 3)

# Tuple Unpacking: استخراج القيم
lat, lng = coordinates
print(f"خط العرض: {lat}, خط الطول: {lng}")

# Tuples كمفاتيح في القواميس (Lists لا تصلح)
locations = {(25.2, 55.3): "دبي", (24.7, 46.7): "الرياض"}

# Named Tuple: وضوح أكبر
from collections import namedtuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(10, 20)
print(p.x, p.y)    # 10 20 — وصول بالاسم أوضح من الـ Index` },

        { type: "h2", content: "5. List Comprehensions و Dict Comprehensions" },
        { type: "p", content: "طريقة Python الأنيقة لإنشاء قوائم وقواميس في سطر واحد. أسرع من الحلقات التقليدية وأكثر وضوحاً في التعبير عن النية." },
        { type: "code", language: "python", content: `# List Comprehension الأساسية
squares = [i ** 2 for i in range(1, 6)]
# [1, 4, 9, 16, 25]

# مع شرط (Filter + Map)
even_squares = [i ** 2 for i in range(1, 11) if i % 2 == 0]
# [4, 16, 36, 64, 100]

# على قائمة موجودة
names = ["ahmed", "sara", "mohammed"]
capitalized = [n.title() for n in names]
# ['Ahmed', 'Sara', 'Mohammed']

# Dict Comprehension
word = "hello"
char_count = {char: word.count(char) for char in set(word)}
# {'h': 1, 'e': 1, 'l': 2, 'o': 1}

# قاموس من قائمتين
keys = ["name", "age", "city"]
values = ["أحمد", 25, "الرياض"]
profile = {k: v for k, v in zip(keys, values)}

# Set Comprehension
unique_lengths = {len(name) for name in ["Ali", "Sara", "Mohammed"]}
# {3, 4, 8}` },

        { type: "h2", content: "6. JSON — التخزين والتبادل" },
        { type: "p", content: "JSON (JavaScript Object Notation) هو تنسيق نصي لتمثيل البيانات المنظمة. يُستخدم في كل مكان: APIs، ملفات الإعدادات، قواعد البيانات. Python تتعامل مع JSON بسهولة كاملة — القواميس تتحول لـ JSON وبالعكس." },
        { type: "code", language: "python", content: `import json

# Python dict → JSON string
user = {
    "name": "أحمد",
    "age": 25,
    "skills": ["Python", "JavaScript"],
    "active": True,
    "salary": None
}

json_string = json.dumps(user, ensure_ascii=False, indent=2)
print(json_string)
# {
#   "name": "أحمد",
#   "age": 25,
#   "skills": ["Python", "JavaScript"],
#   "active": true,
#   "salary": null
# }

# JSON string → Python dict
data = json.loads(json_string)
print(data["name"])  # أحمد
print(type(data))    # <class 'dict'>

# قراءة وكتابة ملف JSON
with open("users.json", "w", encoding="utf-8") as f:
    json.dump(user, f, ensure_ascii=False, indent=2)

with open("users.json", "r", encoding="utf-8") as f:
    loaded_user = json.load(f)
print(loaded_user["skills"])  # ['Python', 'JavaScript']` },

        { type: "project", title: "نظام إدارة درجات الطلاب", content: [
          { type: "p", content: "نظام متكامل يستخدم List وDictionary وJSON لتخزين وتحليل وحفظ درجات الطلاب:" },
          { type: "code", language: "python", content: `import json
from statistics import mean, stdev

students_db = [
    {"id": "S001", "name": "Ali",     "grades": {"رياضيات": 85, "علوم": 90, "إنجليزي": 88}},
    {"id": "S002", "name": "Sara",    "grades": {"رياضيات": 95, "علوم": 98, "إنجليزي": 92}},
    {"id": "S003", "name": "Mohammed","grades": {"رياضيات": 70, "علوم": 75, "إنجليزي": 68}},
    {"id": "S004", "name": "Noura",   "grades": {"رياضيات": 88, "علوم": 82, "إنجليزي": 95}},
]

def analyze_student(student: dict) -> dict:
    """تحلل درجات طالب وتُرجع إحصائيات."""
    grades = list(student["grades"].values())
    avg = mean(grades)
    best_subject = max(student["grades"], key=student["grades"].get)
    return {
        "id": student["id"],
        "name": student["name"],
        "average": round(avg, 2),
        "highest": max(grades),
        "lowest": min(grades),
        "best_subject": best_subject,
        "grade": "ممتاز" if avg >= 90 else "جيد جداً" if avg >= 80 else "جيد" if avg >= 70 else "مقبول"
    }

def class_statistics(students: list) -> dict:
    """تحسب إحصائيات الفصل."""
    all_averages = [analyze_student(s)["average"] for s in students]
    return {
        "class_average": round(mean(all_averages), 2),
        "highest_student": max(students, key=lambda s: mean(s["grades"].values()))["name"],
        "lowest_student": min(students, key=lambda s: mean(s["grades"].values()))["name"],
        "std_deviation": round(stdev(all_averages), 2)
    }

# تحليل جميع الطلاب
results = [analyze_student(s) for s in students_db]
stats = class_statistics(students_db)

# طباعة منظمة
print(f"{'الطالب':<12} {'المتوسط':<10} {'الأعلى':<8} {'الأدنى':<8} {'التقدير'}")
print("-" * 50)
for r in results:
    print(f"{r['name']:<12} {r['average']:<10} {r['highest']:<8} {r['lowest']:<8} {r['grade']}")

print(f"\\nمتوسط الفصل: {stats['class_average']}")
print(f"أعلى طالب: {stats['highest_student']}")

# حفظ النتائج كـ JSON
with open("results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print("\\nتم حفظ النتائج في results.json")` }
        ]},

        { type: "active-recall", questions: [
          { q: "بأي رقم يبدأ الـ Index في القوائم؟", a: "يبدأ بالصفر (0). العنصر الأول في fruits[0]، والأخير في fruits[-1]. هذا النظام مشترك في معظم لغات البرمجة." },
          { q: "ما الفرق بين List و Set؟", a: "List مرتبة وتسمح بالتكرار وتُصل بالـ Index. Set غير مرتبة ولا تسمح بتكرار العناصر (كل عنصر فريد) وتدعم عمليات المجموعات الرياضية. استخدم Set عند الحاجة لضمان الفرادة أو سرعة البحث." },
          { q: "لماذا Dictionary أسرع من List في البحث؟", a: "لأن Dictionary تستخدم Hash Map: تحوّل المفتاح لرقم (Hash) وتذهب مباشرة للموقع O(1)، دون البحث التسلسلي O(n) من أول العناصر كما في List." },
          { q: "ما هو Tuple ومتى نستخدمه؟", a: "قائمة ثابتة لا تتغير بعد الإنشاء. نستخدمه للبيانات التي لا يجب تعديلها كالإحداثيات أو الألوان RGB. له أداء أفضل من List وبالصدفة يمكن استخدامه كمفتاح في Dictionary." },
          { q: "ما هو JSON ولماذا هو مهم في تطوير الويب؟", a: "JSON تنسيق نصي لتبادل البيانات مُشتق من JavaScript لكن مستقل عن أي لغة. مهم لأن جميع REST APIs ترسل وتستقبل البيانات بصيغة JSON، وهو التنسيق القياسي للتواصل بين الأنظمة المختلفة." },
          { q: "ما الفرق بين list.sort() وsorted()؟", a: "list.sort() تُعدّل القائمة في مكانها وترجع None. sorted() تُنشئ قائمة جديدة مرتبة وتُبقي الأصلية كما هي. استخدم sorted() إذا احتجت الحفاظ على النسخة الأصلية." }
        ]}
      ]
    }
  ]
};
