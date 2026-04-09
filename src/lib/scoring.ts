export interface ScoreResult {
  score: 1 | 2 | 3 | 4 | 5;
  praise: string;
  improvement: string;
}

interface KeywordSet {
  name: string;
  words: string[];
}

const keywordSets: KeywordSet[] = [
  {
    name: 'teamwork',
    words: ['team', 'teammate', 'together', 'collaborate', 'everyone', 'we all', 'our team', 'group', 'coordinated'],
  },
  {
    name: 'coachability',
    words: ['coach', 'feedback', 'learn', 'improve', 'adapt', 'adjust', 'listen', 'grow', 'open to'],
  },
  {
    name: 'reliability',
    words: ['reliable', 'on time', 'show up', 'consistent', 'always', 'commit', 'dependable', 'trust'],
  },
  {
    name: 'customer-service',
    words: ['customer', 'serve', 'smile', 'friendly', 'welcome', 'help', 'happy', 'kind', 'guest'],
  },
  {
    name: 'five-guys',
    words: ['five guys', 'fresh', 'never frozen', 'hand-cut', 'toppings', 'murrell', '1986', 'peanuts', 'no freezer', 'peanut oil'],
  },
  {
    name: 'calm',
    words: ['calm', 'patient', 'steady', 'focus', 'breathe', 'composed', 'relax'],
  },
  {
    name: 'responsibility',
    words: ['responsible', 'trust', 'mature', 'accountable', 'babysit', 'sibling', 'counted on'],
  },
  {
    name: 'sports',
    words: ['soccer', 'practice', 'game', 'discipline', 'train', 'compete', 'sport', 'athlete', 'coach', 'season'],
  },
];

const negativeKeywords = [
  'hate', 'boring', "don't care", 'whatever man', 'lazy', 'just for the money', 'free food',
];

function analyzeKeywords(text: string): { count: number; matched: string[] } {
  const lower = text.toLowerCase();
  const matched: string[] = [];

  for (const set of keywordSets) {
    if (set.words.some(w => lower.includes(w))) {
      matched.push(set.name);
    }
  }

  return { count: matched.length, matched };
}

function hasFiveGuysDetails(text: string): boolean {
  const fiveGuysWords = ['fresh', 'never frozen', 'hand-cut', 'toppings', 'murrell', '1986', 'peanuts', 'no freezer', 'arlington'];
  const lower = text.toLowerCase();
  const hits = fiveGuysWords.filter(w => lower.includes(w));
  return hits.length >= 2;
}

function hasNegativeKeywords(text: string): boolean {
  const lower = text.toLowerCase();
  return negativeKeywords.some(w => lower.includes(w));
}

function generatePraise(score: number, matched: string[], wordCount: number, durationSeconds: number): string {
  if (score >= 5) {
    return 'Outstanding answer — you were specific, confident, and hit all the right notes. That would impress any hiring manager.';
  }

  if (score >= 4) {
    const strong = [
      'Solid answer — you gave real details and came across confident.',
      'Nice work. You connected your experience to what they actually need.',
      "That was a strong response. You didn't just talk — you gave evidence.",
      "Good job keeping it focused and on point. That's exactly what they want.",
    ];
    return strong[Math.floor(Math.random() * strong.length)];
  }

  if (matched.includes('sports')) return "Using your soccer background was smart — that's exactly the kind of real experience they want to hear.";
  if (matched.includes('responsibility')) return 'Bringing up babysitting or real responsibility shows maturity. Good instinct.';
  if (matched.includes('teamwork')) return "You mentioned teamwork — that's a big deal at Five Guys. Keep building on that.";
  if (matched.includes('coachability')) return "Showing you're open to feedback is exactly what managers want to hear from a first-time employee.";
  if (matched.includes('five-guys')) return 'Good — you used actual Five Guys facts. That shows you did your homework.';
  if (wordCount > 25) return "You gave a real answer with real substance. That's always better than a one-liner.";
  if (durationSeconds > 12) return "You took your time and gave a thoughtful response — that's a good sign.";

  return "You answered the question directly. That's a solid foundation — now let's build on it.";
}

