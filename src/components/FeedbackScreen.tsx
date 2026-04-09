import { useState } from 'react';
import { scoreColor, scoreBg, scoreStars } from '../lib/scoring';
import type { ScoreResult } from '../lib/scoring';
import { CATEGORY_LABELS } from '../data/questions';
import type { SessionItem } from '../data/questions';

interface FeedbackScreenProps {
  item: SessionItem;
  transcript: string;
  scoreResult: ScoreResult;
  questionNumber: number;
  totalQuestions: number;
  onNext: () => void;
  isLast: boolean;
}

export default function FeedbackScreen({
  item,
  transcript,
  scoreResult,
  questionNumber,
  totalQuestions,
  onNext,
  isLast,
}: FeedbackScreenProps) {
  const [showTranscript, setShowTranscript] = useState(false);
  const { score, praise, improvement } = scoreResult;

  const progressPercent = Math.round((questionNumber / totalQuestions) * 100);

  return (
    <div className="flex flex-col px-4 pt-4 pb-6 max-w-lg mx-auto fade-in">

      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {CATEGORY_LABELS[item.question.category]}
          </span>
          <span className="text-xs font-semibold text-gray-500">{questionNumber} / {totalQuestions}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-fg-red rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Score card */}
      <div className={`rounded-2xl border p-5 mb-4 ${scoreBg(score)}`}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Score</span>
          <span className={`text-2xl font-bold ${scoreColor(score)}`}>{score}/5</span>
        </div>
        <div className={`text-2xl tracking-wider ${scoreColor(score)}`}>
          {scoreStars(score)}
        </div>
        <p className="text-xs text-gray-500 mt-1 italic">"{item.variant}"</p>
      </div>

      {/* Praise */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">✅</span>
          <span className="text-sm font-bold text-green-800">What you did well</span>
        </div>
        <p className="text-sm text-green-900 leading-relaxed">{praise}</p>
      </div>

      {/* Improvement */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">💡</span>
          <span className="text-sm font-bold text-yellow-800">One thing to improve</span>
        </div>
        <p className="text-sm text-yellow-900 leading-relaxed">{improvement}</p>
      </div>

      {/* Transcript toggle */}
      <button
        onClick={() => setShowTranscript(v => !v)}
        className="flex items-center justify-between w-full bg-white border border-gray-200 rounded-xl px-4 py-3 mb-5 text-sm text-gray-600 font-medium"
      >
        <span>Your answer</span>
        <span className="text-gray-400">{showTranscript ? '▲' : '▼'}</span>
      </button>

      {showTranscript && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-5 -mt-3">
          <p className="text-sm text-gray-700 leading-relaxed italic">
            "{transcript}"
          </p>
        </div>
      )}

      {/* Next button */}
      <button
        onClick={onNext}
        className="w-full bg-fg-red hover:bg-fg-darkred active:scale-95 text-white font-bold text-lg py-4 rounded-2xl shadow-md transition-all duration-150"
      >
        {isLast ? 'See My Results →' : 'Next Question →'}
      </button>
    </div>
  );
}
