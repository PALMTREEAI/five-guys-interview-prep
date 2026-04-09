interface WelcomeScreenProps {
  onStart: () => void;
  speechSupported: boolean;
}

export default function WelcomeScreen({ onStart, speechSupported }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center px-5 py-8 max-w-lg mx-auto fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🍔</div>
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          Good luck, Liam!
        </h1>
        <p className="text-fg-red font-semibold text-lg mt-1">Five Guys Interview Prep</p>
      </div>

      {/* How it works */}
      <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">How it works</p>
        <div className="space-y-4">
          <Step number={1} title="Answer 10 questions" description="One at a time — speak out loud or type your answer" />
          <Step number={2} title="Get instant feedback" description="Score out of 5 plus one praise and one tip" />
          <Step number={3} title="See your summary" description="Review your full session and key strengths" />
        </div>
      </div>

      {/* Voice status */}
      {!speechSupported && (
        <div className="w-full bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-5 flex items-start gap-3">
          <span className="text-yellow-500 text-lg mt-0.5">⚠️</span>
          <div>
            <p className="text-sm font-medium text-yellow-800">Voice input not available</p>
            <p className="text-xs text-yellow-700 mt-0.5">
              Your browser doesn't support the mic. Text input is ready to go — it works just as well.
            </p>
          </div>
        </div>
      )}

      {speechSupported && (
        <div className="w-full bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5 flex items-start gap-3">
          <span className="text-green-500 text-lg mt-0.5">🎤</span>
          <div>
            <p className="text-sm font-medium text-green-800">Voice input is ready</p>
            <p className="text-xs text-green-700 mt-0.5">
              Speak your answers out loud — it builds real interview confidence. You can also switch to typing.
            </p>
          </div>
        </div>
      )}

      {/* Start button */}
      <button
        onClick={onStart}
        className="w-full bg-fg-red hover:bg-fg-darkred active:scale-95 text-white font-bold text-lg py-4 rounded-2xl shadow-md transition-all duration-150"
      >
        Start Practice
      </button>

      <p className="text-xs text-gray-400 mt-4 text-center">
        10 randomized questions · ~10 minutes · no login required
      </p>
    </div>
  );
}

function Step({ number, title, description }: { number: number; title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-fg-red text-white text-sm font-bold flex items-center justify-center">
        {number}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
    </div>
  );
}
