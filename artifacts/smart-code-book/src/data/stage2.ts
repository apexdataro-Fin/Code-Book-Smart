import { StageDef } from './types';

export const stage2: StageDef = {
  id: "stage-2",
  stageNumber: 2,
  title: "مفاهيم متقدمة في البرمجة",
  units: [
    {
      id: "unit-7",
      stageId: "stage-2",
      unitNumber: 6,
      title: "الخوارزميات والتعقيد (Java)",
      description: "تحليل كفاءة الكود: Big O، خوارزميات الترتيب والبحث، وهياكل البيانات الأساسية.",
      content: [
        { type: "h1", content: "الوحدة 7: الخوارزميات والتعقيد الزمني (Big O)" },
        { type: "p", content: "ننتقل الآن إلى Java — لغة قوية وصارمة تُعلّمك ثقافة الكتابة الاحترافية. في هذه الوحدة سنتعلم معياراً أساسياً يسأل عنه كل محاور في شركات التقنية الكبرى: كيف نقيس كفاءة الكود؟ كود صحيح يعطي الإجابة الصحيحة، لكن الكود الكفء يعطيها في الوقت المناسب حتى مع ملايين السجلات." },
        { type: "p", content: "تخيل أن لديك قاعدة بيانات تحتوي على 10 ملايين مستخدم وتحتاج البحث عن واحد منهم. خوارزمية O(n) قد تستغرق ثوانٍ، أما خوارزمية O(log n) فتجد الإجابة في أقل من 24 خطوة! هذا هو الفرق الذي يصنع الفرق بين موقع يستجيب بسرعة وآخر يُحبط المستخدمين." },

        { type: "h2", content: "1. ما هو Big O Notation؟" },
        { type: "p", content: "Big O يصف كيف ينمو وقت تنفيذ الكود (أو حجم الذاكرة التي يستهلكها) مع زيادة حجم المدخلات (n). نحن نهتم بالحالة الأسوأ (Worst Case) دائماً لأنها تعطي ضماناً على الأداء. القاعدة: نتجاهل الثوابت والمصطلحات الأقل سيطرة لأننا نهتم بالنمو العام." },
        { type: "table", headers: ["التعقيد", "الاسم", "مثال عملي", "n=1,000 عملية تقريبية"], rows: [
          ["O(1)", "ثابت", "وصول لعنصر مصفوفة بالـ Index", "1"],
          ["O(log n)", "لوغاريتمي", "Binary Search في قائمة مرتبة", "10"],
          ["O(n)", "خطي", "البحث في قائمة غير مرتبة", "1,000"],
          ["O(n log n)", "شبه خطي", "Merge Sort, Quick Sort", "10,000"],
          ["O(n²)", "تربيعي", "Bubble Sort, حلقة داخل حلقة", "1,000,000"],
          ["O(2ⁿ)", "أسي", "Fibonacci Naive بالعودية", "~10³⁰"]
        ]},
        { type: "callout", calloutType: "note", title: "قاعدة تبسيط Big O", content: [
          { type: "p", content: "عند حساب Big O، نتجاهل الثوابت والمصطلحات الأقل سيطرة: O(2n + 5) = O(n)، و O(n² + n) = O(n²)، و O(3) = O(1). نهتم بالنمو العام مع اقتراب n من اللانهاية." }
        ]},

        { type: "h2", content: "2. البحث الخطي والثنائي" },
        { type: "p", content: "أبسط خوارزمية بحث هي البحث الخطي (Linear Search): نمر على كل عنصر حتى نجد ما نريد. لا تشترط ترتيب المصفوفة، لكنها بطيئة مع البيانات الكبيرة. البحث الثنائي (Binary Search) أسرع بكثير لكنه يشترط مصفوفة مرتبة." },
        { type: "code", language: "java", title: "LinearSearch.java و BinarySearch.java", content: `public class Search {
    /**
     * O(n) time complexity — يفحص كل عنصر في أسوأ الحالات
     * لا يشترط ترتيب المصفوفة
     */
    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;  // وجدناه — إرجاع الموقع
        }
        return -1;  // لم نجده
    }

    /**
     * O(log n) — يشترط مصفوفة مرتبة
     * في كل خطوة: نقسم المسافة المتبقية للنصف
     */
    public static int binarySearch(int[] sortedArr, int target) {
        int left = 0, right = sortedArr.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;  // تجنب Integer Overflow

            if (sortedArr[mid] == target)     return mid;
            else if (sortedArr[mid] < target) left = mid + 1;   // ابحث في النصف الأيمن
            else                              right = mid - 1;  // ابحث في النصف الأيسر
        }
        return -1;
    }

    // اختبار المقارنة
    public static void main(String[] args) {
        int[] sorted = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};

        // Linear: في أسوأ الحالات يفحص 10 عناصر
        System.out.println(linearSearch(sorted, 15));  // 7

        // Binary: يفحص log₂(10) ≈ 4 عناصر فقط
        System.out.println(binarySearch(sorted, 15));  // 7
    }
}` },

        { type: "h2", content: "3. خوارزميات الترتيب" },
        { type: "p", content: "الترتيب من أكثر العمليات شيوعاً في البرمجة. اختيار خوارزمية الترتيب المناسبة يؤثر كثيراً على الأداء. Bubble Sort تعليمي فقط، أما Merge Sort وQuick Sort فهما المستخدمان فعلياً." },
        { type: "h3", content: "Bubble Sort — O(n²) — للفهم فقط" },
        { type: "p", content: "تقارن كل عنصرين متجاورين وتبادلهما إن كانا في ترتيب خاطئ. تكرر عبر القائمة حتى لا يبقى تبادل. سميت Bubble لأن الأرقام الكبيرة 'تفقاعس' للنهاية كفقاعات الهواء." },
        { type: "code", language: "java", title: "BubbleSort.java", content: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;  // تحسين: توقف مبكر إن كانت مرتبة
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // التبادل باستخدام متغير مؤقت
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;  // المصفوفة مرتبة بالفعل — توقف مبكر
    }
}
// المشكلة: O(n²) في المتوسط وأسوأ الحالات
// لا تستخدمها في الإنتاج مع بيانات كبيرة` },

        { type: "h3", content: "Merge Sort — O(n log n) — احترافي" },
        { type: "p", content: "قسم المصفوفة لنصفين، رتب كل نصف (بنفس الطريقة عودياً)، ثم ادمج النصفين المرتبين. هذا تطبيق مثالي لمبدأ 'فرّق تسد' (Divide and Conquer). ميزته: أداء ثابت O(n log n) في كل الحالات." },
        { type: "code", language: "java", title: "MergeSort.java", content: `public static void mergeSort(int[] arr, int left, int right) {
    if (left >= right) return;  // حالة القاعدة: مصفوفة بعنصر واحد — مرتبة بالتعريف

    int mid = (left + right) / 2;
    mergeSort(arr, left, mid);       // رتّب النصف الأيسر
    mergeSort(arr, mid + 1, right);  // رتّب النصف الأيمن
    merge(arr, left, mid, right);    // ادمجهما
}

private static void merge(int[] arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    // مصفوفتان مؤقتتان للنصفين
    int[] L = new int[n1], R = new int[n2];
    System.arraycopy(arr, left,     L, 0, n1);
    System.arraycopy(arr, mid + 1,  R, 0, n2);

    int i = 0, j = 0, k = left;
    // دمج العنصرين الأصغر من كل نصف
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else               arr[k++] = R[j++];
    }
    // نسخ ما تبقى من أي نصف
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}` },

        { type: "h3", content: "Quick Sort — O(n log n) متوسط — الأسرع عملياً" },
        { type: "p", content: "اختر عنصراً محورياً (Pivot)، أعد ترتيب المصفوفة بحيث ما هو أصغر منه يسار وما هو أكبر يمين، ثم كرر العملية على كل جانب. الأسرع عملياً بسبب محلية الذاكرة (Cache-Friendly) لكن أسوأ الحالات O(n²)." },
        { type: "code", language: "java", title: "QuickSort.java", content: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);   // رتّب ما قبل المحور
        quickSort(arr, pivotIndex + 1, high);  // رتّب ما بعد المحور
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];   // آخر عنصر كمحور
    int i = low - 1;         // موقع العنصر الأصغر من المحور

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            // تبادل arr[i] و arr[j]
            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
    }
    // ضع المحور في مكانه الصحيح
    int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
    return i + 1;
}` },

        { type: "h2", content: "4. مقارنة خوارزميات الترتيب" },
        { type: "table", headers: ["الخوارزمية", "أفضل حالة", "متوسط", "أسوأ حالة", "ذاكرة O", "ملاحظة"], rows: [
          ["Bubble Sort", "O(n)", "O(n²)", "O(n²)", "O(1)", "للتعليم فقط"],
          ["Selection Sort", "O(n²)", "O(n²)", "O(n²)", "O(1)", "بسيط لكن بطيء"],
          ["Insertion Sort", "O(n)", "O(n²)", "O(n²)", "O(1)", "ممتاز للمصفوفات الصغيرة"],
          ["Merge Sort", "O(n log n)", "O(n log n)", "O(n log n)", "O(n)", "ثابت، يُستخدم في Java Arrays.sort"],
          ["Quick Sort", "O(n log n)", "O(n log n)", "O(n²)", "O(log n)", "الأسرع عملياً"],
          ["Tim Sort", "O(n)", "O(n log n)", "O(n log n)", "O(n)", "المستخدم في Python وJava"]
        ]},

        { type: "h2", content: "5. هياكل البيانات الأساسية" },
        { type: "p", content: "هياكل البيانات هي طرق تنظيم البيانات في الذاكرة لتسهيل الوصول إليها وتعديلها. اختيار الهيكل المناسب يمكن أن يجعل برنامجك أسرع مئات المرات من الاختيار الخاطئ." },
        { type: "table", headers: ["الهيكل", "Java", "إضافة O", "البحث O", "الوصول O", "متى تستخدمه؟"], rows: [
          ["Dynamic Array", "ArrayList", "O(1) مستهلكة", "O(n)", "O(1)", "عندما تحتاج وصولاً بالـ Index"],
          ["Linked List", "LinkedList", "O(1) من الطرفين", "O(n)", "O(n)", "عندما تُضيف وتحذف كثيراً"],
          ["Hash Map", "HashMap", "O(1)", "O(1)", "N/A", "ربط مفتاح بقيمة، بحث فوري"],
          ["Stack", "Stack/Deque", "O(1)", "O(n)", "O(1) القمة", "LIFO: Undo، استدعاء الدوال"],
          ["Queue", "LinkedList/Queue", "O(1)", "O(n)", "O(1) الأول", "FIFO: طوابير الانتظار"],
          ["Tree Set", "TreeSet", "O(log n)", "O(log n)", "N/A", "بيانات مرتبة بلا تكرار"]
        ]},
        { type: "code", language: "java", title: "HashMap في العمل الحقيقي — حساب تكرار الكلمات", content: `import java.util.*;

