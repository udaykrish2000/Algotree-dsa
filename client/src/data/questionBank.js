// Comprehensive Curated Question Bank for DSA Topics
// Tailored for beginners with clear explanations, common misconception traps, and golden takeaway rules.

export const QUESTION_BANK = [
  // ==========================================
  // TOPIC 1: Big-O Complexity
  // ==========================================
  {
    id: 'bo-1',
    topicId: 'big-o-complexity',
    difficulty: 'beginner',
    type: 'concept',
    question: 'What does Big-O notation primarily describe in algorithm analysis?',
    options: [
      'The exact time in milliseconds an algorithm takes on your computer',
      'How the algorithm’s runtime or memory consumption scales as input size (N) grows',
      'The exact number of lines of code written in the program',
      'The speed of the computer’s CPU clock'
    ],
    correctIndex: 1,
    explanation: 'Big-O notation describes the rate of growth (scalability) as the input size N increases towards infinity. It is independent of specific hardware or clock speeds.',
    wrongReason: 'Milliseconds depend on CPU speed, RAM, and background tasks. Big-O is an abstract mathematical metric of scalability.',
    rule: 'Big-O measures how operations scale relative to input size N, not wall-clock seconds.'
  },
  {
    id: 'bo-2',
    topicId: 'big-o-complexity',
    difficulty: 'beginner',
    type: 'complexity',
    question: 'What is the time complexity of looking up an element by index in a standard array (e.g., `arr[4]`)?',
    options: ['O(N)', 'O(log N)', 'O(1)', 'O(N²)'],
    correctIndex: 2,
    explanation: 'Array elements are placed contiguously in RAM. The memory address is computed instantly using simple math: `Address = BaseAddress + (index * elementSize)`. This requires only one operation: O(1).',
    wrongReason: 'You do not need to scan through elements 0, 1, 2, and 3 to reach index 4; the computer calculates the exact address immediately.',
    rule: 'Direct array indexing is ALWAYS O(1) constant time.'
  },
  {
    id: 'bo-3',
    topicId: 'big-o-complexity',
    difficulty: 'beginner',
    type: 'trace',
    code: `def print_pairs(arr):
    for i in arr:
        for j in arr:
            print(i, j)`,
    question: 'What is the time complexity of this code if `arr` contains N elements?',
    options: ['O(N)', 'O(N²)', 'O(2N)', 'O(log N)'],
    correctIndex: 1,
    explanation: 'There are two nested loops. The outer loop runs N times, and for each iteration, the inner loop also runs N times. Total operations: N * N = N², which is O(N²).',
    wrongReason: 'Because the inner loop runs N times for EVERY single run of the outer loop, you multiply them (N * N), you do not add them.',
    rule: 'Nested loops traversing the same input typically result in O(N²) quadratic time.'
  },
  {
    id: 'bo-4',
    topicId: 'big-o-complexity',
    difficulty: 'beginner',
    type: 'concept',
    question: 'Which of the following time complexities grows the SLOWEST (i.e. is the most efficient for huge inputs)?',
    options: ['O(N)', 'O(log N)', 'O(N log N)', 'O(N²)'],
    correctIndex: 1,
    explanation: 'O(log N) grows significantly slower than O(N). For N = 1,000,000, O(log₂ N) is only ~20 operations, whereas O(N) is 1,000,000 operations!',
    wrongReason: 'Logarithmic growth is almost flat compared to linear growth. O(1) is fastest, followed closely by O(log N).',
    rule: 'Growth hierarchy: O(1) < O(log N) < O(N) < O(N log N) < O(N²) < O(2^N).'
  },
  {
    id: 'bo-5',
    topicId: 'big-o-complexity',
    difficulty: 'beginner',
    type: 'trace',
    code: `def example(n):
    for i in range(n):
        print(i)
    for j in range(n):
        print(j)`,
    question: 'What is the Big-O time complexity of these two consecutive (non-nested) loops?',
    options: ['O(N²)', 'O(N)', 'O(2N²)', 'O(log N)'],
    correctIndex: 1,
    explanation: 'The first loop runs N times, and the second loop runs N times. Total work = N + N = 2N. In Big-O, we drop constant factors, so O(2N) simplifies to O(N).',
    wrongReason: 'The loops are sequential, not nested! When loops are one after another, you add their complexities (N + N), rather than multiplying.',
    rule: 'Sequential loops add up: O(N + N) = O(2N) = O(N).'
  },

  // ==========================================
  // TOPIC 2: Memory & Pointers
  // ==========================================
  {
    id: 'mem-1',
    topicId: 'memory-pointers',
    difficulty: 'beginner',
    type: 'concept',
    question: 'What happens to local variables stored in a Stack frame when a function finishes executing and returns?',
    options: [
      'They stay permanently in memory until the computer restarts',
      'The stack frame is popped, and memory is automatically reclaimed immediately',
      'They are automatically moved to the Heap',
      'They are duplicated in the global scope'
    ],
    correctIndex: 1,
    explanation: 'Stack memory is strictly scoped to function execution. When the function returns, its stack frame is instantly popped off, and its memory is reclaimed automatically by the CPU.',
    wrongReason: 'Stack frames are transient and short-lived. Objects that must outlive the function are allocated on the Heap.',
    rule: 'Stack frames are created when a function is called and destroyed the instant it returns.'
  },
  {
    id: 'mem-2',
    topicId: 'memory-pointers',
    difficulty: 'beginner',
    type: 'trace',
    code: `listA = [1, 2, 3]
listB = listA
listB.append(4)`,
    question: 'What will `print(listA)` output?',
    options: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4]', 'Throws an error'],
    correctIndex: 1,
    explanation: 'In Python (and JS, Java), arrays/objects are stored in the Heap. Variables `listA` and `listB` store reference pointers to the same memory address. Appending through `listB` modifies the object `listA` points to.',
    wrongReason: 'Assigning `listB = listA` does NOT create a clone. It just copies the memory pointer address.',
    rule: 'Assignment of reference types copies the pointer address, not the underlying data.'
  },
  {
    id: 'mem-3',
    topicId: 'memory-pointers',
    difficulty: 'beginner',
    type: 'concept',
    question: 'What is a "Null Pointer Dereference" or "Cannot read property of undefined"?',
    options: [
      'An error that occurs when you write too many comments',
      'Trying to access an attribute or method on a variable that currently points to nothing (null/None)',
      'Allocating more than 16GB of RAM',
      'Using an integer instead of a float'
    ],
    correctIndex: 1,
    explanation: 'If a pointer holds `null` / `None`, it does not point to any valid object in memory. Trying to read `node.next` or `obj.value` when `node` is `null` causes a runtime crash.',
    wrongReason: 'A null pointer means the memory address is empty. The CPU cannot look inside non-existent data.',
    rule: 'Always check if a pointer is not null before accessing its child properties.'
  },

  // ==========================================
  // TOPIC 3: Recursion Basics
  // ==========================================
  {
    id: 'rec-1',
    topicId: 'recursion-basics',
    difficulty: 'beginner',
    type: 'concept',
    question: 'What is the purpose of the "Base Case" in a recursive function?',
    options: [
      'To make the function run twice as fast',
      'To provide the stopping condition that prevents infinite recursive calls and stack overflow',
      'To import external libraries',
      'To allocate heap memory for the call stack'
    ],
    correctIndex: 1,
    explanation: 'Without a base case, a recursive function would call itself endlessly until the call stack runs out of memory, triggering a Stack Overflow error.',
    wrongReason: 'A base case is the stop sign. When the input reaches the simplest state, it returns an answer directly without recursing.',
    rule: 'Every recursive function MUST have at least one base case that stops recursion.'
  },
  {
    id: 'rec-2',
    topicId: 'recursion-basics',
    difficulty: 'beginner',
    type: 'trace',
    code: `def count_down(n):
    if n == 0:
        return
    count_down(n - 1)
    print(n, end=" ")

count_down(3)`,
    question: 'What will this code print to the console?',
    options: ['3 2 1', '1 2 3', '3 2 1 0', '0 1 2 3'],
    correctIndex: 1,
    explanation: 'The recursive call `count_down(n - 1)` happens BEFORE `print(n)`. Calls are pushed to the stack: 3 waits for 2, 2 waits for 1, 1 waits for 0. When 0 returns, 1 prints, then 2 prints, then 3 prints!',
    wrongReason: 'Because the print statement is placed AFTER the recursive call, it executes in reverse order as stack frames unwind.',
    rule: 'Code placed AFTER recursive call runs in unwinding order (bottom-up).'
  },
  {
    id: 'rec-3',
    topicId: 'recursion-basics',
    difficulty: 'beginner',
    type: 'concept',
    question: 'Why does naive recursive Fibonacci `fib(n) = fib(n-1) + fib(n-2)` take O(2^N) exponential time?',
    options: [
      'Because the compiler converts it to a while loop',
      'Because each call branches into two new calls, creating an exploding tree of redundant calculations',
      'Because it uses too much disk storage',
      'Because Fibonacci numbers are prime'
    ],
    correctIndex: 1,
    explanation: 'Each call generates 2 child calls. At depth N, there are approximately 2^N total function calls, recalculating the same subproblems repeatedly.',
    wrongReason: 'The function re-computes `fib(2)` and `fib(3)` hundreds of times from scratch instead of remembering past results.',
    rule: 'Branching recursion without memoization leads to exponential O(2^N) runtime.'
  },

  // ==========================================
  // TOPIC 4: Static & Dynamic Arrays
  // ==========================================
  {
    id: 'arr-1',
    topicId: 'arrays-dynamic-arrays',
    difficulty: 'beginner',
    type: 'concept',
    question: 'Why is inserting an element at the BEGINNING (index 0) of an array an O(N) operation?',
    options: [
      'Because arrays only accept numbers, not objects',
      'Because every existing element must be shifted one position to the right to make space',
      'Because the computer must restart the CPU',
      'Because the array must be sorted first'
    ],
    correctIndex: 1,
    explanation: 'Arrays reside in contiguous memory slots. To open up index 0, every item from index 0 to N-1 must be physically moved one slot to the right, which requires N operations.',
    wrongReason: 'Inserting at the end is O(1) because no shifting is required. Inserting at index 0 forces all N elements to shift.',
    rule: 'Inserting or deleting at the front of an array requires shifting all N elements: O(N).'
  },
  {
    id: 'arr-2',
    topicId: 'arrays-dynamic-arrays',
    difficulty: 'beginner',
    type: 'concept',
    question: 'When a dynamic array (like Python list or Java ArrayList) reaches its capacity, what does it do?',
    options: [
      'Throws an out of memory error immediately and halts',
      'Allocates a new array with double the capacity, copies existing items over, and adds the new item',
      'Deletes the oldest element to make room',
      'Compresses existing elements using zip algorithm'
    ],
    correctIndex: 1,
    explanation: 'Dynamic arrays allocate a new larger memory chunk (usually 2x the old capacity), copy the existing elements over, and free the old buffer. This amortizes to O(1) per append.',
    wrongReason: 'Dynamic arrays resize automatically behind the scenes so the programmer doesn’t have to manually manage memory.',
    rule: 'Dynamic arrays double their capacity upon filling, giving an amortized O(1) append time.'
  },
  {
    id: 'arr-3',
    topicId: 'arrays-dynamic-arrays',
    difficulty: 'beginner',
    type: 'trace',
    code: `arr = [10, 20, 30, 40]
print(arr[len(arr)])`,
    question: 'In a 0-indexed language (Python/JS/Java), what happens when this code runs?',
    options: [
      'Prints 40',
      'Throws an IndexError / ArrayIndexOutOfBoundsException',
      'Prints 0',
      'Prints undefined and continues silently in all languages'
    ],
    correctIndex: 1,
    explanation: 'Array has length 4. The valid indices are 0, 1, 2, and 3. `arr[4]` is beyond the valid index range, causing an IndexOutOfBounds error!',
    wrongReason: 'In 0-indexed systems, the last element is always at index `len(arr) - 1`, not `len(arr)`.',
    rule: 'For an array of length N, valid indices are always 0 through N - 1.'
  },

  // ==========================================
  // TOPIC 5: Two Pointers & Sliding Window
  // ==========================================
  {
    id: 'tp-1',
    topicId: 'two-pointers-sliding-window',
    difficulty: 'beginner',
    type: 'concept',
    question: 'Why MUST an array be SORTED to use opposite-end Two Pointers for finding a target sum?',
    options: [
      'Because unsorted arrays cannot store pointers',
      'Because sorting guarantees that moving the left pointer increases the sum and moving the right pointer decreases it',
      'Because binary search is built into JavaScript',
      'It does not need to be sorted; it works on any random array'
    ],
    correctIndex: 1,
    explanation: 'When sorted, `arr[left] + arr[right]` gives a deterministic signal: if the sum is too small, only increasing `left` can produce a larger sum; if too large, only decreasing `right` can produce a smaller sum.',
    wrongReason: 'On an unsorted array, incrementing `left` could either increase or decrease the sum randomly, making it impossible to decide which pointer to move.',
    rule: 'Two Pointers from opposite ends relies on monotonic ordering (sorted data).'
  },
  {
    id: 'tp-2',
    topicId: 'two-pointers-sliding-window',
    difficulty: 'beginner',
    type: 'trace',
    code: `arr = [1, 2, 4, 7, 11]
target = 9
# left = 0 (val: 1), right = 4 (val: 11)
# sum = 12 > 9. Which pointer moves?`,
    question: 'In the opposite-ends two pointer technique, since the sum (12) is GREATER than target (9), what should happen next?',
    options: [
      'left pointer moves right (`left += 1`)',
      'right pointer moves left (`right -= 1`)',
      'both pointers move to the center',
      'terminate and return failure'
    ],
    correctIndex: 1,
    explanation: 'Because 12 is too large, and the array is sorted, we must decrease our sum. Decreasing `right` moves to a smaller number.',
    wrongReason: 'Moving `left` forward would pick a number >= 1, making the sum even larger!',
    rule: 'Sum too large? Decrement right. Sum too small? Increment left.'
  },
  {
    id: 'tp-3',
    topicId: 'two-pointers-sliding-window',
    difficulty: 'beginner',
    type: 'concept',
    question: 'In a sliding window of size K moving across an array of size N, what is the time complexity to update the window sum as it slides?',
    options: ['O(K)', 'O(1)', 'O(N)', 'O(N log N)'],
    correctIndex: 1,
    explanation: 'To slide the window by 1 position, you subtract the element exiting the left edge and add the new element entering the right edge. That is only 2 basic math operations: O(1)!',
    wrongReason: 'Instead of recalculating all K elements from scratch ($O(K)$), you reuse the previous sum in $O(1)$ time.',
    rule: 'Sliding window updates in O(1): new_sum = old_sum - exiting_val + entering_val.'
  },

  // ==========================================
  // TOPIC 6: Prefix Sums & Kadane's
  // ==========================================
  {
    id: 'pref-1',
    topicId: 'prefix-sum-kadane',
    difficulty: 'beginner',
    type: 'trace',
    code: `nums = [2, 3, 5, 7]
# Prefix sums: [2, 5, 10, 17]
# indices:      0  1   2   3`,
    question: 'Using the prefix sum array, how do we find the sum of elements from index 1 to index 3 (i.e. 3 + 5 + 7 = 15)?',
    options: [
      'prefix[3] + prefix[0]',
      'prefix[3] - prefix[0] (which is 17 - 2 = 15)',
      'prefix[2] - prefix[1]',
      'prefix[3] * prefix[1]'
    ],
    correctIndex: 1,
    explanation: 'Sum between indices L and R is given by `prefix[R] - prefix[L - 1]`. Here L=1 and R=3, so `prefix[3] - prefix[0] = 17 - 2 = 15` in O(1) time!',
    wrongReason: 'Prefix[3] contains the sum of all elements from 0 to 3. Subtracting Prefix[0] removes the elements before index 1.',
    rule: 'Range sum from L to R: prefix[R] - prefix[L - 1].'
  },
  {
    id: 'pref-2',
    topicId: 'prefix-sum-kadane',
    difficulty: 'beginner',
    type: 'concept',
    question: 'In Kadane’s algorithm for Maximum Subarray Sum, when is your running sum reset or restarted with the current element?',
    options: [
      'When the current element is positive',
      'When the running sum becomes negative, making `num > running_sum + num`',
      'When the array length is odd',
      'At every second iteration'
    ],
    correctIndex: 1,
    explanation: 'If the accumulated running sum becomes negative, dragging it along into subsequent numbers will only hurt them. It is strictly better to abandon the past and start a fresh subarray right at `num`.',
    wrongReason: 'A negative prefix only diminishes future totals. Kadane: `curr = max(num, curr + num)`.',
    rule: 'Kadane’s rule: never carry a negative luggage into future subarray sums.'
  },

  // ==========================================
  // TOPIC 7: Strings Manipulation
  // ==========================================
  {
    id: 'str-1',
    topicId: 'strings-manipulation',
    difficulty: 'beginner',
    type: 'concept',
    question: 'In Python, Java, and JavaScript, strings are IMMUTABLE. What does this mean?',
    options: [
      'Strings cannot contain punctuation',
      'Once a string object is created in memory, its characters cannot be modified in-place',
      'Strings are automatically converted to uppercase',
      'Strings cannot be passed as function arguments'
    ],
    correctIndex: 1,
    explanation: 'Immutability means you cannot write `str[0] = "X"`. Any modification or concatenation creates a brand new string in memory.',
    wrongReason: 'You can reassign the variable pointer, but the underlying characters in the old memory block cannot be altered in-place.',
    rule: 'Strings are immutable: modifying characters creates a whole new string.'
  },
  {
    id: 'str-2',
    topicId: 'strings-manipulation',
    difficulty: 'beginner',
    type: 'concept',
    question: 'Why is using a 26-element integer array for counting lowercase English character frequencies considered O(1) auxiliary space?',
    options: [
      'Because 26 is a lucky number',
      'Because the array size (26) is fixed and constant regardless of how long the input string is (whether 10 chars or 10,000,000 chars)',
      'Because arrays don’t take memory',
      'Because character counts are stored on the hard drive'
    ],
    correctIndex: 1,
    explanation: 'Auxiliary space measures extra memory relative to N. A fixed 26-size array uses the exact same memory whether the string has 5 letters or 5 million letters, which is O(1) constant space.',
    wrongReason: 'If an allocated structure never expands with larger N, it is O(1) space.',
    rule: 'Fixed-size structures (like a 26-char alphabet array) are O(1) auxiliary space.'
  },

  // ==========================================
  // TOPIC 8: Linked Lists
  // ==========================================
  {
    id: 'll-1',
    topicId: 'linked-lists',
    difficulty: 'beginner',
    type: 'concept',
    question: 'How do elements (nodes) in a Singly Linked List find their subsequent neighbors in memory?',
    options: [
      'They must sit in consecutive adjacent memory slots like an array',
      'Each node stores a `next` pointer containing the memory address of the next node',
      'The CPU uses binary search to locate the next node',
      'Nodes are sorted alphabetically in the computer cache'
    ],
    correctIndex: 1,
    explanation: 'In a linked list, nodes are scattered across the Heap. Every node explicitly stores its data plus a `next` reference pointing to the memory address of the following node.',
    wrongReason: 'Linked list nodes do NOT need to be contiguous in memory; the `next` pointer acts as a bridge.',
    rule: 'Linked list nodes are connected via explicit memory pointers, not contiguous layout.'
  },
  {
    id: 'll-2',
    topicId: 'linked-lists',
    difficulty: 'beginner',
    type: 'concept',
    question: 'What is the time complexity to insert a new node at the very beginning (Head) of a linked list?',
    options: ['O(N)', 'O(1)', 'O(log N)', 'O(N²)'],
    correctIndex: 1,
    explanation: 'You simply point `newNode.next = head` and reassign `head = newNode`. No elements need to be shifted! This takes O(1) constant time.',
    wrongReason: 'In an array, inserting at the front requires shifting N elements (O(N)). In a linked list, it only requires updating 2 pointers: O(1)!',
    rule: 'Prepending to a linked list is always O(1) constant time.'
  },
  {
    id: 'll-3',
    topicId: 'linked-lists',
    difficulty: 'beginner',
    type: 'trace',
    code: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

a = Node(1)
b = Node(2)
a.next = b`,
    question: 'If you execute `a.next = a.next.next`, what happens to node `b` in the list starting at `a`?',
    options: [
      'Node b is doubled',
      'Node b is bypassed/removed from the list traversal',
      'Node b becomes the new head',
      'Throws a compilation error'
    ],
    correctIndex: 1,
    explanation: '`a.next.next` is `b.next` (which is `None`). Setting `a.next = None` skips `b` completely, disconnecting it from `a`.',
    wrongReason: 'Rerouting a pointer around a node removes it from the linked sequence.',
    rule: 'Deleting a node in a linked list means rerouting predecessor.next = target.next.'
  },
  {
    id: 'll-4',
    topicId: 'linked-lists',
    difficulty: 'beginner',
    type: 'concept',
    question: 'In Floyd’s Cycle-Finding Algorithm (Fast and Slow Pointers), if a cycle exists, why are they guaranteed to meet?',
    options: [
      'Because they travel in opposite directions',
      'Because each step the fast pointer moves 2 while slow moves 1, closing the distance between them inside the loop by 1 node each iteration',
      'Because fast pointer stops when it gets tired',
      'They only meet if the list has an even number of nodes'
    ],
    correctIndex: 1,
    explanation: 'Relative to the slow pointer, the fast pointer advances by 1 position per iteration (`2 - 1 = 1`). In a loop of length C, the gap shrinks by 1 every step until the gap reaches 0 (collision).',
    wrongReason: 'Fast reduces the gap between itself and slow by exactly 1 each step inside the loop, making a collision mathematically inevitable.',
    rule: 'Floyd’s algorithm closes the relative distance by 1 node per step until collision.'
  },

  // ==========================================
  // TOPIC 9: Stacks & Queues
  // ==========================================
  {
    id: 'sq-1',
    topicId: 'stacks-and-queues',
    difficulty: 'beginner',
    type: 'concept',
    question: 'Which ordering principle describes a Stack?',
    options: [
      'FIFO (First-In, First-Out)',
      'LIFO (Last-In, First-Out)',
      'Random-In, Random-Out',
      'Sorted Ascending'
    ],
    correctIndex: 1,
    explanation: 'A Stack is Last-In, First-Out (LIFO). The last element pushed onto the top is the very first element popped off.',
    wrongReason: 'Queues are FIFO (First-In, First-Out). Stacks are LIFO (like a stack of dinner plates).',
    rule: 'Stack = LIFO (Last-In, First-Out). Queue = FIFO (First-In, First-Out).'
  },
  {
    id: 'sq-2',
    topicId: 'stacks-and-queues',
    difficulty: 'beginner',
    type: 'trace',
    code: `stack = []
stack.append(10)
stack.append(20)
stack.append(30)
val = stack.pop()`,
    question: 'What is the value of `val` after the code runs?',
    options: ['10', '20', '30', 'None'],
    correctIndex: 2,
    explanation: '30 was the last item pushed onto the stack. Following LIFO, `pop()` removes and returns the most recently added top element: 30.',
    wrongReason: '10 was the first item added (bottom of stack). Pop removes from the top (30).',
    rule: 'Stack pop() always removes the most recently pushed element.'
  },
  {
    id: 'sq-3',
    topicId: 'stacks-and-queues',
    difficulty: 'beginner',
    type: 'concept',
    question: 'Which data structure is ideal for implementing the "Undo" feature in a text editor?',
    options: ['Queue', 'Stack', 'Binary Search Tree', 'Hash Set'],
    correctIndex: 1,
    explanation: 'When you press "Undo" (Ctrl+Z), you want to revert your most recent action first. This perfectly matches the LIFO behavior of a Stack!',
    wrongReason: 'A queue would undo your very first action from 2 hours ago instead of your latest keystroke!',
    rule: 'Undo/Redo and Back buttons are textbook use cases for a Stack.'
  },

  // ==========================================
  // TOPIC 10: Binary Search
  // ==========================================
  {
    id: 'bs-1',
    topicId: 'binary-search',
    difficulty: 'beginner',
    type: 'concept',
    question: 'What MUST be true about an array before you can perform Binary Search on it?',
    options: [
      'It must contain only even numbers',
      'The elements MUST be sorted in monotonic order (ascending or descending)',
      'It must have an odd number of items',
      'It must not contain any duplicates'
    ],
    correctIndex: 1,
    explanation: 'Binary Search relies on knowing whether the target is to the left or right of the middle element. Without sorted order, inspecting the middle tells you nothing about where other values reside.',
    wrongReason: 'Binary Search does not require unique items or specific numbers; it strictly requires sorted/monotonic order.',
    rule: 'Binary Search requires a sorted search space.'
  },
  {
    id: 'bs-2',
    topicId: 'binary-search',
    difficulty: 'beginner',
    type: 'trace',
    code: `arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] # 10 items
