import type { ContentNode } from './types';

export const capstonePage: { title: string; description: string; content: ContentNode[] } = {
  title: "المشروع النهائي: Smart Service Platform",
  description: "بناء منظومة API متكاملة من التحليل إلى النشر — تتويجٌ لكل ما تعلمته في الكتاب.",
  content: [
    { type: "h1", content: "المشروع النهائي (Capstone Project)" },
    { type: "p", content: "هذا المشروع هو التتويج الحقيقي لكل ما تعلمته. لن تطبق هنا لغة واحدة أو مفهوماً واحداً، بل ستبني منظومة متكاملة تشمل: قاعدة بيانات، API موثق، مصادقة آمنة، اختبارات، وحاوية Docker جاهزة للنشر." },

    { type: "callout", calloutType: "note", title: "ما الذي ستبنيه؟", content: [
      { type: "p", content: "Smart Service Platform: نظام لإدارة طلبات الخدمة (مثل طلبات الصيانة أو الدعم الفني). العملاء يرسلون طلبات، والمديرون يتابعونها ويحدّثون حالتها. المشروع يحوي: Auth (JWT)، CRUD كامل، تصفح وفلترة، اختبارات وحدة، وDocker." }
    ]},

    { type: "h2", content: "المرحلة 1: تحليل المتطلبات" },
    { type: "h3", content: "المستخدمون والصلاحيات" },
    { type: "table", headers: ["الدور", "الصلاحيات"], rows: [
      ["Client (عميل)", "التسجيل، تسجيل الدخول، إنشاء طلب، رؤية طلباته فقط، إلغاء طلباته"],
      ["Admin (مدير)", "رؤية جميع الطلبات، تحديث حالة أي طلب، إضافة ملاحظات، عرض إحصائيات"]
    ]},

    { type: "h3", content: "User Stories (قصص المستخدم)" },
    { type: "ul", items: [
      [{ type: "p", content: "كعميل، أريد إنشاء حساب وتسجيل دخول لأتمكن من تتبع طلباتي." }],
      [{ type: "p", content: "كعميل، أريد إنشاء طلب خدمة بعنوان ووصف لأحصل على مساعدة." }],
      [{ type: "p", content: "كعميل، أريد رؤية حالة طلباتي (قيد الانتظار / قيد التنفيذ / مكتمل / مرفوض)." }],
      [{ type: "p", content: "كمدير، أريد رؤية جميع الطلبات مرتبة ومصفاة لأتمكن من إدارتها." }],
      [{ type: "p", content: "كمدير، أريد تحديث حالة الطلب وإضافة ملاحظة للعميل." }]
    ]},

    { type: "h2", content: "المرحلة 2: تصميم قاعدة البيانات (ERD)" },
    { type: "ascii", content: `
┌──────────────────────────────────────────────────────────────┐
│                          users                               │
├──────────────┬──────────────┬──────────────────────────────┤
│ id (PK, UUID)│ name (TEXT)  │ email (TEXT, UNIQUE)          │
│ password_hash│ role (ENUM)  │ created_at (TIMESTAMPTZ)      │
│   client/admin               │                              │
└──────────────┴──────────────┴──────────────────────────────┘
         │ 1
         │ (user has many requests)
         │ N
┌──────────────────────────────────────────────────────────────┐
│                      service_requests                        │
├──────────────┬──────────────┬──────────────────────────────┤
│ id (PK, UUID)│ client_id FK │ title (TEXT, NOT NULL)        │
│ description  │ status (ENUM)│ admin_notes (TEXT, NULLABLE)  │
│ created_at   │ updated_at   │                              │
│ Status: pending > in_progress > resolved / rejected          │
└──────────────────────────────────────────────────────────────┘
` },

    { type: "code", language: "sql", title: "schema.sql — إنشاء قاعدة البيانات", content: `-- تفعيل UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ═══════════════════════
-- جدول المستخدمين
-- ═══════════════════════
CREATE TYPE user_role AS ENUM ('client', 'admin');

CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role          user_role NOT NULL DEFAULT 'client',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- فهرس على البريد الإلكتروني للبحث السريع
CREATE INDEX idx_users_email ON users(email);

-- ═══════════════════════
-- جدول طلبات الخدمة
-- ═══════════════════════
CREATE TYPE request_status AS ENUM (
  'pending', 'in_progress', 'resolved', 'rejected'
);

CREATE TABLE service_requests (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id   UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  status      request_status NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- فهارس للاستعلامات الشائعة
CREATE INDEX idx_requests_client_id ON service_requests(client_id);
CREATE INDEX idx_requests_status    ON service_requests(status);
CREATE INDEX idx_requests_created   ON service_requests(created_at DESC);

-- Trigger لتحديث updated_at تلقائياً
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON service_requests
FOR EACH ROW EXECUTE FUNCTION update_updated_at();` },

    { type: "h2", content: "المرحلة 3: تصميم الـ API (Endpoints)" },
    { type: "table", headers: ["Method", "Endpoint", "الوصف", "الصلاحية"], rows: [
      ["POST", "/api/auth/register", "تسجيل مستخدم جديد", "Public"],
      ["POST", "/api/auth/login", "تسجيل الدخول، يُرجع JWT", "Public"],
      ["GET", "/api/auth/me", "بيانات المستخدم الحالي", "Authenticated"],
      ["POST", "/api/requests", "إنشاء طلب خدمة جديد", "Client"],
      ["GET", "/api/requests", "جلب الطلبات (Admin: الكل / Client: طلباته)", "Authenticated"],
      ["GET", "/api/requests/:id", "تفاصيل طلب محدد", "Authenticated"],
      ["PATCH", "/api/requests/:id/status", "تحديث حالة الطلب وإضافة ملاحظة", "Admin"],
      ["DELETE", "/api/requests/:id", "حذف طلب (قبل المعالجة فقط)", "Client (صاحب الطلب)"],
      ["GET", "/api/admin/stats", "إحصائيات: أعداد حسب الحالة", "Admin"],
      ["GET", "/api/health", "فحص صحة الخادم", "Public"]
    ]},

    { type: "h2", content: "المرحلة 4: الكود — مثال كامل" },
    { type: "h3", content: "هيكل المشروع" },
    { type: "ascii", content: `
smart-service-api/
├── src/
│   ├── index.ts          # نقطة الدخول
│   ├── config.ts         # متغيرات البيئة
│   ├── database.ts       # اتصال PostgreSQL
│   ├── middleware/
│   │   ├── auth.ts       # JWT middleware
│   │   └── validate.ts   # Zod validation
│   ├── routes/
│   │   ├── auth.ts       # مسارات المصادقة
│   │   └── requests.ts   # مسارات الطلبات
│   ├── services/
│   │   ├── authService.ts
│   │   └── requestService.ts
│   └── types.ts          # الأنواع المشتركة
├── tests/
│   ├── auth.test.ts
│   └── requests.test.ts
├── Dockerfile
├── docker-compose.yml
└── .env.example` },

    { type: "code", language: "typescript", title: "src/middleware/auth.ts — مصادقة JWT", content: `import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../database';

export interface AuthRequest extends Request {
  user?: { id: string; role: 'client' | 'admin' };
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'رمز المصادقة مطلوب' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      sub: string;
      role: 'client' | 'admin';
    };
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    res.status(401).json({ error: 'رمز المصادقة غير صالح أو منتهي' });
  }
}

export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'هذه العملية تتطلب صلاحيات المدير' });
  }
  next();
}` },

    { type: "code", language: "typescript", title: "src/services/requestService.ts — منطق الأعمال", content: `import { db } from '../database';

export interface CreateRequestDto {
  clientId: string;
  title: string;
  description: string;
}

export interface UpdateStatusDto {
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  adminNotes?: string;
}

export interface ListRequestsOptions {
  userId?: string;    // إذا كان client، يُصفى لطلباته فقط
  status?: string;
  page: number;
  limit: number;
}

export const requestService = {
  async create(dto: CreateRequestDto) {
    const result = await db.query(
      \`INSERT INTO service_requests (client_id, title, description)
       VALUES ($1, $2, $3)
       RETURNING *\`,
      [dto.clientId, dto.title, dto.description]
    );
    return result.rows[0];
  },

  async findAll({ userId, status, page, limit }: ListRequestsOptions) {
    const conditions: string[] = [];
    const params: unknown[] = [];

    if (userId) {
      params.push(userId);
      conditions.push(\`client_id = $\${params.length}\`);
    }
    if (status) {
      params.push(status);
      conditions.push(\`status = $\${params.length}\`);
    }

    const where = conditions.length > 0 ? \`WHERE \${conditions.join(' AND ')}\` : '';
    const offset = (page - 1) * limit;
    params.push(limit, offset);

    const [rows, count] = await Promise.all([
      db.query(
        \`SELECT sr.*, u.name as client_name
         FROM service_requests sr
         JOIN users u ON sr.client_id = u.id
         \${where}
         ORDER BY created_at DESC
         LIMIT $\${params.length - 1} OFFSET $\${params.length}\`,
        params
      ),
      db.query(
        \`SELECT COUNT(*) FROM service_requests \${where}\`,
        params.slice(0, params.length - 2)
      )
    ]);

    return {
      data: rows.rows,
      total: parseInt(count.rows[0].count),
      page,
      limit,
      pages: Math.ceil(parseInt(count.rows[0].count) / limit)
    };
  },

  async updateStatus(id: string, dto: UpdateStatusDto) {
    const result = await db.query(
      \`UPDATE service_requests
       SET status = $1, admin_notes = $2
       WHERE id = $3
       RETURNING *\`,
      [dto.status, dto.adminNotes ?? null, id]
    );
    if (!result.rows[0]) throw new Error('الطلب غير موجود');
    return result.rows[0];
  }
};` },

    { type: "h2", content: "المرحلة 5: الاختبارات" },
    { type: "code", language: "typescript", title: "tests/auth.test.ts — اختبارات المصادقة", content: `import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/index';
import { db } from '../src/database';

describe('Auth API', () => {
  const testUser = {
    name: 'مستخدم الاختبار',
    email: \`test-\${Date.now()}@example.com\`,
    password: 'Password123!'
  };
  let authToken: string;

  afterAll(async () => {
    await db.query('DELETE FROM users WHERE email = $1', [testUser.email]);
  });

  describe('POST /api/auth/register', () => {
    it('ينشئ حساباً جديداً بنجاح', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(201);

      expect(res.body).toHaveProperty('token');
      expect(res.body.user.email).toBe(testUser.email);
      expect(res.body.user).not.toHaveProperty('password_hash'); // لا يُرسَل الـ hash
    });

    it('يرفض البريد المكرر', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser)
        .expect(409);

      expect(res.body.error).toContain('مسجل مسبقاً');
    });

    it('يرفض كلمة المرور الضعيفة', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({ ...testUser, email: 'new@test.com', password: '123' })
        .expect(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('يسجل الدخول ويُرجع JWT', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: testUser.password })
        .expect(200);

      expect(res.body).toHaveProperty('token');
      authToken = res.body.token;
    });

    it('يرفض كلمة المرور الخاطئة', async () => {
      await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: 'WrongPassword!' })
        .expect(401);
    });
  });
});` },

    { type: "h2", content: "المرحلة 6: Docker والنشر" },
    { type: "code", language: "yaml", title: "docker-compose.yml — بيئة التطوير الكاملة", content: `version: '3.9'

services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: development
      PORT: 3000
      DATABASE_URL: postgresql://dev_user:dev_pass@db:5432/smart_service
      JWT_SECRET: dev-secret-change-in-production
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - ./src:/app/src   # Hot reload في التطوير
    command: npm run dev

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: dev_user
      POSTGRES_PASSWORD: dev_pass
      POSTGRES_DB: smart_service
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./schema.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U dev_user -d smart_service"]
      interval: 10s
      timeout: 5s
      retries: 5

  # أداة إدارة قاعدة البيانات المرئية
  adminer:
    image: adminer
    ports:
      - "8080:8080"
    depends_on: [db]

volumes:
  postgres_data:` },

    { type: "h2", content: "المرحلة 7: خارطة طريق التوسعة" },
    { type: "p", content: "بعد إتمام المشروع الأساسي، إليك الميزات التي يمكنك إضافتها لتطويره لمستوى الإنتاج الحقيقي:" },
    { type: "table", headers: ["الميزة", "التقنية المقترحة", "الأثر", "الصعوبة"], rows: [
      ["إشعارات بريد إلكتروني", "Nodemailer + SendGrid", "إشعار العميل عند تحديث طلبه", "سهل"],
      ["تحميل الملفات", "Multer + AWS S3", "إرفاق صور بالطلب", "متوسط"],
      ["إشعارات في الوقت الفعلي", "Socket.io", "إشعار فوري دون إعادة تحميل", "متوسط"],
      ["Rate Limiting", "express-rate-limit + Redis", "منع الإساءة والطلبات المتكررة", "سهل"],
      ["Logging احترافي", "Winston + Datadog", "مراقبة الأخطاء في الإنتاج", "سهل"],
      ["Caching للاستعلامات", "Redis", "أداء أسرع للقوائم المتكررة", "متوسط"],
      ["Frontend React", "Next.js + Tailwind", "لوحة تحكم للمدير وتطبيق للعميل", "صعب"],
      ["CI/CD Pipeline", "GitHub Actions", "نشر تلقائي عند كل merge", "متوسط"]
    ]},

    { type: "callout", calloutType: "best-practice", title: "معايير الإنتاج الجاهز", content: [
      { type: "p", content: "✅ قاعدة بيانات مع Migrations منظمة (Flyway أو Liquibase)" },
      { type: "p", content: "✅ متغيرات البيئة عبر .env مع التحقق منها عند الإقلاع" },
      { type: "p", content: "✅ HTTPS مع شهادة SSL (Let's Encrypt)" },
      { type: "p", content: "✅ تغطية اختبارات > 80%" },
      { type: "p", content: "✅ Logging منظم (JSON) يمكن مراقبته" },
      { type: "p", content: "✅ Health Check endpoint للـ Load Balancer" },
      { type: "p", content: "✅ Rate Limiting لمنع إساءة الاستخدام" },
      { type: "p", content: "✅ CORS مضبوط لنطاقات محددة فقط" }
    ]},

    { type: "callout", calloutType: "ai-tip", title: "استخدم الذكاء الاصطناعي في المشروع", content: [
      { type: "p", content: "Prompt: 'راجع هذا الكود من ناحية الأمان. ابحث عن SQL Injection و IDOR وأي ثغرات أخرى: [الصق الكود]'" },
      { type: "p", content: "Prompt: 'اكتب اختبارات Vitest شاملة لهذا الـ Service مع تغطية Edge Cases: [الصق الكود]'" },
      { type: "p", content: "Prompt: 'صمّم Docker setup مُحسَّناً لبيئة الإنتاج لهذا المشروع Node.js + PostgreSQL'" }
    ]}
  ]
};