public class WordFrequency {
    // حساب تكرار كل كلمة في نص — O(n) وقتاً ومكاناً
    public static Map<String, Integer> countWords(String text) {
        Map<String, Integer> freq = new HashMap<>();
        String[] words = text.toLowerCase().split("\\s+");

        for (String word : words) {
            // merge: إذا الكلمة موجودة أضف 1، وإلا ابدأ بـ 1
            freq.merge(word, 1, Integer::sum);
        }
        return freq;
    }

    // أكثر 5 كلمات تكراراً
    public static List<Map.Entry<String, Integer>> topWords(Map<String, Integer> freq) {
        return freq.entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
            .limit(5)
            .toList();
    }

    public static void main(String[] args) {
        String text = "the quick brown fox jumps over the lazy dog the fox";
        Map<String, Integer> freq = countWords(text);
        topWords(freq).forEach(e ->
            System.out.printf("%-15s: %d%n", e.getKey(), e.getValue())
        );
        // the            : 3
        // fox            : 2
        // ...
    }
}` },

        { type: "h2", content: "6. مسائل LeetCode الكلاسيكية" },
        { type: "p", content: "دراسة هذه المسائل تعطيك أساساً قوياً للمقابلات. المهارة ليست حفظ الحلول، بل تعرّف الأنماط (Patterns) وتطبيقها." },
        { type: "code", language: "java", title: "المسألة 1: Two Sum — O(n) باستخدام HashMap", content: `/**
 * المشكلة: أوجد عنصرين مجموعهما يساوي target.
 * المدخل: {2, 7, 11, 15}, target = 9
 * المخرج: [0, 1] (nums[0] + nums[1] = 9)
 * التعقيد: O(n) وقتاً، O(n) مكاناً
 */
