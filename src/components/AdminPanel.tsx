import { useState, useEffect } from 'react';
import { loadSessions, clearSessions, getCategoryStats, getRecentTrend } from '../lib/storage';
import type { StoredSession } from '../lib/storage';
import { CATEGORY_LABELS } from '../data/questions';
import { scoreColor, scoreStars } from '../lib/scoring';
import type { Category } from '../data/questions';

const PASSWORD = 'dadrules';

interface AdminPanelProps {
  onClose: () => void;
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [sessions, setSessions] = useState<StoredSession[]>([]);
  const [expandedSession, setExpandedSession] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    if (authed) setSessions(loadSessions());
  }, [authed]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (input === PASSWORD) {
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
      setInput('');
    }
  }

  function handleClear() {
    if (confirmClear) {
      clearSessions();
      setSessions([]);
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
    }
  }

  // ── Lock screen ─────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="fixed inset-0 bg-gray-900/80 z-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl w-full max-w-sm p-6 fade-in">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🔒</div>
            <h2 className="text-xl font-bold text-gray-900">Dad's Dashboard</h2>
            <p className="text-sm text-gray-500 mt-1">Enter password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={input}
              onChange={e => { setInput(e.target.value); setError(false); }}
              placeholder="Password"
              autoFocus
              className={`w-full border rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-fg-red ${
                error ? 'border-red-400 bg-red-50' : 'border-gray-200'
              }`}
            />
            {error && <p className="text-sm text-red-600 text-center">Wrong password. Try again.</p>}
            <button
              type="submit"
              className="w-full bg-fg-red hover:bg-fg-darkred text-white font-bold py-3 rounded-xl transition-colors"
            >
              Unlock
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full text-gray-400 text-sm py-2 hover:text-gray-600"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard ────────────────────────────────────────────────────────────────
  const totalSessions = sessions.length;
  const totalQuestions = sessions.reduce((s, sess) => s + sess.answers.length, 0);
  const overallAvg = totalSessions === 0
    ? 0
    : sessions.reduce((s, sess) => s + sess.avgScore, 0) / totalSessions;

  const lastPracticed = totalSessions === 0 ? null : new Date(sessions[sessions.length - 1].date);
  const trend = getRecentTrend(sessions);
  const categoryStats = getCategoryStats(sessions);
  const weakest = categoryStats.slice(0, 3);
  const strongest = [...categoryStats].sort((a, b) => b.avgScore - a.avgScore).slice(0, 3);

  // Days since last session
  const daysSince = lastPracticed
    ? Math.floor((Date.now() - lastPracticed.getTime()) / 86400000)
    : null;

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gray-900 text-white sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">📊</span>
            <div>
              <p className="font-bold text-sm">Dad's Dashboard</p>
              <p className="text-xs text-gray-400">Liam's Interview Prep</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-sm font-medium">
            ✕ Close
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5 space-y-4 pb-10 fade-in">

        {/* No data state */}
        {totalSessions === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-5xl mb-3">📭</div>
            <p className="font-semibold text-gray-600">No sessions yet</p>
            <p className="text-sm mt-1">Have Liam complete a practice session and his data will show up here.</p>
          </div>
        )}

        {totalSessions > 0 && (
          <>
            {/* Top stats */}
            <div className="grid grid-cols-3 gap-3">
              <StatCard
                label="Sessions"
                value={totalSessions.toString()}
                sub="completed"
                color="text-gray-900"
              />
              <StatCard
                label="Avg Score"
                value={overallAvg.toFixed(1)}
                sub="out of 5"
                color={overallAvg >= 4 ? 'text-green-600' : overallAvg >= 3 ? 'text-yellow-600' : 'text-fg-red'}
              />
              <StatCard
                label="Last Session"
                value={daysSince === 0 ? 'Today' : daysSince === 1 ? 'Yesterday' : `${daysSince}d ago`}
                sub={lastPracticed ? formatDate(lastPracticed) : ''}
                color={daysSince !== null && daysSince <= 1 ? 'text-green-600' : 'text-yellow-600'}
              />
            </div>

            {/* Coaching callout */}
            <CoachingCallout sessions={sessions} overallAvg={overallAvg} daysSince={daysSince} />

            {/* Score trend */}
            {trend.length > 1 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">Score Trend (last {trend.length} sessions)</p>
                <ScoreBar scores={trend} />
              </div>
            )}

            {/* Weakest categories */}
            {weakest.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span>🎯</span>
                  <p className="text-sm font-bold text-red-800">Work on these with him</p>
                </div>
                <div className="space-y-2">
                  {weakest.map(s => (
                    <CategoryRow key={s.category} stat={s} />
                  ))}
                </div>
              </div>
            )}

            {/* Strongest categories */}
            {strongest.length > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span>💪</span>
                  <p className="text-sm font-bold text-green-800">His strengths</p>
                </div>
                <div className="space-y-2">
                  {strongest.map(s => (
                    <CategoryRow key={s.category} stat={s} />
                  ))}
                </div>
              </div>
            )}

            {/* All categories */}
            {categoryStats.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-gray-800 mb-3">All Categories</p>
                <div className="space-y-2">
                  {[...categoryStats].sort((a, b) => b.avgScore - a.avgScore).map(s => (
                    <CategoryBar key={s.category} stat={s} />
                  ))}
                </div>
              </div>
            )}

            {/* Session history */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-bold text-gray-800">Session History</p>
              </div>
              <div className="divide-y divide-gray-100">
                {[...sessions].reverse().map((session, i) => (
                  <div key={session.id}>
                    <button
                      onClick={() => setExpandedSession(expandedSession === session.id ? null : session.id)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-bold ${scoreColor(Math.round(session.avgScore) as 1|2|3|4|5)}`}>
                          {session.avgScore.toFixed(1)}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {sessions.length - i === sessions.length ? 'First session' : `Session ${sessions.length - i}`}
                          </p>
                          <p className="text-xs text-gray-400">{formatDateTime(new Date(session.date))}</p>
                        </div>
                      </div>
                      <span className="text-gray-400 text-xs">{expandedSession === session.id ? '▲' : '▼'}</span>
                    </button>

                    {expandedSession === session.id && (
                      <div className="px-4 pb-4 bg-gray-50 space-y-2">
                        {session.answers.map((answer, j) => (
                          <div key={j} className="bg-white border border-gray-200 rounded-xl p-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-gray-500">
                                {CATEGORY_LABELS[answer.category as Category]}
                              </span>
                              <span className={`text-sm font-bold ${scoreColor(answer.score as 1|2|3|4|5)}`}>
                                {answer.score}/5
                              </span>
                            </div>
                            <p className="text-xs text-gray-700 font-medium mb-1">"{answer.variant}"</p>
                            <p className="text-xs text-gray-500 italic mb-2">"{answer.transcript}"</p>
                            <div className="flex flex-col gap-1">
                              <p className="text-xs text-green-700">✅ {answer.praise}</p>
                              <p className="text-xs text-yellow-700">💡 {answer.improvement}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Clear data */}
            <div className="text-center pt-2">
              <button
                onClick={handleClear}
                className={`text-sm px-4 py-2 rounded-lg transition-colors ${
                  confirmClear
                    ? 'bg-red-600 text-white font-bold'
                    : 'text-gray-400 hover:text-red-500'
                }`}
              >
                {confirmClear ? 'Tap again to confirm — this deletes all data' : 'Clear all data'}
              </button>
              {confirmClear && (
                <button onClick={() => setConfirmClear(false)} className="block mx-auto mt-1 text-xs text-gray-400">
                  Cancel
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, color }: { label: string; value: string; sub: string; color: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 text-center">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
      <p className="text-xs text-gray-400">{sub}</p>
    </div>
  );
}

function CategoryRow({ stat }: { stat: { category: string; avgScore: number; attempts: number } }) {
  const label = CATEGORY_LABELS[stat.category as Category] ?? stat.category;
  const score = Math.round(stat.avgScore) as 1 | 2 | 3 | 4 | 5;
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-xs text-gray-400">{stat.attempts} answer{stat.attempts !== 1 ? 's' : ''}</p>
      </div>
      <div className="text-right">
        <span className={`text-sm font-bold ${scoreColor(score)}`}>{stat.avgScore.toFixed(1)}/5</span>
        <p className="text-xs text-gray-400">{scoreStars(score)}</p>
      </div>
    </div>
  );
}

function CategoryBar({ stat }: { stat: { category: string; avgScore: number; attempts: number } }) {
  const label = CATEGORY_LABELS[stat.category as Category] ?? stat.category;
  const pct = (stat.avgScore / 5) * 100;
  const score = Math.round(stat.avgScore) as 1 | 2 | 3 | 4 | 5;
  const barColor = stat.avgScore >= 4 ? 'bg-green-500' : stat.avgScore >= 3 ? 'bg-yellow-400' : 'bg-fg-red';

  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-700 font-medium">{label}</span>
        <span className={`text-xs font-bold ${scoreColor(score)}`}>{stat.avgScore.toFixed(1)}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function ScoreBar({ scores }: { scores: number[] }) {
  const max = 5;
  return (
    <div className="flex items-end gap-1.5 h-16">
      {scores.map((s, i) => {
        const pct = (s / max) * 100;
        const color = s >= 4 ? 'bg-green-500' : s >= 3 ? 'bg-yellow-400' : 'bg-fg-red';
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-xs text-gray-500 font-medium">{s.toFixed(1)}</span>
            <div className="w-full flex items-end" style={{ height: '40px' }}>
              <div
                className={`w-full rounded-t-sm ${color}`}
                style={{ height: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CoachingCallout({
  sessions,
  overallAvg,
  daysSince,
}: {
  sessions: StoredSession[];
  overallAvg: number;
  daysSince: number | null;
}) {
  const tips: string[] = [];

  if (daysSince !== null && daysSince >= 3) {
    tips.push(`He hasn't practiced in ${daysSince} days — remind him to do a quick session tonight.`);
  }

  if (overallAvg < 3) {
    tips.push("Overall scores are low — sit with him for one session so he can hear himself out loud.");
  } else if (overallAvg >= 4) {
    tips.push("He's scoring well. Remind him to mention specific Five Guys facts to push scores even higher.");
  }

  if (sessions.length >= 3) {
    const last3 = sessions.slice(-3).map(s => s.avgScore);
    const improving = last3[2] > last3[0];
    if (improving) tips.push("Scores are trending up over the last 3 sessions. Tell him you noticed — that'll mean a lot.");
    else tips.push("Scores have been flat lately. Mix it up — ask him questions out loud at dinner.");
  }

  if (tips.length === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-2">
        <span>👨‍💼</span>
        <p className="text-sm font-bold text-blue-800">Coaching tips for you</p>
      </div>
      <ul className="space-y-1.5">
        {tips.map((tip, i) => (
          <li key={i} className="text-sm text-blue-900">{tip}</li>
        ))}
      </ul>
    </div>
  );
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatDateTime(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
}
