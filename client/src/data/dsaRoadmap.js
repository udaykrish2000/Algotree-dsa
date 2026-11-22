// Chronological DSA Roadmap Data
// Organized from Phase 1 (Absolute Beginner Foundations) to Phase 6 (Advanced Paradigms)

export const DSA_PHASES = [
  {
    id: 'phase-1',
    number: 1,
    title: 'Foundations & Algorithmic Complexity',
    tagline: 'The absolute starting point: how code runs, measures efficiency, and uses memory.',
    description: 'Before writing complex algorithms, understand how computers allocate memory and how we measure efficiency with Big-O.',
    color: 'emerald'
  },
  {
    id: 'phase-2',
    number: 2,
    title: 'Elementary Linear Data Structures',
    tagline: 'Sequential data stored in memory: arrays, pointers, strings, linked lists, stacks, and queues.',
    description: 'Master the fundamental building blocks of almost every software system and algorithmic problem.',
    color: 'sky'
  },
  {
    id: 'phase-3',
    number: 3,
    title: 'Searching, Sorting & Hashing',
    tagline: 'Finding elements fast, ordering collections, and O(1) hash table lookups.',
    description: 'Learn the core techniques that transform slow brute-force solutions into blazing-fast algorithms.',
    color: 'indigo'
  },
  {
    id: 'phase-4',
    number: 4,
    title: 'Hierarchical & Non-Linear Structures',
    tagline: 'Trees, Binary Search Trees, Heaps/Priority Queues, and Tries.',
    description: 'Step into non-linear branching data structures used for hierarchical data, fast searching, and priority scheduling.',
    color: 'purple'
  },
  {
    id: 'phase-5',
    number: 5,
    title: 'Graphs & Network Algorithms',
    tagline: 'Vertices, edges, connectivity, traversals (BFS/DFS), and shortest path trees.',
    description: 'Model real-world networks like social connections, GPS routes, dependency graphs, and state machines.',
    color: 'amber'
  },
  {
    id: 'phase-6',
    number: 6,
    title: 'Advanced Paradigms & Dynamic Programming',
    tagline: 'Backtracking, greedy decisions, memoization, and 1D/2D dynamic programming.',
    description: 'Solve complex optimization problems by breaking them into simpler overlapping subproblems.',
    color: 'rose'
  }
];

