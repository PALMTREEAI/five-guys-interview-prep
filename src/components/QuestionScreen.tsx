import { useState, useEffect, useRef, useCallback } from 'react';
import { CATEGORY_LABELS } from '../data/questions';
import type { SessionItem } from '../data/questions';

interface QuestionScreenProps {
  item: SessionItem;
  questionNumber: number;
  totalQuestions: number;
  speechSupported: boolean;
  onSubmit: (transcript: string, durationSeconds: number) => void;
}

type InputMode = 'voice' | 'text';


export default function QuestionScreen({
  item,
  questionNumber,
  totalQuestions,
  speechSupported,
  onSubmit,
}: QuestionScreenProps) {
  const [inputMode, setInputMode] = useState<InputMode>(speechSupported ? 'voice' : 'text');
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const [textInput, setTextInput] = useState('');
  const [duration, setDuration] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(0);
  const finalTranscriptRef = useRef<string>('');

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopTimerAndRecognition();
    };
  }, []);

  function stopTimerAndRecognition() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_) { /* ignore */ }
      recognitionRef.current = null;
    }
  }

  const startRecording = useCallback(() => {
    setMicError(null);
    setTranscript('');
    setInterimText('');
    finalTranscriptRef.current = '';
    setDuration(0);

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognitionAPI();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsRecording(true);
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setDuration(Math.floor((Date.now() - startTimeRef.current) / 1000));
      }, 500);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = finalTranscriptRef.current;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript + ' ';
        } else {
          interim += result[0].transcript;
        }
      }

      finalTranscriptRef.current = final;
      setTranscript(final);
      setInterimText(interim);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'no-speech') return; // just keep going
      if (event.error === 'not-allowed') {
        setMicError('Microphone access was denied. Please allow mic access in your browser settings, or switch to typing.');
        setIsRecording(false);
        stopTimerAndRecognition();
        return;
      }
      // Auto-restart on other errors
      try {
        recognition.start();
      } catch (_) { /* ignore */ }
    };

    recognition.onend = () => {
      // Auto-restart if still recording
      if (isRecordingRef.current) {
        try { recognition.start(); } catch (_) { /* ignore */ }
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (e) {
      setMicError('Could not start microphone. Try typing your answer instead.');
    }
  }, []);

  // Need a ref to track recording state inside the onend closure
  const isRecordingRef = useRef(false);
  isRecordingRef.current = isRecording;

  const stopRecording = useCallback(() => {
    isRecordingRef.current = false;
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (_) { /* ignore */ }
      recognitionRef.current = null;
    }
    setInterimText('');
    return elapsed;
  }, []);

  const handleStopAndSubmit = () => {
    const elapsed = stopRecording();
    const finalText = finalTranscriptRef.current.trim();
    if (!finalText) {
      setMicError("Hmm, nothing was captured. Try again or switch to typing.");
      return;
    }
    onSubmit(finalText, elapsed);
  };

  const handleTextSubmit = () => {
    const text = textInput.trim();
    if (!text) return;
    // Use 30 seconds as estimated duration for text submissions
    onSubmit(text, 30);
  };

  const progressPercent = Math.round(((questionNumber - 1) / totalQuestions) * 100);
  const label = CATEGORY_LABELS[item.question.category];
  const displayTranscript = transcript + interimText;

  return (
    <div className="flex flex-col min-h-full px-4 pt-4 pb-6 max-w-lg mx-auto fade-in">

      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
          <span className="text-xs font-semibold text-gray-500">{questionNumber} / {totalQuestions}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-fg-red rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-5 flex-shrink-0">
        <p className="text-xl font-semibold text-gray-900 leading-snug text-center">
          {item.variant}
        </p>
      </div>

      {/* Mode toggle */}
      {speechSupported && (
        <div className="flex bg-gray-100 rounded-xl p-1 mb-5">
          <button
            onClick={() => { setInputMode('voice'); setMicError(null); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              inputMode === 'voice'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            🎤 Voice
          </button>
          <button
            onClick={() => { setInputMode('text'); stopRecording(); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
              inputMode === 'text'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500'
            }`}
          >
            ⌨️ Type
          </button>
        </div>
      )}

      {/* Error */}
      {micError && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4 text-sm text-red-700">
          {micError}
        </div>
      )}

      {/* VOICE MODE */}
      {inputMode === 'voice' && (
        <div className="flex flex-col items-center gap-4">
          {/* Mic button */}
          {!isRecording ? (
            <button
              onClick={startRecording}
              className="w-24 h-24 rounded-full bg-fg-red hover:bg-fg-darkred active:scale-95 text-white flex items-center justify-center shadow-lg transition-all duration-150"
              aria-label="Start recording"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleStopAndSubmit}
              className="w-24 h-24 rounded-full bg-fg-red text-white flex items-center justify-center shadow-lg mic-pulse"
              aria-label="Stop recording and submit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
                <path fillRule="evenodd" d="M4.5 7.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9Z" clipRule="evenodd" />
              </svg>
            </button>
          )}

          {/* Timer & status */}
          {isRecording ? (
            <div className="text-center">
              <p className="text-fg-red font-bold text-lg tabular-nums">{formatTime(duration)}</p>
              <p className="text-sm text-gray-500 mt-0.5">Recording — tap to stop &amp; submit</p>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Tap the mic to start speaking</p>
          )}

          {/* Live transcript */}
          {displayTranscript && (
            <div className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 min-h-[80px]">
              <p className="text-xs font-semibold text-gray-400 mb-1">What you said</p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {transcript}
                {interimText && <span className="text-gray-400 italic">{interimText}</span>}
              </p>
            </div>
          )}

          {/* Manual submit if they stopped but have a transcript */}
          {!isRecording && transcript && (
            <button
              onClick={() => {
                const finalText = finalTranscriptRef.current.trim() || transcript;
                onSubmit(finalText, duration);
              }}
              className="w-full bg-fg-red hover:bg-fg-darkred active:scale-95 text-white font-bold py-4 rounded-2xl shadow-md transition-all duration-150"
            >
              Submit Answer
            </button>
          )}
        </div>
      )}

      {/* TEXT MODE */}
      {inputMode === 'text' && (
        <div className="flex flex-col gap-4">
          <textarea
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            placeholder="Type your answer here..."
            rows={6}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-base resize-none focus:outline-none focus:ring-2 focus:ring-fg-red focus:border-transparent bg-white"
            autoFocus
          />
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-400">{textInput.trim().split(/\s+/).filter(w => w).length} words</span>
            <span className="text-xs text-gray-400">Aim for 3–5 sentences</span>
          </div>
          <button
            onClick={handleTextSubmit}
            disabled={textInput.trim().length < 3}
            className="w-full bg-fg-red hover:bg-fg-darkred active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-md transition-all duration-150"
          >
            Submit Answer
          </button>
        </div>
      )}
    </div>
  );
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
