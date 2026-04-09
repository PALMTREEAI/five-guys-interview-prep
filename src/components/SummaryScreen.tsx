import { useState, useEffect } from 'react';
import { scoreColor, scoreBg, scoreStars } from '../lib/scoring';
import { saveSession } from '../lib/storage';
import type { ScoreResult } from '../lib/scoring';
import { CATEGORY_LABELS } from '../data/questions';
import type { SessionItem } from '../data/questions';

export interface AnswerRecord {
  item: SessionItem;
  transcript: string;
  duration: number;
  result: ScoreResult;
}

interface SummaryScreenProps {
  answers: AnswerRecord[];
  onPracticeAgain: () => void;
}

const FG_TIPS = [
  '🍔  Fresh, never frozen — they cook everything to order.',
  '🧊  No freezers, only coolers. No microwaves or heat lamps.',
  '🍟  Fries are hand-cut fresh daily, cooked in peanut oil.',
  '🥬  15 free toppings — any combination, no extra charge.',
  '🥜  Free peanuts in the lobby — it\'s a signature thing.',
  '📅  Founded in 1986 by Jerry Murrell and his five sons.',
  '📍  Started in Arlington, Virginia. Now 1,700+ locations.',
  '⚡  High energy, team-first, quality-first culture.',
];

export default function SummaryScreen({ answers, onPracticeAgain }: SummaryScreenProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    saveSession(answers);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const totalScore = answers.reduce((sum, a) => sum + a.result.score, 0);
  const avgScore = totalScore / answers.length;
  const roundedAvg = Math.round(avgScore) as 1 | 2 | 3 | 4 | 5;

  // Identify strengths (score >= 4) and needs work (score <= 2)
  const strong = answers.filter(a => a.result.score >= 4);
  const needsWork = answers.filter(a => a.result.score <= 2);

  const avgLabel =
    avgScore >= 4.5 ? 'Excellent — you\'re ready!'
    : avgScore >= 3.5 ? 'Good — a couple more reps and you\'re set.'
    : avgScore >= 2.5 ? 'Getting there — keep practicing!'
    : 'Early days — every rep makes you better.';

  return (
    <div className="flex flex-col px-4 pt-4 pb-8 max-w-lg mx-auto fade-in">

      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🎉</div>
        <h2 className="text-2xl font-bold text-gray-900">Session Complete!</h2>
        <p className="text-gray-500 text-sm mt-1">{answers.length} questions answered</p>
      </div>

      {/* Average score */}
      <div className={`rounded-2xl border p-5 mb-5 text-center ${scoreBg(roundedAvg)}`}>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Average Score</p>
        <p className={`text-5xl font-bold ${scoreColor(roundedAvg)}`}>
          {avgScore.toFixed(1)}<span className="text-2xl">/5</span>
        </p>
        <div className={`text-2xl tracking-wider my-2 ${scoreColor(roundedAvg)}`}>
          {scoreStars(roundedAvg)}
        </div>
        <p className="text-sm font-medium text-gray-700">{avgLabel}</p>
      </div>

      {/* Strengths */}
      {strong.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">💪</span>
            <span className="text-sm font-bold text-green-800">Your strengths this session</span>
          </div>
          <ul className="space-y-1">
            {strong.map(a => (
              <li key={a.item.question.id} className="text-sm text-green-900">
                <span className="font-medium">{CATEGORY_LABELS[a.item.question.category]}</span>
                <span className="text-green-600 ml-1">({a.result.score}/5)</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Needs work */}
      {needsWork.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🎯</span>
            <span className="text-sm font-bold text-yellow-800">Focus on these next time</span>
          </div>
          <ul className="space-y-1">
            {needsWork.map(a => (
              <li key={a.item.question.id} className="text-sm text-yellow-900">
                <span className="font-medium">{CATEGORY_LABELS[a.item.question.category]}</span>
                <span className="text-yellow-700 ml-1 text-xs">— {a.result.improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Full review */}
      <div className="mb-5">
        <p className="text-sm font-bold text-gray-700 mb-3">Full Answer Review</p>
        <div className="space-y-2">
          {answers.map((a, i) => (
            <div key={a.item.question.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === a.item.question.id ? null : a.item.question.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-bold ${scoreColor(a.result.score)}`}>{a.result.score}/5</span>
                  <div>
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{a.item.variant}</p>
                    <p className="text-xs text-gray-400">Q{i + 1} · {CATEGORY_LABELS[a.item.question.category]}</p>
                  </div>
                </div>
                <span className="text-gray-400 text-xs ml-2">{expanded === a.item.question.id ? '▲' : '▼'}</span>
              </button>

              {expanded === a.item.question.id && (
                <div className="px-4 pb-4 border-t border-gray-100 pt-3 space-y-2">
                  <div className={`text-lg ${scoreColor(a.result.score)}`}>{scoreStars(a.result.score)}</div>
                  <div>
                    <p className="text-xs font-semibold text-green-700 mb-0.5">What you did well</p>
                    <p className="text-xs text-gray-700">{a.result.praise}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-yellow-700 mb-0.5">To improve</p>
                    <p className="text-xs text-gray-700">{a.result.improvement}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-0.5">Your answer</p>
                    <p className="text-xs text-gray-600 italic">"{a.transcript}"</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Five Guys tips */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6">
        <button
          onClick={() => setShowTips(v => !v)}
          className="w-full flex items-center justify-between px-5 py-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">📋</span>
            <span className="text-sm font-bold text-gray-800">Five Guys Quick Facts</span>
          </div>
          <span className="text-gray-400 text-xs">{showTips ? '▲' : '▼'}</span>
        </button>
        {showTips && (
          <div className="px-5 pb-4 border-t border-gray-100 pt-3">
            <ul className="space-y-2">
              {FG_TIPS.map((tip, i) => (
                <li key={i} className="text-sm text-gray-700">{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={onPracticeAgain}
        className="w-full bg-fg-red hover:bg-fg-darkred active:scale-95 text-white font-bold text-lg py-4 rounded-2xl shadow-md transition-all duration-150"
      >
        Practice Again
      </button>

      <p className="text-xs text-gray-400 text-center mt-3">
        Each session uses different questions — keep going!
      </p>
    </div>
  );
}
