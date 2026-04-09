import type { AnswerRecord } from '../components/SummaryScreen';

export interface StoredAnswer {
  questionId: string;
  category: string;
  variant: string;
  transcript: string;
  score: number;
  praise: string;
  improvement: string;
}

export interface StoredSession {
  id: string;
  date: string; // ISO string
  avgScore: number;
  answers: StoredAnswer[];
}

const STORAGE_KEY = 'fg-sessions';

export function loadSessions(): StoredSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as StoredSession[];
  } catch {
    return [];
  }
}

export function saveSession(answers: AnswerRecord[]): void {
  const sessions = loadSessions();
  const total = answers.reduce((s, a) => s + a.result.score, 0);
  const session: StoredSession = {
    id: Date.now().toString(),
    date: new Date().toISOString(),
    avgScore: parseFloat((total / answers.length).toFixed(2)),
    answers: answers.map(a => ({
      questionId: a.item.question.id,
      category: a.item.question.category,
      variant: a.item.variant,
      transcript: a.transcript,
      score: a.result.score,
      praise: a.result.praise,
      improvement: a.result.improvement,
    })),
  };
  sessions.push(session);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch {
    // storage full — drop oldest session and retry
    sessions.shift();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions)); } catch { /* ignore */ }
  }
}

export function clearSessions(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// ── Analytics helpers ──────────────────────────────────────────────────────

export interface CategoryStats {
  category: string;
  avgScore: number;
  attempts: number;
}

export function getCategoryStats(sessions: StoredSession[]): CategoryStats[] {
  const map: Record<string, { total: number; count: number }> = {};

  for (const session of sessions) {
    for (const answer of session.answers) {
      if (!map[answer.category]) map[answer.category] = { total: 0, count: 0 };
      map[answer.category].total += answer.score;
      map[answer.category].count += 1;
    }
  }

  return Object.entries(map)
    .map(([category, { total, count }]) => ({
      category,
      avgScore: parseFloat((total / count).toFixed(2)),
      attempts: count,
    }))
    .sort((a, b) => a.avgScore - b.avgScore); // weakest first
}

export function getRecentTrend(sessions: StoredSession[], n = 10): number[] {
  return sessions.slice(-n).map(s => s.avgScore);
}