public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> seen = new HashMap<>();  // {قيمة: index}

    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];  // ماذا نحتاج إضافةً لهذا الرقم؟

        if (seen.containsKey(complement)) {
            return new int[]{seen.get(complement), i};  // وجدنا الزوج!
        }
        seen.put(nums[i], i);  // سجّل هذا العنصر للبحث مستقبلاً
    }
    return new int[]{};
}
// الفكرة: بدل حلقتين متداخلتين O(n²)، نتذكر ما رأيناه بـ HashMap
// ونبحث عن المكمّل بـ O(1) في كل خطوة → O(n) إجمالاً` },

        { type: "code", language: "java", title: "المسألة 2: Valid Parentheses — O(n) باستخدام Stack", content: `/**
 * المشكلة: تحقق أن الأقواس مغلقة بشكل صحيح.
 * "({[]})" → true  |  "({)}" → false
 * لماذا Stack؟ لأن آخر قوس فُتح يجب أن يُغلق أولاً (LIFO)
 */
public boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    Map<Character, Character> pairs = Map.of(
        ')', '(',
        ']', '[',
        '}', '{'
    );

    for (char ch : s.toCharArray()) {
        if (!pairs.containsKey(ch)) {
            stack.push(ch);  // قوس فتح → أضفه للـ Stack
        } else {
            // قوس إغلاق → تحقق من قمة الـ Stack
            if (stack.isEmpty() || stack.pop() != pairs.get(ch)) {
                return false;
            }
        }
    }
    return stack.isEmpty();  // إذا بقي شيء → أقواس لم تُغلق
}` },

        { type: "code", language: "java", title: "المسألة 3: Longest Substring Without Repeating — Sliding Window", content: `/**
 * المشكلة: أطول سلسلة فرعية بدون تكرار.
 * "abcabcbb" → 3 (abc)
 * تقنية: Sliding Window — نافذة متغيرة الحجم
 */
public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> lastSeen = new HashMap<>();
    int maxLen = 0;
    int left = 0;   // الحد الأيسر للنافذة

    for (int right = 0; right < s.length(); right++) {
        char ch = s.charAt(right);

        // إذا رأينا هذا الحرف وكان داخل النافذة الحالية
        if (lastSeen.containsKey(ch) && lastSeen.get(ch) >= left) {
            left = lastSeen.get(ch) + 1;  // ازحف الحد الأيسر
        }

        lastSeen.put(ch, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}` },

        { type: "callout", calloutType: "best-practice", title: "استراتيجية حل مسائل LeetCode", content: [
          { type: "p", content: "1. اقرأ المسألة مرتين وافهم الأمثلة بعمق." },
          { type: "p", content: "2. فكر في Brute Force أولاً (O(n²) مثلاً) — تأكد أنك تفهم المشكلة." },
          { type: "p", content: "3. فكر: أي Pattern ينطبق؟ (HashMap، Sliding Window، Two Pointers، BFS...)." },
          { type: "p", content: "4. اكتب الحل وتحقق من الحالات الحدية (مصفوفة فارغة، عنصر واحد...)." }
        ]},

        { type: "project", title: "تطبيق: نظام إدارة الطلاب بـ Java", content: [
          { type: "p", content: "نظام يجمع HashMap وArrayList ومفاهيم الأداء في تطبيق واقعي:" },
          { type: "code", language: "java", content: `import java.util.*;
import java.util.stream.*;

public class StudentManagementSystem {
    private final Map<String, Integer> studentScores = new HashMap<>();
    private final List<String> enrollmentOrder = new ArrayList<>();

    public void addStudent(String name, int score) {
        if (!studentScores.containsKey(name)) {
            enrollmentOrder.add(name);
        }
        studentScores.put(name, score);
    }

    public Optional<Integer> getScore(String name) {
        return Optional.ofNullable(studentScores.get(name));
    }

    // أعلى N طلاب — O(n log k)
    public List<Map.Entry<String, Integer>> topStudents(int n) {
        return studentScores.entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
            .limit(n)
            .collect(Collectors.toList());
    }

    // إحصاءات الفصل
    public Map<String, Double> classStats() {
        IntSummaryStatistics stats = studentScores.values().stream()
            .mapToInt(Integer::intValue)
            .summaryStatistics();

        return Map.of(
            "average", stats.getAverage(),
            "max", (double) stats.getMax(),
            "min", (double) stats.getMin()
        );
    }

    public static void main(String[] args) {
        StudentManagementSystem sys = new StudentManagementSystem();
        sys.addStudent("Ali", 85);
        sys.addStudent("Sara", 95);
        sys.addStudent("Mohammed", 72);
        sys.addStudent("Noura", 88);

        System.out.println("أعلى 2 طلاب:");
        sys.topStudents(2).forEach(e ->
            System.out.printf("  %s: %d%n", e.getKey(), e.getValue())
        );

        Map<String, Double> stats = sys.classStats();
        System.out.printf("متوسط الفصل: %.2f%n", stats.get("average"));
    }
}` }
        ]},

        { type: "active-recall", questions: [
          { q: "ماذا يعني O(log n) وفي أي خوارزمية يظهر؟", a: "يعني أن عدد العمليات يتضاعف بإضافة كل ضعف للبيانات. يظهر في Binary Search: مع 1000 عنصر نحتاج 10 خطوات، مع مليون نحتاج 20 فقط!" },
          { q: "لماذا Binary Search أسرع من Linear Search؟ وما الشرط؟", a: "Binary Search O(log n) مقابل O(n) لـ Linear Search — فرق هائل مع البيانات الكبيرة. لكنه يشترط مصفوفة مرتبة مسبقاً." },
          { q: "ما هو HashMap ولماذا البحث فيه O(1)؟", a: "HashMap يستخدم Hash Function لحساب موقع العنصر مباشرة دون البحث التسلسلي. الوصول شبه فوري بغض النظر عن حجم البيانات — هذا هو سحر الـ Hashing." },
          { q: "متى تختار ArrayList ومتى LinkedList؟", a: "ArrayList: وصول سريع بالـ Index O(1)، إضافة للنهاية O(1)، إضافة للوسط O(n). LinkedList: إضافة وحذف من الطرفين O(1)، لكن وصول بالـ Index O(n). عملياً ArrayList أسرع في معظم الحالات بسبب Cache Locality." },
          { q: "ما هو نمط الـ Sliding Window ومتى يُستخدم؟", a: "نمط يُحافظ على نافذة (Subarray) متغيرة الحجم تتحرك خلال البيانات. يُستخدم لمسائل 'أطول/أقصر/أعظم subarray يحقق شرطاً' بتعقيد O(n) بدل O(n²)." }
        ]}
      ]
    },
    {
      id: "unit-8",
      stageId: "stage-2",
      unitNumber: 7,
      title: "البرمجة كائنية التوجه OOP",
      description: "الكائنات، الفئات، الركائز الأربع للـ OOP، والـ Abstract Classes والـ Interfaces.",
      content: [
        { type: "h1", content: "الوحدة 8: البرمجة كائنية التوجه (OOP)" },
        { type: "p", content: "OOP هي الطريقة التي تُنظَّم بها معظم التطبيقات الكبيرة. فكرتها المحورية: بدلاً من دوال منفصلة تتشارك بيانات عشوائية، تُصمّم 'كائنات' تحمل بياناتها وسلوكها معاً — تماماً كما في العالم الحقيقي. الهاتف له بيانات (رقم، طراز، بطارية) وسلوك (اتصال، رسالة، إيقاف)." },
        { type: "p", content: "OOP ليست مجرد أسلوب كتابة كود، بل طريقة تفكير في المشاكل. تعلّم OOP يجعلك قادراً على تصميم أنظمة كبيرة قابلة للتوسع، وقراءة كود الآخرين بسهولة، والتواصل مع الفريق بمفردات مشتركة." },

        { type: "h2", content: "1. الفئات والكائنات — المنطق الأساسي" },
        { type: "p", content: "الـ Class هو القالب (Blueprint) — يصف ما تبدو عليه الأشياء من هذا النوع وما تستطيع فعله. الـ Object هو النسخة المجسّدة في الذاكرة — كائن حقيقي تم إنشاؤه من القالب. مثال: Car هو كلاس، أما myCar = new Car() فهو كائن." },
        { type: "code", language: "java", title: "BankAccount.java — مثال شامل ومتكامل", content: `public class BankAccount {
    // الحالة (State) — تصف الكائن
    private final String accountId;   // final: لا يتغير بعد الإنشاء
    private String owner;
    private double balance;
    private final List<String> transactionHistory = new ArrayList<>();

    // الدالة البانية (Constructor) — تُنشئ النسخة وتتحقق من صحة البيانات
    public BankAccount(String accountId, String owner, double initialBalance) {
        if (initialBalance < 0) throw new IllegalArgumentException("الرصيد لا يكون سالباً");
        if (owner == null || owner.isBlank()) throw new IllegalArgumentException("الاسم مطلوب");
        this.accountId = accountId;
        this.owner = owner;
        this.balance = initialBalance;
        log("فتح الحساب برصيد: " + initialBalance);
    }

    // السلوك (Behavior) — ما يستطيع الكائن فعله
    public void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("المبلغ يجب أن يكون موجباً");
        this.balance += amount;
        log(String.format("إيداع: +%.2f → رصيد: %.2f", amount, balance));
    }

    public void withdraw(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("المبلغ يجب أن يكون موجباً");
        if (amount > balance) throw new IllegalStateException("رصيد غير كافٍ");
        this.balance -= amount;
        log(String.format("سحب: -%.2f → رصيد: %.2f", amount, balance));
    }

    public void transfer(BankAccount target, double amount) {
        this.withdraw(amount);     // يتحقق من الرصيد أيضاً
        target.deposit(amount);
        log(String.format("تحويل: %.2f إلى %s", amount, target.owner));
    }

    private void log(String message) {
        transactionHistory.add(message);
    }

    // toString يُحسّن طباعة الكائن
    @Override
    public String toString() {
        return String.format("[%s] %s — رصيد: %.2f", accountId, owner, balance);
    }

    public double getBalance() { return balance; }
    public String getAccountId() { return accountId; }
    public List<String> getHistory() { return Collections.unmodifiableList(transactionHistory); }
}

// الاستخدام
BankAccount alice = new BankAccount("A001", "Alice", 1000.0);
BankAccount bob   = new BankAccount("B001", "Bob",   500.0);

alice.deposit(500.0);
alice.transfer(bob, 300.0);
System.out.println(alice);  // [A001] Alice — رصيد: 1200.00
System.out.println(bob);    // [B001] Bob — رصيد: 800.00` },

        { type: "h2", content: "2. الركيزة الأولى: التغليف (Encapsulation)" },
        { type: "p", content: "التغليف هو إخفاء التفاصيل الداخلية والتحكم في الوصول. مبدأه: بيانات الكائن ملك له فقط، والعالم الخارجي يتعامل معها فقط عبر الدوال المُعلنة. هذا يحمي بيانات الكائن من التعديل غير المقصود ويسمح بتغيير التنفيذ الداخلي دون التأثير على الكود الخارجي." },
        { type: "callout", calloutType: "best-practice", title: "لماذا private وليس public؟", content: [
          { type: "p", content: "إذا جعلت balance عاماً (public)، يمكن لأي كود خارجي كتابة account.balance = -999999 مباشرة. بجعله private، تُجبر كل تعديل على المرور عبر deposit() وwithdraw() اللتان تحتويان على التحقق من الصحة والتسجيل. هذا يضمن أن الكائن دائماً في حالة صحيحة." }
        ]},
        { type: "table", headers: ["مستوى الوصول", "نفس الكلاس", "نفس الـ Package", "الكلاس الابن", "العالم الخارجي"], rows: [
          ["private", "✅", "❌", "❌", "❌"],
          ["default (package)", "✅", "✅", "❌", "❌"],
          ["protected", "✅", "✅", "✅", "❌"],
          ["public", "✅", "✅", "✅", "✅"]
        ]},

        { type: "h2", content: "3. الركيزة الثانية: الوراثة (Inheritance)" },
        { type: "p", content: "يمكن لكلاس (الابن) أن يرث خصائص ودوال كلاس آخر (الأب) باستخدام extends. هذا يطبق مبدأ DRY ويسمح بالتخصيص. كل ابن يرث كل خصائص الأب ويمكنه إضافة خصائص جديدة أو تعديل السلوك الموروث." },
        { type: "code", language: "java", title: "نظام الموظفين مع الوراثة الكاملة", content: `// الكلاس الأب المجرد: يحتوي الخصائص المشتركة
public abstract class Employee {
    protected final String id;
    protected String name;
    protected String department;

    public Employee(String id, String name, String department) {
        this.id = id;
        this.name = name;
        this.department = department;
    }

    // كل موظف له راتب لكن طريقة الحساب تختلف — يجب على كل ابن تطبيقه
    public abstract double calculateSalary();

    // دالة مشتركة لجميع الموظفين
    public void printPayslip() {
        System.out.printf("═══ كشف الراتب ═══%n");
        System.out.printf("الموظف: %s (%s)%n", name, department);
        System.out.printf("الراتب: %.2f ريال%n", calculateSalary());
        System.out.printf("══════════════════%n");
    }
}

// موظف بمرتب ثابت
public class FullTimeEmployee extends Employee {
    private final double monthlySalary;
    private final double bonus;

    public FullTimeEmployee(String id, String name, String dept,
                            double salary, double bonus) {
        super(id, name, dept);  // استدعاء Constructor الأب
        this.monthlySalary = salary;
        this.bonus = bonus;
    }

    @Override
    public double calculateSalary() { return monthlySalary + bonus; }
}

// موظف مؤقت بالساعة
public class ContractEmployee extends Employee {
    private final double hourlyRate;
    private final int hoursWorked;

    public ContractEmployee(String id, String name, String dept,
                            double hourlyRate, int hoursWorked) {
        super(id, name, dept);
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }

    @Override
    public double calculateSalary() { return hourlyRate * hoursWorked; }
}

// الاستخدام — Polymorphism في العمل
List<Employee> team = new ArrayList<>();
team.add(new FullTimeEmployee("E001", "سارة", "هندسة", 5000, 500));
team.add(new ContractEmployee("E002", "علي",  "تصميم", 50, 160));

double totalPayroll = 0;
for (Employee emp : team) {
    emp.printPayslip();       // نفس الكود يعمل مع جميع الأنواع!
    totalPayroll += emp.calculateSalary();
}
System.out.printf("إجمالي الرواتب: %.2f%n", totalPayroll);` },

        { type: "h2", content: "4. الركيزة الثالثة: تعدد الأشكال (Polymorphism)" },
        { type: "p", content: "تعدد الأشكال يعني أن نفس الاستدعاء يُنتج سلوكاً مختلفاً بحسب نوع الكائن الفعلي. هذا يسمح بكتابة كود عام يعمل مع أنواع مختلفة دون الحاجة لـ if/else لكل نوع. النتيجة: كود أبسط وأسهل للتوسع." },
        { type: "p", content: "هناك نوعان من Polymorphism: Compile-time (Overloading — نفس اسم الدالة بوسائط مختلفة) وRuntime (Overriding — الابن يعيد تعريف دالة الأب). Overriding هو الأقوى والأكثر استخداماً." },
        { type: "code", language: "java", title: "Method Overloading و Overriding", content: `// Overloading: نفس الاسم، وسائط مختلفة (Compile-time Polymorphism)
public class Calculator {
    public int add(int a, int b)          { return a + b; }
    public double add(double a, double b) { return a + b; }
    public int add(int a, int b, int c)   { return a + b + c; }
}

// Overriding: الابن يُعيد تعريف دالة الأب (Runtime Polymorphism)
class Animal {
    public String speak() { return "..."; }
}

class Dog extends Animal {
    @Override
    public String speak() { return "Woof!"; }
}

class Cat extends Animal {
    @Override
    public String speak() { return "Meow!"; }
}

// نفس الكود يعمل مع جميع الحيوانات
List<Animal> animals = List.of(new Dog(), new Cat(), new Dog());
for (Animal a : animals) {
    System.out.println(a.speak());  // Woof! Meow! Woof!
}` },

        { type: "h2", content: "5. الواجهات (Interfaces) مقابل الكلاسات المجردة" },
        { type: "p", content: "كلاهما يدعمان التجريد، لكن لأغراض مختلفة. Abstract Class يقول 'هذا النوع من الكائنات' (is-a relationship). Interface يقول 'هذا الكائن قادر على فعل كذا' (can-do relationship). الفرق العملي: كلاس يمكنه تطبيق interfaces متعددة لكن يرث abstract class واحد فقط." },
        { type: "table", headers: ["المعيار", "Abstract Class", "Interface"], rows: [
          ["الإرث", "extends (واحد فقط)", "implements (متعدد)"],
          ["الحقول", "يمكن أن يكون لها حالة (state)", "ثوابت فقط (static final)"],
          ["الدوال", "مجردة وعادية معاً", "مجردة افتراضياً (default منذ Java 8)"],
          ["الاستخدام", "العلاقة is-a: Dog is-a Animal", "العلاقة can-do: Dog can Swim"],
          ["المثال", "Vehicle → Car, Truck", "Serializable, Comparable, Runnable"]
        ]},
        { type: "code", language: "java", title: "Interface عملي متعدد", content: `// Interfaces تعبّر عن قدرات
public interface Printable {
    void print();
    default String getFormat() { return "PDF"; }  // دالة افتراضية منذ Java 8
}

public interface Exportable {
    byte[] export(String format);
}

public interface Searchable {
    boolean contains(String keyword);
}

// كلاس يطبق ثلاث واجهات في نفس الوقت
public class Document implements Printable, Exportable, Searchable {
    private final String title;
    private final String content;

    public Document(String title, String content) {
        this.title = title;
        this.content = content;
    }

    @Override
    public void print() {
        System.out.printf("[%s]%n%s%n", title, content);
    }

    @Override
    public byte[] export(String format) {
        String data = String.format("<%s>%s</%s>", format, content, format);
        return data.getBytes();
    }

    @Override
    public boolean contains(String keyword) {
        return content.toLowerCase().contains(keyword.toLowerCase());
    }
}

// استخدام Polymorphism مع Interfaces
List<Printable> printQueue = new ArrayList<>();
printQueue.add(new Document("تقرير Q4", "الإيرادات ارتفعت 20%"));
printQueue.add(new Document("خطة 2025", "أهداف الشركة..."));

printQueue.forEach(Printable::print);  // Method Reference` },

        { type: "h2", content: "6. الركيزة الرابعة: التجريد (Abstraction)" },
        { type: "p", content: "التجريد هو إخفاء التعقيد وإظهار ما يهم المستخدم فقط. تعمل مع السيارة دون معرفة كيف يعمل المحرك. تستخدم الـ API دون معرفة تفاصيل التنفيذ. في البرمجة، التجريد يتحقق عبر Abstract Classes وInterfaces وحتى الدوال البسيطة." },
        { type: "callout", calloutType: "ai-tip", title: "OOP في مقابلات التوظيف", content: [
          { type: "p", content: "أكثر سؤال شائع: 'ما الفرق بين Abstract Class و Interface؟' الجواب الذكي: Interface للقدرة (can-do relationship)، Abstract Class للنوع (is-a relationship). استخدم Interface عندما تريد تعدد الوراثة أو تعبير عن قدرة لا نوع." }
        ]},

        { type: "active-recall", questions: [
          { q: "ما الفرق بين Class و Object؟", a: "Class هو القالب (Blueprint) الذي يصف الشكل والسلوك. Object هو النسخة الحقيقية المنشأة في الذاكرة من القالب. يمكن إنشاء آلاف الكائنات من كلاس واحد." },
          { q: "لماذا نستخدم Encapsulation؟", a: "لحماية حالة الكائن من التعديل المباشر غير الصحيح، وإجبار أي تعديل على المرور عبر دوال تتضمن التحقق من الصحة. يسمح أيضاً بتغيير التنفيذ الداخلي دون التأثير على الكود الخارجي." },
          { q: "ما الفرق بين Interface و Abstract Class؟", a: "Interface يعبر عن قدرة (can-do) ويسمح بالتطبيق المتعدد. Abstract Class يعبر عن نوع (is-a) ويمكن له حقول وكود. كلاس واحد يمكنه تطبيق interfaces متعددة لكن يرث abstract class واحد فقط." },
          { q: "ما الفرق بين Method Overloading و Overriding؟", a: "Overloading: نفس الاسم بوسائط مختلفة في نفس الكلاس (Compile-time). Overriding: الابن يعيد تعريف دالة موروثة من الأب (Runtime). Overriding يحقق Polymorphism الحقيقي." }
        ]}
      ]
    },
    {
      id: "unit-9",
      stageId: "stage-2",
      unitNumber: 8,
      title: "معالجة الأخطاء والـ Debugging",
      description: "اكتشاف الأخطاء ومعالجتها احترافياً والـ Debugging المنهجي.",
      content: [
        { type: "h1", content: "الوحدة 9: معالجة الأخطاء والـ Debugging" },
        { type: "p", content: "الفرق بين مبتدئ ومحترف ليس أن المحترف لا يُخطئ، بل أنه يتعامل مع الأخطاء بشكل منهجي ومتحكَّم فيه. المبتدئ يتجاهل الأخطاء أو يُخفيها، أما المحترف فيتوقعها ويصممها كجزء من النظام." },
        { type: "p", content: "برنامج احترافي يشبه الطائرة: مصمَّم بحيث إذا فشل أحد الأنظمة يُحافظ على الطائرة في الجو بدل التحطم. في البرمجة: حين يفشل استدعاء قاعدة البيانات، يُظهر رسالة للمستخدم بدل توقف التطبيق كاملاً." },

        { type: "h2", content: "1. أنواع الأخطاء الثلاثة" },
        { type: "table", headers: ["النوع", "متى يظهر؟", "المثال", "طريقة الاكتشاف"], rows: [
          ["Syntax Error (نحوي)", "قبل التشغيل (وقت الترجمة)", "نسيان ; أو }", "المترجم (Compiler) يرفض تشغيل الكود"],
          ["Runtime Error (تشغيلي)", "أثناء التشغيل", "قسمة على صفر، index خارج الحدود", "البرنامج ينهار مع رسالة خطأ"],
          ["Logic Error (منطقي)", "الكود يعمل بنجاح", "حساب مبلغ خاطئ، شرط معكوس", "الاختبارات والـ Debugging"]
        ]},

        { type: "h2", content: "2. التسلسل الهرمي للاستثناءات في Java" },
        { type: "ascii", content: `
              Throwable
              /        \\
           Error       Exception
         (JVM errors)   /          \\
                 IOException    RuntimeException
                (Checked)         (Unchecked)
                   |              /    |    \\
              FileNotFound   NullPtr  ArrayIndex  ArithmeticEx
              Exception      Exception  OutOfBounds  Exception

Checked Exceptions: يُجبرك المترجم على معالجتها
Unchecked Exceptions: اختيارية لكن تُسقط البرنامج إن لم تُعالج
` },
        { type: "p", content: "Checked Exceptions تُمثّل حالات متوقعة يجب التعامل معها (مثل: ملف غير موجود). Unchecked Exceptions (Runtime) تُمثّل أخطاء برمجية (مثل: NullPointerException) — يجب منعها بالتصميم الجيد لا معالجتها." },

        { type: "h2", content: "3. try-catch-finally بالتفصيل" },
        { type: "p", content: "try يحتوي الكود الذي قد يرمي استثناءً. catch تُعالج الاستثناءات المحددة بالترتيب من الأكثر تخصصاً للأعم. finally ينفذ دائماً (نجاح أو فشل) — مثالي لتحرير الموارد." },
        { type: "code", language: "java", title: "FileReader مع معالجة أخطاء احترافية", content: `import java.io.*;
import java.util.logging.*;

public class FileProcessor {
    private static final Logger logger = Logger.getLogger(FileProcessor.class.getName());

    public static String readFile(String path) throws FileNotFoundException {
        // try-with-resources: يغلق الموارد تلقائياً حتى لو حدث خطأ
        try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
            StringBuilder content = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\\n");
            }
            return content.toString();

        } catch (FileNotFoundException e) {
            logger.warning("الملف غير موجود: " + path);
            throw e;  // أعد رمي الخطأ ليتعامل معه المستدعي

        } catch (IOException e) {
            logger.severe("خطأ في قراءة الملف: " + e.getMessage());
            // Cause Chaining: احتفظ بالخطأ الأصلي ضمن الجديد
            throw new RuntimeException("فشل معالجة الملف: " + path, e);
        }
        // لا حاجة لـ finally: try-with-resources تُغلق الملف تلقائياً
    }
}

// الاستدعاء الصحيح
try {
    String content = FileProcessor.readFile("data.txt");
    processContent(content);
} catch (FileNotFoundException e) {
    showUserError("الملف المطلوب غير موجود. تحقق من المسار.");
} catch (RuntimeException e) {
    showUserError("حدث خطأ في قراءة البيانات. حاول مجدداً.");
    logger.log(Level.SEVERE, "خطأ غير متوقع", e);  // الـ Cause الأصلية محفوظة
}` },

        { type: "h2", content: "4. إنشاء Exceptions مخصصة" },
        { type: "p", content: "بدلاً من رمي Exception عامة، أنشئ exceptions واضحة تصف المشكلة بدقة وتحمل بيانات مفيدة للمعالجة. هذا يجعل الكود أكثر قراءة ويسهّل تتبع الأخطاء في الإنتاج." },
        { type: "code", language: "java", title: "Custom Exceptions متعددة المستويات", content: `// استثناء قاعدة — للنطاق الأعمالي بأكمله
public class BusinessException extends RuntimeException {
    private final String errorCode;

    public BusinessException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public BusinessException(String errorCode, String message, Throwable cause) {
        super(message, cause);
        this.errorCode = errorCode;
    }

    public String getErrorCode() { return errorCode; }
}

// استثناء متخصص للمدفوعات
public class InsufficientFundsException extends BusinessException {
    private final double requestedAmount;
    private final double availableBalance;

    public InsufficientFundsException(double requested, double available) {
        super("INSUFFICIENT_FUNDS",
              String.format("طلبت %.2f لكن الرصيد المتاح %.2f فقط", requested, available));
        this.requestedAmount = requested;
        this.availableBalance = available;
    }

    public double getShortfall() { return requestedAmount - availableBalance; }
    public double getAvailableBalance() { return availableBalance; }
}

// معالجة ذكية في الـ Controller
try {
    account.withdraw(1000);
} catch (InsufficientFundsException e) {
    System.out.printf("تحتاج %.2f ريال إضافية لإتمام العملية%n", e.getShortfall());
} catch (BusinessException e) {
    System.out.printf("[%s] %s%n", e.getErrorCode(), e.getMessage());
}` },

        { type: "h2", content: "5. مهارات الـ Debugging المنهجي" },
        { type: "p", content: "Debugging ليست مجرد إضافة System.out.println في كل مكان. هي عملية منهجية لتضييق دائرة المشكلة حتى تجد السبب الجذري (Root Cause)." },
        { type: "ul", items: [
          [{ type: "p", content: "اقرأ رسالة الخطأ بدقة: Stack Trace يخبرك بالنوع، والملف، والسطر بالضبط. لا تتخطاها!" }],
          [{ type: "p", content: "افهم ما يحدث مقابل ما تتوقع: وضّح الفجوة بدقة قبل المحاولة العشوائية." }],
          [{ type: "p", content: "استخدم الـ Debugger: ضع Breakpoint قبل السطر المشكوك به وراقب قيم المتغيرات خطوة بخطوة." }],
          [{ type: "p", content: "قلّص المشكلة (Isolate): اصنع أبسط مثال ممكن يُعيد المشكلة." }],
          [{ type: "p", content: "ابحث في الـ Logs: الخطأ في السيرفر دائماً في الـ Log قبل أن تراه في الواجهة." }],
          [{ type: "p", content: "تحدث بصوت عالٍ: شرح المشكلة لزميل (أو لبطة مطاط!) يساعد في اكتشاف الحل." }]
        ]},

        { type: "code", language: "java", title: "Logging احترافي مع مستويات مناسبة", content: `import java.util.logging.*;

public class OrderService {
    private static final Logger log = Logger.getLogger(OrderService.class.getName());

    public Order createOrder(String userId, List<Item> items) {
        log.info(String.format("إنشاء طلب للمستخدم %s | %d عناصر", userId, items.size()));

        try {
            validateItems(items);
            Order order = buildOrder(userId, items);
            log.fine(String.format("تم بناء الطلب: %s | المجموع: %.2f", order.getId(), order.getTotal()));

            saveOrder(order);
            log.info(String.format("تم حفظ الطلب: %s", order.getId()));
            return order;

        } catch (ValidationException e) {
            // WARNING: مشكلة متوقعة يحتاجها المستدعي
            log.warning(String.format("بيانات غير صالحة للمستخدم %s: %s", userId, e.getMessage()));
            throw e;

        } catch (Exception e) {
            // SEVERE: خطأ حرج يحتاج تدخلاً فورياً
            log.log(Level.SEVERE, "فشل إنشاء الطلب للمستخدم: " + userId, e);
            throw new RuntimeException("فشل إنشاء الطلب", e);
        }
    }
}

// مستويات الـ Logging (من الأهم للأقل):
// SEVERE   → خطأ حرج يوقف الخدمة أو يفقد بيانات
// WARNING  → مشكلة متوقعة لكن لم توقف الخدمة
// INFO     → معلومات عامة عن سير العمل
// CONFIG   → معلومات الإعدادات
// FINE     → تفاصيل للـ Debugging
// FINER    → تفاصيل أدق
// FINEST   → أدق تفاصيل ممكنة` },

        { type: "h2", content: "6. مقدمة في اختبارات الوحدة (Unit Testing)" },
        { type: "p", content: "Unit Tests هي أكواد تختبر أكواداً. فكرتها: بدلاً من فحص البرنامج يدوياً في كل مرة تغير شيئاً، اكتب اختبارات تتحقق تلقائياً من صحة الكود. JUnit هو الإطار المعياري للاختبار في Java." },
        { type: "code", language: "java", title: "JUnit Tests — اختبار BankAccount", content: `import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class BankAccountTest {

    private BankAccount account;

    @BeforeEach
    void setUp() {
        account = new BankAccount("T001", "Test User", 1000.0);
    }

    @Test
    @DisplayName("إيداع مبلغ موجب يزيد الرصيد")
    void deposit_positiveAmount_increasesBalance() {
        account.deposit(500.0);
        assertEquals(1500.0, account.getBalance(), 0.001);
    }

    @Test
    @DisplayName("سحب يقلل الرصيد")
    void withdraw_validAmount_decreasesBalance() {
        account.withdraw(300.0);
        assertEquals(700.0, account.getBalance(), 0.001);
    }

    @Test
    @DisplayName("سحب أكثر من الرصيد يرمي استثناءً")
    void withdraw_moreThanBalance_throwsException() {
        assertThrows(IllegalStateException.class, () ->
            account.withdraw(1500.0)
        );
    }

    @Test
    @DisplayName("رصيد سالب عند الإنشاء يرمي استثناءً")
    void constructor_negativeBalance_throwsException() {
        assertThrows(IllegalArgumentException.class, () ->
            new BankAccount("X", "Test", -100.0)
        );
    }
}` },

        { type: "active-recall", questions: [
          { q: "ما الفرق بين Checked و Unchecked Exception؟", a: "Checked: المترجم يُجبرك على معالجتها (try/catch أو throws في التوقيع) — مثل IOException. Unchecked (RuntimeException): لا إجبار لكنها تُسقط البرنامج — مثل NullPointerException. يجب منع Unchecked بالتصميم الجيد." },
          { q: "ما فائدة try-with-resources؟", a: "يُغلق الموارد (ملفات، اتصالات قاعدة البيانات) تلقائياً عند انتهاء كتلة try حتى لو حدث استثناء، دون الحاجة لكتلة finally يدوياً. يمنع تسرب الموارد (Resource Leak)." },
          { q: "لماذا نُنشئ Custom Exceptions؟", a: "لإضافة سياق (Context) مفيد كرموز الخطأ والبيانات المرتبطة، ولتمييز أنواع مختلفة من الأخطاء في الكود المستدعي، ولجعل الكود أكثر قراءة ووضوحاً." },
          { q: "ما مبدأ 'اقبض ما تستطيع معالجته'؟", a: "اعترض (catch) فقط الاستثناءات التي تعرف كيف تتعامل معها بشكل مفيد. الاستثناءات التي لا تعرف معالجتها دعها ترتفع للمستدعي الذي قد يعرف التعامل معها بشكل أفضل." },
          { q: "ما دور Unit Tests في تحسين جودة الكود؟", a: "تكشف الأخطاء مبكراً قبل الوصول للإنتاج، وتُوثق السلوك المتوقع للكود، وتمنحك ثقة عند إجراء تغييرات أن الكود القديم لا يزال يعمل صحيحاً (Regression Testing)." }
        ]}
      ]
    },
    {
      id: "unit-10",
      stageId: "stage-2",
      unitNumber: 9,
      title: "سير عمل المطورين (Git + GitHub)",
      description: "التحكم في الإصدارات، الفروع، Pull Requests، وسير عمل الفريق الاحترافي.",
      content: [
        { type: "h1", content: "الوحدة 10: سير عمل المطورين (Git & GitHub)" },
        { type: "p", content: "Git هو الأداة الأهم التي يستخدمها كل مطور يومياً. ليس مجرد نسخ احتياطي، بل نظام تعاون وتتبع تاريخ كامل يجعل العمل الجماعي ممكناً. Git يجيب على أسئلة حيوية: من عدّل هذا السطر؟ متى حدث هذا البـ Bug؟ كيف نعود لنسخة الأمس؟" },
        { type: "p", content: "بدون Git، يصبح التطوير الجماعي جحيماً: ملفات بأسماء مثل final_final_v3_REAL.zip، وإصدارات ضائعة، وتعارضات مستحيلة الحل. مع Git، يستطيع عشرات المطورين العمل على نفس المشروع في نفس الوقت دون فوضى." },

        { type: "h2", content: "1. المناطق الثلاث في Git" },
        { type: "ascii", content: `
Working Directory → (git add) → Staging Area → (git commit) → Local Repo
(الملفات على جهازك)            (منطقة التجهيز)               (تاريخ محلي)
        تعديل                    stage التغيير                  تأكيد الـ commit
                                                                      │
                                                                (git push)
                                                                      │
                                                               Remote Repo
                                                              (GitHub/GitLab)
                                                              يرى الفريق كله
` },
        { type: "p", content: "Working Directory: الملفات على جهازك كما تراها. Staging Area: تجهّز التغييرات التي تريد إدراجها في الـ commit التالي. Local Repository: تاريخ جميع commits على جهازك. Remote Repository: نفس التاريخ على خادم مشترك (GitHub)." },

        { type: "h2", content: "2. أساسيات اليومية" },
        { type: "code", language: "bash", title: "سير العمل اليومي الكامل", content: `# ═══ قبل البدء بأي عمل ═══
git pull origin main          # تحديث من الـ Remote (دائماً!)
git switch -c feat/user-auth  # إنشاء فرع جديد للميزة

# ═══ أثناء العمل ═══
git status                    # ماذا تغيّر؟
git diff src/auth.ts          # ماذا تغيّر بالتفصيل؟
git diff --staged             # ما الذي في الـ Staging Area؟
git add src/auth.ts           # أضف ملفاً محدداً
git add src/                  # أضف مجلداً كاملاً
git add -p                    # اختر تغييرات محددة تفاعلياً (أفضل!)

# ═══ بعد إتمام الجزء ═══
git commit -m "feat(auth): add JWT verification middleware"

# ═══ رفع ومراجعة ═══
git push origin feat/user-auth
# ثم: افتح Pull Request على GitHub

# ═══ معلومات مفيدة ═══
git log --oneline --graph --all  # الرسم البياني للتاريخ
git log --author="Ahmed"         # commits شخص معين
git show abc1234                 # تفاصيل commit محدد` },

        { type: "h2", content: "3. استراتيجيات الفروع (Branching Strategies)" },
        { type: "h3", content: "GitHub Flow — الأبسط والأكثر شيوعاً" },
        { type: "p", content: "GitHub Flow مثالي لفرق التسليم المستمر. القاعدة الذهبية: فرع main دائماً قابل للنشر للإنتاج، كل ميزة أو إصلاح في فرع منفصل، وكل فرع يُدمج بـ Pull Request بعد المراجعة." },
        { type: "ascii", content: `
main ────────────────────────────────────────────────────►
         │                              ▲
         │ git switch -c feature/login  │ Pull Request + Merge
         ▼                              │
feature/login ── commit ── commit ─────┘
` },

        { type: "h3", content: "Git Flow — للمشاريع ذات الإصدارات المنظمة" },
        { type: "p", content: "Git Flow مناسب للمشاريع التي لها دورات إصدار منتظمة (v1.0، v2.0...). يستخدم فروعاً متخصصة: main للإنتاج، develop للتطوير، feature للميزات، release للتهيئة، hotfix للإصلاحات الطارئة." },
        { type: "ascii", content: `
main    ─────────────────────────────────(v1.0)──────────────►
               ▲                            ▲
               │ merge                      │ merge
develop ────────────────────────────────────────────────────►
                   ▲                 ▲
                   │                 │
feature/login ─────┘    feature/pay─┘
` },

        { type: "h2", content: "4. كتابة رسائل Commit احترافية" },
        { type: "p", content: "رسالة الـ Commit ليست لك وحدك — هي سجل تاريخي يقرأه فريقك لأشهر أو سنوات. معيار Conventional Commits هو الأكثر انتشاراً ويتيح توليد Changelog تلقائياً." },
        { type: "table", headers: ["النوع", "متى؟", "مثال"], rows: [
          ["feat", "ميزة جديدة", "feat(auth): add Google OAuth login"],
          ["fix", "إصلاح bug", "fix(payment): handle zero amount edge case"],
          ["refactor", "تحسين دون تغيير وظيفي", "refactor(users): extract validation to service"],
          ["test", "إضافة اختبارات", "test(orders): add integration tests for checkout"],
          ["docs", "توثيق فقط", "docs(api): update authentication endpoints"],
          ["perf", "تحسين الأداء", "perf(queries): add index on users.email"],
          ["chore", "صيانة (deps, config)", "chore: upgrade Node to v20"]
        ]},
        { type: "callout", calloutType: "best-practice", title: "قواعد رسائل Commit الجيدة", content: [
          { type: "p", content: "السطر الأول: موجز (50 حرفاً كحد أقصى). السطر الثاني: فارغ. الأسطر التالية: شرح لماذا (not what — الكود نفسه يشرح الـ what)." },
          { type: "p", content: "مثال ممتاز: fix(auth): prevent login bypass with empty password. Previously an empty string would pass bcrypt.compare due to a known edge case. Add explicit check for empty password before hash comparison." }
        ]},

        { type: "h2", content: "5. Pull Requests وعملية المراجعة" },
        { type: "p", content: "Pull Request (PR) هو طلب رسمي لدمج فرعك بالفرع الرئيسي. يُتيح للفريق مراجعة الكود ومناقشته قبل الدمج. هو البوابة لضمان الجودة في الفرق الاحترافية." },
        { type: "ul", items: [
          [{ type: "p", content: "العنوان الواضح: وصف موجز للميزة أو الإصلاح (مثل: feat: add password reset flow via email)" }],
          [{ type: "p", content: "الوصف الكامل: لماذا هذا التغيير؟ ماذا يفعل؟ كيف اختبرته؟ هل هناك side effects؟" }],
          [{ type: "p", content: "Screenshots: لأي تغيير في الواجهة، أضف صور قبل/بعد" }],
          [{ type: "p", content: "حجم مناسب: PR بأقل من 400 سطر يُراجع بشكل أفضل من PR بـ 2000 سطر" }],
          [{ type: "p", content: "self-review: راجع كودك بنفسك أولاً قبل طلب المراجعة من الآخرين" }]
        ]},

        { type: "h2", content: "6. حل تعارضات الدمج (Merge Conflicts)" },
        { type: "p", content: "تعارض الدمج يحدث حين يعدّل شخصان نفس الجزء من نفس الملف. Git لا يستطيع القرار بنفسه — يعلّمك ويطلب القرار منك. التعارض ليس كارثة، بل حواراً بين نسختين." },
        { type: "code", language: "bash", title: "حل تعارضات الدمج خطوة بخطوة", content: `# 1. حاولت الدمج وحدث تعارض
git merge feat/login
# CONFLICT (content): Merge conflict in src/auth.ts

# 2. افتح الملف — Git يضع علامات التعارض
# <<<<<<< HEAD (نسختك الحالية)
# const JWT_EXPIRES = '24h';
# =======
# const JWT_EXPIRES = '7d';
# >>>>>>> feat/login (النسخة القادمة)

# 3. عدّل الملف يدوياً لاختيار النسخة الصحيحة (أو دمجهما)
# احذف علامات التعارض واحتفظ بما تريد:
# const JWT_EXPIRES = '24h'; // قرار المراجعة: البقاء بـ 24h

# 4. أكمل الدمج
git add src/auth.ts
git commit  # رسالة الدمج تُولّد تلقائياً

# أداة بصرية: استخدم VS Code أو IntelliJ لحل التعارضات بشكل مرئي
git mergetool  # يفتح أداة المقارنة المُعدّة` },

        { type: "h2", content: "7. التراجع والتصحيح بأمان" },
        { type: "code", language: "bash", title: "تراجع آمن عن التغييرات", content: `# ═══ تراجع آمن (لا يحذف تاريخاً) — آمن حتى بعد الرفع ═══
git revert abc123            # ينشئ commit عكسي للتراجع

# ═══ تراجع محلي (قبل git push فقط) ═══
git reset --soft HEAD~1      # تراجع عن آخر commit، يبقي التغييرات staged
git reset --mixed HEAD~1     # تراجع، يبقي التغييرات في Working Directory
git reset --hard HEAD~1      # تراجع كامل، يُلغي التغييرات (خطير!)

# ═══ حفظ تغييرات مؤقتة ═══
git stash                    # احفظ التغييرات جانباً مؤقتاً
git stash save "WIP: login"  # احفظ مع وصف
git stash list               # عرض ما تم حفظه
git stash pop                # استرجع واحذف آخر stash
git stash apply stash@{1}    # استرجع stash محدد دون حذفه

# ═══ البحث في التاريخ ═══
git log --oneline --graph --all   # تاريخ كامل مرئي
git log -S "calculateTax"         # commits غيّرت دالة معينة
git blame src/orders.ts           # من كتب هذا السطر؟
git bisect start                  # البحث الثنائي لإيجاد commit أدخل bug
git bisect bad                    # هذا الـ commit يحتوي الـ bug
git bisect good v1.0              # هذا الـ commit سليم
# Git يختار لك commit للاختبار تلقائياً...` },

        { type: "h2", content: "8. GitHub Actions — مقدمة للـ CI/CD" },
        { type: "p", content: "GitHub Actions يتيح تشغيل كود تلقائياً عند أحداث معينة مثل: push، فتح PR، إنشاء tag. هذا هو أساس التكامل المستمر (CI): تشغيل الاختبارات والفحص تلقائياً مع كل تغيير." },
        { type: "code", language: "yaml", title: ".github/workflows/ci.yml — فحص أساسي", content: `name: CI — Lint and Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci             # تثبيت الاعتماديات
      - run: npm run typecheck  # فحص TypeScript
      - run: npm run lint       # فحص ESLint
      - run: npm test           # تشغيل الاختبارات

  # هذا الـ job يشغّل فقط إذا نجح الأول
  notify:
    needs: check
    runs-on: ubuntu-latest
    if: failure()              # فقط عند الفشل
    steps:
      - name: إرسال إشعار الفشل
        run: echo "الـ CI فشل! تحقق من الأخطاء."` },

        { type: "active-recall", questions: [
          { q: "ما الفرق بين git merge وgit rebase؟", a: "merge: يُنشئ commit دمج يحفظ التاريخ الكامل (أفضل للفروع العامة). rebase: يُعيد كتابة التاريخ ليبدو التغيير مبنياً فوق الفرع الهدف (تاريخ أنظف لكن خطير على الفروع المشتركة)." },
          { q: "ما الفرق بين git reset --soft و --hard؟", a: "soft: يتراجع عن الـ commit ويُبقي التغييرات staged (جاهزة للـ commit مجدداً). hard: يتراجع عن الـ commit ويحذف التغييرات كلياً من Working Directory — خطير ولا يمكن التراجع عنه." },
          { q: "لماذا نستخدم ملف .gitignore؟", a: "لتجاهل الملفات التي لا يجب تتبعها: الملفات المولّدة (node_modules, dist)، الملفات الحساسة (.env مع كلمات المرور)، ملفات المحرر (.vscode, .idea)، ملفات نظام التشغيل (.DS_Store)." },
          { q: "ما هو Pull Request وما دوره في ضمان الجودة؟", a: "طلب رسمي لدمج فرع بالفرع الرئيسي. يُتيح مراجعة الكود، نقاشه، اقتراح التحسينات، وتشغيل الاختبارات التلقائية قبل أي دمج. هو آلية ضمان الجودة الرئيسية في الفرق الاحترافية." },
          { q: "متى يحدث Merge Conflict وكيف تحله؟", a: "يحدث حين يعدّل شخصان نفس الجزء من نفس الملف في فرعين مختلفين. الحل: افتح الملف، راجع كلا النسختين بين علامات <<<< و >>>، قرر أي نسخة تحتفظ بها (أو ادمجهما), احذف العلامات، git add ثم git commit." }
        ]}
      ]
    }
  ]
};
