export type Category =
  | 'intro'
  | 'motivation'
  | 'no-experience'
  | 'availability'
  | 'teamwork'
  | 'coachability'
  | 'customer-service'
  | 'company-knowledge'
  | 'strength-weakness'
  | 'closing';

export const CATEGORY_LABELS: Record<Category, string> = {
  'intro': 'Introduction',
  'motivation': 'Why Five Guys',
  'no-experience': 'Your Value',
  'availability': 'Availability',
  'teamwork': 'Teamwork',
  'coachability': 'Coachability',
  'customer-service': 'Customer Service',
  'company-knowledge': 'Company Knowledge',
  'strength-weakness': 'Strengths & Growth',
  'closing': 'Closing',
};

export interface Question {
  id: string;
  category: Category;
  variants: string[];
  rubricKeywords: string[];
}

export const questions: Question[] = [
  // ── INTRO (5) ──────────────────────────────────────────────────────────────
  {
    id: 'intro-1',
    category: 'intro',
    variants: [
      'Tell me about yourself.',
      'Can you introduce yourself?',
      'Walk me through your background.',
    ],
    rubricKeywords: ['soccer', 'school', 'babysit', 'responsible', 'team', 'active', 'athlete'],
  },
  {
    id: 'intro-2',
    category: 'intro',
    variants: [
      'What do you do outside of school?',
      'Tell me about your hobbies and activities.',
      "What keeps you busy when you're not in class?",
    ],
    rubricKeywords: ['soccer', 'sport', 'team', 'babysit', 'sibling', 'practice', 'discipline'],
  },
  {
    id: 'intro-3',
    category: 'intro',
    variants: [
      'Why are you looking for a job right now?',
      'What made you decide to start looking for work?',
      'Why do you want to start working at 16?',
    ],
    rubricKeywords: ['responsibility', 'independent', 'earn', 'experience', 'grow', 'learn', 'mature'],
  },
  {
    id: 'intro-4',
    category: 'intro',
    variants: [
      'Where do you see yourself in a year?',
      'What are your short-term goals?',
      'What are you hoping to accomplish in the next year?',
    ],
    rubricKeywords: ['grow', 'learn', 'improve', 'school', 'skills', 'experience', 'better'],
  },
  {
    id: 'intro-5',
    category: 'intro',
    variants: [
      'What would your friends say about you?',
      'How would your teammates describe you?',
      'How would your teachers or coaches describe you?',
    ],
    rubricKeywords: ['reliable', 'team', 'hard', 'positive', 'friendly', 'helpful', 'trustworthy', 'dedicated'],
  },

  // ── MOTIVATION / WHY FIVE GUYS (5) ─────────────────────────────────────────
  {
    id: 'motivation-1',
    category: 'motivation',
    variants: [
      'Why do you want to work at Five Guys?',
      'What drew you to apply to Five Guys specifically?',
      'Why Five Guys and not somewhere else?',
    ],
    rubricKeywords: ['fresh', 'quality', 'team', 'five guys', 'food', 'energy', 'reputation', 'love'],
  },
  {
    id: 'motivation-2',
    category: 'motivation',
    variants: [
      'What do you know about Five Guys?',
      'Tell me what you know about our company.',
      'Have you done any research on Five Guys before coming in?',
    ],
    rubricKeywords: ['fresh', 'never frozen', '1986', 'murrell', 'toppings', 'peanuts', 'quality', 'hand-cut', 'arlington', 'virginia'],
  },
  {
    id: 'motivation-3',
    category: 'motivation',
    variants: [
      'What do you think makes Five Guys different from other burger places?',
      'Why is Five Guys special compared to its competitors?',
      'What sets Five Guys apart?',
    ],
    rubricKeywords: ['fresh', 'never frozen', 'quality', 'toppings', 'peanuts', 'hand-cut', 'no freezer', 'no microwave'],
  },
  {
    id: 'motivation-4',
    category: 'motivation',
    variants: [
      'What kind of work environment are you looking for?',
      "What's important to you in a job?",
      'Describe your ideal workplace.',
    ],
    rubricKeywords: ['team', 'fast-paced', 'learn', 'positive', 'energy', 'support', 'grow', 'people'],
  },
  {
    id: 'motivation-5',
    category: 'motivation',
    variants: [
      'Are you interested in growing with the company over time?',
      'Do you see yourself taking on more responsibility here?',
      'What are your long-term goals with this job?',
    ],
    rubricKeywords: ['grow', 'learn', 'lead', 'improve', 'advance', 'dedicated', 'committed', 'future'],
  },

  // ── NO EXPERIENCE / VALUE (5) ───────────────────────────────────────────────
  {
    id: 'no-exp-1',
    category: 'no-experience',
    variants: [
      'Do you have any work experience?',
      'Have you had a job before?',
      "This would be your first job — are you prepared for that?",
    ],
    rubricKeywords: ['soccer', 'babysit', 'team', 'responsible', 'discipline', 'committed', 'learn', 'ready'],
  },
  {
    id: 'no-exp-2',
    category: 'no-experience',
    variants: [
      'What skills do you have that would help you at Five Guys?',
      'What makes you a good candidate even without work experience?',
      'Why should we hire you with no experience?',
    ],
    rubricKeywords: ['team', 'reliable', 'fast learner', 'soccer', 'babysit', 'positive', 'coachable', 'hard working'],
  },
  {
    id: 'no-exp-3',
    category: 'no-experience',
    variants: [
      'Tell me about a time you had a lot of responsibility.',
      'Give me an example of when you were counted on to show up.',
      'Describe a situation where someone was depending on you.',
    ],
    rubricKeywords: ['babysit', 'sibling', 'soccer', 'team', 'responsible', 'reliable', 'showed up', 'counted on'],
  },
  {
    id: 'no-exp-4',
    category: 'no-experience',
    variants: [
      'Tell me about a time you had to learn something new quickly.',
      'Describe a time you stepped into an unfamiliar situation.',
      'Have you ever had to figure something out on the fly?',
    ],
    rubricKeywords: ['soccer', 'learn', 'adapt', 'practice', 'try', 'improve', 'figured out', 'adjusted'],
  },
  {
    id: 'no-exp-5',
    category: 'no-experience',
    variants: [
      "How do you handle doing tasks you don't want to do?",
      'What do you do when you have to do something boring or hard?',
      'Tell me about a time you pushed through something tough.',
    ],
    rubricKeywords: ['soccer', 'practice', 'discipline', 'push', 'through', 'team', 'commitment', 'tough'],
  },

  // ── AVAILABILITY / RELIABILITY (5) ─────────────────────────────────────────
  {
    id: 'availability-1',
    category: 'availability',
    variants: [
      "What's your availability like?",
      'When are you available to work?',
      'How many hours a week can you commit to?',
    ],
    rubricKeywords: ['weekend', 'after school', 'flexible', 'available', 'hours', 'schedule', 'commit'],
  },
  {
    id: 'availability-2',
    category: 'availability',
    variants: [
      'How do you handle balancing school and work?',
      'How will you manage a job while keeping up with school?',
      'Are you worried school might conflict with your schedule?',
    ],
    rubricKeywords: ['balance', 'schedule', 'manage', 'school', 'priority', 'organize', 'plan', 'handle'],
  },
  {
    id: 'availability-3',
    category: 'availability',
    variants: [
      "What would you do if you couldn't make a shift?",
      "What if something comes up and you can't come in?",
      'How do you handle scheduling conflicts?',
    ],
    rubricKeywords: ['call', 'notify', 'ahead', 'responsible', 'communicate', 'cover', 'let know', 'manager'],
  },
  {
    id: 'availability-4',
    category: 'availability',
    variants: [
      'Can you work weekends and holidays?',
      'Are you available during busy times like summer or holidays?',
      'How do you feel about working during rush periods?',
    ],
    rubricKeywords: ['yes', 'available', 'weekend', 'holiday', 'flexible', 'busy', 'ready', 'summer'],
  },
  {
    id: 'availability-5',
    category: 'availability',
    variants: [
      'How do you define reliability?',
      'What does it mean to you to be a reliable employee?',
      'Why is showing up on time important to you?',
    ],
    rubricKeywords: ['show up', 'on time', 'consistent', 'trust', 'team', 'depend', 'respect', 'count on'],
  },

  // ── TEAMWORK (5) ────────────────────────────────────────────────────────────
  {
    id: 'teamwork-1',
    category: 'teamwork',
    variants: [
      'Tell me about a time you worked well on a team.',
      'Give me an example of good teamwork.',
      'Describe a time your team succeeded together.',
    ],
    rubricKeywords: ['soccer', 'team', 'together', 'win', 'support', 'everyone', 'coordinated', 'communicated'],
  },
  {
    id: 'teamwork-2',
    category: 'teamwork',
    variants: [
      'Tell me about a time you had a conflict with a teammate.',
      'What do you do when you disagree with someone on your team?',
      'Have you ever had a hard time getting along with someone?',
    ],
    rubricKeywords: ['talk', 'resolve', 'listen', 'understand', 'respect', 'worked out', 'move forward', 'calm'],
  },
  {
    id: 'teamwork-3',
    category: 'teamwork',
    variants: [
      'Are you more of a leader or a follower?',
      'Do you prefer leading a group or being part of a team?',
      'How would you describe your role on a team?',
    ],
    rubricKeywords: ['both', 'flexible', 'lead', 'follow', 'team', 'whatever', 'needed', 'situational', 'adapt'],
  },
  {
    id: 'teamwork-4',
    category: 'teamwork',
    variants: [
      'How would you help a new coworker who was struggling?',
      'What would you do if someone on your team was having a hard time?',
      'If a coworker was behind, would you step in to help?',
    ],
    rubricKeywords: ['help', 'support', 'show', 'together', 'team', 'teach', 'cover', 'encourage'],
  },
  {
    id: 'teamwork-5',
    category: 'teamwork',
    variants: [
      'What does being a team player mean to you?',
      'How do you contribute to a team environment?',
      'Why is teamwork important to you?',
    ],
    rubricKeywords: ['team', 'support', 'trust', 'together', 'success', 'communication', 'reliable', 'soccer'],
  },

  // ── COACHABILITY / FEEDBACK (5) ─────────────────────────────────────────────
  {
    id: 'coachability-1',
    category: 'coachability',
    variants: [
      'How do you respond to criticism?',
      'What do you do when someone gives you negative feedback?',
      'Tell me about a time you got feedback you had to work with.',
    ],
    rubricKeywords: ['listen', 'learn', 'improve', 'feedback', 'coach', 'grow', 'adjust', 'grateful', 'open'],
  },
  {
    id: 'coachability-2',
    category: 'coachability',
    variants: [
      'Tell me about a time a coach or teacher changed how you did something.',
      'Has anyone ever told you to do something differently? How did you react?',
      'When have you had to adapt your approach based on feedback?',
    ],
    rubricKeywords: ['soccer', 'coach', 'adjust', 'better', 'improve', 'listened', 'changed', 'result'],
  },
  {
    id: 'coachability-3',
    category: 'coachability',
    variants: [
      'If a manager corrected the way you were doing something, how would you respond?',
      'What would you do if a supervisor told you that you were doing something wrong?',
      'How do you handle being corrected at work?',
    ],
    rubricKeywords: ['listen', 'thank', 'adjust', 'improve', 'learn', 'fix', 'not defensive', 'appreciate'],
  },
  {
    id: 'coachability-4',
    category: 'coachability',
    variants: [
      'How do you deal with making a mistake?',
      'Tell me about a time you messed something up.',
      'What do you do when you get something wrong?',
    ],
    rubricKeywords: ['own it', 'fix', 'learn', 'apologize', 'not repeat', 'improve', 'move on', 'honest'],
  },
  {
    id: 'coachability-5',
    category: 'coachability',
    variants: [
      'Are you a fast learner?',
      'How quickly do you pick up new skills?',
      'Tell me about a time you learned something new fast.',
    ],
    rubricKeywords: ['soccer', 'quick', 'practice', 'learn', 'adapt', 'improve', 'focused', 'picked up'],
  },

  // ── CUSTOMER SERVICE SCENARIOS (12) ─────────────────────────────────────────
  {
    id: 'cs-1',
    category: 'customer-service',
    variants: [
      'Have you ever had to deal with a difficult person?',
      'What would you do if a customer was rude to you?',
      'How would you handle an upset customer?',
    ],
    rubricKeywords: ['calm', 'patient', 'listen', 'help', 'sorry', 'resolve', 'friendly', 'stay positive'],
  },
  {
    id: 'cs-2',
    category: 'customer-service',
    variants: [
      "If a customer said their order was wrong, what would you do?",
      "What if someone's food wasn't what they ordered?",
      "A customer comes back saying their burger is wrong — how do you handle it?",
    ],
    rubricKeywords: ['apologize', 'fix', 'remake', 'manager', 'quickly', 'sorry', 'make it right', 'replace'],
  },
  {
    id: 'cs-3',
    category: 'customer-service',
    variants: [
      "It's the lunch rush and the line is really long. What do you do?",
      'How do you handle a really busy shift with lots of customers?',
      "What do you do when everything's chaotic and you're slammed?",
    ],
    rubricKeywords: ['focus', 'team', 'calm', 'fast', 'priority', 'communicate', 'together', 'steady', 'pressure'],
  },
  {
    id: 'cs-4',
    category: 'customer-service',
    variants: [
      'What does great customer service look like to you?',
      "Describe the best customer service experience you've ever had.",
      'How do you define excellent service?',
    ],
    rubricKeywords: ['friendly', 'fast', 'helpful', 'smile', 'welcome', 'feel valued', 'remember', 'kind'],
  },
  {
    id: 'cs-5',
    category: 'customer-service',
    variants: [
      'If you saw a coworker being rude to a customer, what would you do?',
      'What if another team member was treating a customer poorly?',
      'How would you handle a coworker acting unprofessionally?',
    ],
    rubricKeywords: ['step in', 'manager', 'diffuse', 'help', 'handle', 'professional', 'team', 'address'],
  },
  {
    id: 'cs-6',
    category: 'customer-service',
    variants: [
      "A customer asks you something about the menu you don't know. What do you do?",
      "What if you don't know the answer to a customer's question?",
      "Someone asks about allergens and you're unsure — what do you do?",
    ],
    rubricKeywords: ['honest', 'ask', 'find out', 'manager', 'check', 'help', 'not guess', 'safe'],
  },
  {
    id: 'cs-7',
    category: 'customer-service',
    variants: [
      'How do you make a customer feel welcome?',
      'What do you do to create a good first impression with customers?',
      'How do you greet someone when they walk in?',
    ],
    rubricKeywords: ['smile', 'eye contact', 'friendly', 'greet', 'hello', 'warm', 'welcome', 'acknowledge'],
  },
  {
    id: 'cs-8',
    category: 'customer-service',
    variants: [
      'What would you do if you spilled something near a customer?',
      "An accident happens near a customer. What's your response?",
      "If you dropped something near a customer's table, what do you do?",
    ],
    rubricKeywords: ['apologize', 'fix', 'clean', 'help', 'quickly', 'make it right', 'sorry', 'immediately'],
  },
  {
    id: 'cs-9',
    category: 'customer-service',
    variants: [
      'What would you do if the wait time was longer than expected?',
      'If food is taking a long time, how do you handle it with the customer?',
      'A customer is getting impatient about waiting. What do you say?',
    ],
    rubricKeywords: ['apologize', 'update', 'honest', 'communicate', 'thank', 'patient', 'let them know', 'transparent'],
  },
  {
    id: 'cs-10',
    category: 'customer-service',
    variants: [
      'Tell me about a time you went above and beyond for someone.',
      'Give an example of when you did more than was expected.',
      'Describe a time you really came through for someone.',
    ],
    rubricKeywords: ['extra', 'beyond', 'helped', 'went out', 'special', 'surprised', 'made a difference', 'cared'],
  },
  {
    id: 'cs-11',
    category: 'customer-service',
    variants: [
      "It's the end of your shift and a customer needs help. What do you do?",
      "You're about to leave but there's something that needs handling. What happens?",
      'Your replacement is late and a customer needs assistance. How do you handle it?',
    ],
    rubricKeywords: ['help', 'stay', 'finish', 'customer first', 'team', 'not leave', 'responsible', 'committed'],
  },
  {
    id: 'cs-12',
    category: 'customer-service',
    variants: [
      'What would you do if a customer complimented the food?',
      'If a customer says they love Five Guys, what do you say?',
      'How do you respond to positive feedback from a customer?',
    ],
    rubricKeywords: ['thank you', 'appreciate', 'glad', 'proud', 'share', 'team', 'happy', 'means a lot'],
  },

  // ── COMPANY KNOWLEDGE (5) ───────────────────────────────────────────────────
  {
    id: 'company-1',
    category: 'company-knowledge',
    variants: [
      'When was Five Guys founded?',
      'How long has Five Guys been around?',
      'Do you know the history of Five Guys?',
    ],
    rubricKeywords: ['1986', 'founded', 'murrell', 'virginia', 'arlington', 'family', 'sons', 'jerry'],
  },
  {
    id: 'company-2',
    category: 'company-knowledge',
    variants: [
      "What's Five Guys' policy on food quality?",
      "Why doesn't Five Guys use a freezer?",
      'How does Five Guys keep its food fresh?',
    ],
    rubricKeywords: ['fresh', 'never frozen', 'cooler', 'no freezer', 'no microwave', 'daily', 'quality', 'standards'],
  },
  {
    id: 'company-3',
    category: 'company-knowledge',
    variants: [
      'What makes Five Guys fries special?',
      'Tell me about the French fries at Five Guys.',
      'Do you know how Five Guys makes their fries?',
    ],
    rubricKeywords: ['hand-cut', 'fresh', 'daily', 'potato', 'peanut oil', 'never frozen', 'made fresh'],
  },
  {
    id: 'company-4',
    category: 'company-knowledge',
    variants: [
      'How many toppings does Five Guys offer?',
      "What's special about Five Guys' toppings?",
      'Do you know about the toppings at Five Guys?',
    ],
    rubricKeywords: ['15', 'free', 'toppings', 'customize', 'no charge', 'any combination', 'choice'],
  },
  {
    id: 'company-5',
    category: 'company-knowledge',
    variants: [
      "What's Five Guys' reputation for culture and service?",
      'How would you describe the Five Guys vibe?',
      'What kind of atmosphere does Five Guys try to create?',
    ],
    rubricKeywords: ['quality', 'team', 'friendly', 'consistent', 'welcoming', 'energetic', 'standards', 'fresh'],
  },

  // ── STRENGTH / WEAKNESS / CONFLICT (5) ─────────────────────────────────────
  {
    id: 'sw-1',
    category: 'strength-weakness',
    variants: [
      "What's your greatest strength?",
      'What would you say is your best quality?',
      'What do you bring to a team that others might not?',
    ],
    rubricKeywords: ['reliable', 'team', 'hardworking', 'positive', 'coachable', 'focused', 'determined', 'soccer'],
  },
  {
    id: 'sw-2',
    category: 'strength-weakness',
    variants: [
      "What's your biggest weakness?",
      "What's something you're still working on?",
      'Is there anything you want to get better at?',
    ],
    rubricKeywords: ['working on', 'improving', 'better', 'learning', 'growth', 'aware', 'steps', 'getting there'],
  },
  {
    id: 'sw-3',
    category: 'strength-weakness',
    variants: [
      'Tell me about a time you failed at something.',
      "Describe a time things didn't go as planned.",
      'When have you fallen short of a goal?',
    ],
    rubricKeywords: ['failed', 'learned', 'bounced back', 'improved', 'next time', 'lesson', 'grew', 'better for it'],
  },
  {
    id: 'sw-4',
    category: 'strength-weakness',
    variants: [
      'Tell me about a time you had to work under pressure.',
      'Describe a stressful situation and how you handled it.',
      'When have you had to stay calm in a tough spot?',
    ],
    rubricKeywords: ['calm', 'focus', 'soccer', 'breathe', 'pressure', 'team', 'perform', 'steady', 'composed'],
  },
  {
    id: 'sw-5',
    category: 'strength-weakness',
    variants: [
      'Tell me about a time you handled a conflict.',
      'How do you resolve disagreements?',
      "Describe a time two people weren't on the same page and you helped.",
    ],
    rubricKeywords: ['calm', 'talk', 'listen', 'understand', 'both sides', 'fair', 'resolved', 'communicated'],
  },

  // ── CLOSING (5) — study reference only ──────────────────────────────────────
  {
    id: 'closing-1',
    category: 'closing',
    variants: [
      'Do you have any questions for me?',
      'Is there anything you want to ask about the position?',
      'Do you have anything you want to know about working here?',
    ],
    rubricKeywords: ['training', 'schedule', 'team', 'first week', 'role', 'expect', 'learn', 'typical day'],
  },
  {
    id: 'closing-2',
    category: 'closing',
    variants: [
      'Why should we hire you over other applicants?',
      'Make your case — why are you the right person for this job?',
      'Give me one reason to choose you.',
    ],
    rubricKeywords: ['reliable', 'team', 'coachable', 'committed', 'five guys', 'ready', 'show up', 'hard working'],
  },
  {
    id: 'closing-3',
    category: 'closing',
    variants: [
      "Is there anything else you'd like me to know about you?",
      'Anything you want to add before we wrap up?',
      'Final thoughts?',
    ],
    rubricKeywords: ['motivated', 'ready', 'excited', 'learn', 'contribute', 'grateful', 'opportunity', 'thank'],
  },
  {
    id: 'closing-4',
    category: 'closing',
    variants: [
      'When would you be available to start?',
      'How soon can you begin?',
      "What's your earliest start date?",
    ],
    rubricKeywords: ['soon', 'available', 'ready', 'flexible', 'right away', 'start', 'whenever', 'immediately'],
  },
  {
    id: 'closing-5',
    category: 'closing',
    variants: [
      'How did you hear about us?',
      'What made you come specifically to this location?',
      'Who or what pointed you to Five Guys?',
    ],
    rubricKeywords: ['family', 'friend', 'know', 'reputation', 'food', 'quality', 'always liked', 'fan'],
  },
];

export type SessionCategory = Exclude<Category, 'closing'>;

const SESSION_DISTRIBUTION: [SessionCategory, number][] = [
  ['intro', 1],
  ['motivation', 1],
  ['no-experience', 1],
  ['availability', 1],
  ['teamwork', 1],
  ['coachability', 1],
  ['customer-service', 2],
  ['company-knowledge', 1],
  ['strength-weakness', 1],
];

export interface SessionItem {
  question: Question;
  variant: string;
}

export function buildSession(): SessionItem[] {
  const session: SessionItem[] = [];

  for (const [category, count] of SESSION_DISTRIBUTION) {
    const pool = questions.filter(q => q.category === category);
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const picked = shuffled.slice(0, count);
    for (const q of picked) {
      const variant = q.variants[Math.floor(Math.random() * q.variants.length)];
      session.push({ question: q, variant });
    }
  }

  return session.sort(() => Math.random() - 0.5);
}
