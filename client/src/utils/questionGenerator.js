// Adaptive Question Generator Engine
// Produces curated, procedural, and targeted reinforcement questions for DSA topics.

import { QUESTION_BANK } from '../data/questionBank';

// Random helper
function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Procedural question generators for infinite regeneration!
const PROCEDURAL_GENERATORS = {
  'big-o-complexity': () => {
    const templates = [
      () => {
        const factor = randomChoice([2, 3, 5, 10]);
        const isNested = Math.random() > 0.5;
        if (isNested) {
          return {
            id: `proc-bo-${Date.now()}-${Math.random()}`,
            topicId: 'big-o-complexity',
            difficulty: 'beginner',
            type: 'trace',
            code: `def compute(n):
    total = 0
    for i in range(n):
        for j in range(${factor}):
            total += 1`,
            question: `What is the Big-O time complexity of this function where the inner loop runs a fixed ${factor} times?`,
            options: ['O(N²)', 'O(N)', 'O(1)', `O(${factor}N²)`],
            correctIndex: 1,
            explanation: `The outer loop runs N times. The inner loop runs a CONSTANT ${factor} times regardless of N. Total operations = ${factor} * N = O(N) linear time because constant multiplier ${factor} is dropped in Big-O.`,
            wrongReason: `Because the inner loop runs a fixed constant number (${factor}) rather than N, it is NOT O(N²)! Constants drop in Big-O.`,
            rule: `A loop running a constant number of times (like ${factor}) is O(1) work per iteration, leading to O(N) overall.`
          };
        } else {
          return {
            id: `proc-bo-${Date.now()}-${Math.random()}`,
            topicId: 'big-o-complexity',
            difficulty: 'beginner',
            type: 'trace',
            code: `def loop_halving(n):
    count = 0
    i = n
    while i > 1:
        i = i // 2
        count += 1`,
            question: 'What is the Big-O time complexity of this loop where `i` is halved on every iteration?',
            options: ['O(N)', 'O(log N)', 'O(1)', 'O(N²)'],
            correctIndex: 1,
            explanation: 'Whenever a loop variable is repeatedly halved (or doubled) until reaching 1, the number of steps required is log₂(N). For instance, 16 -> 8 -> 4 -> 2 -> 1 (4 steps = log₂ 16).',
            wrongReason: 'Halving at every step shrinks the problem exponentially, which is the definition of Logarithmic time O(log N).',
            rule: 'Repeatedly dividing or multiplying by 2 results in O(log N) logarithmic time.'
          };
        }
      }
    ];
    return randomChoice(templates)();
  },

  'arrays-dynamic-arrays': () => {
    const arr = [randomInt(2, 9), randomInt(11, 20), randomInt(22, 35), randomInt(40, 60)];
    const targetIdx = randomInt(0, arr.length - 1);
    const targetVal = arr[targetIdx];
    return {
      id: `proc-arr-${Date.now()}-${Math.random()}`,
      topicId: 'arrays-dynamic-arrays',
      difficulty: 'beginner',
      type: 'trace',
      code: `nums = [${arr.join(', ')}]
val = nums[${targetIdx}]`,
      question: `In standard 0-indexed arrays, what is the value stored in variable \`val\`?`,
      options: [
        `${targetVal}`,
        `${targetIdx > 0 ? arr[targetIdx - 1] : arr[1]}`,
        `${targetIdx < arr.length - 1 ? arr[targetIdx + 1] : arr[0]}`,
        `IndexError`
      ],
      correctIndex: 0,
      explanation: `Index 0 holds ${arr[0]}, index 1 holds ${arr[1]}, index 2 holds ${arr[2]}... So index ${targetIdx} directly retrieves ${targetVal} in O(1) time.`,
      wrongReason: `Remember that array indices start at 0, not 1! Index 0 is the first element.`,
      rule: 'In 0-indexed arrays, index k represents the (k + 1)-th element.'
    };
  },

  'two-pointers-sliding-window': () => {
    const leftVal = randomInt(2, 6);
    const rightVal = randomInt(15, 25);
    const target = randomInt(10, 18);
    const currSum = leftVal + rightVal;
    const isTooBig = currSum > target;

    return {
      id: `proc-tp-${Date.now()}-${Math.random()}`,
      topicId: 'two-pointers-sliding-window',
      difficulty: 'beginner',
      type: 'trace',
      code: `# Sorted array, Target = ${target}
# Current left points to: ${leftVal}
# Current right points to: ${rightVal}
# Current sum = ${leftVal} + ${rightVal} = ${currSum}`,
      question: `Since current sum (${currSum}) is ${isTooBig ? 'GREATER' : 'SMALLER'} than target (${target}), what is the next two-pointer move?`,
      options: isTooBig
        ? [
            'Move right pointer leftward (`right -= 1`) to get a smaller sum',
            'Move left pointer rightward (`left += 1`) to get a smaller sum',
            'Reset both pointers to 0',
            'The array is invalid'
          ]
        : [
            'Move left pointer rightward (`left += 1`) to get a larger sum',
            'Move right pointer leftward (`right -= 1`) to get a larger sum',
            'Reset both pointers to end',
            'Throw an exception'
          ],
      correctIndex: 0,
      explanation: isTooBig
        ? `Because the array is sorted, the only way to decrease the sum is to pick a smaller number by moving the right pointer inward: \`right -= 1\`.`
        : `Because the array is sorted, the only way to increase the sum is to pick a larger number by moving the left pointer inward: \`left += 1\`.`,
      wrongReason: isTooBig
        ? `Moving left += 1 would select an even larger number, increasing the sum further from ${target}!`
        : `Moving right -= 1 would select an even smaller number, decreasing the sum further from ${target}!`,
      rule: 'Sorted array Two-Pointers: sum too big -> right--; sum too small -> left++.'
    };
  },

  'stacks-and-queues': () => {
    const item1 = randomInt(10, 30);
    const item2 = randomInt(40, 60);
    const item3 = randomInt(70, 99);
    const isStack = Math.random() > 0.5;

    if (isStack) {
      return {
        id: `proc-sq-${Date.now()}-${Math.random()}`,
        topicId: 'stacks-and-queues',
        difficulty: 'beginner',
        type: 'trace',
        code: `stack = []
stack.append(${item1})
stack.append(${item2})
stack.append(${item3})
val1 = stack.pop()
val2 = stack.pop()`,
        question: `After executing these two pop operations on the LIFO Stack, what is the value of \`val2\`?`,
        options: [`${item2}`, `${item3}`, `${item1}`, 'None'],
        correctIndex: 0,
        explanation: `Stack is Last-In First-Out. 1st pop removes the topmost item (${item3}). 2nd pop removes the next top item (${item2}). So val2 is ${item2}.`,
        wrongReason: `${item3} was popped first as val1. The second pop retrieved ${item2}.`,
        rule: 'Stack pop() extracts items in reverse order of how they were pushed.'
      };
    } else {
      return {
        id: `proc-sq-${Date.now()}-${Math.random()}`,
        topicId: 'stacks-and-queues',
        difficulty: 'beginner',
        type: 'trace',
        code: `from collections import deque
q = deque()
q.append(${item1})
q.append(${item2})
q.append(${item3})
val1 = q.popleft()`,
        question: `In a FIFO Queue, what is the value of \`val1\` after \`popleft()\`?`,
        options: [`${item1}`, `${item3}`, `${item2}`, 'None'],
        correctIndex: 0,
        explanation: `A Queue is First-In First-Out (FIFO). The very first item enqueued was ${item1}, so \`popleft()\` dequeues ${item1}.`,
        wrongReason: `${item3} is at the back of the queue. The front item (${item1}) exits first.`,
        rule: 'Queue dequeue removes the oldest inserted element (FIFO).'
      };
    }
  },

  'binary-search': () => {
    const low = randomInt(0, 10);
    const high = low + randomChoice([6, 8, 10, 12]);
    const expectedMid = low + Math.floor((high - low) / 2);
    return {
      id: `proc-bs-${Date.now()}-${Math.random()}`,
      topicId: 'binary-search',
      difficulty: 'beginner',
      type: 'trace',
      code: `low = ${low}
high = ${high}
mid = low + (high - low) // 2`,
      question: `What is the calculated integer index value of \`mid\`?`,
      options: [`${expectedMid}`, `${expectedMid + 1}`, `${expectedMid - 1}`, `${high}`],
      correctIndex: 0,
      explanation: `\`mid = ${low} + (${high} - ${low}) // 2 = ${low} + ${Math.floor((high - low) / 2)} = ${expectedMid}\`. This safe formula computes the exact midpoint index without 32-bit overflow.`,
      wrongReason: `Integer division truncates down towards zero: (${low} + ${high}) // 2 = ${expectedMid}.`,
      rule: 'Mid index is always halfway between low and high: low + (high - low) // 2.'
    };
  }
};

