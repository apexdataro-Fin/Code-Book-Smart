import type { StarterProject } from '@/lib/lab/types';

/**
 * Six curated starters that ship with Smart Code Lab. The Gallery
 * (LabPage) renders these as cards. Clicking a card creates a new
 * project pre-filled with the right files.
 *
 * Icons are short emoji so the cards look polished without an icon
 * library dependency.
 */
export const STARTERS: StarterProject[] = [
  {
    id: 'starter-js-hello',
    title: 'مرحبا — JavaScript',
    description: 'console.log بسيط للتحقق من بيئة التشغيل.',
    language: 'javascript',
    mode: 'workspace',
    icon: '🚀',
    defaultCode: `// 🚀 أول تجربة JavaScript في Smart Code Lab\nconst name = 'العالم';\nconsole.log(\`مرحبا \${name}!\`);\n\n// جرّب: غيّر النصّ وأعد التشغيل.\n`,
    hint: 'اضغط تشغيل (▶) في الأعلى لمشاهدة المخرجات في تبويب Console.',
  },
  {
    id: 'starter-ts-types',
    title: 'الأنواع في TypeScript',
    description: 'دوال مع أنواع، generics بسيطة، والتحقق في وقت التشغيل.',
    language: 'typescript',
    mode: 'workspace',
    icon: '🧩',
    defaultCode: `// 🧩 TypeScript — الأنواع غالبًا تُزال قبل التشغيل\ninterface User {\n  name: string;\n  level: number;\n}\n\nconst greet = (u: User): string =>\n  \`\${u.name} — مستوى \${u.level}\`;\n\nconsole.log(greet({ name: 'لمى', level: 3 }));\n`,
    hint: 'الـ TS ينفَّذ بعد إزالة الأنواع في المتصفح. إن رأيت خطأ، استعمل JS بدلًا منه.',
  },
  {
    id: 'starter-python-hello',
    title: 'مرحبا — Python',
    description: 'طباعة تجريبية باستخدام Pyodide (يتحمّل مرة واحدة فقط).',
    language: 'python',
    mode: 'workspace',
    icon: '🐍',
    defaultCode: `# 🐍 Smart Code Lab يستخدم Pyodide (Python في المتصفح)\nname = \"العالم\"\nprint(f\"مرحبا {name}!\")\n\n# تحرّك خطوة للأمام\nfor i in range(1, 4):\n    print(f\"الخطوة {i}\")\n`,
    hint: 'Pyodide يُحمَّل من CDN عند أول تشغيل Python. مرة واحدة فقط، ثم يُخزَّن.',
  },
  {
    id: 'starter-html-css',
    title: 'بطاقة HTML/CSS',
    description: 'صفحة عربية كاملة مع تنسيقات CSS مدمجة في نفس الملف.',
    language: 'html',
    mode: 'workspace',
    icon: '🎨',
    defaultCode: `<!doctype html>\n<html lang="ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>بطاقة</title>\n  <style>\n    body { font-family: system-ui, sans-serif; padding: 2rem; background: #f5f5f5; }\n    h1 { color: #0ea5e9; }\n    .card { background: white; padding: 1.5rem 2rem; border-radius: 12px;\n            box-shadow: 0 6px 16px rgba(0,0,0,0.08); max-width: 540px; }\n    button { background: #0ea5e9; color: white; border: 0; padding: .5rem 1rem;\n             border-radius: 6px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <div class=\"card\">\n    <h1>بطاقة المنتج</h1>\n    <p>هذه بطاقة بسيطة. يمكنك تعديل النص والتنسيق ومشاهدة النتيجة فورًا.</p>\n    <button onclick=\"alert('تم!\')>اضغطني</button>\n  </div>\n</body>\n</html>\n`,
    hint: 'شغّل الصفحة لتظهر في تبويب Preview بمقاسات مختلفة (Desktop/Tablet/Phone).',
  },
  {
    id: 'starter-todo-js',
    title: 'قائمة مهام — HTML + CSS + JS',
    description: 'مشروع صغير متعدد الملفات مع index.html و style.css و main.js.',
    language: 'javascript',
    mode: 'project',
    icon: '🗒️',
    hint: 'افتح Project Mode لمشاهدة الملفات الثلاثة. شغّل لرؤية النتيجة في Preview.',
    files: [
      {
        id: 'index-html',
        name: 'index.html',
        language: 'html',
        content: `<!doctype html>\n<html lang=\"ar\" dir=\"rtl\">\n<head>\n  <meta charset=\"utf-8\">\n  <title>قائمة مهام</title>\n  <link rel=\"stylesheet\" href=\"style.css\">\n</head>\n<body>\n  <main class=\"container\">\n    <h1>📝 قائمة مهام</h1>\n    <div class=\"row\">\n      <input id=\"task-input\" placeholder=\"اكتب مهمة…\" autofocus>\n      <button id=\"add-btn\">إضافة</button>\n    </div>\n    <ul id=\"tasks\"></ul>\n  </main>\n  <script src=\"main.js\"></script>\n</body>\n</html>\n`,
      },
      {
        id: 'style-css',
        name: 'style.css',
        language: 'css',
        content: `:root { color-scheme: light dark; }\nbody { font-family: system-ui, sans-serif; margin: 0; padding: 2rem;\n       background: #fafafa; color: #1f2937; }\n.container { max-width: 560px; margin: 0 auto; }\nh1 { color: #0ea5e9; }\n.row { display: flex; gap: .5rem; margin-bottom: 1rem; }\ninput { flex: 1; padding: .6rem .8rem; border-radius: 8px;\n        border: 1px solid #d1d5db; font-size: 1rem; }\nbutton { background: #0ea5e9; color: white; border: 0;\n         border-radius: 8px; padding: .6rem 1.2rem; cursor: pointer;\n         font-weight: 600; }\nbutton:hover { background: #0284c7; }\nul { list-style: none; padding: 0; margin: 0; }\nli { background: white; border: 1px solid #e5e7eb;\n     border-radius: 8px; padding: .6rem .9rem;\n     margin-bottom: .4rem; display: flex; justify-content: space-between; }\nli button { background: transparent; color: #ef4444; padding: 0 .4rem; }\n`,
      },
      {
        id: 'main-js',
        name: 'main.js',
        language: 'javascript',
        content: `// 🗒️ قائمة مهام بسيطة — Three-file mini project\nconst input  = document.getElementById('task-input');\nconst addBtn = document.getElementById('add-btn');\nconst list   = document.getElementById('tasks');\n\nconst addTask = () => {\n  const text = (input.value || '').trim();\n  if (!text) return;\n  const li = document.createElement('li');\n  li.textContent = text;\n  const del = document.createElement('button');\n  del.textContent = '✕';\n  del.addEventListener('click', () => li.remove());\n  li.appendChild(del);\n  list.appendChild(li);\n  input.value = '';\n  input.focus();\n};\n\naddBtn.addEventListener('click', addTask);\ninput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTask(); });\nconsole.log('تم تهيئة قائمة المهام');\n`,
      },
    ],
  },
  {
    id: 'starter-css-rainbow',
    title: 'تأثير قوس قزح — CSS animation',
    description: 'تدرّج ألوان متحرّك يحاكي قوس قزح.',
    language: 'css',
    mode: 'workspace',
    icon: '🌈',
    defaultCode: `/* لا يمكن تشغيل CSS وحده، انسخه إلى <style> داخل HTML لمعاينته. */\nbody {\n  margin: 0;\n  height: 100vh;\n  display: grid;\n  place-items: center;\n  background: linear-gradient(90deg,\n    #ef4444, #f97316, #facc15,\n    #22c55e, #06b6d4, #3b82f6, #8b5cf6);\n  background-size: 400% 100%;\n  animation: rainbow 6s linear infinite;\n  font-family: system-ui;\n}\n@keyframes rainbow {\n  from { background-position: 0% 0; }\n  to   { background-position: 400% 0; }\n}\nh1 { color: white; text-shadow: 0 2px 8px rgba(0,0,0,.35); font-size: 3rem; }\n`,
    hint: 'الصقه في تبويب HTML الجديد لمعاينة الحركة.',
  },
];

export function getStarter(id: string): StarterProject | undefined {
  return STARTERS.find((s) => s.id === id);
}
