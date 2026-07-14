export const appendixPage = {
  title: "الملاحق المرجعية الشاملة",
  description: "مرجعك الكامل كمهندس برمجيات: جداول، أوامر، مخططات، وقاموس 60+ مصطلحاً.",
  sections: [
    {
      title: "1. HTTP Status Codes — الكاملة",
      type: "table",
      headers: ["الكود", "الاسم", "المعنى ومتى يُستخدم"],
      rows: [
        // 2xx Success
        ["200", "OK", "الطلب ناجح — للـ GET الذي يُرجع بيانات"],
        ["201", "Created", "تم إنشاء مورد جديد — للـ POST الذي ينشئ سجلاً"],
        ["204", "No Content", "ناجح بلا محتوى — للـ DELETE والـ PUT بدون رد"],
        ["206", "Partial Content", "جزء من المحتوى — للـ streaming أو تحميل الملفات الكبيرة"],
        // 3xx Redirect
        ["301", "Moved Permanently", "المورد انتقل نهائياً — مناسب لـ SEO"],
        ["302", "Found (Temporary)", "إعادة توجيه مؤقتة — تستخدم بعد Login redirect"],
        ["304", "Not Modified", "لا تغيير منذ آخر طلب — للـ Cache"],
        // 4xx Client Errors
        ["400", "Bad Request", "البيانات المرسلة غير صالحة — validation failed"],
        ["401", "Unauthorized", "يحتاج مصادقة (token مفقود أو منتهي)"],
        ["403", "Forbidden", "مصادق لكن ليس لديه صلاحية (مستخدم عادي يصل لـ admin route)"],
        ["404", "Not Found", "المورد غير موجود"],
        ["405", "Method Not Allowed", "الـ Method (GET/POST...) غير مسموح على هذا المسار"],
        ["409", "Conflict", "تعارض — مثل محاولة تسجيل email موجود مسبقاً"],
        ["410", "Gone", "المورد كان موجوداً وحُذف نهائياً"],
        ["422", "Unprocessable Entity", "البيانات صحيحة الشكل لكن خاطئة منطقياً"],
        ["429", "Too Many Requests", "تجاوز حد الطلبات (Rate Limiting)"],
        // 5xx Server Errors
        ["500", "Internal Server Error", "خطأ غير متوقع في الخادم — راجع الـ Logs"],
        ["502", "Bad Gateway", "الـ Proxy لم يتلقَّ رداً صحيحاً من الخادم"],
        ["503", "Service Unavailable", "الخادم متوقف مؤقتاً (صيانة أو حمل زائد)"],
        ["504", "Gateway Timeout", "الخادم لم يرد في الوقت المحدد"]
      ]
    },
    {
      title: "2. HTTP Headers المهمة",
      type: "table",
      headers: ["الـ Header", "الاتجاه", "مثال القيمة", "الاستخدام"],
      rows: [
        ["Authorization", "طلب", "Bearer eyJhbGci...", "إرسال JWT token للمصادقة"],
        ["Content-Type", "طلب/رد", "application/json", "نوع البيانات المرسلة"],
        ["Accept", "طلب", "application/json", "نوع البيانات الذي يقبله العميل"],
        ["Cache-Control", "رد", "max-age=3600", "تعليمات التخزين المؤقت للمتصفح"],
        ["CORS: Access-Control-Allow-Origin", "رد", "https://app.com", "السماح للنطاقات بالوصول"],
        ["X-Request-ID", "طلب/رد", "uuid-v4", "معرف فريد لتتبع الطلب في الـ Logs"],
        ["ETag", "رد", "\"abc123\"", "بصمة المورد للـ Cache Invalidation"],
        ["X-Rate-Limit-Remaining", "رد", "47", "عدد الطلبات المتبقية في النافذة الحالية"],
        ["Retry-After", "رد (429)", "30", "ثوانٍ قبل إعادة المحاولة بعد Rate Limit"]
      ]
    },
    {
      title: "3. Git — المرجع الكامل",
      type: "code",
      language: "bash",
      content: `# ═══════════════════════════════════════
#          الإعداد الأولي (مرة واحدة)
# ═══════════════════════════════════════
git config --global user.name "اسمك"
git config --global user.email "email@example.com"
git config --global core.editor "code --wait"   # VS Code كمحرر افتراضي

# ═══════════════════════════════════════
#          بدء المشروع
# ═══════════════════════════════════════
git init                          # مستودع جديد في المجلد الحالي
git clone URL                     # استنساخ مستودع موجود
git clone URL --depth=1           # استنساخ آخر commit فقط (أسرع)

# ═══════════════════════════════════════
#          الإضافة والحفظ
# ═══════════════════════════════════════
git status                        # ما الذي تغير؟
git diff                          # ماذا تغير بالتفصيل؟
git diff --staged                 # ما تمت إضافته للـ Stage؟

git add .                         # أضف كل التغييرات
git add src/components/           # أضف مجلداً محدداً
git add -p                        # اختر التغييرات التي تريد إضافتها تفاعلياً

git commit -m "feat: إضافة صفحة تسجيل الدخول"
git commit --amend                # تعديل آخر commit (قبل الرفع)

# ═══════════════════════════════════════
#          الفروع (Branches)
# ═══════════════════════════════════════
git branch                        # عرض الفروع
git branch feature/login          # إنشاء فرع جديد
git switch feature/login          # الانتقال للفرع
git switch -c feature/login       # إنشاء والانتقال في خطوة واحدة
git branch -d feature/login       # حذف فرع (بعد الدمج)
git branch -D feature/login       # حذف قسراً

# ═══════════════════════════════════════
#          الدمج (Merge & Rebase)
# ═══════════════════════════════════════
git merge feature/login           # دمج فرع بالفرع الحالي
git merge --no-ff feature/login   # دمج مع commit صريح (موصى به)
git rebase main                   # إعادة تطبيق commits على main (تاريخ نظيف)
git cherry-pick abc123            # نسخ commit محدد للفرع الحالي

# ═══════════════════════════════════════
#          GitHub (Remote)
# ═══════════════════════════════════════
git remote add origin URL         # ربط بـ remote
git push origin feature/login     # رفع فرع
git push -u origin main           # رفع وضبط upstream
git pull origin main              # جلب ودمج
git fetch origin                  # جلب فقط بدون دمج

# ═══════════════════════════════════════
#          التراجع والتصحيح
# ═══════════════════════════════════════
git restore src/file.ts           # تراجع عن تغييرات ملف (غير staged)
git restore --staged src/file.ts  # إزالة ملف من الـ Stage
git revert abc123                 # تراجع عن commit بإنشاء commit عكسي (آمن)
git reset --soft HEAD~1           # تراجع عن commit مع إبقاء التغييرات staged
git reset --hard HEAD~1           # تراجع كامل (خطير: يحذف التغييرات)
git stash                         # حفظ تغييرات مؤقتاً
git stash pop                     # استرجاعها

# ═══════════════════════════════════════
#          التاريخ والبحث
# ═══════════════════════════════════════
git log --oneline --graph         # تاريخ نصي مرئي
git log -p                        # تاريخ مع التغييرات التفصيلية
git blame src/file.ts             # من كتب كل سطر؟
git bisect start                  # البحث الثنائي عن commit أدخل bug`
    },
    {
      title: "4. Conventional Commits — معيار كتابة رسائل Commit",
      type: "table",
      headers: ["النوع", "متى تستخدمه؟", "مثال"],
      rows: [
        ["feat", "إضافة ميزة جديدة", "feat: إضافة نظام الإشعارات"],
        ["fix", "إصلاح خطأ برمجي", "fix: إصلاح خطأ حساب الخصم"],
        ["docs", "تحديث التوثيق فقط", "docs: تحديث README بخطوات التثبيت"],
        ["style", "تنسيق كود (لا تغيير منطقي)", "style: تطبيق eslint fixes"],
        ["refactor", "إعادة هيكلة بدون تغيير سلوك", "refactor: استخرج UserService من Controller"],
        ["test", "إضافة أو تعديل اختبارات", "test: إضافة اختبارات وحدة لـ AuthService"],
        ["chore", "صيانة (dependencies، configs)", "chore: ترقية Vite إلى الإصدار 6"],
        ["perf", "تحسين الأداء", "perf: إضافة Index لجدول orders"],
        ["ci", "تغيير في CI/CD pipeline", "ci: إضافة خطوة نشر Staging"],
        ["BREAKING CHANGE", "تغيير يكسر التوافق", "feat!: تغيير تنسيق response للـ API"]
      ]
    },
    {
      title: "5. SQL — المرجع الكامل مع أمثلة",
      type: "code",
      language: "sql",
      content: `-- ═══════════════════════════════════════
--           الاستعلامات الأساسية
-- ═══════════════════════════════════════
SELECT * FROM users;
SELECT id, name, email FROM users WHERE active = true;
SELECT * FROM users ORDER BY created_at DESC LIMIT 20 OFFSET 40;  -- الصفحة الثالثة

-- تصفية نصية
SELECT * FROM products WHERE name LIKE '%قميص%';    -- يحتوي على "قميص"
SELECT * FROM products WHERE name ILIKE '%shirt%';  -- بدون حساسية حروف

-- الدوال المجمّعة
SELECT COUNT(*) FROM orders;
SELECT status, COUNT(*) as total FROM orders GROUP BY status;
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 5000   -- مثل WHERE لكن للنتائج المجمّعة
ORDER BY avg_salary DESC;

-- ═══════════════════════════════════════
--           الجداول المتعددة (JOINs)
-- ═══════════════════════════════════════

-- INNER JOIN: السجلات الموجودة في الجدولين
SELECT orders.id, users.name, orders.total
FROM orders
INNER JOIN users ON orders.user_id = users.id;

-- LEFT JOIN: كل سجلات اليسار + ما يطابق في اليمين (NULL إن لم يوجد)
SELECT users.name, orders.total
FROM users
LEFT JOIN orders ON users.id = orders.user_id;
-- يُظهر المستخدمين حتى لو ليس لديهم طلبات

-- RIGHT JOIN: عكس LEFT JOIN (نادراً ما يستخدم)
-- FULL OUTER JOIN: كل السجلات من الجانبين

-- ═══════════════════════════════════════
--           Subqueries
-- ═══════════════════════════════════════

-- Subquery في WHERE
SELECT name FROM products
WHERE price > (SELECT AVG(price) FROM products);  -- المنتجات فوق المتوسط

-- Subquery في FROM (كجدول مؤقت)
SELECT department, avg_salary
FROM (
  SELECT department, AVG(salary) as avg_salary FROM employees GROUP BY department
) AS dept_stats
WHERE avg_salary > 5000;

-- CTE (Common Table Expression) — أوضح من Subquery
WITH high_earners AS (
  SELECT user_id, SUM(total) as lifetime_value
  FROM orders
  GROUP BY user_id
  HAVING SUM(total) > 10000
)
SELECT users.name, high_earners.lifetime_value
FROM users
JOIN high_earners ON users.id = high_earners.user_id;

-- ═══════════════════════════════════════
--           Window Functions
-- ═══════════════════════════════════════

-- ترتيب المبيعات داخل كل فئة
SELECT
  name,
  category,
  sales,
  RANK() OVER (PARTITION BY category ORDER BY sales DESC) as rank_in_category,
  ROW_NUMBER() OVER (ORDER BY sales DESC) as overall_rank,
  SUM(sales) OVER (PARTITION BY category) as category_total
FROM products;

-- ═══════════════════════════════════════
--           الإنشاء والتعديل
-- ═══════════════════════════════════════

-- إنشاء جدول
CREATE TABLE orders (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total       DECIMAL(10, 2) NOT NULL CHECK (total >= 0),
  status      VARCHAR(20) NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','processing','shipped','delivered','cancelled')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- الفهارس (Indexes) لتسريع الاستعلامات
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status   ON orders(status);
CREATE INDEX idx_orders_created  ON orders(created_at DESC);
-- فهرس مركّب
CREATE INDEX idx_orders_user_status ON orders(user_id, status);

-- ═══════════════════════════════════════
--           Transactions
-- ═══════════════════════════════════════

BEGIN;
  UPDATE accounts SET balance = balance - 500 WHERE id = 1;
  UPDATE accounts SET balance = balance + 500 WHERE id = 2;
  -- إذا نجح كل شيء
COMMIT;
-- إذا حدث خطأ
ROLLBACK;

-- ═══════════════════════════════════════
--           أوامر مفيدة أخرى
-- ═══════════════════════════════════════
EXPLAIN ANALYZE SELECT ...;   -- تحليل أداء استعلام
\d table_name                 -- عرض بنية جدول في psql
\dt                           -- عرض كل الجداول`
    },
    {
      title: "6. Python — مرجع سريع",
      type: "code",
      language: "python",
      content: `# ═══════════════════════════════════════
#          هياكل البيانات
# ═══════════════════════════════════════
lst = [1, 2, 3]             # List — مرتبة، قابلة للتغيير
tpl = (1, 2, 3)             # Tuple — مرتبة، غير قابلة للتغيير
st  = {1, 2, 3}             # Set — غير مرتبة، بلا تكرار
dct = {"a": 1, "b": 2}     # Dict — Key-Value

# List Comprehensions
squares   = [x**2 for x in range(10)]
evens     = [x for x in range(20) if x % 2 == 0]
flat      = [x for row in matrix for x in row]

# Dict Comprehension
freq = {word: sentence.count(word) for word in sentence.split()}

# ═══════════════════════════════════════
#          الدوال المتقدمة
# ═══════════════════════════════════════
# Type Hints + Default Values
def greet(name: str, greeting: str = "مرحباً") -> str:
    return f"{greeting}، {name}!"

# *args و **kwargs
def total(*numbers: float) -> float:
    return sum(numbers)

def create_user(**kwargs: str) -> dict:
    return {"id": 1, **kwargs}  # بسط القاموس

# Lambda (لدوال بسطر واحد)
double = lambda x: x * 2
sorted_users = sorted(users, key=lambda u: u["age"])

# Decorators
import functools

def log_call(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"استدعاء {func.__name__}")
        result = func(*args, **kwargs)
        print(f"انتهى {func.__name__}")
        return result
    return wrapper

@log_call
def process_order(order_id: int): ...

# ═══════════════════════════════════════
#          OOP
# ═══════════════════════════════════════
from dataclasses import dataclass, field
from abc import ABC, abstractmethod

@dataclass
class Point:
    x: float
    y: float
    label: str = "نقطة"

    def distance_to(self, other: "Point") -> float:
        return ((self.x - other.x)**2 + (self.y - other.y)**2) ** 0.5

class Shape(ABC):
    @abstractmethod
    def area(self) -> float: ...
    @abstractmethod
    def perimeter(self) -> float: ...

class Rectangle(Shape):
    def __init__(self, w: float, h: float):
        self.w, self.h = w, h
    def area(self)      -> float: return self.w * self.h
    def perimeter(self) -> float: return 2 * (self.w + self.h)

# ═══════════════════════════════════════
#          معالجة الأخطاء
# ═══════════════════════════════════════
try:
    result = int(input("أدخل رقماً: "))
except ValueError as e:
    print(f"خطأ في التحويل: {e}")
except ZeroDivisionError:
    print("لا يمكن القسمة على صفر")
else:
    print(f"النتيجة: {result}")   # ينفذ فقط عند النجاح
finally:
    print("ينفذ دائماً")           # تنظيف الموارد

# Custom Exception
class InsufficientFundsError(Exception):
    def __init__(self, amount: float, balance: float):
        self.amount  = amount
        self.balance = balance
        super().__init__(f"الرصيد {balance} غير كافٍ لسحب {amount}")

# ═══════════════════════════════════════
#          التعامل مع الملفات
# ═══════════════════════════════════════
# قراءة
with open("data.json", "r", encoding="utf-8") as f:
    import json
    data = json.load(f)

# كتابة
with open("output.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# ═══════════════════════════════════════
#          مكتبات شائعة
# ═══════════════════════════════════════
# requests — طلبات HTTP
import requests
response = requests.get("https://api.example.com/users", headers={"Authorization": f"Bearer {token}"})
data = response.json()

# pathlib — التعامل مع المسارات
from pathlib import Path
p = Path("src") / "data" / "file.txt"
p.parent.mkdir(parents=True, exist_ok=True)
p.write_text("المحتوى", encoding="utf-8")`
    },
    {
      title: "7. TypeScript — مرجع سريع",
      type: "code",
      language: "typescript",
      content: `// ═══════════════════════════════════════
//         الأنواع الأساسية
// ═══════════════════════════════════════
const name: string = "Ahmed";
const age: number = 25;
const active: boolean = true;
const data: unknown = JSON.parse(rawJson); // أكثر أماناً من any
const val: any = whatever;                 // تعطيل فحص النوع (تجنب)
const nothing: null | undefined = null;

// Arrays
const nums: number[] = [1, 2, 3];
const names: Array<string> = ["Ali", "Sara"];

// Tuple
const point: [number, number] = [0, 0];

// ═══════════════════════════════════════
//         الأنواع المركبة
// ═══════════════════════════════════════

// Interface
interface User {
  readonly id: number;   // لا يمكن تغييره بعد الإنشاء
  name: string;
  email: string;
  age?: number;          // اختياري
}

// Type Alias
type Status = "pending" | "active" | "banned";  // Union Type
type ID = string | number;

// Generic
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
const firstUser = first<User>(users);

// Mapped Types
type Optional<T> = { [K in keyof T]?: T[K] };      // كل الحقول اختيارية
type Readonly<T> = { readonly [K in keyof T]: T[K] }; // كل الحقول للقراءة فقط
type Partial<T> = Optional<T>;  // مضمّنة في TypeScript

// Utility Types
type UpdateUserDto = Partial<User>;    // كل الحقول اختيارية
type PublicUser    = Omit<User, 'passwordHash'>;  // بدون حقل
type UserKeys      = keyof User;       // "id" | "name" | "email" | "age"
type StringUser    = Pick<User, 'name' | 'email'>; // حقول محددة فقط

// ═══════════════════════════════════════
//         الدوال
// ═══════════════════════════════════════
// Function Type
type Handler = (req: Request, res: Response) => void;

// Overloads
function format(val: string): string;
function format(val: number, decimals: number): string;
function format(val: string | number, decimals?: number): string {
  if (typeof val === "string") return val.trim();
  return val.toFixed(decimals ?? 2);
}

// ═══════════════════════════════════════
//         Classes
// ═══════════════════════════════════════
abstract class Repository<T> {
  protected items: T[] = [];
  abstract findById(id: number): T | undefined;
  findAll(): T[] { return this.items; }
}

class UserRepository extends Repository<User> {
  findById(id: number): User | undefined {
    return this.items.find(u => u.id === id);
  }
  save(user: User): void {
    const idx = this.items.findIndex(u => u.id === user.id);
    if (idx >= 0) this.items[idx] = user;
    else this.items.push(user);
  }
}

// ═══════════════════════════════════════
//         Type Guards
// ═══════════════════════════════════════
function isUser(obj: unknown): obj is User {
  return typeof obj === "object" && obj !== null && "email" in obj;
}

// ═══════════════════════════════════════
//         Async/Await مع أنواع
// ═══════════════════════════════════════
async function fetchUser(id: number): Promise<User> {
  const res = await fetch(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
  return res.json() as Promise<User>;
}

// Promise.all مع أنواع
const [user, orders]: [User, Order[]] = await Promise.all([
  fetchUser(1),
  fetchOrders(1)
]);`
    },
    {
      title: "8. Java — مرجع سريع",
      type: "code",
      language: "java",
      content: `// ═══════════════════════════════════════
//         OOP الأساسي
// ═══════════════════════════════════════
public class BankAccount {
    // حقول private — الـ Encapsulation
    private final String ownerId;  // final = لا يتغير
    private double balance;

    public BankAccount(String ownerId, double initialBalance) {
        if (initialBalance < 0) throw new IllegalArgumentException("الرصيد لا يكون سالباً");
        this.ownerId = ownerId;
        this.balance = initialBalance;
    }

    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("المبلغ يجب أن يكون موجباً");
        this.balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > balance) throw new IllegalStateException("رصيد غير كافٍ");
        this.balance -= amount;
    }

    public double getBalance() { return balance; }

    @Override
    public String toString() {
        return String.format("BankAccount{owner=%s, balance=%.2f}", ownerId, balance);
    }
}

// ═══════════════════════════════════════
//         Interfaces & Generics
// ═══════════════════════════════════════
@FunctionalInterface
interface Validator<T> {
    boolean validate(T value);
}

// Lambda مع Functional Interface
Validator<String> emailValidator = email -> email.contains("@") && email.contains(".");
Validator<Integer> ageValidator   = age -> age >= 0 && age <= 150;

// Generic Repository Pattern
public interface Repository<T, ID> {
    Optional<T> findById(ID id);
    List<T> findAll();
    T save(T entity);
    void deleteById(ID id);
}

// ═══════════════════════════════════════
//         Collections Framework
// ═══════════════════════════════════════
// List
List<String> names = new ArrayList<>(Arrays.asList("Ali", "Sara", "Mohammed"));
names.add("Fatima");
names.sort(Comparator.naturalOrder());

// Map
Map<String, Integer> wordCount = new HashMap<>();
wordCount.put("Hello", 1);
wordCount.merge("Hello", 1, Integer::sum); // آمن: يجمع إن كان موجوداً

// Set
Set<String> unique = new HashSet<>(names); // إزالة التكرار

// ═══════════════════════════════════════
//         Streams API
// ═══════════════════════════════════════
List<Employee> employees = getEmployees();

double avgSalary = employees.stream()
    .filter(e -> e.getDepartment().equals("Engineering"))
    .mapToDouble(Employee::getSalary)
    .average()
    .orElse(0.0);

Map<String, List<Employee>> byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::getDepartment));

List<String> topNames = employees.stream()
    .filter(e -> e.getSalary() > 10000)
    .sorted(Comparator.comparing(Employee::getSalary).reversed())
    .limit(5)
    .map(Employee::getName)
    .collect(Collectors.toList());

// ═══════════════════════════════════════
//         معالجة الأخطاء
// ═══════════════════════════════════════
public class InsufficientFundsException extends RuntimeException {
    private final double amount;
    public InsufficientFundsException(double amount) {
        super(String.format("الرصيد غير كافٍ: طلبت %.2f", amount));
        this.amount = amount;
    }
    public double getAmount() { return amount; }
}

// try-with-resources (يغلق الموارد تلقائياً)
try (var conn = dataSource.getConnection();
     var stmt = conn.prepareStatement(sql)) {
    stmt.setInt(1, userId);
    ResultSet rs = stmt.executeQuery();
    // ...
} catch (SQLException e) {
    log.error("خطأ في قاعدة البيانات", e);
    throw new DatabaseException("فشل جلب بيانات المستخدم", e);
}`
    },
    {
      title: "9. Docker — مرجع سريع",
      type: "code",
      language: "bash",
      content: `# ═══════════════════════════════════════
#         أوامر الصور (Images)
# ═══════════════════════════════════════
docker images                          # عرض الصور المحلية
docker pull node:20-alpine             # تحميل صورة
docker build -t myapp:1.0 .           # بناء صورة من Dockerfile
docker rmi myapp:1.0                   # حذف صورة
docker image prune                     # حذف الصور غير المستخدمة

# ═══════════════════════════════════════
#         أوامر الحاويات (Containers)
# ═══════════════════════════════════════
docker run -d -p 3000:3000 --name api myapp:1.0   # تشغيل في الخلفية
docker ps                              # الحاويات العاملة
docker ps -a                           # كل الحاويات
docker logs api -f                     # تابع الـ Logs
docker exec -it api sh                 # ادخل للحاوية
docker stop api                        # إيقاف
docker rm api                          # حذف الحاوية
docker restart api                     # إعادة تشغيل

# ═══════════════════════════════════════
#         Docker Compose
# ═══════════════════════════════════════
docker compose up -d                   # تشغيل الخدمات في الخلفية
docker compose down                    # إيقاف وحذف الحاويات
docker compose down -v                 # + حذف الـ Volumes (بيانات DB!)
docker compose logs -f api             # متابعة logs خدمة محددة
docker compose exec api sh             # ادخل لخدمة
docker compose build --no-cache        # إعادة بناء الصور

# ═══════════════════════════════════════
#         Dockerfile مثالي
# ═══════════════════════════════════════
# Stage 1: بناء
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: تشغيل (صورة أصغر)
FROM node:20-alpine
WORKDIR /app
# مستخدم غير root للأمان
RUN addgroup -S app && adduser -S app -G app
COPY --from=builder --chown=app:app /app/node_modules ./node_modules
COPY --chown=app:app . .
USER app
EXPOSE 3000
HEALTHCHECK --interval=30s CMD wget -qO- http://localhost:3000/health || exit 1
CMD ["node", "dist/index.js"]`
    },
    {
      title: "10. الـ Bash/Linux — أوامر لا غنى عنها",
      type: "code",
      language: "bash",
      content: `# ═══════════════════════════════════════
#         التنقل والملفات
# ═══════════════════════════════════════
pwd                           # المجلد الحالي
ls -la                        # قائمة مفصلة مع الملفات المخفية
cd ~/projects                 # انتقل للمجلد
mkdir -p src/components       # إنشاء مجلدات متداخلة
cp -r src/ backup/            # نسخ مجلد
mv old-name.ts new-name.ts   # نقل أو إعادة تسمية
rm -rf dist/                  # حذف مجلد (خطير!)

# ═══════════════════════════════════════
#         البحث والتصفية
# ═══════════════════════════════════════
find . -name "*.ts" -not -path "*/node_modules/*"  # ابحث عن ملفات
grep -r "TODO" src/ --include="*.ts"               # ابحث في المحتوى
grep -rn "console.log" src/                        # مع أرقام الأسطر

# ═══════════════════════════════════════
#         إدارة العمليات
# ═══════════════════════════════════════
ps aux | grep node            # العمليات الجارية
kill -9 PID                   # إيقاف عملية
lsof -i :3000                 # ما يستخدم المنفذ 3000
netstat -tlnp                 # المنافذ المفتوحة

# ═══════════════════════════════════════
#         متغيرات البيئة
# ═══════════════════════════════════════
export PORT=3000              # تعريف متغير للجلسة
echo $PORT                    # طباعة متغير
printenv                      # كل متغيرات البيئة
source .env                   # تحميل ملف .env

# ═══════════════════════════════════════
#         أدوات الشبكة
# ═══════════════════════════════════════
curl -X POST https://api.example.com/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name": "Ahmed", "email": "a@b.com"}' \
  | jq .                     # تنسيق JSON

wget https://example.com/file.zip -O /tmp/file.zip

# ═══════════════════════════════════════
#         SSH والنسخ عن بعد
# ═══════════════════════════════════════
ssh user@server.com                  # اتصال
ssh-keygen -t ed25519 -C "email"     # توليد مفاتيح
ssh-copy-id user@server.com          # نسخ المفتاح العام

rsync -avz --progress src/ user@server:/var/www/app/  # مزامنة ملفات`
    },
    {
      title: "11. أنماط التصميم — جدول مرجعي",
      type: "table",
      headers: ["النمط", "الفئة", "المشكلة التي يحلها", "مثال تطبيقي في البرمجة"],
      rows: [
        ["Singleton", "إبداعي", "ضمان نسخة واحدة من الكلاس في النظام", "اتصال قاعدة البيانات، Logger، Config"],
        ["Factory Method", "إبداعي", "إنشاء كائنات بدون تحديد الكلاس الدقيق", "إنشاء أشكال هندسية، إنشاء Payment Processor"],
        ["Abstract Factory", "إبداعي", "إنشاء عائلات كاملة من الكائنات المترابطة", "UI Themes (Light/Dark), Database Drivers"],
        ["Builder", "إبداعي", "بناء كائنات معقدة خطوة بخطوة", "SQL Query Builder, HTTP Request Builder"],
        ["Prototype", "إبداعي", "نسخ كائن موجود بدلاً من إنشائه من الصفر", "Object cloning في المحررات والألعاب"],
        ["Adapter", "هيكلي", "توصيل واجهتين غير متوافقتين", "تحويل بيانات API خارجي لصيغة داخلية"],
        ["Decorator", "هيكلي", "إضافة سلوك لكائن دون تعديل كلاسه", "Middleware، Logging، Cache، Authentication"],
        ["Facade", "هيكلي", "واجهة مبسطة لنظام معقد", "SDK يخفي تعقيدات المكتبات"],
        ["Proxy", "هيكلي", "وسيط يتحكم في الوصول لكائن آخر", "Lazy Loading، Access Control، Logging"],
        ["Composite", "هيكلي", "معاملة كائنات مفردة ومجموعات بنفس الطريقة", "شجرة ملفات، DOM، UI Components"],
        ["Observer", "سلوكي", "إخطار مشتركين عند تغيير حالة كائن", "Event System، React State، Redux"],
        ["Strategy", "سلوكي", "تبديل خوارزمية بأخرى في وقت التشغيل", "طرق ترتيب مختلفة، طرق دفع متعددة"],
        ["Command", "سلوكي", "تغليف طلب كائناً لدعم Undo/Redo", "Editor history، Transaction rollback"],
        ["Iterator", "سلوكي", "التنقل على عناصر مجموعة بدون كشف تفاصيلها", "for...of في JS، Streams في Java"],
        ["Template Method", "سلوكي", "هيكل خوارزمية مع خطوات قابلة للتخصيص", "Abstract class مع خطوات مجردة"]
      ]
    },
    {
      title: "12. Big O Complexity — جدول مقارنة",
      type: "table",
      headers: ["التعقيد", "الاسم", "n=10", "n=100", "n=1000", "مثال"],
      rows: [
        ["O(1)", "ثابت", "1", "1", "1", "وصول بالـ Index، Hash Map lookup"],
        ["O(log n)", "لوغاريتمي", "3", "7", "10", "Binary Search، BST"],
        ["O(n)", "خطي", "10", "100", "1000", "Linear Search، قراءة مصفوفة"],
        ["O(n log n)", "شبه خطي", "33", "664", "9966", "Merge Sort، Quick Sort"],
        ["O(n²)", "تربيعي", "100", "10,000", "1,000,000", "Bubble Sort، حلقة داخل حلقة"],
        ["O(2ⁿ)", "أسي", "1024", "~10³⁰", "مستحيل", "Fibonacci Naive، Subset Generation"],
        ["O(n!)", "مضروب", "3628800", "مستحيل", "مستحيل", "Traveling Salesman Brute Force"]
      ]
    },
    {
      title: "13. قاموس المصطلحات الشامل (60+ مصطلح)",
      type: "table",
      headers: ["المصطلح", "العربية", "الشرح"],
      rows: [
        ["Algorithm", "خوارزمية", "سلسلة خطوات منطقية لحل مشكلة"],
        ["API", "واجهة برمجة التطبيقات", "طريقة موحدة لتواصل برنامجين معاً"],
        ["Authentication", "مصادقة", "التحقق من هوية المستخدم (هوية)"],
        ["Authorization", "تصريح", "التحقق من صلاحية المستخدم (إذن)"],
        ["Bandwidth", "عرض النطاق الترددي", "كمية البيانات التي يمكن نقلها في وحدة الزمن"],
        ["Bug", "علة برمجية", "خطأ في الكود يسبب سلوكاً غير مقصود"],
        ["Cache", "ذاكرة تخزين مؤقت", "تخزين نتائج العمليات لتسريع الوصول لاحقاً"],
        ["CI/CD", "التكامل والتسليم المستمر", "أتمتة فحص ونشر الكود عند كل تغيير"],
        ["CLI", "واجهة سطر الأوامر", "التعامل مع الحاسوب عبر النصوص والأوامر"],
        ["Compiler", "مترجم", "يحول الكود كاملاً للغة الآلة دفعة واحدة"],
        ["Concurrency", "التزامن", "تنفيذ مهام متعددة في نفس الوقت (أو بالتناوب)"],
        ["Container", "حاوية", "بيئة معزولة لتشغيل تطبيق مع جميع مكوناته"],
        ["CORS", "مشاركة الموارد عبر الأصول", "آلية أمان تحكم الوصول من نطاقات مختلفة"],
        ["CRUD", "الأربع عمليات الأساسية", "Create, Read, Update, Delete"],
        ["Database", "قاعدة بيانات", "نظام منظم لتخزين وإدارة البيانات"],
        ["Deadlock", "الإقفال الميت", "حالة تنتظر فيها عمليتان بعضهما البعض إلى الأبد"],
        ["Dependency", "تبعية", "كود يعتمد على كود آخر (مكتبة خارجية)"],
        ["Deployment", "نشر", "رفع التطبيق ليكون متاحاً للمستخدمين"],
        ["DevOps", "تطوير وتشغيل", "ثقافة وممارسات تجمع التطوير والتشغيل"],
        ["Docker", "دوكر", "منصة للحاويات تضمن تشغيل موحداً في أي بيئة"],
        ["Domain", "النطاق", "اسم الموقع (example.com) أو مجال الأعمال"],
        ["DRY", "لا تكرر نفسك", "Don't Repeat Yourself — مبدأ عدم تكرار الكود"],
        ["Encryption", "تشفير", "تحويل البيانات لصيغة غير قابلة للقراءة بدون مفتاح"],
        ["Endpoint", "نقطة نهاية", "URL معين يقبل طلبات API ويرد عليها"],
        ["Framework", "إطار عمل", "هيكل جاهز يوفر أساساً لبناء التطبيقات"],
        ["Git", "جيت", "نظام التحكم في إصدارات الكود"],
        ["GraphQL", "غراف كيو إل", "لغة استعلام API تسمح بتحديد البيانات المطلوبة"],
        ["Hash", "هاش", "تحويل أي بيانات لسلسلة ثابتة الطول وحيدة"],
        ["HTTP/HTTPS", "بروتوكول النقل", "لغة التخاطب بين المتصفح والخادم (S = مشفر)"],
        ["IDE", "بيئة التطوير المتكاملة", "برنامج تطوير متكامل (VS Code, IntelliJ)"],
        ["Index", "فهرس", "بنية بيانات تسرّع الاستعلامات في قاعدة البيانات"],
        ["Interpreter", "مفسر", "ينفذ الكود سطراً بسطر بدون تحويل مسبق"],
        ["JWT", "رمز ويب JSON", "معيار آمن لنقل معلومات الهوية بين الطرفين"],
        ["Kubernetes", "كوبيرنتس (K8s)", "نظام لإدارة وتوزيع حاويات Docker بالمقياس"],
        ["Latency", "زمن الاستجابة", "الوقت المستغرق من إرسال الطلب حتى استلام الرد"],
        ["Library", "مكتبة", "مجموعة أدوات يمكن استدعاؤها في كودك"],
        ["Load Balancer", "موزع الحمل", "يوزع الطلبات على عدة خوادم للأداء والتوافر"],
        ["Microservices", "الخدمات المصغرة", "معمارية تقسّم التطبيق لخدمات صغيرة مستقلة"],
        ["Middleware", "الوسيط البرمجي", "كود يعمل بين الطلب والاستجابة في الخادم"],
        ["Migration", "ترحيل", "تطبيق تغييرات على قاعدة بيانات بشكل منظم"],
        ["Monolith", "المنوليث", "تطبيق كامل في وحدة واحدة (عكس Microservices)"],
        ["ORM", "ربط الكائنات-العلاقات", "مكتبة تترجم كائنات الكود لاستعلامات SQL"],
        ["Open Source", "مفتوح المصدر", "كود متاح للجميع للقراءة والاستخدام والمساهمة"],
        ["Pagination", "الترقيم", "تقسيم نتائج كبيرة لصفحات لتحسين الأداء"],
        ["RAM", "الذاكرة العشوائية", "تخزين مؤقت وسريع تستخدمه العمليات الجارية"],
        ["Recursion", "العودية", "دالة تستدعي نفسها بمدخلات أصغر لحل مشكلة"],
        ["Redis", "ريديس", "قاعدة بيانات في الذاكرة للـ Cache والطوابير"],
        ["Refactoring", "إعادة الهيكلة", "تحسين الكود دون تغيير سلوكه الخارجي"],
        ["Repository", "المستودع", "مجلد Git يحتوي الكود أو كلاس للوصول للبيانات"],
        ["REST", "النقل التمثيلي للحالة", "معيار تصميم API يعتمد على HTTP verbs"],
        ["Runtime", "وقت التشغيل", "البيئة التي ينفذ فيها الكود (Node.js runtime)"],
        ["Scalability", "التوسعية", "قدرة النظام على التعامل مع زيادة الحمل"],
        ["SDK", "حزمة تطوير البرامج", "مجموعة أدوات لبناء تطبيقات على منصة معينة"],
        ["Serverless", "بلا خادم", "نشر دوال تُنفَّذ عند الطلب دون إدارة خادم"],
        ["SQL", "لغة الاستعلام البنيوية", "لغة للتواصل مع قواعد البيانات العلائقية"],
        ["SSH", "الصدفة الآمنة", "بروتوكول اتصال آمن ومشفر بالخوادم"],
        ["State", "الحالة", "البيانات التي تصف وضع التطبيق في لحظة ما"],
        ["Syntax", "بناء الجملة", "القواعد النحوية والإملائية للغة البرمجة"],
        ["Technical Debt", "الدين التقني", "تكلفة المستقبل لكود كُتب سريعاً بجودة منخفضة"],
        ["TDD", "التطوير بالاختبار أولاً", "كتابة الاختبار قبل الكود الذي يجتازه"],
        ["Token", "رمز مميز", "سلسلة تُثبت الهوية أو الصلاحية"],
        ["UI/UX", "الواجهة/التجربة", "مظهر التطبيق وسهولة وبساطة استخدامه"],
        ["Unit Test", "اختبار الوحدة", "اختبار دالة أو كلاس واحد بشكل معزول"],
        ["URL", "عنوان المورد الموحد", "العنوان الكامل لمورد على الإنترنت"],
        ["VCS", "نظام التحكم في الإصدارات", "نظام لتتبع تاريخ تغييرات الكود (مثل Git)"],
        ["WebSocket", "مقبس الويب", "اتصال ثنائي الاتجاه دائم بين العميل والخادم"]
      ]
    }
  ]
};