/**
 * Fetch a set of questions for a specific topic.
 * Prioritizes curated beginner questions, and generates procedural variants if needed.
 */
export function getQuestionsForTopic(topicId, count = 4) {
  const curated = QUESTION_BANK.filter(q => q.topicId === topicId);
  const result = [...curated];

  // If we have fewer questions than requested or generator exists, generate fresh variants!
  if (PROCEDURAL_GENERATORS[topicId]) {
    while (result.length < count) {
      result.push(PROCEDURAL_GENERATORS[topicId]());
    }
  }

  // Shuffle slightly so practice feels fresh
  return result.sort(() => Math.random() - 0.5).slice(0, count);
}

/**
 * Generates an adaptive reinforcement question when a user answers incorrectly!
 * Targets the specific misconception and tests the principle again.
 */
export function generateAdaptiveReinforcementQuestion(failedQuestion, topicId) {
  // If procedural generator exists, generate a fresh variant with different numbers!
  if (PROCEDURAL_GENERATORS[topicId]) {
    const procedural = PROCEDURAL_GENERATORS[topicId]();
    procedural.isReinforcement = true;
    procedural.reinforcingConcept = failedQuestion.rule;
    return procedural;
  }

  // Otherwise, create a targeted reinforcement question focusing on the failed rule
  return {
    id: `reinf-${Date.now()}-${Math.random()}`,
    topicId: topicId,
    difficulty: 'beginner',
    type: 'concept',
    isReinforcement: true,
    reinforcingConcept: failedQuestion.rule,
    question: `[Reinforcement Drill] Reviewing key principle: "${failedQuestion.rule}". Which statement accurately reflects this?`,
    options: [
      `True: ${failedQuestion.rule}`,
      `False: ${failedQuestion.wrongReason}`,
      'None of the above',
      'It only applies in older programming languages'
    ],
    correctIndex: 0,
    explanation: `Exactly right! Remember: ${failedQuestion.explanation}`,
    wrongReason: failedQuestion.wrongReason,
    rule: failedQuestion.rule
  };
}

/**
 * Calculate updated score and mastery
 */
export function evaluateAnswer({ isCorrect, currentScore = 0, currentStreak = 0 }) {
  if (isCorrect) {
    const streakBonus = Math.min(currentStreak * 2, 10);
    const earned = 10 + streakBonus;
    return {
      scoreDelta: earned,
      newScore: currentScore + earned,
      newStreak: currentStreak + 1,
      earnedBonus: streakBonus
    };
  } else {
    // Penalty: -2 points, minimum score 0, streak reset
    const penalty = -2;
    return {
      scoreDelta: penalty,
      newScore: Math.max(0, currentScore + penalty),
      newStreak: 0,
      earnedBonus: 0
    };
  }
}

/**
 * Helper to compute mastery tier
 */
export function getMasteryTier(percentage) {
  if (percentage >= 85) return { label: 'Mastered', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' };
  if (percentage >= 60) return { label: 'Proficient', color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' };
  if (percentage >= 30) return { label: 'Learner', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' };
  return { label: 'Novice', color: 'text-slate-400 bg-slate-500/10 border-slate-500/30' };
}
