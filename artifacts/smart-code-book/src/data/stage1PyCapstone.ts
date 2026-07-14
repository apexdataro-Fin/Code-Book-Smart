import type { UnitDef } from './types';

/**
 * Smart Code — Python Capstone Bridge (Section D, lessons 18–20).
 *   pycap-1..pycap-3, unitNumbers 140–142. CLI Task Tracker mini-project.
 */
export const stage1PyCapstone: UnitDef[] = [
  // ─── L18 — CLI Task Tracker kickoff ───────────────────────────────────
  {
    id: 'pycap-1',
    stageId: 'stage-1',
    unitNumber: 140,
    title: 'مشروع ختامي (1/3): بناء متعقب مهام CLI',
    description:
      'مشروع يجمع dataclass + JSON + pathlib + argparse + pytest في 80 سطر.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 18: بناء متعقب مهام CLI — Kickoff' },
      { type: 'p', content: 'حان وقت التطبيق. نبني CLI كامل يحفظ المهام في JSON، يقبل أوامر add/list/done/delete. الهدف: ربط كل درس سابق (dataclasses, JSON, pathlib, argparse, pytest) في أداة حقيقية تعمل.' },
      { type: 'h2', content: '1. الفكرة' },
      { type: 'p', content: 'بنية المشروع: tasks/cli.py (entry_point), tasks/store.py (dataclass + JSON), tasks/paths.py (paths). argparse يحدد الأمر. pytest يختبر store ثم cli. كل ملف يحوي غرضاً واحداً.' },
      { type: 'h2', content: '2. لماذا يهم' },
      { type: 'p', content: 'هذا المشروع replicate shape الـ CLI tools شركات التكنولوجيا تستخدمها (وهو نفس نمط smart-code-lab/lab/cli). يطبّق مبدأ: واجهة CLI بسيطة، storage JSON، كل في ملف منفصل، قابل للاختبار.' },
      { type: 'h2', content: '3. النموذج الذهني' },
      { type: 'ascii', content: '$ tasks add "مراجعة الكود" --priority high\n$ tasks list\n 1. [high] مراجعة الكود (open)\n$ tasks done 1\n$ tasks delete 1\n\nStorage:\n~/.local/share/tasks/tasks.json  ← persist عبر الجلسات' },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: 'flowchart LR\n  A[argparse CLI] --> B[Command: add/list/done/delete]\n  B --> C[TaskStore]\n  C --> D[load tasks.json]\n  C --> E[save tasks.json]\n  C --> F[tuple of Task]' },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'python', title: 'tasks/store.py', content: 'from dataclasses import dataclass, asdict, field\nfrom datetime import datetime\nfrom pathlib import Path\nimport json\n\n@dataclass\nclass Task:\n    id: int\n    title: str\n    status: str = "open"\n    priority: str = "med"\n    created_at: str = field(default_factory=lambda: datetime.now().isoformat(timespec="seconds"))\n\nclass TaskStore:\n    def __init__(self, path: Path) -> None:\n        self.path = path\n        self.tasks: list[Task] = []\n        self._next_id = 1\n        self.load()\n\n    def load(self) -> None:\n        if self.path.exists():\n            self.tasks = [Task(**t) for t in json.loads(self.path.read_text("utf-8"))]\n            self._next_id = max((t.id for t in self.tasks), default=0) + 1\n\n    def save(self) -> None:\n        self.path.parent.mkdir(parents=True, exist_ok=True)\n        self.path.write_text(\n            json.dumps([asdict(t) for t in self.tasks], ensure_ascii=False, indent=2),\n            encoding="utf-8",\n        )\n\n    def add(self, title: str, priority: str = "med") -> Task:\n        t = Task(id=self._next_id, title=title, priority=priority)\n        self._next_id += 1\n        self.tasks.append(t)\n        self.save()\n        return t\n\n    def list(self) -> list[Task]:\n        return list(self.tasks)\n\n    def done(self, task_id: int) -> Task | None:\n        for t in self.tasks:\n            if t.id == task_id:\n                t.status = "done"\n                self.save()\n                return t\n        return None\n\n    def delete(self, task_id: int) -> bool:\n        before = len(self.tasks)\n        self.tasks = [t for t in self.tasks if t.id != task_id]\n        if len(self.tasks) < before:\n            self.save()\n            return True\n        return False' },
      { type: 'code', language: 'python', title: 'tasks/cli.py', content: '"""نقطة دخول cli.py مع argparse."""\nimport argparse\nimport sys\nfrom pathlib import Path\nfrom .store import TaskStore\n\ndef build_parser() -> argparse.ArgumentParser:\n    p = argparse.ArgumentParser(prog="tasks", description="متعقب مهام CLI بسيط")\n    sub = p.add_subparsers(dest="cmd", required=True)\n    a = sub.add_parser("add"); a.add_argument("title"); a.add_argument("--priority", default="med")\n    sub.add_parser("list")\n    d = sub.add_parser("done"); d.add_argument("id", type=int)\n    de = sub.add_parser("delete"); de.add_argument("id", type=int)\n    return p\n\ndef main(argv=None) -> int:\n    parser = build_parser()\n    args = parser.parse_args(argv)\n    store = TaskStore(Path.home() / ".local" / "share" / "tasks" / "tasks.json")\n\n    if args.cmd == "add":\n        t = store.add(args.title, args.priority)\n        print(f"✓ أُضيفت: [{t.id}] {t.title}")\n    elif args.cmd == "list":\n        if not store.list():\n            print("لا توجد مهام.")\n            return 0\n        for t in store.list():\n            print(f" [{t.id}] [{t.priority}] {t.title} ({t.status})")\n    elif args.cmd == "done":\n        if store.done(args.id): print(f"✓ [{args.id}] done")\n        else: print(f"✗ [{args.id}] غير موجود"); return 1\n    elif args.cmd == "delete":\n        if store.delete(args.id): print(f"✓ [{args.id}] deleted")\n        else: print(f"✗ [{args.id}] غير موجود"); return 1\n    return 0\n\nif __name__ == "__main__":\n    sys.exit(main())' },
      { type: 'code', language: 'python', title: 'tests/test_store.py', content: 'from pathlib import Path\nfrom tasks.store import TaskStore\n\ndef test_add_increments_id(tmp_path: Path) -> None:\n    s = TaskStore(tmp_path / "t.json")\n    a = s.add("مراجعة الكود")\n    b = s.add("إصلاح bug")\n    assert a.id == 1 and b.id == 2\n\ndef test_persist_across_instances(tmp_path: Path) -> None:\n    s1 = TaskStore(tmp_path / "t.json"); s1.add("abc")\n    s2 = TaskStore(tmp_path / "t.json")\n    assert len(s2.list()) == 1\n    assert s2.list()[0].title == "abc"\n\ndef test_done_marks_status(tmp_path: Path) -> None:\n    s = TaskStore(tmp_path / "t.json"); t = s.add("x", "high")\n    s.done(t.id)\n    assert s.list()[0].status == "done"\n\ndef test_delete_removes(tmp_path: Path) -> None:\n    s = TaskStore(tmp_path / "t.json"); t = s.add("y")\n    assert s.delete(t.id) is True\n    assert s.list() == []' },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'دمج cli.py + store.py في ملف واحد — يكسر الاختبار.' }],
        [{ type: 'p', content: 'استخدام list بدل default_factory في dataclass — bug مشترك.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'اختبر Storage قبل CLI', content: [{ type: 'p', content: 'كل اختبارات store.py يجب أن تَمر قبل حتى تشغيل cli.py. الـ Storage أصعب، CLI مجرد غلاف.' }] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [{ type: 'p', content: '«راجع cli.py و store.py. اقترح 3 تحسينات: 1) معالجة أخطاء argparse بدل print، 2) استخدام logging بدل print، 3) إضافة --json-flags.»' }] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: 'TaskStore (dataclass + JSON + pathlib) + cli (argparse + sub-commands) + pytest. كل غرض في ملفه. ~80 سطر إجمالاً، قابل للنشر كـ pip install.' },
      { type: 'active-recall', questions: [
        { q: 'لماذا store.py قبل cli.py؟', a: 'Storage أصعب في الاختبار، بينما CLI مجرد غلاف. اكتب store وtest.py أولاً، ثم cli.' },
        { q: 'الفرق بين return None و False في done/delete؟', a: 'done يُرجع None إذا لم يجد، وإلا يُرجع Task. tuple-like usage. delete يُرجع bool: True إذا حذف، False إذا لم يجد.' },
        { q: 'لماذا ensure_ascii=False في الـ save؟', a: 'بدونها، json.dumps يحول "مراجعة" إلى "\\u0645\\u0631\\u0627\\u062c\\u0639\\u0629" — لا يقرأ.' },
      ] },
    ],
  },

  // ─── L19 — refactor the CLI Task Tracker ─────────────────────────────
  {
    id: 'pycap-2',
    stageId: 'stage-1',
    unitNumber: 141,
    title: 'مشروع ختامي (2/3): إعادة هيكلة المتعقب',
    description:
      'استخراج دالة، parameter object، dispatch table، تكرار الاختبار.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 19: إعادة هيكلة CLI المتعقب' },
      { type: 'p', content: 'الإصدار الأول يعمل. الآن نحسن. الـ Refactoring يَستبدل بنية قديمة بأخرى أقرأ بدون تغيير سلوك. الاختبارات تَثبت أن السلوك ثابت.' },
      { type: 'h2', content: '1. الفكرة' },
      { type: 'p', content: 'أنماط شائعة: Extract Function (تَقسيم دالة طويلة). Parameter Object (دمج معطيات في dataclass). Dispatch Table (استبدال سلسلة if/elif بقاموس). Replace Magic with Constants. كل تَغيير يَستلزم run pytest.' },
      { type: 'h2', content: '2. لماذا يهم' },
      { type: 'p', content: 'كود بدون refactor = تراكم تعقيد. مع refactor = يَبقى قابلاً للفهم والصيانة لسنوات. الـ Refactor + tests هي حلقة TDD الثانية: green → refactor → green.' },
      { type: 'h2', content: '3. النموذج الذهني' },
      { type: 'ascii', content: 'قبل: سلسلة if/elif طويلة في main()\nبعد: HANDLERS = {"add": handle_add, "list": handle_list, ...}\n\ndispatch = HANDLERS[args.cmd]\nresult = dispatch(store, args)\n' },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: 'flowchart LR\n  A[argparse.cmd] --> B[HANDLERS dict]\n  B --> C[handle_add]\n  B --> D[handle_list]\n  B --> E[handle_done]\n  B --> F[handle_delete]' },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'python', title: 'cli2.py — main() بعد dispatch table', content: 'from typing import Callable\nfrom argparse import Namespace\nfrom tasks.store import TaskStore\n\nHANDLERS: dict[str, Callable[[TaskStore, Namespace], int]] = {}\n\ndef _reg(name: str) -> Callable:\n    def deco(fn):\n        HANDLERS[name] = fn\n        return fn\n    return deco\n\n@_reg("add")\ndef handle_add(store: TaskStore, args: Namespace) -> int:\n    t = store.add(args.title, args.priority)\n    print(f"✓ أُضيفت: [{t.id}] {t.title}")\n    return 0\n\n@_reg("list")\ndef handle_list(store: TaskStore, args: Namespace) -> int:\n    tasks = store.list()\n    if not tasks:\n        print("لا توجد مهام.")\n        return 0\n    for t in tasks:\n        print(f" [{t.id}] [{t.priority}] {t.title} ({t.status})")\n    return 0\n\n@_reg("done")\ndef handle_done(store: TaskStore, args: Namespace) -> int:\n    if store.done(args.id):\n        print(f"✓ [{args.id}] done")\n        return 0\n    print(f"✗ [{args.id}] غير موجود")\n    return 1\n\n@_reg("delete")\ndef handle_delete(store: TaskStore, args: Namespace) -> int:\n    if store.delete(args.id):\n        print(f"✓ [{args.id}] deleted")\n        return 0\n    print(f"✗ [{args.id}] غير موجود")\n    return 1\n\ndef main(argv=None) -> int:\n    args = build_parser().parse_args(argv)\n    store = TaskStore(Path.home() / ".local" / "share" / "tasks" / "tasks.json")\n    return HANDLERS[args.cmd](store, args)' },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'Refactor بدون run tests بعدها — refactor الذي يكسر سلوك هو regress.' }],
        [{ type: 'p', content: 'إعادة اختراع الكود من الصفر بدل تحسين تَدريجي.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'Refactor في خطوات صغرى', content: [{ type: 'p', content: 'كل خطوة refactor ~10 دقائق، تَليها tests. لا تَجمع 5 refactors في PR واحد — صعب المراجعة.' }] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [{ type: 'p', content: '«حلل cli.py الأصلي. اقترح Refactor 1 تَغيير في كل مرة. اشرح كل تَغيير ثم أرني الكود المُعدّل. لا تغيّر السلوك.»' }] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: 'Extract Function + Dispatch Table + Parameter Object. كل خطوة ﴾pytest قبل وبعد﴿. صغرى. اختبارات تَضمن عدم الـ regress.' },
      { type: 'active-recall', questions: [
        { q: 'لماذا dispatch table بدل if/elif؟', a: 'تَسهيل إضافة أوامر جديدة: ضع handler في القاموس، لا تَعدل main(). الـ boilerplate أقل.' },
        { q: 'ما الذي يجعل refactor ناجحاً؟', a: 'السلوك يَبقى نفسه (tests خضراء)، وقابلية القراءة تَتحسن (أقل سطور، أسماء أوضح).' },
      ] },
    ],
  },

  // ─── L20 — package & document ────────────────────────────────────────
  {
    id: 'pycap-3',
    stageId: 'stage-1',
    unitNumber: 142,
    title: 'مشروع ختامي (3/3): التغليف والتوثيق',
    description: 'pyproject.toml، --help، README ثنائي اللغة، وGitHub-ready.',
    content: [
      { type: 'h1', content: 'الوحدة الإضافية 20: تغليف وتوثيق المشروع' },
      { type: 'p', content: 'كود مكتمل لا يَنتهي عند pytest --green. يحتاج: (1) pyproject.toml قابل للتثبيت، (2) README ثنائي اللغة، (3) --help واضح، (4) GitHub repo نظيف. هذه الوحدة تَحوّل الكود إلى portfolio.' },
      { type: 'h2', content: '1. الفكرة' },
      { type: 'p', content: 'pyproject.toml يَحدد dependencies + scripts. pip install . يَثبت tasks كأمر CLI في PATH. argparse يَطبع --help تلقائياً. README يَشرح install + usage + dev workflow. .gitignore يَستثني ملفات dev.' },
      { type: 'h2', content: '2. لماذا يهم' },
      { type: 'p', content: 'أصعب جزء في الـ CV ليس كود، بل portfolio. tasks CLI كامل + README + tests + GitHub repo = artifact تَستعرضه في interview. الفرق بين "يعرف Python" و "يَستطيع ship كود احترافي".' },
      { type: 'h2', content: '3. النموذج الذهني' },
      { type: 'ascii', content: 'my-tasks/\n├── pyproject.toml      ← install config\n├── README.md           ← عربي + English\n├── src/tasks/\n│   ├── __init__.py\n│   ├── __main__.py     ← python -m tasks\n│   ├── cli.py          ← entry_point\n│   └── store.py\n└── tests/\n    └── test_store.py' },
      { type: 'h2', content: '4. مخطط Mermaid' },
      { type: 'code', language: 'mermaid', content: 'flowchart LR\n  A[git clone] --> B[pip install -e .]\n  B --> C[tasks --help]\n  C --> D[tasks add X]\n  D --> E[~/.local/share/tasks]' },
      { type: 'h2', content: '5. مثال عملي' },
      { type: 'code', language: 'toml', title: 'pyproject.toml', content: '[build-system]\nrequires = ["hatchling"]\nbuild-backend = "hatchling.build"\n\n[project]\nname = "my-tasks"\nversion = "0.1.0"\ndescription = "CLI task tracker with JSON storage"\nrequires-python = ">=3.10"\ndependencies = []\n\n[project.scripts]\ntasks = "tasks.cli:main"\n\n[project.optional-dependencies]\ndev = ["pytest>=8", "ruff>=0.3"]\n\n[tool.pytest.ini_options]\ntestpaths = ["tests"]' },
      { type: 'code', language: 'markdown', title: 'README.md', content: '# my-tasks — متعقب مهام CLI\n\nتَثبيت:\n    pip install -e .\n\nاستخدام:\n    tasks add "مراجعة الكود" --priority high\n    tasks list\n    tasks done 1\n    tasks delete 1\n\nتطوير:\n    pip install -e .[dev]\n    pytest\n    ruff check src/\n\n## Install\n    pip install -e .\n\n## Usage\n    tasks add "Review code" --priority high\n    tasks list\n    tasks done 1\n    tasks delete 1\n\n## Develop\n    pytest\n    ruff check src/' },
      { type: 'code', language: 'text', title: '.gitignore', content: '.venv/\n__pycache__/\n*.pyc\ndist/\n*.egg-info\n.pytest_cache/\n.ruff_cache/' },
      { type: 'code', language: 'bash', title: 'نشر', content: '# أوامر ship\npip install -e .[dev]\npytest -v\nruff check src/\nruff format src/\n\ngit init\ngit add .\ngit commit -m "feat: my-tasks CLI tracker v0.1.0"\ngit push -u origin main\n\n# أي مستخدم آخر يمكنه الآن:\ngit clone <url>\ncd my-tasks\npip install -e .[dev]\ntasks --help' },
      { type: 'h2', content: '6. الأخطاء الشائعة' },
      { type: 'ul', items: [
        [{ type: 'p', content: 'نسيان .gitignore — رفع .venv و dist و __pycache__ ضخم.' }],
        [{ type: 'p', content: 'README بدون install command — مستخدم لا يَعرف كيف يَبدأ.' }],
        [{ type: 'p', content: 'تَرك console_scripts خاطئ — USER CANNOT tasks → won't run.' }],
      ] },
      { type: 'callout', calloutType: 'best-practice', title: 'README ثنائي اللغة', content: [{ type: 'p', content: 'README يَضع قسم Install + Usage بالعربية ثم بالإنجليزية. حتى لو كانت واجهة عربية، المطورون الغربيون يَشترطون الإنجليزية.' }] },
      { type: 'h2', content: '7. مع الذكاء الاصطناعي' },
      { type: 'callout', calloutType: 'ai-tip', title: 'Prompt مفيد', content: [{ type: 'p', content: '«حلّل pyproject.toml + README. اقترح: 1) classifiers مفقودة، 2) badges ممكنة، 3) GitHub Actions لـ CI بسيطة (lint + test).»' }] },
      { type: 'h2', content: '8. ملخص' },
      { type: 'p', content: 'pyproject.toml + scripts + README ثنائي اللغة + .gitignore + commit message + git push. portfolio asset: مشروع قابل للتثبيت، قابل للاختبار، جاهز للمشاركة.' },
      { type: 'active-recall', questions: [
        { q: 'لماذا [project.scripts] في pyproject.toml؟', a: 'يَجعل pip install . يَضيف tasks كأمر في PATH. بدونه، يَجب تشغيل python -m tasks.cli كل مرة.' },
        { q: 'ماذا يحدث لو رفعت .venv/ إلى Git؟', a: 'مستودع ضخم وفوضوي، flake8 يَكتشف ملفات بيئة زائدة. .gitignore يحمي.' },
        { q: 'ليش Commit Conventional Commits مهم في README؟', a: 'يُمكّن أدوات changelog و release automation. يَسهل مراجعة تاريخ المشروع من الـ recruiters.' },
      ] },
    ],
  },
];