export const DSA_TOPICS = [
  // ==========================================
  // PHASE 1: Foundations
  // ==========================================
  {
    id: 'big-o-complexity',
    phaseId: 'phase-1',
    order: 1,
    title: 'Time & Space Complexity (Big-O)',
    tagline: 'Learn to mathematically measure algorithm efficiency without running on hardware.',
    difficulty: 'Beginner',
    estimatedHours: '2-3 hrs',
    prerequisites: ['Basic programming syntax (loops & variables)'],
    overview: 'Big-O notation describes the limiting behavior of a function when the argument tends towards a particular value or infinity. It helps us evaluate how time or memory scales as input size (N) grows.',
    complexityTable: {
      headers: ['Notation', 'Name', 'Example Operation', 'Growth Rate'],
      rows: [
        ['O(1)', 'Constant', 'Array index lookup `arr[0]`', 'Instant, invariant'],
        ['O(log N)', 'Logarithmic', 'Binary search in sorted list', 'Very slow growth (super fast)'],
        ['O(N)', 'Linear', 'Single loop traversing an array', 'Directly proportional to N'],
        ['O(N log N)', 'Linearithmic', 'Merge Sort, Quick Sort (avg)', 'Standard for optimal comparison sorts'],
        ['O(N²)', 'Quadratic', 'Nested loop over array', 'Grows quickly; slow for N > 10,000'],
        ['O(2^N)', 'Exponential', 'Naive recursive Fibonacci', 'Explodes; unusable for N > 30'],
        ['O(N!)', 'Factorial', 'Generating all permutations', 'Extremely slow; unusable for N > 12']
      ]
    },
    subBranches: [
      {
        id: 'big-o-eli5',
        title: 'Concept & ELI5 Intuition',
        summary: 'Think of Big-O as measuring worst-case fuel consumption for a road trip.',
        content: `Imagine searching for a book in a library:
- **O(1) Constant**: The librarian gives you the exact shelf and slot coordinates. You grab it in 5 seconds whether the library has 10 books or 10,000,000 books.
- **O(N) Linear**: The books are unorganized in a pile. You must inspect each book one-by-one from front to back. If there are 1,000 books, you make up to 1,000 checks.
- **O(log N) Logarithmic**: The books are sorted alphabetically. You open right to the middle: if your book starts with "M" and you opened to "S", you discard the entire right half! Each check cuts your remaining work in half.

**Key Rule**: In Big-O, we drop constants ($O(2N) \\to O(N)$) and drop non-dominant terms ($O(N^2 + N) \\to O(N^2)$) because as N grows to millions, the highest exponent dominates.`
      },
      {
        id: 'big-o-visual',
        title: 'Visual Representation & Rate of Growth',
        summary: 'Comparative visualization of operations required for N = 1000 items.',
        content: `Visualizing operations for N = 1,000:
┌────────────┬────────────────────────┬──────────────────────────────────┐
│ Complexity │ Operations for N=1000  │ Real-world Feeling               │
├────────────┼────────────────────────┼──────────────────────────────────┤
│ O(1)       │ 1                      │ Instantaneous (< 0.001 ms)       │
│ O(log N)   │ ~10                    │ Lightning fast (few CPU cycles)  │
│ O(N)       │ 1,000                  │ Smooth (< 1 ms)                  │
│ O(N log N) │ ~10,000                │ Very fast (~2-3 ms)              │
│ O(N²)      │ 1,000,000 (1 Million)  │ Noticeable delay (often ~100 ms) │
│ O(2^N)     │ 1.07 × 10³⁰⁰           │ Longer than universe age!        │
└────────────┴────────────────────────┴──────────────────────────────────┘

**Space Complexity**: Space complexity measures the extra memory your algorithm needs, excluding the original input memory unless stated otherwise.`
      },
      {
        id: 'big-o-patterns',
        title: 'Standard Patterns & Code Templates',
        summary: 'How to spot Big-O directly by inspecting loops and recursion.',
        content: `**Rule of thumb for code inspection**:
1. Single loop counting from 0 to N with step 1: \`O(N)\`
2. Nested loop where both go up to N: \`O(N * N) = O(N²)\`
3. Loop where iterator multiplies or divides (\`i *= 2\` or \`n /= 2\`): \`O(log N)\`
4. Two sequential loops (\`for i in range(N); for j in range(M)\`): \`O(N + M)\`
5. Recursion: \`Time = (Number of recursive calls) × (Work per call)\``
      },
      {
        id: 'big-o-mistakes',
        title: 'Beginner Pitfalls & Traps',
        summary: 'Common mistakes novices make when calculating complexity.',
        content: `- **Pitfall 1**: Assuming two loops always mean O(N²). If the second loop runs after the first loop finishes, it is O(N + N) = O(N), NOT O(N²)!
- **Pitfall 2**: Forgetting hidden work in built-in language methods. For example, in Python \`x in list\` is O(N), not O(1)! In JavaScript, \`arr.indexOf(x)\` or \`arr.shift()\` is O(N)!
- **Pitfall 3**: Confusing Best-Case vs Worst-Case. When interviewers ask for time complexity, they almost always mean the **Worst-Case** unless specified.`
      }
    ],
    codeExamples: {
      python: `# Python Time Complexity Examples

# O(1) Constant Time
def get_first_item(items):
    return items[0] if items else None

# O(N) Linear Time
def find_item(items, target):
    for item in items:
        if item == target:
            return True
    return False

# O(N^2) Quadratic Time
def has_duplicates(items):
    for i in range(len(items)):
        for j in range(i + 1, len(items)):
            if items[i] == items[j]:
                return True
    return False`,
      javascript: `// JavaScript Time Complexity Examples

// O(1) Constant Time
function getFirstItem(items) {
  return items.length > 0 ? items[0] : null;
}

// O(N) Linear Time
function findItem(items, target) {
  for (const item of items) {
    if (item === target) return true;
  }
  return false;
}

// O(N^2) Quadratic Time
function hasDuplicates(items) {
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (items[i] === items[j]) return true;
    }
  }
  return false;
}`
    }
  },

  {
    id: 'memory-pointers',
    phaseId: 'phase-1',
    order: 2,
    title: 'Memory Model, References & Pointers',
    tagline: 'Understand Stack vs Heap memory, address referencing, and pass-by-value vs pass-by-reference.',
    difficulty: 'Beginner',
    estimatedHours: '2 hrs',
    prerequisites: ['Time & Space Complexity (Big-O)'],
    overview: 'Every data structure lives in physical RAM. Understanding how variables, pointers, and memory blocks are allocated (Stack vs Heap) prevents common bugs like mutation side-effects and memory leaks.',
    complexityTable: {
      headers: ['Memory Region', 'Allocation Speed', 'Access Speed', 'Lifetime', 'Managed By'],
      rows: [
        ['Stack Memory', 'Extremely Fast', 'Blazing Fast (L1/L2 cache)', 'Scoped to function call', 'CPU automatically'],
        ['Heap Memory', 'Slower (Dynamic)', 'Slightly slower (Pointers)', 'Until freed or Garbage Collected', 'Programmer or GC']
      ]
    },
    subBranches: [
      {
        id: 'mem-eli5',
        title: 'Concept & ELI5 Intuition',
        summary: 'Stack is your immediate desk notepad; Heap is the giant storage warehouse.',
        content: `- **Stack**: Think of a stack of cafeteria trays. When you call a function, a new "tray" (stack frame) is placed on top with local variables. When the function returns, the tray is popped off and disappears!
- **Heap**: A huge warehouse where large or dynamic objects (arrays, objects, trees) are stored. The stack simply holds a small note with the warehouse address (a pointer/reference) pointing to that object.
- **Why this matters for DSA**: Passing an array to a function doesn't make a whole new copy of 1,000,000 items; it passes the reference pointer, which takes O(1) time and space!`
      },
      {
        id: 'mem-pointers',
        title: 'Pointers & References Explained',
        summary: 'Pointers simply store memory addresses where data lives.',
        content: `When you write \`a = [1, 2, 3]\` and then \`b = a\`:
Both variable \`a\` and variable \`b\` point to the exact same memory address \`0x7FFEE\`!
If you mutate \`b[0] = 99\`, \`a[0]\` will also be \`99\`!
To make a distinct duplicate, you must create a **shallow or deep clone**.`
      },
      {
        id: 'mem-mistakes',
        title: 'Beginner Pitfalls & Traps',
        summary: 'Accidental mutations and null pointer exceptions.',
        content: `- **Pitfall 1**: Mutating an array or object in place when you intended to keep the original copy untouched.
- **Pitfall 2**: Null / Undefined dereference (e.g. \`node.next.next\` when \`node.next\` is \`null\`). Always verify a pointer exists before accessing its properties.`
      }
    ],
    codeExamples: {
      python: `# Python References & Shallow vs Deep Copy
a = [1, 2, 3]
b = a  # Both point to the exact same list in Heap
b.append(4)
print(a)  # Output: [1, 2, 3, 4] -> 'a' changed too!

# To create an independent copy:
import copy
c = a.copy()       # Shallow copy
d = copy.deepcopy(a) # Deep copy for nested structures`,
      javascript: `// JavaScript References
const a = [1, 2, 3];
const b = a; // Both point to the same memory location
b.push(4);
console.log(a); // Output: [1, 2, 3, 4] -> 'a' changed!

// To create an independent clone:
const independent = [...a]; // Spread operator
independent.push(99);
console.log(a); // [1, 2, 3, 4] -> unchanged!`
    }
  },

  {
    id: 'recursion-basics',
    phaseId: 'phase-1',
    order: 3,
    title: 'Recursion Fundamentals & Call Stack',
    tagline: 'Solving a problem by solving smaller instances of the exact same problem.',
    difficulty: 'Beginner',
    estimatedHours: '3 hrs',
    prerequisites: ['Memory Model, References & Pointers'],
    overview: 'Recursion is a programming technique where a function calls itself until it reaches a base condition. It forms the backbone of Trees, Graphs, Backtracking, and Dynamic Programming.',
    complexityTable: {
      headers: ['Concept', 'Function', 'If Missing', 'Example'],
      rows: [
        ['Base Case', 'Halts the recursion', 'Stack Overflow (infinite loop)', '`if n <= 1: return 1`'],
        ['Recursive Step', 'Shrinks input closer to base case', 'Never reaches base case', '`return n * factorial(n - 1)`'],
        ['Call Stack', 'Memory holding each paused call', 'Consumes O(depth) space', 'Stack frames stacking up']
      ]
    },
    subBranches: [
      {
        id: 'rec-eli5',
        title: 'Concept & ELI5 Intuition',
        summary: 'Russian Matryoshka dolls: opening smaller dolls until you hit the tiny solid one.',
        content: `Every recursive solution requires two ingredients:
1. **Base Case (The STOP sign)**: The simplest possible subproblem that can be answered immediately without further calls. (e.g., "factorial of 1 is 1").
2. **Recursive Step (The Leap of Faith)**: Calling the function on a smaller chunk of data, assuming it correctly solves the smaller part, then combining it with the current step.

**The Call Stack**:
When \`factorial(3)\` runs:
1. \`factorial(3)\` pauses and calls \`factorial(2)\`
2. \`factorial(2)\` pauses and calls \`factorial(1)\`
3. \`factorial(1)\` hits base case! Returns \`1\`
4. \`factorial(2)\` resumes: \`2 * 1 = 2\`
5. \`factorial(3)\` resumes: \`3 * 2 = 6\``
      },
      {
        id: 'rec-visual',
        title: 'Recursion Tree Visualization',
        summary: 'How recursive calls branch out like a tree in memory.',
        content: `Visualizing Fibonacci call tree for fib(4):
               fib(4)
              /      \\
         fib(3)      fib(2)
        /      \\     /    \\
     fib(2)  fib(1) fib(1) fib(0)
     /    \\
  fib(1) fib(0)

Notice how \`fib(2)\` is calculated twice! This redundancy is why naive recursion is O(2^N) and motivates **Dynamic Programming** later!`
      },
      {
        id: 'rec-mistakes',
        title: 'Beginner Pitfalls & Stack Overflow',
        summary: 'How to avoid crashing your program with recursion.',
        content: `- **Pitfall 1**: Missing or incorrect base case. This leads to **StackOverflowError** (Maximum call stack size exceeded).
- **Pitfall 2**: Failing to make progress toward the base case (e.g. calling \`f(n)\` instead of \`f(n - 1)\`).
- **Pitfall 3**: Forgetting that each recursive call consumes stack memory ($O(D)$ auxiliary space, where D is maximum recursion depth).`
      }
    ],
    codeExamples: {
      python: `# Python Recursion Examples

# 1. Factorial
def factorial(n):
    # Base Case
    if n <= 1:
        return 1
    # Recursive Step
    return n * factorial(n - 1)

# 2. Sum of Array via Recursion
def array_sum(arr, index=0):
    if index == len(arr):
        return 0
    return arr[index] + array_sum(arr, index + 1)`,
      javascript: `// JavaScript Recursion Examples

// 1. Factorial
function factorial(n) {
  // Base Case
  if (n <= 1) return 1;
  // Recursive Step
  return n * factorial(n - 1);
}

// 2. Countdown
function countdown(n) {
  if (n <= 0) {
    console.log("Done!");
    return;
  }
  console.log(n);
  countdown(n - 1);
}`
    }
  },

  // ==========================================
  // PHASE 2: Linear Data Structures
  // ==========================================
  {
    id: 'arrays-dynamic-arrays',
    phaseId: 'phase-2',
    order: 4,
    title: 'Static & Dynamic Arrays',
    tagline: 'Contiguous memory blocks with ultra-fast O(1) index access and amortized resizing.',
    difficulty: 'Beginner',
    estimatedHours: '3-4 hrs',
    prerequisites: ['Memory Model, References & Pointers'],
    overview: 'An array stores elements in contiguous (unbroken) memory locations. Because each memory cell has a fixed size, the CPU computes element addresses instantly via `BaseAddress + (index * size)`, making index access O(1).',
    complexityTable: {
      headers: ['Operation', 'Static Array', 'Dynamic Array (Vector/List)', 'Why?'],
      rows: [
        ['Access `arr[i]`', 'O(1)', 'O(1)', 'Direct memory arithmetic calculation'],
        ['Update `arr[i]`', 'O(1)', 'O(1)', 'Direct memory overwrite'],
        ['Insert at End', 'N/A (fixed size)', 'O(1) amortized', 'Quick unless array capacity is full (doubling)'],
        ['Insert at Front', 'O(N)', 'O(N)', 'Must shift all existing elements 1 spot right'],
        ['Delete at End', 'N/A', 'O(1)', 'Simply decrement size counter'],
        ['Delete at Front', 'O(N)', 'O(N)', 'Must shift all existing elements 1 spot left'],
        ['Search (Unsorted)', 'O(N)', 'O(N)', 'Must scan linearly element by element']
      ]
    },
    subBranches: [
      {
        id: 'arr-eli5',
        title: 'Concept & ELI5 Intuition',
        summary: 'Numbered postal lockers side-by-side on a wall.',
        content: `Imagine a street with numbered houses 0, 1, 2, 3, 4:
If each house is exactly 10 meters wide, where is house #3?
Answer: \`Start + (3 * 10) = 30 meters down the street!\`
You don't need to visit house 0, 1, or 2 to know where house 3 is! You jump directly there. That is why array index access is **O(1) Constant Time**!

**Static vs Dynamic Arrays**:
- **Static Array** (C/Java \`int[]\`): You declare size 5 upfront. It can never grow or shrink.
- **Dynamic Array** (Python \`list\`, JS \`[]\`, C++ \`vector\`, Java \`ArrayList\`): When you exceed capacity, it automatically creates a new array of DOUBLE the size, copies all elements over, and frees the old one!`
      },
      {
        id: 'arr-resizing',
        title: 'Amortized O(1) Doubling Explained',
        summary: 'Why appending to dynamic arrays is considered O(1) even when resizing occurs.',
        content: `When a dynamic array of capacity 4 becomes full:
1. It allocates a new block of capacity 8.
2. It copies the 4 elements (takes 4 operations).
3. Then appends the 5th element.

Although that single resize took O(N) operations, it happens very rarely!
Doubling allows us to perform the next several appends in pure O(1). When averaged over all insertions, the cost per append is **Amortized O(1)**.`
      },
      {
        id: 'arr-mistakes',
        title: 'Beginner Pitfalls & Traps',
        summary: 'Off-by-one errors and expensive shift operations.',
        content: `- **Pitfall 1**: "Off-by-one" errors. In 0-indexed arrays with length $N$, the valid indices are $0$ through $N-1$. Accessing \`arr[N]\` throws an **IndexOutOfBoundsException**!
- **Pitfall 2**: Calling \`arr.insert(0, val)\` or \`arr.pop(0)\` inside a loop. Inserting or deleting at the front requires shifting all N items, turning an O(N) loop into an accidental O(N²) crawl! Use a **Deque** or **Linked List** if you need frequent front operations.`
      }
    ],
    codeExamples: {
      python: `# Python Dynamic Array Operations

arr = [10, 20, 30, 40]

# O(1) Index Lookup
print(arr[2])  # 30

# O(1) Append to End
arr.append(50)

# O(N) Insert at Beginning (Avoid in large loops!)
arr.insert(0, 5)

# O(N) Linear Search
def contains(arr, target):
    for num in arr:
        if num == target:
            return True
    return False`,
      javascript: `// JavaScript Dynamic Array Operations

const arr = [10, 20, 30, 40];

// O(1) Index Lookup
console.log(arr[2]); // 30

// O(1) Append to End
arr.push(50);

// O(N) Insert at Front
arr.unshift(5); // Shifting required!

// O(1) Pop from End
const last = arr.pop();`
    }
  },

  {
    id: 'two-pointers-sliding-window',
    phaseId: 'phase-2',
    order: 5,
    title: 'Two Pointers & Sliding Window Patterns',
    tagline: 'Master the two most powerful techniques to optimize O(N²) nested loops down to linear O(N).',
    difficulty: 'Beginner',
    estimatedHours: '3-4 hrs',
    prerequisites: ['Static & Dynamic Arrays'],
    overview: 'Instead of comparing every pair using nested loops ($O(N^2)$), Two Pointers and Sliding Windows maintain two coordinate indices that traverse the array intelligently in a single pass ($O(N)$).',
    complexityTable: {
      headers: ['Pattern', 'Typical Pointers Movement', 'Best Used For', 'Time Complexity'],
      rows: [
        ['Opposite Ends', 'Left starts at 0, Right starts at N-1 (move towards center)', 'Sorted arrays, Palindromes, Two Sum II', 'O(N)'],
        ['Fast & Slow', 'Slow moves 1 step, Fast moves 2 steps', 'Middle of list, Cycle detection, Duplicate removal', 'O(N)'],
        ['Fixed Window', 'Right expands, Left follows at fixed distance K', 'Max sum subarray of size K, Anagram search', 'O(N)'],
        ['Dynamic Window', 'Right expands until invalid, Left shrinks until valid', 'Longest substring without repeating chars', 'O(N)']
      ]
    },
    subBranches: [
      {
        id: 'tp-eli5',
        title: 'Concept & ELI5 Intuition',
        summary: 'Two friends walking towards each other on a sorted street.',
        content: `**Opposite Direction Intuition**:
Suppose you have a sorted array \`[1, 3, 5, 8, 12, 15]\` and want two numbers that sum to \`17\`.
- Place left pointer \`L\` at \`1\` and right pointer \`R\` at \`15\`.
- \`Sum = 1 + 15 = 16\`. That's too small!
- Because the array is **sorted**, moving \`R\` to the left would only make the sum even smaller. So the ONLY logical move is \`L++\`!
- Now \`L\` points to \`3\` and \`R\` to \`15\`. \`Sum = 3 + 15 = 18\`. Too big! So move \`R--\`.
- Now \`L\` points to \`5\` and \`R\` to \`12\`. \`Sum = 5 + 12 = 17\`! Found in just 3 steps instead of checking all pairs!`
      },
      {
        id: 'sw-eli5',
        title: 'Sliding Window Intuition',
        summary: 'A magnifying glass that slides smoothly along an array without recalculating from scratch.',
        content: `To find the maximum sum of 3 consecutive elements in \`[2, 1, 5, 1, 3, 2]\`:
- Brute force calculates each triplet sum from scratch: (2+1+5), (1+5+1)... doing redundant work.
- Sliding window: Compute the first window \`(2 + 1 + 5) = 8\`.
- To slide one step right, **subtract the element leaving the window** (2) and **add the element entering** (1):
  \`8 - 2 + 1 = 7\`!
- Each slide takes O(1) constant time!`
      },
      {
        id: 'tp-mistakes',
        title: 'Beginner Pitfalls & Traps',
        summary: 'Forgetting sorted prerequisites and while loop boundary conditions.',
        content: `- **Pitfall 1**: Applying opposite-ends Two Pointers to an **unsorted array** without sorting first! It only works if moving a pointer deterministically increases or decreases the metric.
- **Pitfall 2**: Forgetting to update pointers inside the loop, causing infinite loops (\`while left < right\`).
- **Pitfall 3**: Sliding window index mistakes when calculating window size: the number of elements between indices \`left\` and \`right\` is \`right - left + 1\`, not \`right - left\`!`
      }
    ],
    codeExamples: {
      python: `# 1. Two Pointers (Two Sum on Sorted Array)
def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1  # Need a bigger sum
        else:
            right -= 1 # Need a smaller sum
    return []

# 2. Fixed Sliding Window (Max sum of subarray of size k)
def max_sub_array_sum(arr, k):
    if len(arr) < k: return 0
    window_sum = sum(arr[:k])
    max_sum = window_sum
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k] # Slide: add new, drop old
        max_sum = max(max_sum, window_sum)
    return max_sum`,
      javascript: `// Two Pointers on Sorted Array
function twoSumSorted(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    if (sum < target) left++;
    else right--;
  }
  return [];
}`
    }
  },

  {
    id: 'prefix-sum-kadane',
    phaseId: 'phase-2',
    order: 6,
    title: 'Prefix Sums & Kadane’s Algorithm',
    tagline: 'Answer subarray range sum queries in O(1) time and find maximum subarray sum in O(N).',
    difficulty: 'Beginner',
    estimatedHours: '2-3 hrs',
    prerequisites: ['Static & Dynamic Arrays'],
    overview: 'Prefix sums precompute cumulative sums so any subarray sum from index L to R can be computed in O(1) time via `Prefix[R] - Prefix[L - 1]`. Kadane’s algorithm finds the contiguous subarray with the largest sum in O(N).',
    complexityTable: {
      headers: ['Technique', 'Preprocessing Time', 'Query Time', 'Space Complexity', 'Core Formula'],
      rows: [
        ['Prefix Sum Array', 'O(N)', 'O(1)', 'O(N)', '`sum(L..R) = prefix[R] - prefix[L-1]`'],
        ['Kadane’s Algorithm', 'None (Single pass)', 'O(N)', 'O(1)', '`curr = max(num, curr + num)`']
      ]
    },
    subBranches: [
      {
        id: 'pref-eli5',
        title: 'Prefix Sum Concept & ELI5',
        summary: 'Like an odometer in a car: subtracting mileage at start from mileage at end.',
        content: `If you want to know how many miles you drove between city A (mile marker 50) and city B (mile marker 120), you don't measure every mile individually: you simply calculate \`120 - 50 = 70 miles\`!

Given \`arr = [3, 1, 4, 2]\`:
\`prefix = [3, 4, 8, 10]\`
To get sum from index 1 to 3: \`prefix[3] - prefix[0] = 10 - 3 = 7\`!`
      },
      {
        id: 'kadane-eli5',
        title: 'Kadane’s Algorithm Intuition',
        summary: 'Should I keep carrying past luggage, or start fresh from here?',
        content: `At each number in the array, you ask a simple question:
"Is it better to add this current number to my existing running sum, or is the existing running sum so negative that I am better off resetting and starting a fresh subarray right here?"
Formula:
\`current_sum = max(num, current_sum + num)\`
\`max_so_far = max(max_so_far, current_sum)\``
      },
      {
        id: 'pref-mistakes',
        title: 'Beginner Pitfalls & Traps',
        summary: 'Handling index 0 boundary conditions cleanly.',
        content: `- **Pitfall 1**: If \`L == 0\`, calculating \`prefix[R] - prefix[L - 1]\` will access \`prefix[-1]\`! Always build the prefix array with an extra dummy 0 at index 0 (size $N+1$) or add a boundary check \`if L == 0: return prefix[R]\`.
- **Pitfall 2**: In Kadane's algorithm, initializing \`max_so_far = 0\` fails if all numbers in the array are negative (e.g. \`[-5, -2, -8]\`). Initialize \`max_so_far = arr[0]\`!`
      }
    ],
    codeExamples: {
      python: `# Kadane's Algorithm for Maximum Subarray Sum
def max_sub_array(nums):
    max_so_far = nums[0]
    curr_sum = nums[0]
    
    for num in nums[1:]:
        # Either extend the previous subarray or start fresh
        curr_sum = max(num, curr_sum + num)
        max_so_far = max(max_so_far, curr_sum)
        
    return max_so_far

# Prefix Sum Construction
def build_prefix(nums):
    prefix = [0] * (len(nums) + 1)
    for i in range(len(nums)):
        prefix[i + 1] = prefix[i] + nums[i]
    return prefix  # Range sum (L to R inclusive) is prefix[R + 1] - prefix[L]`,
      javascript: `// Kadane's Algorithm
function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let currSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currSum = Math.max(nums[i], currSum + nums[i]);
    maxSoFar = Math.max(maxSoFar, currSum);
  }
  return maxSoFar;
}`
    }
  },

  {
    id: 'strings-manipulation',
    phaseId: 'phase-2',
    order: 7,
    title: 'Strings & Character Manipulation',
    tagline: 'ASCII, Unicode, immutability, anagrams, two-pointer palindromes, and frequency arrays.',
    difficulty: 'Beginner',
    estimatedHours: '2-3 hrs',
    prerequisites: ['Static & Dynamic Arrays'],
    overview: 'A string is essentially an array of characters. However, in many languages (Python, Java, JavaScript), strings are immutable. Learning string algorithms and ASCII frequency arrays is critical for coding interviews.',
    complexityTable: {
      headers: ['Operation', 'Complexity', 'Note'],
      rows: [
        ['Access char `s[i]`', 'O(1)', 'Instant via indexing'],
        ['String concatenation `s += c`', 'O(N) in immutable languages!', 'Creates a brand new string of length N+1 each time!'],
        ['Check Palindrome', 'O(N) time, O(1) space', 'Two pointers from ends moving inward'],
        ['Check Anagram', 'O(N) time, O(1) extra space', '26-size frequency count array for lowercase english']
      ]
    },
    subBranches: [
      {
        id: 'str-eli5',
        title: 'Concept & Immutability Trap',
        summary: 'Why string concatenation in a loop destroys performance.',
        content: `In Python, Java, and JavaScript, strings are **immutable** (they cannot be changed in place).
If you do:
\`\`\`python
s = ""
for c in long_string:
    s += c
\`\`\`
Every addition copies the entire string again! For a string of length $N$, this takes $1 + 2 + 3 + ... + N = O(N^2)$ time!
**Solution**: Collect characters in an array/list, and join them once at the very end in $O(N)$ time (\`"".join(list)\` in Python, \`arr.join("")\` in JS, or \`StringBuilder\` in Java).`
      },
      {
        id: 'str-frequency',
        title: 'ASCII & Frequency Counting',
        summary: 'Using fixed 26-element arrays for character counts.',
        content: `Every lowercase character 'a' through 'z' has an ASCII code.
In Python: \`ord(char) - ord('a')\` maps 'a' to 0, 'b' to 1, ..., 'z' to 25.
Because there are only 26 lowercase English letters, a frequency array \`[0] * 26\` takes **O(1) Auxiliary Space** regardless of how huge the string is!`
      },
      {
        id: 'str-mistakes',
        title: 'Beginner Pitfalls & Traps',
        summary: 'Case sensitivity, whitespace, and Unicode pitfalls.',
        content: `- **Pitfall 1**: Forgetting to handle case-sensitivity (\`'A' != 'a'\`) or non-alphanumeric characters in palindrome problems.
- **Pitfall 2**: Using slow regex inside high-speed loops.`
      }
    ],
    codeExamples: {
      python: `# Valid Palindrome (Two Pointers)
def is_palindrome(s: str) -> bool:
    clean = [c.lower() for c in s if c.isalnum()]
    left, right = 0, len(clean) - 1
    while left < right:
        if clean[left] != clean[right]:
            return False
        left += 1
        right -= 1
    return True

# Valid Anagram (Frequency Array)
def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t): return False
    count = [0] * 26
    for c1, c2 in zip(s, t):
        count[ord(c1) - ord('a')] += 1
        count[ord(c2) - ord('a')] -= 1
    return all(x == 0 for x in count)`,
      javascript: `// Valid Palindrome
function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let l = 0, r = clean.length - 1;
  while (l < r) {
    if (clean[l] !== clean[r]) return false;
    l++;
    r--;
  }
  return true;
}`
    }
  },

  {
    id: 'linked-lists',
    phaseId: 'phase-2',
    order: 8,
    title: 'Singly & Doubly Linked Lists',
    tagline: 'Nodes chained together by pointers in heap memory with O(1) front insertions and dynamic resizing.',
    difficulty: 'Beginner',
    estimatedHours: '4 hrs',
    prerequisites: ['Memory Model, References & Pointers'],
    overview: 'Unlike arrays, linked list elements (nodes) are not stored contiguously in memory. Each node contains data and a pointer to the next node. This allows O(1) insertion and deletion once you have a pointer to the location.',
    complexityTable: {
      headers: ['Operation', 'Linked List (Head/Tail Pointer)', 'Array', 'Explanation'],
      rows: [
        ['Prepend (Insert Head)', 'O(1)', 'O(N)', 'Simply point new node to current head'],
        ['Append (Insert Tail)', 'O(1) with tail pointer', 'O(1) amortized', 'Point tail.next to new node'],
        ['Access i-th element', 'O(N)', 'O(1)', 'Must traverse one node at a time from head'],
        ['Delete Given Node', 'O(1) if predecessor known', 'O(N)', 'Reroute pointer around the node']
      ]
    },
    subBranches: [
      {
        id: 'll-eli5',
        title: 'Concept & Scavenger Hunt Analogy',
        summary: 'A treasure hunt where each clue contains a message and directions to the next clue.',
        content: `In an array, houses are lined up sequentially on a street (House 0, 1, 2, 3).
In a Linked List, the houses are scattered across the whole city!
House #1 contains a note with the GPS coordinates of House #2.
House #2 contains coordinates of House #3.
The last house points to \`None\` / \`null\`.
- To get to House #3, you **cannot jump directly**! You must visit #1, get clue to #2, visit #2, then reach #3! That's why indexing is **O(N)**.
- But if you want to insert a new clue between #1 and #2, you just change the note in #1! No need to move any other houses!`
      },
      {
        id: 'll-techniques',
        title: 'Essential Techniques: Dummy Nodes & Fast/Slow Pointers',
        summary: 'Techniques that eliminate 90% of edge case bugs.',
        content: `**1. Dummy Head (Sentinel Node)**:
Creating a fake dummy node before the head (\`dummy = ListNode(0); dummy.next = head\`) eliminates special-case checks for inserting or deleting the real head node! Always return \`dummy.next\`.

**2. Floyd’s Tortoise and Hare (Fast & Slow Pointers)**:
- Slow moves 1 step at a time: \`slow = slow.next\`
- Fast moves 2 steps at a time: \`fast = fast.next.next\`
- Finding middle: When fast reaches the end, slow is precisely at the middle!
- Cycle detection: If there is a loop, fast and slow will inevitably collide!`
      },
      {
        id: 'll-mistakes',
        title: 'Beginner Pitfalls & Traps',
        summary: 'Losing pointer references and null pointer crashes.',
        content: `- **Pitfall 1 (Losing the chain)**: If you update \`curr.next = new_node\` BEFORE saving \`next_temp = curr.next\`, you sever the rest of the list and lose access to all remaining nodes!
- **Pitfall 2**: Accessing \`fast.next.next\` without first checking if \`fast\` and \`fast.next\` are not null.`
      }
    ],
    codeExamples: {
      python: `# Node definition
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# Reverse a Singly Linked List (In-place O(1) Space)
def reverse_list(head):
    prev = None
    curr = head
    while curr:
        next_temp = curr.next  # Save next node
        curr.next = prev       # Reverse pointer
        prev = curr            # Move prev forward
        curr = next_temp       # Move curr forward
    return prev

# Cycle Detection (Floyd's Fast & Slow)
def has_cycle(head):
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
      javascript: `// Reverse Linked List
function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr !== null) {
    const nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }
  return prev;
}`
    }
  },

  {
    id: 'stacks-and-queues',
    phaseId: 'phase-2',
    order: 9,
    title: 'Stacks (LIFO) & Queues (FIFO)',
    tagline: 'Last-In First-Out vs First-In First-Out: parentheses matching, undo/redo, and BFS buffers.',
    difficulty: 'Beginner',
    estimatedHours: '3 hrs',
    prerequisites: ['Static & Dynamic Arrays', 'Linked Lists'],
    overview: 'Stacks enforce Last-In, First-Out (LIFO) order (like a stack of plates). Queues enforce First-In, First-Out (FIFO) order (like a grocery checkout line). Both achieve strict O(1) push and pop operations.',
    complexityTable: {
      headers: ['Operation', 'Stack (LIFO)', 'Queue (FIFO)', 'Time Complexity'],
      rows: [
        ['Push / Enqueue', 'Add to top', 'Add to back / tail', 'O(1)'],
        ['Pop / Dequeue', 'Remove from top', 'Remove from front / head', 'O(1)'],
        ['Peek / Top', 'Inspect top element', 'Inspect front element', 'O(1)'],
        ['Search', 'Scan elements', 'Scan elements', 'O(N)']
      ]
    },
    subBranches: [
      {
        id: 'sq-eli5',
        title: 'Concept & Real-World Analogies',
        summary: 'Pancakes vs Grocery Checkout Line.',
        content: `- **Stack (LIFO)**: Imagine a stack of hot pancakes. When a new pancake is cooked, it is placed on top (push). When you eat, you take the top one first (pop). You can never reach the bottom pancake without removing all top ones first!
  - Real-world uses: Browser "Back" button, Text Editor "Undo" (Ctrl+Z), Call stack in programming languages.
- **Queue (FIFO)**: Imagine people lining up for concert tickets. The first person in line is served first!
  - Real-world uses: Printer queue, Web server request handling, Breadth-First Search (BFS).`
      },
      {
        id: 'sq-patterns',
        title: 'Classic Patterns: Balanced Parentheses & Monotonic Stack',
        summary: 'How stacks solve matching and next-greater-element problems.',
        content: `**Balanced Parentheses Pattern**:
- When you see an opening bracket \`(\`, \`[\`, \`{\`, push it onto the stack.
- When you see a closing bracket \`)\`, \`]\`, \`}\`, pop the top bracket:
  - If the stack was empty or the brackets don't match, string is invalid!
- At the end, the stack must be empty.`
      },
      {
        id: 'sq-mistakes',
        title: 'Beginner Pitfalls & Traps',
        summary: 'Popping from empty stacks and using array shift() for queues.',
        content: `- **Pitfall 1**: Calling \`pop()\` on an empty stack crashes your program. Always check \`if stack:\` or \`if (!stack.isEmpty())\` first!
- **Pitfall 2 (Crucial in JS/Python)**: Using standard array \`arr.pop(0)\` or \`arr.shift()\` as a queue. This shifts all remaining elements, making dequeue **O(N)**! Use \`collections.deque\` in Python.`
      }
    ],
    codeExamples: {
      python: `# Valid Parentheses using a Stack
def is_valid_parentheses(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            # Closing bracket
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            # Opening bracket
            stack.append(char)
            
    return len(stack) == 0

# Fast Queue in Python using deque (O(1) operations)
from collections import deque
queue = deque()
queue.append(10)      # Enqueue O(1)
first = queue.popleft() # Dequeue O(1)`,
      javascript: `// Valid Parentheses
function isValidParentheses(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`
    }
  },

  // ==========================================
  // PHASE 3: Searching, Sorting & Hashing
  // ==========================================
  {
    id: 'binary-search',
    phaseId: 'phase-3',
    order: 10,
    title: 'Linear Search & Binary Search',
    tagline: 'Halving the search space on sorted inputs to achieve blazing O(log N) efficiency.',
    difficulty: 'Beginner',
    estimatedHours: '3-4 hrs',
    prerequisites: ['Static & Dynamic Arrays'],
    overview: 'Binary Search is one of the most fundamental algorithms in computer science. Given a sorted search space, it inspects the middle element and discards half the remaining possibilities every single step, finding any item in 30 steps even among 1,000,000,000 elements.',
    complexityTable: {
      headers: ['Search Type', 'Prerequisite', 'Best Case', 'Worst Case', 'Space Complexity'],
      rows: [
        ['Linear Search', 'None (works on unsorted)', 'O(1)', 'O(N)', 'O(1)'],
        ['Binary Search', 'MUST BE SORTED (monotonic)', 'O(1)', 'O(log N)', 'O(1) iterative']
      ]
    },
    subBranches: [
      {
        id: 'bs-eli5',
        title: 'Concept & Number Guessing Game',
        summary: 'Guess a number between 1 and 100 with "Higher / Lower" hints.',
        content: `If someone thinks of a number between 1 and 100:
- Guess 50! "Too high." Now you only need to look in [1, 49].
- Guess 25! "Too low." Now look in [26, 49].
- Guess 37! "Too high." Now look in [26, 36].
In just 7 guesses, you can find any number from 1 to 100!
For $N = 1,000,000$, $\\log_2(1,000,000) \\approx 20$ checks maximum!`
      },
      {
        id: 'bs-template',
        title: 'The Bulletproof Binary Search Template',
        summary: 'The exact while-loop conditions to avoid infinite loops.',
        content: `Standard Template:
\`\`\`python
low = 0
high = len(arr) - 1

while low <= high:
    # Avoid integer overflow bug: low + (high - low) // 2
    mid = (low + high) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        low = mid + 1
    else:
        high = mid - 1

return -1 # Not found
\`\`\`
**Note on integer overflow**: In C++ and Java, \`(low + high) / 2\` can overflow 32-bit integers if both are near 2 billion. Use \`low + (high - low) / 2\`.`
      },
      {
        id: 'bs-mistakes',
        title: 'Beginner Pitfalls & Traps',
        summary: 'Off-by-one errors and applying BS to unsorted data.',
        content: `- **Pitfall 1**: Trying to run binary search on an unsorted array without sorting first.
- **Pitfall 2**: Using \`low = mid\` or \`high = mid\` instead of \`mid + 1\` or \`mid - 1\`. If an array has 2 elements, this causes an **infinite loop**!`
      }
    ],
    codeExamples: {
      python: `# Standard Binary Search
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1`,
      javascript: `// Binary Search in JavaScript
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor(low + (high - low) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`
    }
  },

  {
    id: 'sorting-algorithms',
    phaseId: 'phase-3',
    order: 11,
    title: 'Sorting Algorithms (Elementary & Divide-and-Conquer)',
    tagline: 'From Bubble and Insertion Sort O(N²) to optimal Merge Sort and Quick Sort O(N log N).',
    difficulty: 'Intermediate',
    estimatedHours: '4 hrs',
    prerequisites: ['Recursion Fundamentals', 'Static & Dynamic Arrays'],
    overview: 'Sorting arranges elements in a specified order. Elementary sorts (Bubble, Selection, Insertion) are simple but O(N²). Divide-and-Conquer sorts (Merge Sort, Quick Sort) achieve optimal O(N log N) by splitting arrays recursively.',
    complexityTable: {
      headers: ['Algorithm', 'Best Time', 'Average Time', 'Worst Time', 'Space', 'Stable?'],
      rows: [
        ['Insertion Sort', 'O(N) (nearly sorted)', 'O(N²)', 'O(N²)', 'O(1)', 'Yes'],
        ['Selection Sort', 'O(N²)', 'O(N²)', 'O(N²)', 'O(1)', 'No'],
        ['Merge Sort', 'O(N log N)', 'O(N log N)', 'O(N log N)', 'O(N)', 'Yes'],
        ['Quick Sort', 'O(N log N)', 'O(N log N)', 'O(N²)', 'O(log N)', 'No']
      ]
    },
    subBranches: [
      {
        id: 'sort-eli5',
        title: 'Merge Sort: Divide and Conquer Intuition',
        summary: 'Splitting a deck of cards until single cards remain, then merging sorted pairs.',
        content: `Merge Sort operates in two phases:
1. **Divide**: Split the array in half recursively until each slice has only 1 element (an array of 1 element is inherently sorted!).
2. **Conquer (Merge)**: Take two sorted sub-lists and merge them into one larger sorted list by repeatedly taking the smaller of the two front items.
Because it always splits evenly into $\\log_2 N$ levels, and each level does $O(N)$ merge work, it is **guaranteed O(N log N)** in all cases!`
      },
      {
        id: 'sort-stability',
        title: 'Stability in Sorting',
        summary: 'Why stability matters when sorting objects by multiple criteria.',
        content: `A sorting algorithm is **stable** if elements with identical keys maintain their original relative order.
For example, if you sort a list of student records by "Grade", and two students have grade "A", a stable sort guarantees the student who appeared first in the original list remains first!
- **Stable**: Merge Sort, Insertion Sort, Bubble Sort.
- **Unstable**: Quick Sort, Selection Sort, Heap Sort.`
      },
      {
        id: 'sort-mistakes',
        title: 'Beginner Pitfalls & Traps',
        summary: 'Quick Sort worst-case on already sorted arrays.',
        content: `- **Pitfall 1**: Naive Quick Sort picking the first or last element as pivot on an already-sorted array triggers worst-case $O(N^2)$! Always pick a random pivot or median-of-three.
- **Pitfall 2**: Forgetting that Merge Sort requires $O(N)$ extra memory for the temporary merge arrays.`
      }
    ],
    codeExamples: {
      python: `# Merge Sort
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
      javascript: `// Quick Sort (Lomuto Partition)
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i;
}`
    }
  },

  {
    id: 'hashing-hash-tables',
    phaseId: 'phase-3',
    order: 12,
    title: 'Hash Tables & Hash Sets',
    tagline: 'Instant O(1) average lookups, frequency counting, and the famous Two Sum pattern.',
    difficulty: 'Beginner',
    estimatedHours: '3 hrs',
    prerequisites: ['Static & Dynamic Arrays', 'Time & Space Complexity (Big-O)'],
    overview: 'Hash Tables (Python `dict`, JS `Map` or `Set`, Java `HashMap`) store key-value pairs. A hash function converts keys into integer array indices, allowing average O(1) insertion, deletion, and lookup.',
    complexityTable: {
      headers: ['Operation', 'Average Time', 'Worst Case Time (All Collisions)', 'Space Complexity'],
      rows: [
        ['Insert `table[key] = val`', 'O(1)', 'O(N)', 'O(N)'],
        ['Lookup `table[key]`', 'O(1)', 'O(N)', 'O(N)'],
        ['Delete `table.pop(key)`', 'O(1)', 'O(N)', 'O(N)']
      ]
    },
    subBranches: [
      {
        id: 'hash-eli5',
        title: 'Concept & The Coat Check Analogy',
        summary: 'Turning any key (like a word) into an exact ticket number.',
        content: `At a theatre coat check:
Instead of searching through 500 coats to find "David's Red Coat" ($O(N)$), the attendant takes your name, gives you ticket #42, and hangs it on hook #42.
When you return, you show ticket #42 and get your coat immediately ($O(1)$)!
A **Hash Function** is the math function that converts the string \`"David"\` into the index \`42\`.`
      },
      {
        id: 'hash-collisions',
        title: 'Collisions & How They Are Resolved',
        summary: 'What happens when two distinct keys produce the same hash index.',
        content: `Because there are infinitely many strings but finite table slots, two keys will eventually produce the same index (a **Collision**).
- **Chaining (Separate Chaining)**: Each table slot holds a linked list of entries that hashed to that slot.
- **Open Addressing (Linear Probing)**: If slot 42 is occupied, try slot 43, then 44, until an open slot is found.
- If all keys collide into the same slot, lookups degrade to $O(N)$!`
      },
      {
        id: 'hash-mistakes',
        title: 'Beginner Pitfalls & The Two Sum Pattern',
        summary: 'Using dictionaries to solve interview problems in O(N).',
        content: `- **The Classic Two Sum**: Instead of nested loops checking every pair for target sum ($O(N^2)$), store \`seen[num] = index\`. For each \`x\`, check if \`target - x\` is already in the map ($O(1)$ lookup)!
- **Pitfall**: Using mutable objects (like lists or arrays) as hash keys. Hash keys MUST be immutable (numbers, strings, tuples) so their hash code never changes.`
      }
    ],
    codeExamples: {
      python: `# Classic Two Sum via Hash Table (O(N) Time, O(N) Space)
def two_sum(nums, target):
    seen = {} # val -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Frequency Counting
from collections import Counter
freq = Counter("banana") # {'a': 3, 'n': 2, 'b': 1}`,
      javascript: `// Two Sum with JavaScript Map
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}`
    }
  },

  // ==========================================
  // PHASE 4: Non-Linear Hierarchical Structures
  // ==========================================
  {
    id: 'binary-trees',
    phaseId: 'phase-4',
    order: 13,
    title: 'Trees & Binary Tree Traversals',
    tagline: 'Hierarchical node networks: Preorder, Inorder, Postorder (DFS), and Level-Order (BFS).',
    difficulty: 'Intermediate',
    estimatedHours: '4-5 hrs',
    prerequisites: ['Recursion Fundamentals', 'Stacks (LIFO) & Queues (FIFO)'],
    overview: 'A tree is a non-linear data structure of connected nodes where each node has at most two children (left and right) in a Binary Tree. Mastering DFS traversals and BFS level-order traversal is essential for technical interviews.',
    complexityTable: {
      headers: ['Traversal', 'Order Processed', 'Traversal Type', 'Time Complexity', 'Space Complexity'],
      rows: [
        ['Preorder DFS', 'Root → Left → Right', 'Depth-First (Stack/Recursion)', 'O(N)', 'O(Height)'],
        ['Inorder DFS', 'Left → Root → Right', 'Depth-First (Gives sorted BST!)', 'O(N)', 'O(Height)'],
        ['Postorder DFS', 'Left → Right → Root', 'Depth-First (Bottom-up calculation)', 'O(N)', 'O(Height)'],
        ['Level-Order BFS', 'Level 0 → Level 1 → Level 2', 'Breadth-First (Queue)', 'O(N)', 'O(Max Width)']
      ]
    },
    subBranches: [
      {
        id: 'tree-eli5',
        title: 'Concept & Corporate Org Chart Analogy',
        summary: 'Root CEO branching out to managers and individual contributors.',
        content: `Think of a company hierarchy:
- The CEO is the **Root** (the top node with no parent).
- Department directors are **Internal Nodes**.
- Individual contributors with no reports are **Leaf Nodes** (nodes with no children).
- **Height**: The number of levels from the root to the deepest leaf.
- In a Binary Tree, each person has at most 2 direct reports (Left and Right).`
      },
      {
        id: 'tree-traversals',
        title: 'The 4 Essential Traversals Visually',
        summary: 'Understanding the path taken through a tree.',
        content: `Given tree:
        1
       / \\
      2   3
     / \\
    4   5

1. **Preorder (Root, Left, Right)**: \`[1, 2, 4, 5, 3]\` -> Great for cloning/serializing trees.
2. **Inorder (Left, Root, Right)**: \`[4, 2, 5, 1, 3]\` -> For BSTs, this visits values in **strictly sorted order**!
3. **Postorder (Left, Right, Root)**: \`[4, 5, 2, 3, 1]\` -> Great for deleting trees or computing bottom-up properties (like height).
4. **Level-Order (BFS with Queue)**: \`[[1], [2, 3], [4, 5]]\` -> Visited layer by layer.`
      },
      {
        id: 'tree-mistakes',
        title: 'Beginner Pitfalls & Base Cases',
        summary: 'Handling null nodes properly in recursive helpers.',
        content: `- **Pitfall 1**: Forgetting base case \`if not root: return ...\`. Every single recursive tree function begins by checking if the current node is null!
- **Pitfall 2**: Confusing height with depth. Depth is distance from root down to node; height is distance from node down to lowest leaf.`
      }
    ],
    codeExamples: {
      python: `# Definition of a Binary Tree Node
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Maximum Depth / Height of Binary Tree (Postorder DFS)
def max_depth(root):
    if not root:
        return 0
    left_height = max_depth(root.left)
    right_height = max_depth(root.right)
    return 1 + max(left_height, right_height)

# Level-Order Traversal (BFS with Queue)
from collections import deque

def level_order(root):
    if not root: return []
    res = []
    q = deque([root])
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`,
      javascript: `// Maximum Depth of Binary Tree
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`
    }
  },

  {
    id: 'binary-search-trees',
    phaseId: 'phase-4',
    order: 14,
    title: 'Binary Search Trees (BST)',
    tagline: 'Left < Root < Right: ordered binary trees supporting O(log N) average search, insert, and delete.',
    difficulty: 'Intermediate',
    estimatedHours: '3 hrs',
    prerequisites: ['Trees & Binary Tree Traversals', 'Binary Search'],
    overview: 'A Binary Search Tree is a binary tree where for every node, all values in its left subtree are strictly smaller, and all values in its right subtree are strictly greater. This invariant allows binary search logic on trees.',
    complexityTable: {
      headers: ['Operation', 'Balanced BST (AVL/Red-Black)', 'Skewed/Degenerate BST', 'Explanation'],
      rows: [
        ['Search `find(val)`', 'O(log N)', 'O(N)', 'Discards half tree if balanced; linear chain if skewed'],
        ['Insert `insert(val)`', 'O(log N)', 'O(N)', 'Traverse to proper leaf slot'],
        ['Delete `delete(val)`', 'O(log N)', 'O(N)', 'Handle 0, 1, or 2 children cases (inorder successor)'],
        ['Inorder Traversal', 'O(N)', 'O(N)', 'Always produces elements in sorted order!']
      ]
    },
    subBranches: [
      {
        id: 'bst-eli5',
        title: 'The BST Invariant Rule',
        summary: 'Everything to the left is smaller; everything to the right is larger.',
        content: `At any node with value \`X\`:
- All values in the left subtree must be \`< X\`
- All values in the right subtree must be \`> X\`

This rule holds recursively for every single descendant, not just direct children!
If you search for \`42\` and you are at \`50\`, you know with 100% certainty that \`42\` can only exist in the **left subtree**!`
      },
      {
        id: 'bst-validation',
        title: 'Validating a BST (The Classic Interview Trap)',
        summary: 'Why checking only immediate children is fatally wrong.',
        content: `A common beginner mistake is writing:
\`if node.left.val < node.val and node.right.val > node.val: return True\`
**Why this fails**:
Consider tree:
      5
     / \\
    1   6
       / \\
      4   7
Here, 4 is less than 6 (so 6's local check passes), but 4 is in 5's right subtree, violating the BST rule!
**Correct approach**: Pass a valid range \`(low, high)\` down the recursion:
\`low < node.val < high\`.`
      },
      {
        id: 'bst-mistakes',
        title: 'Beginner Pitfalls & Skewed Trees',
        summary: 'Inserting sorted numbers into an unbalanced BST.',
        content: `- **Pitfall**: If you insert \`[1, 2, 3, 4, 5]\` in sorted order into an ordinary BST, each node becomes a right child of the previous node. The tree becomes a straight line (linked list), degrading operations from $O(\\log N)$ to $O(N)$!
- Self-balancing trees (AVL, Red-Black) automatically rotate nodes to maintain $O(\\log N)$ balance.`
      }
    ],
    codeExamples: {
      python: `# Validate Binary Search Tree (O(N) Time, O(H) Space)
def is_valid_bst(root, low=float('-inf'), high=float('inf')):
    if not root:
        return True
    if not (low < root.val < high):
        return False
    return (is_valid_bst(root.left, low, root.val) and
            is_valid_bst(root.right, root.val, high))

# Search in BST
def search_bst(root, target):
    curr = root
    while curr:
        if curr.val == target:
            return curr
        elif target < curr.val:
            curr = curr.left
        else:
            curr = curr.right
    return None`,
      javascript: `// Validate BST
function isValidBST(root, low = -Infinity, high = Infinity) {
  if (!root) return true;
  if (root.val <= low || root.val >= high) return false;
  return isValidBST(root.left, low, root.val) &&
         isValidBST(root.right, root.val, high);
}`
    }
  },

  {
    id: 'heaps-priority-queues',
    phaseId: 'phase-4',
    order: 15,
    title: 'Heaps & Priority Queues',
    tagline: 'Min-Heap and Max-Heap: instant O(1) peek at extreme values and O(log N) insertion/removal.',
    difficulty: 'Intermediate',
    estimatedHours: '3-4 hrs',
    prerequisites: ['Trees & Binary Tree Traversals', 'Static & Dynamic Arrays'],
    overview: 'A Binary Heap is a complete binary tree stored compactly in an array that satisfies the heap property: in a Min-Heap, every parent is smaller than or equal to its children. It powers Priority Queues, Dijkstra’s Algorithm, and Top-K problems.',
    complexityTable: {
      headers: ['Operation', 'Binary Heap Time', 'Regular Sorted Array', 'Regular Unsorted Array'],
      rows: [
        ['Peek Min/Max', 'O(1)', 'O(1)', 'O(N)'],
        ['Push (Insert)', 'O(log N)', 'O(N)', 'O(1)'],
        ['Pop (Extract Min/Max)', 'O(log N)', 'O(N) shift', 'O(N)'],
        ['Build Heap (Heapify)', 'O(N)', 'O(N log N)', 'O(1)']
      ]
    },
    subBranches: [
      {
        id: 'heap-eli5',
        title: 'Concept & Hospital Emergency Room Analogy',
        summary: 'Patients are treated by triage severity, not strictly who arrived first.',
        content: `In a standard Queue, first-come first-served.
In an Emergency Room **Priority Queue**:
- A patient with a severe heart attack gets treated immediately before patients with mild coughs, even if they arrived later!
- A **Min-Heap** ensures the smallest element is always at the root index 0.
- A **Max-Heap** ensures the largest element is always at the root index 0.`
      },
      {
        id: 'heap-array-math',
        title: 'Storing a Tree in a Flat Array',
        summary: 'Zero pointers needed! Simple index math navigates parent and children.',
        content: `Because a binary heap is a **complete binary tree**, it can be packed into a flat array \`arr\` without storing node pointers:
- **Left Child of index \`i\`**: \`2 * i + 1\`
- **Right Child of index \`i\`**: \`2 * i + 2\`
- **Parent of index \`i\`**: \`(i - 1) // 2\`
This makes heaps cache-friendly and extremely space-efficient!`
      },
      {
        id: 'heap-mistakes',
        title: 'Beginner Pitfalls & Top-K Problems',
        summary: 'Python heapq is a Min-Heap by default; finding Top K largest requires a Min-Heap of size K.',
        content: `- **Pitfall 1 (The Top-K Inversion)**: To find the **K largest** elements in a stream of N numbers, beginners intuitively reach for a Max-Heap. But maintaining a **Min-Heap of size K** is far superior! The min-heap root holds the K-th largest threshold. Any incoming number smaller than the root is ignored; anything larger replaces the root! Time complexity: $O(N \\log K)$ instead of $O(N \\log N)$.
- **Pitfall 2 (Python)**: Python's \`heapq\` module only implements a Min-Heap. To simulate a Max-Heap, multiply values by \`-1\` before pushing.`
      }
    ],
    codeExamples: {
      python: `# Top K Frequent / Largest Elements using heapq
import heapq

def find_k_largest(nums, k):
    # Maintain a min-heap of size k
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap) # Discard smallest among the top
    return min_heap # Contains k largest items!

# Max-heap trick in Python: negate numbers
nums = [5, 2, 8, 1, 9]
max_heap = [-x for x in nums]
heapq.heapify(max_heap)
largest = -heapq.heappop(max_heap) # 9`,
      javascript: `// Finding K largest using sorting or PriorityQueue
function findKLargest(nums, k) {
  // Simple quick alternative:
  nums.sort((a, b) => b - a);
  return nums.slice(0, k);
}`
    }
  },

  {
    id: 'tries-prefix-trees',
    phaseId: 'phase-4',
    order: 16,
    title: 'Tries (Prefix Trees)',
    tagline: 'Tree structure specialized for strings: autocomplete, prefix search, and spell-checking.',
    difficulty: 'Intermediate',
    estimatedHours: '3 hrs',
    prerequisites: ['Trees & Binary Tree Traversals', 'Hash Tables & Hash Sets'],
    overview: 'A Trie (pronounced "try") is a tree structure where each node represents a character in an alphabet. Words sharing common prefixes share common initial branches, allowing O(L) search where L is word length, independent of dictionary size.',
    complexityTable: {
      headers: ['Operation', 'Trie Complexity', 'Hash Set Complexity', 'Why Trie Wins'],
      rows: [
        ['Insert word of length L', 'O(L)', 'O(L)', 'Walks down L character nodes'],
        ['Search exact word', 'O(L)', 'O(L)', 'Checks path down L nodes'],
        ['Starts With Prefix `P`', 'O(P)', 'O(N * P) without trie', 'Instant prefix termination'],
        ['Space for shared prefixes', 'Compact sharing', 'Stores full string duplicates', 'Memory optimization']
      ]
    },
    subBranches: [
      {
        id: 'trie-eli5',
        title: 'Concept & Smartphone Autocomplete Analogy',
        summary: 'When you type "app", the phone instantly suggests "apple", "application", "apply".',
        content: `If you store 1,000,000 words in a hash set, answering "does any word start with 'pre'?" requires scanning all 1,000,000 words!
In a Trie:
- Root is empty.
- 'p' -> 'r' -> 'e'
- Once you reach the 'e' node, any branch below it represents a valid word starting with "pre"!
- It takes exactly 3 steps, whether your dictionary has 5 words or 5,000,000 words!`
      },
      {
        id: 'trie-structure',
        title: 'Trie Node Architecture',
        summary: 'A dictionary of children pointers and a boolean isEndOfWord flag.',
        content: `Each TrieNode has:
\`\`\`python
class TrieNode:
    def __init__(self):
        self.children = {} # char -> TrieNode
        self.is_end_of_word = False
\`\`\`
When inserting "cat" and "car":
- 'c' -> 'a' -> 't' (is_end = True)
- 'c' -> 'a' -> 'r' (is_end = True)
Both share the common prefix path 'c' -> 'a'.`
      },
      {
        id: 'trie-mistakes',
        title: 'Beginner Pitfalls & Traps',
        summary: 'Forgetting the isEndOfWord flag check on exact searches.',
        content: `- **Pitfall**: When searching for the word "app" in a trie containing only "apple", walking the characters 'a'->'p'->'p' succeeds. If you forget to check \`node.is_end_of_word\`, you mistakenly return True even though "app" is merely a prefix, not a registered word!`
      }
    ],
    codeExamples: {
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for char in word:
            if char not in curr.children:
                curr.children[char] = TrieNode()
            curr = curr.children[char]
        curr.is_end = True

    def search(self, word: str) -> bool:
        curr = self.root
        for char in word:
            if char not in curr.children:
                return False
            curr = curr.children[char]
        return curr.is_end

    def starts_with(self, prefix: str) -> bool:
        curr = self.root
        for char in prefix:
            if char not in curr.children:
                return False
            curr = curr.children[char]
        return True`,
      javascript: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}`
    }
  },

  // ==========================================
  // PHASE 5: Graphs & Network Algorithms
  // ==========================================
  {
    id: 'graph-traversals',
    phaseId: 'phase-5',
    order: 17,
    title: 'Graph Fundamentals, BFS & DFS',
    tagline: 'Vertices and edges: representing networks with adjacency lists, traversing with Queue (BFS) and Stack (DFS).',
    difficulty: 'Intermediate',
    estimatedHours: '5 hrs',
    prerequisites: ['Stacks (LIFO) & Queues (FIFO)', 'Recursion Fundamentals'],
    overview: 'Graphs represent arbitrary connections between entities (social networks, web page links, road networks). Traversing graphs requires tracking visited nodes to avoid infinite cycles. BFS finds shortest paths on unweighted graphs; DFS explores deep paths.',
    complexityTable: {
      headers: ['Algorithm / Representation', 'Time Complexity', 'Space Complexity', 'Primary Use Case'],
      rows: [
        ['Adjacency List', 'O(V + E)', 'O(V + E)', 'Sparse graphs (most real-world problems)'],
        ['Adjacency Matrix', 'O(V²)', 'O(V²)', 'Dense graphs with many edges'],
        ['Breadth-First Search (BFS)', 'O(V + E)', 'O(V)', 'Shortest path in unweighted graphs, level rings'],
        ['Depth-First Search (DFS)', 'O(V + E)', 'O(V)', 'Connected components, cycle detection, path existence']
      ]
    },
    subBranches: [
      {
        id: 'graph-eli5',
        title: 'Concept & Social Network Analogy',
        summary: 'People (Vertices) connected by Friendship (Edges).',
        content: `A Graph consists of:
- **Vertices (Nodes)**: The objects (e.g. users on Instagram).
- **Edges**: The relationships (e.g. user A follows user B).
- **Directed**: Twitter / Instagram (A follows B doesn't mean B follows A).
- **Undirected**: Facebook (friendship is mutual).
- **Cycle**: A path that loops back to the starting node. This is why we MUST maintain a **\`visited\` set**!`
      },
      {
        id: 'graph-bfs-vs-dfs',
        title: 'BFS vs DFS: The Water Ripple vs The Maze Runner',
        summary: 'Ripples in a pond vs exploring one deep tunnel to the end.',
        content: `- **BFS (Breadth-First Search with Queue)**:
  Think of dropping a stone in a calm pond: ripples spread outward in expanding concentric circles (distance 1, distance 2, distance 3...).
  The first time BFS touches the target node, it is GUARANTEED to be the **shortest path**!
- **DFS (Depth-First Search with Recursion/Stack)**:
  Think of exploring a labyrinth: pick a path and walk as deep as possible until you hit a dead end, then backtrack and try the next corridor.`
      },
      {
        id: 'graph-mistakes',
        title: 'Beginner Pitfalls & The Visited Set',
        summary: 'Infinite loops caused by cyclic graph traversals.',
        content: `- **Pitfall 1 (Infinite Loop)**: In a tree, you don't need a \`visited\` set because trees have no cycles. In a graph, failing to mark \`visited.add(neighbor)\` will bounce you back and forth between two connected nodes forever!
- **Pitfall 2 (BFS Queue Explosion)**: Adding a neighbor to the queue without marking it visited immediately! Other nodes might push that same neighbor multiple times before it gets popped, blowing up memory.`
      }
    ],
    codeExamples: {
      python: `# BFS for Shortest Path in Unweighted Graph
from collections import deque

def bfs_shortest_path(graph, start, target):
    queue = deque([(start, 0)]) # (node, distance)
    visited = {start}
    
    while queue:
        node, dist = queue.popleft()
        if node == target:
            return dist
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))
                
    return -1 # Unreachable

# DFS for Connected Components (Island Counting)
def dfs(grid, r, c):
    if (r < 0 or r >= len(grid) or c < 0 or c >= len(grid[0]) or
        grid[r][c] != '1'):
        return
    grid[r][c] = '0' # Mark visited by sinking island
    dfs(grid, r + 1, c)
    dfs(grid, r - 1, c)
    dfs(grid, r, c + 1)
    dfs(grid, r, c - 1)`,
      javascript: `// BFS Traversal
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  while (queue.length > 0) {
    const node = queue.shift();
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`
    }
  },

  {
    id: 'topological-sort-union-find',
    phaseId: 'phase-5',
    order: 18,
    title: 'Topological Sort & Union-Find (DSU)',
    tagline: 'Course prerequisite ordering, compile dependencies, and near-O(1) dynamic connectivity.',
    difficulty: 'Intermediate',
    estimatedHours: '4 hrs',
    prerequisites: ['Graph Fundamentals, BFS & DFS'],
    overview: 'Topological Sort linearly orders nodes in a Directed Acyclic Graph (DAG) such that for every directed edge U -> V, U comes before V (e.g. course prerequisites). Disjoint Set Union (DSU) tracks connected partitions with path compression in near-O(1) time.',
    complexityTable: {
      headers: ['Algorithm', 'Time Complexity', 'Auxiliary Space', 'Key Concept'],
      rows: [
        ['Topological Sort (Kahn’s BFS)', 'O(V + E)', 'O(V)', 'In-degree array + Queue of 0 in-degree nodes'],
        ['Topological Sort (DFS Post-order)', 'O(V + E)', 'O(V)', 'Reverse post-order of visited nodes'],
        ['Union-Find (Path Compression + Rank)', 'O(α(N)) ≈ O(1)', 'O(N)', 'Find root parent & merge smaller tree into larger']
      ]
    },
    subBranches: [
      {
        id: 'topo-eli5',
        title: 'Topological Sort & University Course Prerequisites',
        summary: 'You must take Intro to Programming before Data Structures, and Data Structures before Algorithms.',
        content: `Imagine university classes:
- CS101 -> CS201 -> CS301
- Math101 -> CS301
Which courses can you take first?
Any course with **In-Degree 0** (no prerequisites)!
**Kahn's Algorithm (BFS)**:
1. Count incoming edges (in-degree) for all nodes.
2. Put all nodes with in-degree 0 into a Queue.
3. Pop a node, append to output list, and decrement in-degree of its neighbors.
4. If a neighbor reaches 0, push it to Queue!
5. If output length < total courses, there is a **deadlock cycle**!`
      },
      {
        id: 'dsu-eli5',
        title: 'Union-Find (DSU) Intuition',
        summary: 'Friend groups merging at a party.',
        content: `Suppose each person starts in their own group (parent of themselves).
When Alice and Bob become friends: \`union(Alice, Bob)\` joins their groups under one leader (root).
- **Find**: "Who is the leader of Alice's group?"
- If \`find(A) == find(B)\`, they are already connected in the same group!
- **Path Compression**: When finding root, point every node on the path directly to the root, flattening the tree to height 1! Operations become practically $O(1)$!`
      },
      {
        id: 'topo-mistakes',
        title: 'Beginner Pitfalls & Cycles',
        summary: 'Topological sort ONLY works on DAGs (graphs with NO cycles).',
        content: `- **Pitfall**: Attempting topological sort on a graph containing a cycle (e.g., A needs B, B needs C, C needs A). In Kahn's algorithm, the queue empties before all nodes are processed. Always check if \`len(order) == num_nodes\` to detect impossible cycles!`
      }
    ],
    codeExamples: {
      python: `# Course Schedule (Kahn's Algorithm for Topological Sort)
from collections import deque

def find_order(num_courses, prerequisites):
    in_degree = [0] * num_courses
    adj = {i: [] for i in range(num_courses)}
    
    for dest, src in prerequisites:
        adj[src].append(dest)
        in_degree[dest] += 1
        
    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    order = []
    
    while queue:
        curr = queue.popleft()
        order.append(curr)
        for neighbor in adj[curr]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
                
    return order if len(order) == num_courses else [] # Empty if cycle exists`,
      javascript: `// Disjoint Set Union (Union-Find) with Path Compression
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }
  find(i) {
    if (this.parent[i] === i) return i;
    return this.parent[i] = this.find(this.parent[i]); // Path compression
  }
  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
      return true;
    }
    return false; // Cycle detected
  }
}`
    }
  },

  {
    id: 'dijkstra-shortest-path',
    phaseId: 'phase-5',
    order: 19,
    title: 'Shortest Paths (Dijkstra’s Algorithm)',
    tagline: 'Finding the fastest route on weighted graphs with non-negative edge costs using Priority Queues.',
    difficulty: 'Advanced',
    estimatedHours: '4 hrs',
    prerequisites: ['Graph Fundamentals, BFS & DFS', 'Heaps & Priority Queues'],
    overview: 'Dijkstra’s algorithm finds the shortest path from a starting node to all other nodes in a weighted graph with non-negative weights. It greedily visits the currently closest unvisited node using a Min-Heap.',
    complexityTable: {
      headers: ['Algorithm', 'Graph Weights', 'Time Complexity', 'Space Complexity'],
      rows: [
        ['Dijkstra (with Min-Heap)', 'Non-negative (>= 0)', 'O((V + E) log V)', 'O(V)'],
        ['Bellman-Ford', 'Can handle negative weights', 'O(V * E)', 'O(V)'],
        ['Floyd-Warshall', 'All-pairs shortest path', 'O(V³)', 'O(V²)']
      ]
    },
    subBranches: [
      {
        id: 'dijkstra-eli5',
        title: 'Concept & GPS Navigation Analogy',
        summary: 'Google Maps finding the fastest toll and road route to your destination.',
        content: `BFS only finds shortest paths if every road takes the same time (1 unit).
In real life, highway A takes 10 minutes while backroad B takes 45 minutes!
Dijkstra:
1. Set distance to starting node as 0, and all other nodes to $\\infty$.
2. Push \`(0, start_node)\` into a Min-Heap.
3. Pop the node with the smallest tentative distance.
4. Check all its roads: if \`dist[curr] + road_weight < dist[neighbor]\`, update \`dist[neighbor]\` and push to Min-Heap!
5. Repeat until destination reached.`
      },
      {
        id: 'dijkstra-mistakes',
        title: 'Beginner Pitfalls: Negative Weights',
        summary: 'Why Dijkstra fails completely on negative weights.',
        content: `- **Pitfall**: Dijkstra relies on a greedy assumption: once a node is popped from the Min-Heap, its shortest path is finalized and will never decrease. If edges can have negative weights, an even shorter path could be discovered later, breaking the greedy invariant! For negative weights, use **Bellman-Ford**.`
      }
    ],
    codeExamples: {
      python: `# Dijkstra's Shortest Path Algorithm
import heapq

def dijkstra(graph, start, num_nodes):
    distances = {i: float('inf') for i in range(num_nodes)}
    distances[start] = 0
    pq = [(0, start)] # (cost, node)
    
    while pq:
        curr_dist, u = heapq.heappop(pq)
        
        # If we already found a shorter path to u, skip stale entry
        if curr_dist > distances[u]:
            continue
            
        for v, weight in graph.get(u, []):
            new_dist = curr_dist + weight
            if new_dist < distances[v]:
                distances[v] = new_dist
                heapq.heappush(pq, (new_dist, v))
                
    return distances`,
      javascript: `// Dijkstra overview in JS`
    }
  },

  // ==========================================
  // PHASE 6: Advanced Paradigms & DP
  // ==========================================
  {
    id: 'backtracking',
    phaseId: 'phase-6',
    order: 20,
    title: 'Backtracking & State-Space Search',
    tagline: 'Systematically explore decisions on a tree, prune invalid branches, and backtrack to try alternatives.',
    difficulty: 'Intermediate',
    estimatedHours: '4-5 hrs',
    prerequisites: ['Recursion Fundamentals', 'Trees & Binary Tree Traversals'],
    overview: 'Backtracking builds candidates to a solution incrementally and abandons ("backtracks") as soon as it determines the candidate cannot lead to a valid solution. Powers Subsets, Permutations, Sudoku solvers, and N-Queens.',
    complexityTable: {
      headers: ['Problem Type', 'Formula for Possibilities', 'Time Complexity', 'Example Problem'],
      rows: [
        ['Subsets / Combinations', 'Each element is either included or excluded: 2^N', 'O(2^N)', 'Find all subsets of [1,2,3]'],
        ['Permutations', 'Order matters: N!', 'O(N!)', 'All arrangements of [A,B,C]'],
        ['Constraint Pruning', 'Much smaller than full search space', 'Pruned tree', 'Sudoku, N-Queens']
      ]
    },
    subBranches: [
      {
        id: 'backtrack-eli5',
        title: 'Concept & Maze Exploration Analogy',
        summary: 'Drop breadcrumbs, explore a fork in the road, back up if blocked, and try the other way.',
        content: `Three fundamental steps in every backtracking problem:
1. **Choose**: Make a tentative decision (e.g., place a Queen at row 1, col 2; add number to subset).
2. **Explore**: Recurse down to solve remaining decisions.
3. **Un-choose (Backtrack)**: Undo your tentative choice (remove the Queen, remove the number) so the next branch can try other choices cleanly without pollution!`
      },
      {
        id: 'backtrack-template',
        title: 'The Universal Backtracking Template',
        summary: 'The standard boilerplate pattern for all backtracking questions.',
        content: `\`\`\`python
def backtrack(path, choices):
    if is_solution(path):
        result.append(path.copy()) # Crucial copy!
        return
        
    for choice in choices:
        if is_valid(choice):
            path.append(choice)       # 1. Choose
            backtrack(path, choices)  # 2. Explore
            path.pop()                # 3. Un-choose (Backtrack!)
\`\`\``
      },
      {
        id: 'backtrack-mistakes',
        title: 'Beginner Pitfalls & The Shallow Copy Bug',
        summary: 'Appending path directly without cloning.',
        content: `- **The #1 Backtracking Bug**: Writing \`result.append(path)\` instead of \`result.append(path.copy())\` (or \`path[:]\`). Because \`path\` is mutated in-place as recursion unwinds, at the end \`result\` will just be filled with empty lists \`[[], [], []]\`!`
      }
    ],
    codeExamples: {
      python: `# Generate all Subsets (Power Set)
def subsets(nums):
    result = []
    
    def backtrack(start_index, current_path):
        # Every path state is a valid subset
        result.append(list(current_path))
        
        for i in range(start_index, len(nums)):
            current_path.append(nums[i])      # Choose
            backtrack(i + 1, current_path)   # Explore
            current_path.pop()               # Un-choose
            
    backtrack(0, [])
    return result`,
      javascript: `// Subsets in JavaScript
function subsets(nums) {
  const result = [];
  function backtrack(start, path) {
    result.push([...path]); // Clone array!
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  backtrack(0, []);
  return result;
}`
    }
  },

  {
    id: 'greedy-algorithms',
    phaseId: 'phase-6',
    order: 21,
    title: 'Greedy Algorithms',
    tagline: 'Making the locally optimal choice at each step hoping it leads to a globally optimal solution.',
    difficulty: 'Intermediate',
    estimatedHours: '3 hrs',
    prerequisites: ['Sorting Algorithms (Elementary & Divide-and-Conquer)'],
    overview: 'A greedy algorithm always chooses the best immediate option without reconsidering past decisions. While greedy algorithms do not work for every problem, when proven correct (greedy-choice property), they yield blazing fast O(N) or O(N log N) solutions.',
    complexityTable: {
      headers: ['Problem', 'Greedy Choice', 'Sorting Step', 'Time Complexity'],
      rows: [
        ['Interval Scheduling', 'Pick interval that finishes earliest', 'Sort by end time', 'O(N log N)'],
        ['Jump Game', 'Track maximum reachable index so far', 'None (single pass)', 'O(N)'],
        ['Gas Station', 'Reset start if total running balance drops < 0', 'Single pass', 'O(N)'],
        ['Coin Change (Greedy)', 'Only works for canonical coin systems (US coins)', 'Sort descending', 'Fails on arbitrary coins!']
      ]
    },
    subBranches: [
      {
        id: 'greedy-eli5',
        title: 'Concept & Cashier Coin Analogy',
        summary: 'Give the largest denomination bill possible first.',
        content: `If you owe someone 36 cents using standard US coins (25¢, 10¢, 5¢, 1¢):
- Take the biggest coin that fits: 25¢ (11¢ left).
- Next biggest: 10¢ (1¢ left).
- Next biggest: 1¢ (0¢ left).
Total 3 coins!
**Warning**: If coins were [1, 3, 4] and target was 6:
- Greedy picks: 4 + 1 + 1 (3 coins).
- But optimal is: 3 + 3 (2 coins)!
This proves greedy requires mathematical proof; otherwise use **Dynamic Programming**!`
      },
      {
        id: 'greedy-mistakes',
        title: 'Beginner Pitfalls: Assuming Greedy Works',
        summary: 'Greedy feels intuitive, but often yields suboptimal results without proof.',
        content: `- **Pitfall**: Assuming greedy works without verifying the optimal substructure. For 0/1 Knapsack (where items cannot be divided), greedy by value/weight ratio fails! It only works for **Fractional Knapsack**.`
      }
    ],
    codeExamples: {
      python: `# Jump Game (Greedy O(N) Time, O(1) Space)
def can_jump(nums):
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            return False # Stuck!
        max_reach = max(max_reach, i + jump)
    return True`,
      javascript: `// Jump Game
function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}`
    }
  },

  {
    id: 'dynamic-programming-1d',
    phaseId: 'phase-6',
    order: 22,
    title: 'Introduction to Dynamic Programming (1D DP)',
    tagline: 'Those who cannot remember the past are condemned to repeat it: Memoization vs Tabulation.',
    difficulty: 'Advanced',
    estimatedHours: '5-6 hrs',
    prerequisites: ['Recursion Fundamentals', 'Hash Tables & Hash Sets'],
    overview: 'Dynamic Programming (DP) solves complex problems by breaking them down into overlapping subproblems, solving each subproblem once, and storing the answers in a lookup table. Covers Climbing Stairs, House Robber, and Coin Change.',
    complexityTable: {
      headers: ['Approach', 'Direction', 'Mechanism', 'Overhead', 'Best When'],
      rows: [
        ['Top-Down (Memoization)', 'Starts at N, recurses down to 0', 'Recursive call + Cache map', 'Recursion call stack', 'Not all subproblems need visiting'],
        ['Bottom-Up (Tabulation)', 'Starts at base cases (0, 1), loops up to N', 'Iterative array table \`dp[]\`', 'No call stack overhead', 'All subproblems must be computed']
      ]
    },
    subBranches: [
      {
        id: 'dp-eli5',
        title: 'Concept & The Famous Math on Paper Analogy',
        summary: 'Write down 1+1+1+1+1=5 on paper. What happens if I write +1 on the right?',
        content: `Imagine I write on a paper:
\`1 + 1 + 1 + 1 + 1\`
"What does that equal?"
You count: "Five!"
Now I write another \`+ 1\` at the very end:
"What does it equal now?"
You immediately answer: "Six!"
How did you know it was six so fast?
You didn't recount the first five 1s! You **remembered** that the previous answer was 5, and just added 1.
**That is Dynamic Programming!**`
      },
      {
        id: 'dp-framework',
        title: 'The 3-Step DP Framework',
        summary: 'State definition, recurrence relation, and base cases.',
        content: `To solve ANY dynamic programming problem:
1. **Define the State**: What does \`dp[i]\` represent in plain English? (e.g. \`dp[i] = min coins to make amount i\`).
2. **Find the Recurrence Relation (Transition)**: How does \`dp[i]\` compute from smaller states like \`dp[i-1]\` or \`dp[i-2]\`?
3. **Identify Base Cases**: What are the starting values? (e.g. \`dp[0] = 0\`).`
      },
      {
        id: 'dp-mistakes',
        title: 'Beginner Pitfalls: Memory Optimization',
        summary: 'Storing an entire array when you only need the previous 2 values.',
        content: `- **Pitfall**: In Fibonacci or House Robber, \`dp[i]\` only depends on \`dp[i-1]\` and \`dp[i-2]\`. You don't need an array of size N! Using two simple rolling variables reduces space from **O(N) down to O(1)**!`
      }
    ],
    codeExamples: {
      python: `# House Robber (Cannot rob two adjacent houses)
# State: dp[i] = max money robbed from first i houses
def rob(nums):
    if not nums: return 0
    if len(nums) == 1: return nums[0]
    
    # Space-optimized rolling variables: O(1) Space!
    prev2 = 0
    prev1 = 0
    
    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2 = prev1
        prev1 = curr
        
    return prev1

# Coin Change (Min coins for amount)
def coin_change(coins, amount):
    # dp[i] = min coins to make amount i
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])
                
    return dp[amount] if dp[amount] != float('inf') else -1`,
      javascript: `// Climbing Stairs (Fibonacci equivalent)
function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const next = a + b;
    a = b;
    b = next;
  }
  return b;
}`
    }
  },

  {
    id: 'dynamic-programming-2d',
    phaseId: 'phase-6',
    order: 23,
    title: '2D & Grid Dynamic Programming',
    tagline: 'Grid paths, matrix traversal, 0/1 Knapsack, and Longest Common Subsequence.',
    difficulty: 'Advanced',
    estimatedHours: '5 hrs',
    prerequisites: ['Introduction to Dynamic Programming (1D DP)'],
    overview: '2D Dynamic Programming extends states across two dimensions: grid coordinates `dp[row][col]`, two string indices `dp[i][j]` (Edit Distance, LCS), or capacity vs items (0/1 Knapsack).',
    complexityTable: {
      headers: ['Problem', 'State `dp[i][j]`', 'Transition Formula', 'Time / Space'],
      rows: [
        ['Unique Paths', 'Ways to reach cell (i, j)', '`dp[i][j] = dp[i-1][j] + dp[i][j-1]`', 'O(M*N) time, O(N) space'],
        ['0/1 Knapsack', 'Max value using first i items and weight capacity j', '`max(dp[i-1][j], val + dp[i-1][j - wt])`', 'O(N*W) time & space'],
        ['Longest Common Subsequence (LCS)', 'LCS between s1[0..i] and s2[0..j]', 'If match: `1 + dp[i-1][j-1]`, else `max(dp[i-1][j], dp[i][j-1])`', 'O(M*N)']
      ]
    },
    subBranches: [
      {
        id: 'dp2d-eli5',
        title: 'Concept & Grid Navigation Analogy',
        summary: 'Walking down a city grid only moving Right or Down.',
        content: `A robot starts at top-left \`(0,0)\` of a grid and can only move **Right** or **Down**:
How many unique paths lead to \`(row, col)\`?
Any path to \`(row, col)\` must have arrived either from the cell **above** \`(row - 1, col)\` OR from the cell to the **left** \`(row, col - 1)\`!
Therefore:
\`paths[row][col] = paths[row - 1][col] + paths[row][col - 1]\`!
All border cells on the first row and first column have exactly 1 path.`
      },
      {
        id: 'dp2d-mistakes',
        title: 'Beginner Pitfalls & Off-by-one 2D Tables',
        summary: 'Creating a table of size (M+1) x (N+1) simplifies base case indexing.',
        content: `- **Pitfall**: When comparing strings in LCS or Edit Distance, allocating a table of size \`len(s1) x len(s2)\` makes base cases (empty string) require dozens of boundary if-statements. Always allocate \`(M + 1) x (N + 1)\` where index 0 represents the empty string!`
      }
    ],
    codeExamples: {
      python: `# Unique Paths in M x N Grid (O(M*N) Time, O(N) Space)
def unique_paths(m: int, n: int) -> int:
    # Space optimized to single row
    row = [1] * n
    for _ in range(m - 1):
        new_row = [1] * n
        for c in range(1, n):
            new_row[c] = new_row[c - 1] + row[c]
        row = new_row
    return row[-1]`,
      javascript: `// Unique Paths
function uniquePaths(m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(1));
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
    }
  }
  return dp[m - 1][n - 1];
}`
    }
  }
];
