import { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionScreen from './components/QuestionScreen';
import FeedbackScreen from './components/FeedbackScreen';
import SummaryScreen from './components/SummaryScreen';
import StudyUpTab from './components/StudyUpTab';
import type { AnswerRecord } from './components/SummaryScreen';
import { buildSession } from './data/questions';
import type { SessionItem } from './data/questions';
import { scoreAnswer } from './lib/scoring';

type Screen = 'welcome' | 'question' | 'feedback' | 'summary';
type Tab = 'practice' | 'studyup';

function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}

export default function App() {
  const [tab, setTab] = useState<Tab>('practice');
  const [screen, setScreen] = useState<Screen>('welcome');
  const [session, setSession] = useState<SessionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [lastTranscript, setLastTranscript] = useState('');
  const [speechSupported] = useState(isSpeechSupported);

  // Keep track of latest answer for feedback screen
  const lastAnswer = answers[answers.length - 1] ?? null;

  function handleStartPractice() {
    const newSession = buildSession();
    setSession(newSession);
    setCurrentIndex(0);
    setAnswers([]);
    setLastTranscript('');
    setScreen('question');
  }

  function handleAnswer(transcript: string, durationSeconds: number) {
    const item = session[currentIndex];
    const result = scoreAnswer(transcript, item.question.category, durationSeconds);
    const record: AnswerRecord = { item, transcript, duration: durationSeconds, result };
    setAnswers(prev => [...prev, record]);
    setLastTranscript(transcript);
    setScreen('feedback');
  }

  function handleNext() {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= session.length) {
      setScreen('summary');
    } else {
      setCurrentIndex(nextIndex);
      setScreen('question');
    }
  }

  function handlePracticeAgain() {
    handleStartPractice();
  }

  // Switch to practice tab when starting from Study Up
  function handleStudyUpStartPractice() {
    setTab('practice');
    if (screen === 'welcome') {
      handleStartPractice();
    }
  }

  const currentItem = session[currentIndex];
  const isLastQuestion = currentIndex === session.length - 1;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-fg-red text-white sticky top-0 z-10 shadow-md">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🍔</span>
            <div>
              <p className="font-bold text-sm leading-tight">Five Guys Prep</p>
              <p className="text-xs text-red-200 leading-tight">Good luck, Liam!</p>
            </div>
          </div>
          {/* Show reset only during active session */}
          {screen !== 'welcome' && screen !== 'summary' && tab === 'practice' && (
            <button
              onClick={() => setScreen('welcome')}
              className="text-xs text-red-200 hover:text-white underline"
            >
              Restart
            </button>
          )}
        </div>
      </header>

      {/* Tab bar */}
      <div className="bg-white border-b border-gray-200 sticky top-[56px] z-10">
        <div className="max-w-lg mx-auto flex">
          <TabButton
            label="Practice"
            emoji="🎤"
            active={tab === 'practice'}
            onClick={() => setTab('practice')}
          />
          <TabButton
            label="Study Up"
            emoji="📖"
            active={tab === 'studyup'}
            onClick={() => setTab('studyup')}
          />
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {tab === 'studyup' ? (
          <StudyUpTab onStartPractice={handleStudyUpStartPractice} />
        ) : (
          <>
            {screen === 'welcome' && (
              <WelcomeScreen
                onStart={handleStartPractice}
                speechSupported={speechSupported}
              />
            )}

            {screen === 'question' && currentItem && (
              <QuestionScreen
                key={`q-${currentIndex}`}
                item={currentItem}
                questionNumber={currentIndex + 1}
                totalQuestions={session.length}
                speechSupported={speechSupported}
                onSubmit={handleAnswer}
              />
            )}

            {screen === 'feedback' && lastAnswer && (
              <FeedbackScreen
                item={lastAnswer.item}
                transcript={lastAnswer.transcript}
                scoreResult={lastAnswer.result}
                questionNumber={currentIndex + 1}
                totalQuestions={session.length}
                onNext={handleNext}
                isLast={isLastQuestion}
              />
            )}

            {screen === 'summary' && (
              <SummaryScreen
                answers={answers}
                onPracticeAgain={handlePracticeAgain}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

function TabButton({
  label,
  emoji,
  active,
  onClick,
}: {
  label: string;
  emoji: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-semibold transition-colors border-b-2 ${
        active
          ? 'text-fg-red border-fg-red'
          : 'text-gray-500 border-transparent hover:text-gray-700'
      }`}
    >
      <span>{emoji}</span>
      <span>{label}</span>
    </button>
  );
}