function generateImprovement(
  score: number,
  matched: string[],
  wordCount: number,
  durationSeconds: number,
  category: string,
): string {
  if (score >= 5) return "Perfect is rare — try to add one more vivid detail or a specific moment that makes your answer memorable.";

  if (wordCount < 12) return "That answer was pretty short. Aim for at least 3–4 sentences. More detail = more confidence = better impression.";
  if (durationSeconds < 8) return "Try to speak for a little longer — 15 to 30 seconds is the sweet spot. You have more to say than you think.";

  if (
    !matched.includes('sports') &&
    !matched.includes('responsibility') &&
    (category === 'no-experience' || category === 'teamwork' || category === 'strength-weakness')
  ) {
    return "Pull in a real example — your soccer years or babysitting your siblings. Specific stories always beat general statements.";
  }

  if ((category === 'motivation' || category === 'company-knowledge') && !matched.includes('five-guys')) {
    return "Add at least one Five Guys-specific fact: fresh never frozen, founded in 1986, the Murrell family, or 15 free toppings. It shows you actually researched them.";
  }

  if (!matched.includes('teamwork') && (category === 'teamwork' || category === 'customer-service')) {
    return "Try using words like 'team,' 'we,' or 'together' — Five Guys is team-first, and using that language signals you get it.";
  }

  if (!matched.includes('coachability') && category === 'coachability') {
    return "Make sure you use phrases like 'I listened,' 'I adjusted,' or 'I learned from it.' That's the core of what this question is testing.";
  }

  if (!matched.includes('calm') && category === 'customer-service') {
    return "In customer service questions, always show you stay calm. Say something like 'I took a breath' or 'I focused on helping them.'";
  }

  const general = [
    "Try ending your answer with a confident closing line — like 'That's why I know I can handle this job.'",
    "Use the STAR format: Situation, Task, Action, Result. It keeps answers tight and impressive.",
    "One specific detail or story will always be more convincing than a general statement.",
  ];
  return general[Math.floor(Math.random() * general.length)];
}

export function scoreAnswer(transcript: string, category: string, durationSeconds: number): ScoreResult {
  let raw = 3;

  const words = transcript.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // Duration
  if (durationSeconds < 5) raw -= 1;
  else if (durationSeconds >= 15 && durationSeconds <= 45) raw += 0.5;
  else if (durationSeconds > 60) raw -= 0.5;

  // Word count
  if (wordCount < 10) raw -= 1;
  else if (wordCount >= 20 && wordCount <= 80) raw += 0.5;

  // Keywords
  const { count: matchCount, matched } = analyzeKeywords(transcript);
  if (matchCount === 1 || matchCount === 2) raw += 0.5;
  else if (matchCount >= 3) raw += 1;

  // Five Guys bonus
  if (hasFiveGuysDetails(transcript)) raw += 0.5;

  // Negative penalty
  if (hasNegativeKeywords(transcript)) raw -= 0.5;

  const score = Math.max(1, Math.min(5, Math.round(raw))) as 1 | 2 | 3 | 4 | 5;

  return {
    score,
    praise: generatePraise(score, matched, wordCount, durationSeconds),
    improvement: generateImprovement(score, matched, wordCount, durationSeconds, category),
  };
}

export function scoreColor(score: number): string {
  if (score >= 4) return 'text-green-600';
  if (score >= 3) return 'text-yellow-600';
  return 'text-fg-red';
}

export function scoreBg(score: number): string {
  if (score >= 4) return 'bg-green-50 border-green-200';
  if (score >= 3) return 'bg-yellow-50 border-yellow-200';
  return 'bg-red-50 border-red-200';
}

export function scoreStars(score: number): string {
  return '★'.repeat(score) + '☆'.repeat(5 - score);
}