# Target = 23
# low = 0, high = 9
# mid = (0 + 9) // 2 = 4 (arr[4] is 16)`,
    question: 'Since arr[mid] (16) is LESS than target (23), how should the search boundaries update?',
    options: [
      '`high = mid - 1`',
      '`low = mid + 1`',
      '`low = mid`',
      '`high = mid`'
    ],
    correctIndex: 1,
    explanation: 'Since 16 < 23 and the array is sorted, the target 23 can only exist in the right half of the array. We set `low = mid + 1` to discard the left half and `mid` itself.',
    wrongReason: 'Setting `low = mid` can lead to an infinite loop when `low` and `high` are adjacent.',
    rule: 'If arr[mid] < target, advance low = mid + 1.'
  },

  // ==========================================
  // TOPIC 11: Sorting Algorithms
  // ==========================================
  {
    id: 'sort-1',
    topicId: 'sorting-algorithms',
    difficulty: 'beginner',
    type: 'concept',
    question: 'What is the worst-case time complexity of Merge Sort?',
    options: ['O(N²)', 'O(N log N)', 'O(N)', 'O(log N)'],
    correctIndex: 1,
    explanation: 'Merge Sort always divides the array into two equal halves (log N levels) and takes linear O(N) time to merge each level. Its worst, average, and best time complexities are all guaranteed O(N log N).',
    wrongReason: 'Unlike Quick Sort which can degrade to O(N²) on bad pivots, Merge Sort is guaranteed O(N log N) in all cases.',
    rule: 'Merge Sort is guaranteed O(N log N) in all cases.'
  },
  {
    id: 'sort-2',
    topicId: 'sorting-algorithms',
    difficulty: 'beginner',
    type: 'concept',
    question: 'What does it mean for a sorting algorithm to be "Stable"?',
    options: [
      'It never crashes when memory is low',
      'Elements with equal keys retain their original relative order after sorting',
      'It always runs in O(N log N) time',
      'It does not use recursion'
    ],
    correctIndex: 1,
    explanation: 'Stability means that if two items A and B have the exact same sorting key, and A appeared before B in the input, A is guaranteed to appear before B in the output.',
    wrongReason: 'Stability refers to preserving identical elements’ relative positions, not software crashing or memory usage.',
    rule: 'Stable sort: preserves original relative order of duplicate keys.'
  },

  // ==========================================
  // TOPIC 12: Hash Tables
  // ==========================================
  {
    id: 'ht-1',
    topicId: 'hashing-hash-tables',
    difficulty: 'beginner',
    type: 'concept',
    question: 'What is the AVERAGE time complexity to insert, delete, or lookup a key in a Hash Table (Python dict / JS Map)?',
    options: ['O(N)', 'O(log N)', 'O(1)', 'O(N²)'],
    correctIndex: 2,
    explanation: 'A good hash function distributes keys uniformly across table buckets. Computing the hash and indexing directly into the bucket takes O(1) constant time on average.',
    wrongReason: 'Hash tables offer O(1) average time, making them the primary tool to reduce O(N²) algorithms down to O(N).',
    rule: 'Hash table lookups, insertions, and deletions are O(1) on average.'
  },
  {
    id: 'ht-2',
    topicId: 'hashing-hash-tables',
    difficulty: 'beginner',
    type: 'concept',
    question: 'In the classic "Two Sum" problem (`arr = [2, 7, 11, 15]`, `target = 9`), how does a Hash Map achieve O(N) time?',
    options: [
      'By sorting the array in O(1) time first',
      'By storing each visited number in the map, so for every number X we can check if `target - X` exists in O(1) time',
      'By generating all subsets',
      'By using recursion'
    ],
    correctIndex: 1,
    explanation: 'For each number X, the complement needed is `target - X`. Looking up whether the complement was already seen takes O(1) with a Hash Map, solving the problem in a single pass: O(N) total time.',
    wrongReason: 'Checking all pairs takes nested loops O(N²). The hash table trades O(N) space for O(N) speed.',
    rule: 'Two Sum pattern: look for complement = target - current in a hash map in O(1).'
  },

  // ==========================================
  // TOPIC 13: Binary Trees
  // ==========================================
  {
    id: 'bt-1',
    topicId: 'binary-trees',
    difficulty: 'beginner',
    type: 'concept',
    question: 'In a Binary Tree Inorder Traversal, in what sequence are nodes visited?',
    options: [
      'Root → Left → Right',
      'Left → Root → Right',
      'Left → Right → Root',
      'Right → Root → Left'
    ],
    correctIndex: 1,
    explanation: 'Inorder traversal visits: 1. Left Subtree, 2. Root Node, 3. Right Subtree. (Crucial: for a BST, Inorder visits nodes in sorted ascending order!)',
    wrongReason: 'Root -> Left -> Right is Preorder. Left -> Right -> Root is Postorder.',
    rule: 'Inorder Traversal: Left -> Root -> Right.'
  },
  {
    id: 'bt-2',
    topicId: 'binary-trees',
    difficulty: 'beginner',
    type: 'concept',
    question: 'Which data structure is typically used to implement Level-Order (Breadth-First) Traversal of a tree?',
    options: ['Stack', 'Queue', 'Priority Queue', 'Hash Set'],
    correctIndex: 1,
    explanation: 'Level-order traversal visits nodes layer by layer (level 0, level 1, level 2...). A First-In, First-Out (FIFO) Queue ensures nodes from the current level are processed before their children.',
    wrongReason: 'A Stack would go deep into one branch first (DFS). A Queue is required for BFS level ordering.',
    rule: 'Level-Order (BFS) traversal requires a Queue (FIFO).'
  },

  // ==========================================
  // TOPIC 14: Binary Search Trees
  // ==========================================
  {
    id: 'bst-1',
    topicId: 'binary-search-trees',
    difficulty: 'beginner',
    type: 'concept',
    question: 'What is the core invariant property of a Binary Search Tree (BST)?',
    options: [
      'All left child values are strictly smaller than the parent, and all right child values are strictly greater',
      'All nodes must have exactly 2 children',
      'The tree must be completely full at every level',
      'The root value must always be 0'
    ],
    correctIndex: 0,
    explanation: 'In a BST, for every node, all values in its left subtree are smaller than its value, and all values in its right subtree are greater than its value.',
    wrongReason: 'A BST does not need to have 2 children per node (some can have 0 or 1 child). The defining property is the value ordering: Left < Root < Right.',
    rule: 'BST Invariant: Left Subtree < Root < Right Subtree.'
  },

  // ==========================================
  // TOPIC 15: Heaps & Priority Queues
  // ==========================================
  {
    id: 'hp-1',
    topicId: 'heaps-priority-queues',
    difficulty: 'beginner',
    type: 'concept',
    question: 'In a Min-Heap, where is the SMALLEST element always located?',
    options: [
      'At the deepest rightmost leaf',
      'At the root (index 0)',
      'At a random node in the middle',
      'Sorted at the end of the array'
    ],
    correctIndex: 1,
    explanation: 'The fundamental Min-Heap property dictates that every parent is smaller than or equal to its children. Therefore, the absolute smallest element is always at the root (index 0), inspectable in O(1) time.',
    wrongReason: 'Leaves hold the largest elements in a Min-Heap; the root holds the minimum.',
    rule: 'In a Min-Heap, the root element is always the minimum value: peek is O(1).'
  },

  // ==========================================
  // TOPIC 17: Graph Traversals
  // ==========================================
  {
    id: 'grp-1',
    topicId: 'graph-traversals',
    difficulty: 'beginner',
    type: 'concept',
    question: 'Why do graph traversals require a `visited` set, whereas tree traversals usually do not?',
    options: [
      'Trees cannot be stored in computer memory',
      'Graphs can contain cycles (loops) where a node points back to an earlier visited node, which would cause an infinite loop',
      'Graphs are always sorted',
      'Trees do not have edges'
    ],
    correctIndex: 1,
    explanation: 'A tree is by definition a connected graph with NO cycles. In general graphs, cycles are common: without a `visited` set to record visited vertices, algorithms would traverse circular paths endlessly.',
    wrongReason: 'Trees are directed acyclic hierarchies with a single path between nodes. Graphs can have multiple cycles.',
    rule: 'Always use a visited set in graph traversals to prevent infinite cycles.'
  },
  {
    id: 'grp-2',
    topicId: 'graph-traversals',
    difficulty: 'beginner',
    type: 'concept',
    question: 'Which traversal algorithm is GUARANTEED to find the SHORTEST path between two nodes in an unweighted graph?',
    options: [
      'Depth-First Search (DFS)',
      'Breadth-First Search (BFS)',
      'Preorder Traversal',
      'Binary Search'
    ],
    correctIndex: 1,
    explanation: 'BFS explores nodes in expanding rings of distance (distance 1, distance 2, distance 3...). The first time BFS reaches the destination, it is mathematically guaranteed to be the shortest path.',
    wrongReason: 'DFS dives deep down one arbitrary corridor and might find a very long, convoluted path before ever exploring shorter routes.',
    rule: 'BFS with a queue finds shortest paths in unweighted graphs.'
  },

  // ==========================================
  // TOPIC 20: Backtracking
  // ==========================================
  {
    id: 'btk-1',
    topicId: 'backtracking',
    difficulty: 'beginner',
    type: 'concept',
    question: 'What are the 3 essential steps in the standard Backtracking pattern?',
    options: [
      'Sort, Search, Delete',
      'Choose (make decision), Explore (recurse), Un-choose (backtrack state)',
      'Push, Pop, Enqueue',
      'Compile, Run, Debug'
    ],
    correctIndex: 1,
    explanation: 'Backtracking explores candidates by making a tentative choice, recursing down that decision tree, and then undoing the choice ("un-choose" / backtrack) so subsequent paths have clean state.',
    wrongReason: 'Without "un-choosing" (e.g. `path.pop()`), changes from one branch bleed into subsequent alternative branches.',
    rule: 'Backtracking recipe: 1. Choose -> 2. Recurse -> 3. Un-choose.'
  },

  // ==========================================
  // TOPIC 22: Dynamic Programming 1D
  // ==========================================
  {
    id: 'dp-1',
    topicId: 'dynamic-programming-1d',
    difficulty: 'beginner',
    type: 'concept',
    question: 'What is the core difference between Memoization (Top-Down) and Tabulation (Bottom-Up)?',
    options: [
      'Memoization uses an iterative loop; Tabulation uses recursion',
      'Memoization starts from the target N and uses recursion with a cache; Tabulation starts from base cases and fills an iterative array table',
      'Memoization is O(N²); Tabulation is O(1)',
      'There is no difference; they are identical'
    ],
    correctIndex: 1,
    explanation: 'Top-Down Memoization uses recursion from N down to base cases, caching answers in a hash map. Bottom-Up Tabulation avoids call stacks by starting at base cases (0, 1) and iteratively filling an array up to N.',
    wrongReason: 'Top-down is recursive with a memo dictionary; bottom-up is iterative with a dp array.',
    rule: 'Memoization = Top-Down recursion + cache. Tabulation = Bottom-Up iterative table.'
  },
  {
    id: 'dp-2',
    topicId: 'dynamic-programming-1d',
    difficulty: 'beginner',
    type: 'trace',
    code: `# Climbing Stairs: You can climb 1 or 2 steps.
# Ways to reach step 1 = 1
# Ways to reach step 2 = 2
# dp[i] = dp[i-1] + dp[i-2]`,
    question: 'How many distinct ways can you climb to the top of 4 stairs?',
    options: ['3', '4', '5', '8'],
    correctIndex: 2,
    explanation: 'Step 1: 1 way. Step 2: 2 ways. Step 3: dp[2] + dp[1] = 2 + 1 = 3 ways. Step 4: dp[3] + dp[2] = 3 + 2 = 5 ways! (Follows the Fibonacci sequence).',
    wrongReason: 'To reach step 4, you either take a 1-step from step 3 (3 ways) or a 2-step from step 2 (2 ways). 3 + 2 = 5.',
    rule: 'Climbing stairs follows recurrence dp[i] = dp[i-1] + dp[i-2].'
  }
];
