import { StageDef } from './types';

export const stage4: StageDef = {
  id: "stage-4",
  stageNumber: 4,
  title: "المشهد التقني وأطر العمل",
  units: [
    {
      id: "unit-14",
      stageId: "stage-4",
      unitNumber: 13,
      title: "المشهد التقني الحديث",
      description: "فهم معمارية الأنظمة، أطر العمل الحديثة، والبنية التحتية السحابية.",
      content: [
        { type: "h1", content: "الوحدة 14: المشهد التقني الحديث" },
        { type: "p", content: "مرحباً بك في المرحلة الرابعة. حتى الآن تعلمنا كيف نكتب الكود وننشئ قواعد البيانات. الآن سنرى الصورة الكاملة: كيف تتكامل عشرات التقنيات لبناء منتجات يستخدمها ملايين البشر يومياً." },

        { type: "h2", content: "1. معمارية التطبيقات الحديثة" },
        { type: "p", content: "تتكون أغلب التطبيقات الحديثة من طبقات متعددة ومترابطة:" },
        { type: "ascii", content: `
┌──────────────────────────────────────────────────────┐
│                    المستخدم النهائي                   │
│         (متصفح / تطبيق جوال / نظام خارجي)             │
└─────────────────────┬────────────────────────────────┘
                      │ HTTPS
┌─────────────────────▼────────────────────────────────┐
│               CDN / Load Balancer                    │
│       (توزيع الحمل، تخزين مؤقت، شهادات SSL)          │
└──────┬──────────────────────────────┬────────────────┘
       │                              │
┌──────▼──────┐                ┌──────▼──────┐
│  Frontend   │                │  Backend API │
│  (React /   │◄──────────────►│  (Node.js / │
│   Vue /     │  REST/GraphQL  │   Java /    │
│  Next.js)   │                │   Python)   │
└─────────────┘                └──────┬──────┘
                                      │
              ┌───────────────────────┼───────────────────┐
              │                       │                   │
       ┌──────▼──────┐        ┌───────▼─────┐    ┌───────▼─────┐
       │  Database   │        │    Cache    │    │  Message    │
       │ (PostgreSQL │        │   (Redis)   │    │   Queue     │
       │  / MongoDB) │        └─────────────┘    │ (RabbitMQ)  │
       └─────────────┘                           └─────────────┘
` },

        { type: "h2", content: "2. تطوير الواجهة الأمامية (Frontend Development)" },
        { type: "p", content: "الواجهة الأمامية هي كل ما يراه المستخدم. تطورت بشكل هائل من HTML ثابت إلى تطبيقات تفاعلية معقدة (SPA - Single Page Applications)." },

        { type: "h3", content: "React.js — أكثر مكتبة Frontend شيوعاً" },
        { type: "p", content: "طورتها شركة Meta (فيسبوك). تعتمد على مفهوم المكونات (Components) — كل جزء من الواجهة هو مكوّن مستقل قابل للاستخدام المتكرر." },
        { type: "code", language: "typescript", title: "مثال: مكوّن بطاقة مستخدم في React", content: `import React, { useState, useEffect } from 'react';

// تعريف نوع البيانات
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

// مكوّن بطاقة المستخدم
function UserCard({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // تحميل بيانات المستخدم عند تهيئة المكوّن
    fetch(\`/api/users/\${userId}\`)
      .then(res => {
        if (!res.ok) throw new Error('فشل تحميل البيانات');
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <div className="spinner">جارٍ التحميل...</div>;
  if (error)   return <div className="error">خطأ: {error}</div>;
  if (!user)   return null;

  return (
    <div className="card">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}

export default UserCard;` },

        { type: "callout", calloutType: "note", title: "مفاهيم React الأساسية", content: [
          { type: "p", content: "useState: إدارة حالة محلية داخل المكوّن. عند تغيّرها تُعاد رسم الواجهة." },
          { type: "p", content: "useEffect: تنفيذ جانبي (جلب بيانات، اشتراكات) بعد رسم المكوّن." },
          { type: "p", content: "Props: بيانات تمرر من المكوّن الأب للابن (للأسفل فقط)." }
        ]},

        { type: "h3", content: "Next.js — React في الإنتاج" },
        { type: "p", content: "Next.js هو إطار فوق React يضيف ميزات حيوية للإنتاج:" },
        { type: "table", headers: ["الميزة", "الوصف", "الفائدة"], rows: [
          ["SSR (Server-Side Rendering)", "الخادم يولّد HTML قبل الإرسال", "أسرع في الظهور الأول، أفضل لمحركات البحث (SEO)"],
          ["SSG (Static Generation)", "توليد الصفحات وقت البناء", "الأسرع على الإطلاق، مثالية للمدونات"],
          ["ISR", "تحديث صفحات ثابتة دورياً", "أفضل ما في الوجهين"],
          ["API Routes", "بناء API داخل مشروع Next", "مشروع واحد للـ Frontend والـ Backend"],
          ["Image Optimization", "تحسين الصور تلقائياً", "تحميل أسرع وحجم أصغر"]
        ]},

        { type: "h3", content: "Vue.js و Angular — بدائل قوية" },
        { type: "table", headers: ["الإطار", "مطوّره", "الاستخدام الأمثل", "منحنى التعلم"], rows: [
          ["React", "Meta", "SPAs معقدة، تطبيقات كبيرة", "متوسط"],
          ["Vue.js", "مجتمع مفتوح المصدر", "مشاريع متوسطة، سهولة التعلم", "سهل"],
          ["Angular", "Google", "تطبيقات مؤسسية كبيرة", "صعب"],
          ["Svelte", "Rich Harris", "أداء عالٍ، حزمة صغيرة", "سهل"]
        ]},

        { type: "h2", content: "3. تنسيق CSS الحديث" },
        { type: "h3", content: "Tailwind CSS — الأكثر شيوعاً حالياً" },
        { type: "p", content: "بدلاً من كتابة CSS منفصلة، تكتب كلاسات مباشرة في HTML. النتيجة: تطوير أسرع، وتصميم متسق." },
        { type: "code", language: "html", title: "Tailwind CSS مثال", content: `<!-- بطاقة احترافية بدون كتابة سطر CSS واحد -->
<div class="bg-white rounded-2xl shadow-lg p-6 max-w-sm border border-gray-100 hover:shadow-xl transition-shadow">
  <div class="flex items-center gap-4 mb-4">
    <img class="w-12 h-12 rounded-full" src="/avatar.jpg" alt="صورة المستخدم" />
    <div>
      <h3 class="font-bold text-gray-900 text-lg">أحمد محمد</h3>
      <p class="text-gray-500 text-sm">مهندس برمجيات</p>
    </div>
  </div>
  <p class="text-gray-600 text-sm leading-relaxed">
    5 سنوات من الخبرة في بناء تطبيقات الويب باستخدام React و Node.js
  </p>
  <button class="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
    عرض الملف الشخصي
  </button>
</div>` },

        { type: "h2", content: "4. تطوير الواجهة الخلفية (Backend Development)" },
        { type: "h3", content: "بناء API احترافي مع Node.js + Express" },
        { type: "code", language: "typescript", title: "خادم Express احترافي مع Middleware", content: `import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();

// Middlewares عامة
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Middleware للتوثيق
function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'غير مسموح' });
  // فحص الـ JWT هنا
  next();
}

// مسار للحصول على قائمة المستخدمين
app.get('/api/users', authenticate, async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    // تخيل أن هذا يجلب من قاعدة البيانات
    const users = await db.users.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });
    res.json({ data: users, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ error: 'خطأ في الخادم' });
  }
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'حدث خطأ غير متوقع' });
});

app.listen(3000, () => console.log('الخادم يعمل على المنفذ 3000'));` },

        { type: "h3", content: "REST مقابل GraphQL" },
        { type: "table", headers: ["المعيار", "REST API", "GraphQL"], rows: [
          ["عدد الـ Endpoints", "كثيرة (واحدة لكل مورد)", "واحدة فقط (/graphql)"],
          ["جلب البيانات", "تجلب كل حقول المورد", "تحدد بالضبط ما تريد"],
          ["Over-fetching", "مشكلة شائعة", "لا توجد"],
          ["Under-fetching", "تحتاج طلبات متعددة", "طلب واحد يجلب الكل"],
          ["التعقيد", "بسيط وشائع", "يحتاج تعلماً إضافياً"],
          ["الأنسب لـ", "معظم المشاريع", "APIs معقدة مع Mobile"]
        ]},

        { type: "h2", content: "5. قواعد البيانات: كيف تختار؟" },
        { type: "table", headers: ["النوع", "أمثلة", "متى تستخدمه؟"], rows: [
          ["Relational (SQL)", "PostgreSQL, MySQL", "بيانات منظمة بعلاقات واضحة (تجارة، بنوك)"],
          ["Document (NoSQL)", "MongoDB", "بيانات مرنة الشكل (CMS، كتالوج منتجات)"],
          ["Key-Value", "Redis", "Cache، جلسات المستخدم، طابور المهام"],
          ["Graph", "Neo4j", "شبكات اجتماعية، توصيات، علاقات معقدة"],
          ["Search", "Elasticsearch", "بحث نصي سريع عبر ملايين السجلات"],
          ["Time-Series", "InfluxDB", "بيانات المراقبة، الأحداث الزمنية"]
        ]},

        { type: "h2", content: "6. الاتصال في الوقت الفعلي (Real-time)" },
        { type: "p", content: "HTTP عملية طلب-استجابة عادية. لكن التطبيقات الحديثة تحتاج اتصالاً حياً (دردشة، إشعارات، تحديث فوري)." },
        { type: "code", language: "typescript", title: "WebSockets مع Socket.io", content: `// الخادم (Server)
import { Server } from 'socket.io';
import http from 'http';

const httpServer = http.createServer();
const io = new Server(httpServer, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log(\`مستخدم جديد: \${socket.id}\`);

  // الانضمام لغرفة دردشة
  socket.on('join_room', (roomId: string) => {
    socket.join(roomId);
    socket.to(roomId).emit('user_joined', { id: socket.id });
  });

  // إرسال رسالة
  socket.on('send_message', ({ roomId, message }) => {
    io.to(roomId).emit('new_message', {
      sender: socket.id,
      text: message,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    console.log(\`مستخدم غادر: \${socket.id}\`);
  });
});

httpServer.listen(3001);

// ===========================
// العميل (Client) في React
// ===========================
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

socket.on('new_message', ({ sender, text, timestamp }) => {
  console.log(\`[\${timestamp}] \${sender}: \${text}\`);
  // تحديث الواجهة بالرسالة الجديدة
});

// إرسال رسالة
function sendMessage(roomId: string, text: string) {
  socket.emit('send_message', { roomId, message: text });
}` },

        { type: "h2", content: "7. الحوسبة السحابية (Cloud Computing)" },
        { type: "p", content: "بدلاً من شراء خوادم مادية، تستأجر موارد حاسوبية عبر الإنترنت وتدفع فقط ما تستخدم." },
        { type: "table", headers: ["الخدمة", "AWS", "Google Cloud", "Azure", "الوصف"], rows: [
          ["قواعد البيانات", "RDS / DynamoDB", "Cloud SQL / Firestore", "Azure SQL", "قواعد بيانات مُدارة بالكامل"],
          ["تشغيل الكود", "EC2 / Lambda", "Compute Engine / Cloud Run", "VM / Functions", "خوادم وServerless"],
          ["تخزين الملفات", "S3", "Cloud Storage", "Blob Storage", "تخزين صور وملفات"],
          ["Containers", "ECS / EKS", "GKE", "AKS", "إدارة Docker بالمقياس"],
          ["CDN", "CloudFront", "Cloud CDN", "Azure CDN", "توزيع المحتوى عالمياً"]
        ]},

        { type: "h3", content: "Serverless Architecture" },
        { type: "p", content: "بدلاً من خادم دائم التشغيل، كتب دوالاً تُنفَّذ عند الطلب وتوقف تلقائياً. لا تدفع إلا عن وقت التنفيذ الفعلي." },
        { type: "code", language: "typescript", title: "AWS Lambda Function (Serverless)", content: `// دالة تُستدعى فقط عند وصول طلب
exports.handler = async (event: AWSLambda.APIGatewayEvent) => {
  const body = JSON.parse(event.body || '{}');
  
  // منطق العمل
  const result = await processOrder(body.orderId);
  
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result)
  };
};

// الفوائد:
// - لا تدفع عند عدم الاستخدام
// - تتوسع تلقائياً مع عدد الطلبات
// - لا تحتاج لإدارة الخادم` },

        { type: "h2", content: "8. الـ Microservices مقابل Monolith" },
        { type: "ascii", content: `
Monolithic Architecture (تقليدي):
┌─────────────────────────────────────────────┐
│          التطبيق الكامل (ملف واحد)           │
│  [Auth] [Orders] [Payments] [Notifications]  │
│      جميع المكونات في نفس العملية             │
└─────────────────────────────────────────────┘
✅ بسيط في البداية   ❌ صعب التوسعة لاحقاً

Microservices Architecture (حديث):
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│  Auth    │  │ Orders   │  │ Payments │  │Notif.    │
│ Service  │  │ Service  │  │ Service  │  │ Service  │
│ :3001    │  │ :3002    │  │ :3003    │  │ :3004    │
└────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘
     └─────────────┴──────────────┴──────────────┘
                        │ API Gateway
                   ┌────▼────┐
                   │ Client  │
                   └─────────┘
✅ سهل التوسعة   ❌ معقد في الإدارة` },

        { type: "table", headers: ["المعيار", "Monolith", "Microservices"], rows: [
          ["التعقيد الأولي", "منخفض", "عالٍ"],
          ["سهولة النشر", "سهل جداً", "معقد"],
          ["التوسعة", "محدودة", "لا نهاية لها"],
          ["أداء الاتصال الداخلي", "سريع (استدعاء دالة)", "أبطأ (HTTP بين الخدمات)"],
          ["عزل الأعطال", "عطل واحد يوقف الكل", "الخدمات معزولة"],
          ["الأنسب لـ", "المشاريع الناشئة والمتوسطة", "الشركات الكبيرة ذات الفرق المتعددة"]
        ]},

        { type: "callout", calloutType: "ai-tip", title: "نصيحة: لا تبدأ بـ Microservices", content: [
          { type: "p", content: "Netflix و Amazon وUber بدأت جميعها كـ Monolith ثم انتقلت لـ Microservices عندما كبرت. ابدأ بالـ Monolith حتى تفهم نطاق مشروعك جيداً، ثم فكك عندما يصبح ضرورياً." }
        ]},

        { type: "active-recall", questions: [
          { q: "ما الفرق بين SSR و SSG في Next.js؟", a: "SSR: الخادم يولّد HTML عند كل طلب (ديناميكي). SSG: يولّد HTML مرة واحدة وقت البناء (سريع جداً). ISR: SSG مع إمكانية التحديث الدوري." },
          { q: "متى تستخدم WebSockets بدلاً من HTTP العادي؟", a: "عندما تحتاج اتصالاً ثنائي الاتجاه في الوقت الفعلي: دردشة، إشعارات فورية، ألعاب متعددة اللاعبين، لوحات تعاون مباشر." },
          { q: "ما الفرق بين SQL و NoSQL؟ متى أستخدم كلاً منهما؟", a: "SQL (علائقية): للبيانات المنظمة مع علاقات واضحة (بنوك، تجارة إلكترونية). NoSQL (مرنة): للبيانات غير المنظمة أو ذات المقياس الهائل (شبكات اجتماعية، CMS)." },
          { q: "ما مزايا Serverless مقارنة بالخادم التقليدي؟", a: "لا دفع عند عدم الاستخدام، توسعة تلقائية، لا صيانة للبنية التحتية، مناسبة للأحمال المتفاوتة." }
        ]}
      ]
    },
    {
      id: "unit-15",
      stageId: "stage-4",
      unitNumber: 14,
      title: "الاحتراف وبناء المسيرة المهنية",
      description: "مبادئ SOLID، نمط التصميم، التخصصات، ومسار المهنة في البرمجة.",
      content: [
        { type: "h1", content: "الوحدة 15: الاحتراف وبناء المسيرة المهنية" },
        { type: "p", content: "الفرق بين مبتدئ ومحترف ليس فقط في معرفة بناء جملة اللغة، بل في جودة التفكير، واختيار الأدوات الصحيحة، وفهم الكود كعمل جماعي وليس فردياً." },

        { type: "h2", content: "1. مبادئ SOLID" },
        { type: "p", content: "SOLID هي 5 مبادئ تجعل الكود قابلاً للتطوير والصيانة والاختبار. هي من أهم ما يسأل عنه المحاورون في المقابلات." },

        { type: "h3", content: "S — Single Responsibility Principle" },
        { type: "p", content: "كل كلاس أو دالة يجب أن يكون لها سبب واحد فقط للتغيير." },
        { type: "code", language: "typescript", title: "مثال: مخالفة وتطبيق SRP", content: `// ❌ خطأ: كلاس واحد يقوم بكل شيء
class Order {
  saveToDatabase() { /* ... */ }
  sendConfirmationEmail() { /* ... */ }
  generateInvoicePDF() { /* ... */ }
}
// إذا تغير تنسيق البريد، يجب تعديل هذا الكلاس
// إذا تغير نظام DB، يجب تعديل هذا الكلاس
// إذا تغير تنسيق PDF، يجب تعديل هذا الكلاس!

// ✅ صحيح: كل كلاس له مسؤولية واحدة
class Order { /* بيانات الطلب فقط */ }
class OrderRepository { saveToDatabase(order: Order) { /* ... */ } }
class EmailService { sendConfirmation(order: Order) { /* ... */ } }
class InvoiceService { generatePDF(order: Order) { /* ... */ } }` },

        { type: "h3", content: "O — Open/Closed Principle" },
        { type: "p", content: "الكود يجب أن يكون مفتوحاً للامتداد ومغلقاً للتعديل." },
        { type: "code", language: "typescript", title: "مثال: مخالفة وتطبيق OCP", content: `// ❌ خطأ: كل مدفوعة جديدة تتطلب تعديل if/else
function processPayment(type: string, amount: number) {
  if (type === 'credit') { /* ... */ }
  else if (type === 'paypal') { /* ... */ }
  else if (type === 'crypto') { /* ... */ } // تعديل متكرر!
}

// ✅ صحيح: امتد بدون تعديل الكود القديم
interface PaymentProcessor {
  pay(amount: number): void;
}

class CreditCardProcessor implements PaymentProcessor {
  pay(amount: number) { console.log(\`دفع \${amount} ببطاقة ائتمان\`); }
}

class PayPalProcessor implements PaymentProcessor {
  pay(amount: number) { console.log(\`دفع \${amount} عبر PayPal\`); }
}

// لإضافة Crypto: فقط أضف كلاس جديد!
class CryptoProcessor implements PaymentProcessor {
  pay(amount: number) { console.log(\`دفع \${amount} بعملة رقمية\`); }
}

function processPayment(processor: PaymentProcessor, amount: number) {
  processor.pay(amount); // لن نعدّل هذا السطر أبداً
}` },

        { type: "h3", content: "L — Liskov Substitution Principle" },
        { type: "p", content: "أي كلاس فرعي يجب أن يمكن استبداله بالكلاس الأصلي دون كسر البرنامج." },

        { type: "h3", content: "I — Interface Segregation Principle" },
        { type: "p", content: "لا تجبر الكلاسات على تطبيق واجهات لا تحتاجها. الواجهات الصغيرة المتخصصة أفضل من واجهة ضخمة واحدة." },
        { type: "code", language: "typescript", title: "مثال: تطبيق ISP", content: `// ❌ خطأ: واجهة ضخمة تجبر الجميع على تطبيق ما لا يحتاجه
interface Worker {
  work(): void;
  eat(): void;   // الروبوت لا يأكل!
  sleep(): void; // الروبوت لا ينام!
}

// ✅ صحيح: واجهات صغيرة متخصصة
interface Workable { work(): void; }
interface Eatable  { eat(): void; }
interface Sleepable { sleep(): void; }

class Human implements Workable, Eatable, Sleepable {
  work()  { console.log('يعمل'); }
  eat()   { console.log('يأكل'); }
  sleep() { console.log('ينام'); }
}

class Robot implements Workable {
  work() { console.log('الروبوت يعمل'); }
  // لا يُجبر على تطبيق eat أو sleep
}` },

        { type: "h3", content: "D — Dependency Inversion Principle" },
        { type: "p", content: "المستويات العليا من الكود يجب أن تعتمد على تجريدات (Abstractions) وليس على تطبيقات محددة." },

        { type: "h2", content: "2. أنماط التصميم الشائعة (Design Patterns)" },
        { type: "p", content: "أنماط التصميم هي حلول جاهزة مجربة لمشاكل برمجية متكررة. تنقسم لثلاث فئات رئيسية:" },

        { type: "h3", content: "النمط الإبداعي: Singleton" },
        { type: "p", content: "يضمن وجود نسخة واحدة فقط من كلاس في النظام. مفيد لـ: اتصالات قواعد البيانات، الـ Logger، الإعدادات." },
        { type: "code", language: "typescript", title: "Singleton Pattern", content: `class DatabaseConnection {
  private static instance: DatabaseConnection | null = null;
  private constructor() { /* الاتصال بقاعدة البيانات */ }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public query(sql: string) { /* ... */ }
}

// الاستخدام
const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log(db1 === db2); // true — نفس النسخة!` },

        { type: "h3", content: "النمط الهيكلي: Observer" },
        { type: "p", content: "يتيح لكائنات متعددة الاشتراك والاستجابة لأحداث كائن آخر. هذا هو أساس عمل React و Angular وجميع أنظمة الأحداث." },
        { type: "code", language: "typescript", title: "Observer Pattern", content: `interface Observer {
  update(event: string, data: unknown): void;
}

class EventEmitter {
  private listeners: Map<string, Observer[]> = new Map();

  subscribe(event: string, observer: Observer) {
    if (!this.listeners.has(event)) this.listeners.set(event, []);
    this.listeners.get(event)!.push(observer);
  }

  emit(event: string, data: unknown) {
    this.listeners.get(event)?.forEach(obs => obs.update(event, data));
  }
}

// الاستخدام
const store = new EventEmitter();

class NotificationService implements Observer {
  update(event: string, data: unknown) {
    if (event === 'order_placed') {
      console.log(\`إرسال إشعار للطلب: \${JSON.stringify(data)}\`);
    }
  }
}

store.subscribe('order_placed', new NotificationService());
store.emit('order_placed', { orderId: 123, amount: 500 });` },

        { type: "h3", content: "أنماط أخرى مهمة" },
        { type: "table", headers: ["النمط", "الفئة", "المشكلة التي يحلها", "مثال تطبيقي"], rows: [
          ["Factory", "إبداعي", "إنشاء كائنات بدون تحديد كلاسها المحدد", "إنشاء أنواع مختلفة من المستخدمين"],
          ["Decorator", "هيكلي", "إضافة سلوك لكائن دون تعديله", "إضافة Cache، Logging، Auth لـ API"],
          ["Strategy", "سلوكي", "تبديل خوارزمية بأخرى في وقت التشغيل", "طرق فرز أو تشفير مختلفة"],
          ["Repository", "هيكلي", "فصل منطق الوصول للبيانات عن الأعمال", "قاعدة بيانات vs API vs ملفات"],
          ["Command", "سلوكي", "تحويل الطلبات لكائنات قابلة للتخزين والتراجع", "Undo/Redo في المحررات"]
        ]},

        { type: "h2", content: "3. منهجيات العمل (Development Methodologies)" },
        { type: "h3", content: "Agile و Scrum — كيف تعمل الفرق الحديثة" },
        { type: "p", content: "Agile هي فلسفة تعتمد على التسليم التدريجي والتكيف المستمر بدلاً من التخطيط الكامل مسبقاً. Scrum هي إطار تطبيق لـ Agile." },
        { type: "ascii", content: `
Sprint (دورة تطوير من أسبوعين)
┌─────────────────────────────────────────────────────────────┐
│  Sprint Planning  │   Daily Standup (15 دقيقة يومياً)        │
│  (ماذا سننجز؟)   │   ماذا فعلت أمس؟ ماذا سأفعل اليوم؟       │
│                   │   هل هناك عوائق؟                        │
├─────────────────────────────────────────────────────────────┤
│                    التطوير (10-12 يوم عمل)                   │
│  [Task 1 ✅] [Task 2 ✅] [Task 3 🔄] [Task 4 ⏳]            │
├─────────────────────────────────────────────────────────────┤
│  Sprint Review    │           Sprint Retrospective           │
│  (عرض ما بُني)   │   ما الذي نجح؟ ما الذي يجب تحسينه؟      │
└─────────────────────────────────────────────────────────────┘
` },

        { type: "h2", content: "4. اختبار البرمجيات (Testing)" },
        { type: "p", content: "الكود بدون اختبارات كالبناء بدون أساس. الفرق بين المبتدئ والمحترف هو التحقق من الكود بشكل منهجي." },
        { type: "table", headers: ["نوع الاختبار", "ما يختبره", "السرعة", "التكلفة"], rows: [
          ["Unit Tests", "دالة أو كلاس منفرد (معزول)", "أسرع", "الأرخص"],
          ["Integration Tests", "تعاون عدة مكونات معاً", "متوسط", "متوسط"],
          ["E2E Tests", "سيناريو المستخدم الكامل", "أبطأ", "الأغلى"]
        ]},
        { type: "code", language: "typescript", title: "اختبارات وحدة مع Jest", content: `import { describe, it, expect } from 'vitest';

// الدالة التي نختبرها
function calculateDiscount(price: number, code: string): number {
  if (code === 'SUMMER20') return price * 0.80;
  if (code === 'VIP50')    return price * 0.50;
  return price; // لا خصم
}

describe('calculateDiscount', () => {
  it('يطبق خصم 20% لكود SUMMER20', () => {
    expect(calculateDiscount(100, 'SUMMER20')).toBe(80);
  });

  it('يطبق خصم 50% لكود VIP50', () => {
    expect(calculateDiscount(200, 'VIP50')).toBe(100);
  });

  it('لا يطبق خصم لكود غير صالح', () => {
    expect(calculateDiscount(100, 'INVALID')).toBe(100);
  });

  it('يعمل بشكل صحيح مع الأسعار العشرية', () => {
    expect(calculateDiscount(99.99, 'SUMMER20')).toBeCloseTo(79.99);
  });
});` },

        { type: "h2", content: "5. CI/CD — التكامل والتسليم المستمر" },
        { type: "p", content: "CI/CD هو الممارسة الأكثر تحولاً في التطوير الحديث. تجعل النشر من حدث نادر مرهق إلى عملية يومية آمنة ومؤتمتة." },
        { type: "code", language: "yaml", title: "GitHub Actions: Pipeline كامل", content: `# .github/workflows/deploy.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  # 1. الفحص والاختبار
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run typecheck    # فحص TypeScript
      - run: npm run lint         # فحص جودة الكود
      - run: npm run test         # تشغيل الاختبارات
      - run: npm run test:e2e     # اختبارات E2E

  # 2. البناء
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci && npm run build
      - uses: actions/upload-artifact@v4
        with: { name: dist, path: dist/ }

  # 3. النشر (فقط عند الـ push للـ main)
  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/download-artifact@v4
        with: { name: dist }
      - name: نشر على السيرفر
        run: |
          # نشر الملفات للخادم
          rsync -avz dist/ user@server:/var/www/app/` },

        { type: "h2", content: "6. شجرة التخصصات — أين تتجه؟" },
        { type: "ascii", content: `
                    [مهندس برمجيات - نقطة البداية]
                               │
        ┌──────────────────────┼────────────────────────┐
        │                      │                        │
   [واجهات]              [خوادم وبيانات]            [أنظمة]
   Frontend               Backend                   Systems
        │                      │                        │
   ┌────┴────┐           ┌──────┴──────┐           ┌────┴────┐
   │         │           │             │           │         │
[مواقع] [تطبيقات]  [خوادم API]  [بيانات &     [DevOps] [أمن
  Web    جوال       Backend      AI/ML]           &       سيبراني]
        Mobile                               Cloud    Security
        
رواتب تقريبية (السوق الدولي):
  Junior (0-2 سنة):   $40,000 - $70,000
  Mid (2-5 سنوات):    $70,000 - $120,000
  Senior (5+ سنوات):  $120,000 - $200,000+
  Staff/Principal:    $200,000+
` },

        { type: "h2", content: "7. بناء Portfolio ملفت للانتباه" },
        { type: "p", content: "Portfolio قوي يتحدث عنك قبل أن تفتح فمك في المقابلة. إليك صيغة المشاريع المثالية:" },
        { type: "ul", items: [
          [{ type: "p", content: "مشروع CRUD كامل: قائمة مهام أو نظام مواعيد بـ React + Node + PostgreSQL + Auth." }],
          [{ type: "p", content: "مشروع API عام: استهلاك API حقيقي (طقس، أفلام) مع واجهة جميلة." }],
          [{ type: "p", content: "مشروع يحل مشكلة حقيقية: شيء يستخدمه أصدقاؤك فعلاً." }],
          [{ type: "p", content: "مساهمات Open Source: حل مشكلة أو تحسين توثيق مكتبة شائعة على GitHub." }]
        ]},

        { type: "callout", calloutType: "best-practice", title: "نصائح للـ GitHub Profile", content: [
          { type: "p", content: "README.md جذاب في كل مشروع: اشرح المشروع، قرارات التقنية، وكيف تشغّله." },
          { type: "p", content: "لا ترفع مشاريع دراسية ناقصة. مشروع واحد مكتمل أفضل من 20 مشروع نصف مكتمل." },
          { type: "p", content: "أضف Tests ولو بسيطة. المحاور يرى أنك تهتم بالجودة." },
          { type: "p", content: "README.md الخاص بـ Profile (اسم المستخدم/اسم المستخدم) هو أول ما يراه المحاور." }
        ]},

        { type: "h2", content: "8. التحضير للمقابلات التقنية" },
        { type: "table", headers: ["قسم المقابلة", "النسبة", "ما تتوقعه"], rows: [
          ["Data Structures & Algorithms", "40%", "مصفوفات، قواميس، أشجار، خوارزميات ترتيب وبحث"],
          ["System Design", "25%", "تصميم أنظمة كـ Twitter أو URL Shortener"],
          ["Behavioral (سلوكية)", "20%", "قصص تجاربك، العمل في فريق، حل النزاعات"],
          ["مراجعة الكود", "15%", "قراءة ونقد كود، اقتراح تحسينات"]
        ]},

        { type: "callout", calloutType: "note", title: "منهج الـ 30 يوم للتحضير", content: [
          { type: "p", content: "الأسبوع 1-2: حل مسألتين يومياً على LeetCode (Easy ثم Medium). ركز على Arrays، Strings، Hash Maps." },
          { type: "p", content: "الأسبوع 3: System Design — ادرس مبادئ تصميم الأنظمة الكبيرة: Load Balancing، Caching، Database Sharding." },
          { type: "p", content: "الأسبوع 4: محاكاة مقابلات حقيقية مع زملاء أو عبر منصات مثل Pramp أو Interviewing.io." }
        ]},

        { type: "active-recall", questions: [
          { q: "ما هو مبدأ Single Responsibility وما مثال على انتهاكه؟", a: "كل وحدة برمجية (كلاس/دالة) يجب أن تكون لها مسؤولية واحدة وسبب واحد للتغيير. مثال على الانتهاك: كلاس User يحتوي على save() و sendEmail() و generateReport() في نفس الوقت." },
          { q: "ما الفرق بين Unit Test و Integration Test؟", a: "Unit Test: يختبر دالة واحدة معزولة عن كل شيء آخر. Integration Test: يختبر تعاون عدة أجزاء معاً (مثل API يتصل بقاعدة بيانات حقيقية)." },
          { q: "ما هو CI/CD وما فائدته؟", a: "CI (التكامل المستمر): دمج الكود وفحصه تلقائياً مع كل تغيير. CD (التسليم المستمر): نشر التغييرات للإنتاج بشكل آلي وآمن. الفائدة: اكتشاف المشاكل مبكراً وتسليم مستمر للمستخدمين." },
          { q: "ما أهمية مبدأ Open/Closed في نظام المدفوعات مثلاً؟", a: "يمكننا إضافة طريقة دفع جديدة (Crypto) بمجرد إنشاء كلاس جديد يطبق interface PaymentProcessor، دون الحاجة لتعديل الكود القديم والخطر بكسره." }
        ]}
      ]
    }
  ]
};
