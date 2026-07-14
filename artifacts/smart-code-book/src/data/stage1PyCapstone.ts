import type { UnitDef } from './types';

/**
 * Smart Code — Python Capstone Bridge (Section D, lessons 18–20).
 *   pycap-1..pycap-3 unitNumbers 140–142. CLI Task Tracker mini-project.
 *
 *   🆕 Additive only.
 *   🆕 Backtick template literals on every content string to make this
 *      file immune to apostrophes (won't / don't / can't) inside
 *      Arabic+English narrative text.
 */
export const stage1PyCapstone: UnitDef[] = [
  // ─── L18 — CLI Task Tracker kickoff ───────────────────────────────────
  {
    id: 'pycap-1',
    stageId: 'stage-1',
    unitNumber: 140,
    title: 'مشروع ختامي (1/3): بناء متعقب مهام CLI',
    description: 'مشروع يجمع dataclass + JSON + pathlib + argparse + pytest في 80 سطر.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 18: بناء متعقب مهام CLI' },
      { type: 'p', content: 'حان وقت التطبيق. نبني CLI كامل يحفظ المهام في JSON، يقبل أوامر add / list / done / delete. الهدف: ربط كل درس سابق (dataclasses و JSON و pathlib و argparse و pytest) في أداة حقيقية تعمل.' },
      { type: 'h2', content: '1. الفكرة (Concept)' },
      { type: 'p', content: 'بنية المشروع: tasks/cli.py (entry_point) و tasks/store.py (dataclass + JSON) و tasks/paths.py (paths). argparse يحدد الأمر. pytest يختبر store أولاً ثم cli. كل ملف يحوي غرضاً واحداً.' },
      { type: 'h2', content: '2. لماذا يهم (Why It Matters)' },
      { type: 'p', content: 'هذا المشروع يكرّر shape الـ CLI tools شركات التكنولوجيا تستخدمها (وهو نفس نمط smart-code-lab/lab/cli). يطبّق مبدأ: واجهة CLI بسيطة، storage JSON، كل في ملف منفصل، قابل للاختبار.' },
      { type: 'h2', content: '3. النموذج الذهني' },
      { type: 'ascii', content: `$ tasks add "مراجعة الكود" --priority high
$ tasks list
 1. [high] مراجعة الكود (open)
$ tasks done 1
$ tasks delete 1

Storage:
~/.local/share/tasks/tasks.json  ← persist عبر الجلسات` },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: `flowchart LR
  A[argparse CLI] --> B[Command: add/list/done/delete]
  B --> C[TaskStore]
  C --> D[load tasks.json]
  C --> E[save tasks.json]
  C --> F[tuple of Task]` },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'python', title: 'tasks/store.py', content: `from dataclasses import dataclass, asdict, field
from datetime import datetime
from pathlib import Path
import json

@dataclass
class Task:
    id: int
    title: str
    status: str = "open"
    priority: str = "med"
    created_at: str = field(
        default_factory=lambda: datetime.now().isoformat(timespec="seconds")
    )

class TaskStore:
    def __init__(self, path: Path) -> None:
        self.path = path
        self.tasks: list[Task] = []
        self._next_id = 1
        self.load()

    def load(self) -> None:
        if self.path.exists():
            self.tasks = [Task(**t) for t in json.loads(self.path.read_text("utf-8"))]
            self._next_id = max((t.id for t in self.tasks), default=0) + 1

    def save(self) -> None:
        self.path.parent.mkdir(parents=True, exist_ok=True)
        self.path.write_text(
            json.dumps(
                [asdict(t) for t in self.tasks],
                ensure_ascii=False, indent=2,
            ),
            encoding="utf-8",
        )

    def add(self, title: str, priority: str = "med") -> Task:
        t = Task(id=self._next_id, title=title, priority=priority)
        self._next_id += 1
        self.tasks.append(t)
        self.save()
        return t

    def list(self) -> list[Task]:
        return list(self.tasks)

    def done(self, task_id: int) -> "Task | None":
        for t in self.tasks:
            if t.id == task_id:
                t.status = "done"
                self.save()
                return t
        return None

    def delete(self, task_id: int) -> bool:
        before = len(self.tasks)
        self.tasks = [t for t in self.tasks if t.id != task_id]
        if len(self.tasks) < before:
            self.save()
            return True
        return False` },
      { type: 'code', language: 'python', title: 'tasks/cli.py', content: `"""نقطة دخول cli.py مع argparse."""
import argparse
import sys
from pathlib import Path
from .store import TaskStore

def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="tasks", description="متعقب مهام CLI")
    sub = p.add_subparsers(dest="cmd", required=True)
    a = sub.add_parser("add")
    a.add_argument("title")
    a.add_argument("--priority", default="med")
    sub.add_parser("list")
    d = sub.add_parser("done")
    d.add_argument("id", type=int)
    de = sub.add_parser("delete")
    de.add_argument("id", type=int)
    return p

def main(argv=None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    store = TaskStore(Path.home() / ".local" / "share" / "tasks" / "tasks.json")

    if args.cmd == "add":
        t = store.add(args.title, args.priority)
        print(f"OK added: [{t.id}] {t.title}")
    elif args.cmd == "list":
        if not store.list():
            print("no tasks")
            return 0
        for t in store.list():
            print(f" [{t.id}] [{t.priority}] {t.title} ({t.status})")
    elif args.cmd == "done":
        if store.done(args.id):
            print(f"OK [{args.id}] done")
        else:
            print(f"NOT FOUND: [{args.id}]")
            return 1
    elif args.cmd == "delete":
        if store.delete(args.id):
            print(f"OK [{args.id}] deleted")
        else:
            print(f"NOT FOUND: [{args.id}]")
            return 1
    return 0

if __name__ == "__main__":
    sys.exit(main())` },
      { type: 'code', language: 'python', title: 'tests/test_store.py', content: `from pathlib import Path
from tasks.store import TaskStore

def test_add_increments_id(tmp_path: Path) -> None:
    s = TaskStore(tmp_path / "t.json")
    a = s.add("task A")
    b = s.add("task B")
    assert a.id == 1 and b.id == 2

def test_persist_across_instances(tmp_path: Path) -> None:
    s1 = TaskStore(tmp_path / "t.json")
    s1.add("abc")
    s2 = TaskStore(tmp_path / "t.json")
    assert len(s2.list()) == 1
    assert s2.list()[0].title == "abc"

def test_done_marks_status(tmp_path: Path) -> None:
    s = TaskStore(tmp_path / "t.json")
    t = s.add("x", "high")
    s.done(t.id)
    assert s.list()[0].status == "done"

def test_delete_removes(tmp_path: Path) -> None:
    s = TaskStore(tmp_path / "t.json")
    t = s.add("y")
    assert s.delete(t.id) is True
    assert s.list() == []` },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'دمج cli.py + store.py في ملف واحد يكسر الاختبار.' }],
        [{ type: 'p', content: 'استخدام list بدل default_factory في dataclass: bug مشترك بين كل الكائنات.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'اختبر Storage قبل CLI', content: [
        { type: 'p', content: 'كل اختبارات store.py يجب أن تمر قبل تشغيل cli.py. الـ Storage أصعب، CLI مجرد غلاف.' },
      ] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي (AI Tip)' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [
        { type: 'p', content: 'راجع cli.py و store.py. اقترح 3 تحسينات: معالجة أخطاء argparse بدل print، استخدام logging بدل print، إضافة flag لتصدير JSON.' },
      ] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: 'TaskStore (dataclass + JSON + pathlib) + cli (argparse + sub-commands) + pytest. كل غرض في ملفه. ~80 سطر إجمالاً، قابل للنشر كـ pip install.' },
      { type: 'active-recall', questions: [
        { q: 'لماذا store.py قبل cli.py؟', a: 'Storage أصعب في الاختبار، CLI مجرد غلاف. اكتب store وtest.py أولاً ثم cli.' },
        { q: 'الفرق بين return None و False في done / delete؟', a: 'done يرجع None إن لم يجد وإلا Task. delete يرجع bool: True إن حذف، False إن لم يجد.' },
        { q: 'لماذا ensure_ascii=False في الـ save؟', a: 'بدونها يحول json.dumps النص العربي إلى escape sequences صعبة القراءة.' },
      ] },
    ],
  },

  // ─── L19 — refactor the CLI Task Tracker ─────────────────────────────
  {
    id: 'pycap-2',
    stageId: 'stage-1',
    unitNumber: 141,
    title: 'مشروع ختامي (2/3): إعادة هيكلة المتعقب',
    description: 'استخراج دالة و dispatch table و Parameter Object مع تكرار pytest.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 19: إعادة هيكلة CLI المتعقب' },
      { type: 'p', content: 'الإصدار الأول يعمل. الآن نحسن. الـ Refactoring يستبدل بنية قديمة بأخرى أقرأ بدون تغيير سلوك. الاختبارات تثبت أن السلوك ثابت.' },
      { type: 'h2', content: '1. الفكرة (Concept)' },
      { type: 'p', content: 'أنماط شائعة: Extract Function لتقسيم دالة طويلة. Parameter Object لدمج معطيات في dataclass. Dispatch Table لاستبدال سلسلة if/elif بقاموس. كل تغيير يستلزم تشغيل pytest مرة بعد مرة.' },
      { type: 'h2', content: '2. لماذا يهم (Why It Matters)' },
      { type: 'p', content: 'كود بدون refactor يتراكم تعقيده. مع refactor يبقى قابلاً للفهم لسنوات. Refactor + tests هي خطوة TDD الثانية: green ثم refactor ثم green.' },
      { type: 'h2', content: '3. النموذج الذهني' },
      { type: 'ascii', content: `قبل: سلسلة if/elif طويلة في main()
بعد: HANDLERS = {"add": handle_add, "list": handle_list, ...}

dispatch = HANDLERS[args.cmd]
return dispatch(store, args)` },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: `flowchart LR
  A[argparse.cmd] --> B[HANDLERS dict]
  B --> C[handle_add]
  B --> D[handle_list]
  B --> E[handle_done]
  B --> F[handle_delete]` },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'python', title: 'cli_v2.py — مع dispatch table', content: `from typing import Callable
from argparse import Namespace
from pathlib import Path
from tasks.store import TaskStore

HANDLERS: dict[str, Callable[[TaskStore, Namespace], int]] = {}

def _reg(name: str) -> Callable:
    def deco(fn):
        HANDLERS[name] = fn
        return fn
    return deco

@_reg("add")
def handle_add(store: TaskStore, args: Namespace) -> int:
    t = store.add(args.title, args.priority)
    print(f"OK added: [{t.id}] {t.title}")
    return 0

@_reg("list")
def handle_list(store: TaskStore, args: Namespace) -> int:
    tasks = store.list()
    if not tasks:
        print("no tasks")
        return 0
    for t in tasks:
        print(f" [{t.id}] [{t.priority}] {t.title} ({t.status})")
    return 0

@_reg("done")
def handle_done(store: TaskStore, args: Namespace) -> int:
    if store.done(args.id):
        print(f"OK [{args.id}] done")
        return 0
    print(f"NOT FOUND: [{args.id}]")
    return 1

@_reg("delete")
def handle_delete(store: TaskStore, args: Namespace) -> int:
    if store.delete(args.id):
        print(f"OK [{args.id}] deleted")
        return 0
    print(f"NOT FOUND: [{args.id}]")
    return 1

def main(argv=None) -> int:
    from tasks.cli import build_parser
    args = build_parser().parse_args(argv)
    store = TaskStore(Path.home() / ".local" / "share" / "tasks" / "tasks.json")
    return HANDLERS[args.cmd](store, args)` },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'refactor بدون تشغيل tests بعده: refactor يكسر السلوك هو regress حقيقي.' }],
        [{ type: 'p', content: 'إعادة اختراع الكود من الصفر بدل تحسين تدريجي محكوم بالاختبارات.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'Refactor في خطوات صغرى', content: [
        { type: 'p', content: 'كل خطوة refactor مدتها قصيرة ثم يتبعها pytest. لا تجمع عدة refactors في PR واحد لأنه يصبح صعب المراجعة.' },
      ] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي (AI Tip)' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [
        { type: 'p', content: 'حلل cli.py الأصلي. اقترح refactor واحداً في كل مرة. اشرح السبب ثم أرني الكود المعدّل. لا تغيّر السلوك المرئي.' },
      ] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: 'Extract Function + Dispatch Table + Parameter Object. كل خطوة تُتبع بـ pytest. صغرى. اختبارات تضمن عدم regress السلوك.' },
      { type: 'active-recall', questions: [
        { q: 'لماذا dispatch table بدل if/elif؟', a: 'يسهّل إضافة أوامر جديدة: ضع handler في القاموس بدل تعديل main().' },
        { q: 'ما الذي يجعل refactor ناجحاً؟', a: 'السلوك يبقى نفسه (tests خضراء) وقابلية القراءة تتحسن بسطور أقل وأسماء أوضح.' },
      ] },
    ],
  },

  // ─── L20 — package & document ────────────────────────────────────────
  {
    id: 'pycap-3',
    stageId: 'stage-1',
    unitNumber: 142,
    title: 'مشروع ختامي (3/3): التغليف والتوثيق',
    description: 'pyproject.toml و --help و README ثنائي اللغة و GitHub-ready.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 20: التغليف والتوثيق' },
      { type: 'p', content: 'كود مكتمل لا ينتهي عند pytest green. يحتاج: pyproject.toml قابل للتثبيت، README ثنائي اللغة، --help واضح، GitHub repo نظيف. هذه الوحدة تحوّل الكود إلى portfolio asset.' },
      { type: 'h2', content: '1. الفكرة (Concept)' },
      { type: 'p', content: 'pyproject.toml يحدد dependencies و scripts. pip install . يثبت tasks كأمر CLI في PATH. argparse يطبع --help تلقائياً. README يشرح install + usage + dev workflow. .gitignore يستثني ملفات dev.' },
      { type: 'h2', content: '2. لماذا يهم (Why It Matters)' },
      { type: 'p', content: 'أصعب جزء في الـ CV ليس كود بل portfolio. tasks CLI كامل مع README و tests و GitHub repo يصبح artifact تعرضه في interview. الفرق بين "يعرف Python" و "يستطيع ship كود احترافي".' },
      { type: 'h2', content: '3. النموذج الذهني' },
      { type: 'ascii', content: `my-tasks/
├── pyproject.toml      ← install config
├── README.md           ← عربي + English
├── src/tasks/
│   ├── __init__.py
│   ├── __main__.py     ← python -m tasks
│   ├── cli.py          ← entry_point
│   └── store.py
└── tests/
    └── test_store.py` },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: `flowchart LR
  A[git clone] --> B[pip install -e .]
  B --> C[tasks --help]
  C --> D[tasks add X]
  D --> E[~/.local/share/tasks]` },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'toml', title: 'pyproject.toml', content: `[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "my-tasks"
version = "0.1.0"
description = "CLI task tracker with JSON storage"
requires-python = ">=3.10"
dependencies = []

[project.scripts]
tasks = "tasks.cli:main"

[project.optional-dependencies]
dev = ["pytest>=8", "ruff>=0.3"]

[tool.pytest.ini_options]
testpaths = ["tests"]` },
      { type: 'code', language: 'markdown', title: 'README.md', content: `# my-tasks — متعقب مهام CLI

## التثبيت (Install)

    pip install -e .

## الاستخدام (Usage)

    tasks add "مراجعة الكود" --priority high
    tasks list
    tasks done 1
    tasks delete 1

## التطوير (Develop)

    pip install -e .[dev]
    pytest
    ruff check src/

## English

### Install

    pip install -e .

### Usage

    tasks add "Review code" --priority high
    tasks list
    tasks done 1
    tasks delete 1

### Develop

    pytest
    ruff check src/` },
      { type: 'code', language: 'text', title: '.gitignore', content: `.venv/
__pycache__/
*.pyc
dist/
*.egg-info
.pytest_cache/
.ruff_cache/` },
      { type: 'code', language: 'bash', title: 'نشر المشروع', content: `# ship sequence
pip install -e .[dev]
pytest -v
ruff check src/
ruff format src/

git init
git add .
git commit -m "feat: my-tasks CLI tracker v0.1.0"
git push -u origin main

# any user can now:
git clone <url>
cd my-tasks
pip install -e .[dev]
tasks --help` },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'نسيان .gitignore يؤدي لرفع venv و dist و pycache ضخم.' }],
        [{ type: 'p', content: 'README بدون install command يجعل المستخدم لا يعرف كيف يبدأ.' }],
        [{ type: 'p', content: 'ترك console_scripts خاطئاً: لن يعمل tasks من PATH بعد التثبيت.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'README ثنائي اللغة', content: [
        { type: 'p', content: 'README يضع قسم Install و Usage بالعربية ثم بالإنجليزية. حتى لو كانت الواجهة عربية، المطورون الغربيون يشترطون الإنجليزية.' },
      ] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي (AI Tip)' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [
        { type: 'p', content: 'حلل pyproject.toml و README. اقترح: classifiers مفقودة، badges ممكنة، GitHub Actions بسيط للـ CI (lint + test).' },
      ] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: 'pyproject.toml + scripts + README ثنائي اللغة + .gitignore + commit message + git push. portfolio asset: مشروع قابل للتثبيت، قابل للاختبار، جاهز للمشاركة.' },
      { type: 'active-recall', questions: [
        { q: 'لماذا [project.scripts] في pyproject.toml؟', a: 'يجعل pip install . يضيف tasks كأمر في PATH. بدونه يجب تشغيل python -m tasks.cli كل مرة.' },
        { q: 'ماذا يحدث لو رفعت venv إلى Git؟', a: 'مستودع ضخم وفوضوي. .gitignore يحمي.' },
        { q: 'ليش Conventional Commits مهم في README؟', a: 'يمكّن أدوات changelog و release automation ويسهل مراجعة المشروع من قبل recruiters في interview.' },
      ] },
    ],
  },
];
