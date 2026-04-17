import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { findUnscrambledWords } from "@/lib/unscrambler";
import { Play, Pause, RotateCcw, Flame, Trophy, Clock } from "lucide-react";

const GAME_DURATIONS = [30, 60, 120, 300];
const LETTER_SETS = [
  "listen",
  "stream",
  "python",
  "beauty",
  "kitchen",
  "blanket",
  "theater",
  "article",
];

export default function Game() {
  const [gameActive, setGameActive] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [score, setScore] = useState(0);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [currentLetters, setCurrentLetters] = useState(LETTER_SETS[0]);
  const [userInput, setUserInput] = useState("");
  const [gameOver, setGameOver] = useState(false);

  // Game timer
  useEffect(() => {
    if (!gameActive || gameOver) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setGameActive(false);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, gameOver]);

  const availableWords = useMemo(() => {
    return findUnscrambledWords(currentLetters);
  }, [currentLetters]);

  const handleSubmitWord = () => {
    if (!userInput.trim()) return;

    const word = userInput.toLowerCase();
    const allWords = findUnscrambledWords(currentLetters);

    if (allWords.includes(word) && !foundWords.includes(word)) {
      setFoundWords([...foundWords, word]);
      setScore(score + word.length * 10);
      setUserInput("");
    } else {
      // Visual feedback for invalid word
      setUserInput("");
    }
  };

  const handleStartGame = () => {
    setTimeRemaining(selectedDuration);
    setScore(0);
    setFoundWords([]);
    setUserInput("");
    setGameOver(false);
    setGameActive(true);
    setCurrentLetters(LETTER_SETS[Math.floor(Math.random() * LETTER_SETS.length)]);
  };

  const handleReset = () => {
    setGameActive(false);
    setGameOver(false);
    setTimeRemaining(selectedDuration);
    setScore(0);
    setFoundWords([]);
    setUserInput("");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        {!gameActive && !gameOver ? (
          // Game Setup Screen
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Word Game Mode
            </h1>
            <p className="text-center text-slate-600 mb-8 max-w-lg mx-auto">
              Find as many words as possible in the time limit. The more letters in a word, the
              more points you earn!
            </p>

            {/* Duration Selection */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">Select Duration</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {GAME_DURATIONS.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setSelectedDuration(duration)}
                    className={`p-4 rounded-lg border-2 transition-all font-semibold text-lg ${
                      selectedDuration === duration
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-slate-200 text-slate-600 hover:border-purple-300"
                    }`}
                  >
                    {duration < 60 ? `${duration}s` : `${Math.floor(duration / 60)}m`}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <Button
              onClick={handleStartGame}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg rounded-xl"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Game
            </Button>

            {/* Tips */}
            <div className="mt-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-slate-800 mb-3">💡 Game Tips</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Longer words are worth more points</li>
                <li>• Each word counts only once</li>
                <li>• Use the letters provided to form valid English words</li>
                <li>• Words must be 2+ letters long</li>
              </ul>
            </div>
          </div>
        ) : (
          // Game Screen
          <div className="space-y-6">
            {/* Game Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm font-medium">Time</span>
                  </div>
                  <div className="text-3xl font-bold font-mono">{formatTime(timeRemaining)}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Trophy className="w-5 h-5" />
                    <span className="text-sm font-medium">Score</span>
                  </div>
                  <div className="text-3xl font-bold">{score}</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Flame className="w-5 h-5" />
                    <span className="text-sm font-medium">Words</span>
                  </div>
                  <div className="text-3xl font-bold">{foundWords.length}</div>
                </div>
              </div>

              {/* Game Controls */}
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => setGameActive(!gameActive)}
                  size="sm"
                  variant={gameActive ? "secondary" : "outline"}
                  className="text-white border-white hover:bg-white hover:text-purple-600"
                >
                  {gameActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={handleReset}
                  size="sm"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-purple-600"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Letters Display */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <p className="text-slate-600 text-sm font-medium mb-3">Available Letters</p>
              <div className="text-4xl md:text-5xl font-bold tracking-widest text-indigo-600 mb-2">
                {currentLetters.toUpperCase()}
              </div>
              <p className="text-xs text-slate-500">
                {availableWords.length} possible words available
              </p>
            </div>

            {/* Input Area */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value.toLowerCase())}
                  onKeyPress={(e) => e.key === "Enter" && handleSubmitWord()}
                  placeholder="Type a word and press Enter..."
                  disabled={!gameActive}
                  className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-100 disabled:bg-slate-50"
                  autoFocus
                />
                <Button
                  onClick={handleSubmitWord}
                  disabled={!gameActive}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6"
                >
                  Submit
                </Button>
              </div>
            </div>

            {/* Found Words */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="font-semibold text-slate-800 mb-4">Found Words ({foundWords.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {foundWords.map((word) => (
                  <div
                    key={word}
                    className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300 rounded-lg p-3 text-center"
                  >
                    <p className="font-semibold text-purple-900">{word}</p>
                    <p className="text-xs text-purple-600">{word.length * 10} pts</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Game Over Screen */}
        {gameOver && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold text-slate-800 mb-2">Game Over!</h2>
              <p className="text-slate-600 mb-6">
                You found {foundWords.length} words and scored {score} points!
              </p>

              {/* Top Words */}
              <div className="mb-6 bg-slate-50 rounded-lg p-4">
                <p className="text-sm font-semibold text-slate-600 mb-3">Top Words Found</p>
                <div className="space-y-2">
                  {foundWords
                    .sort((a, b) => b.length - a.length)
                    .slice(0, 3)
                    .map((word) => (
                      <div key={word} className="flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-800">{word}</span>
                        <span className="text-purple-600 font-bold">{word.length * 10}pts</span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleReset} className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Play Again
                </Button>
                <Button onClick={handleReset} variant="outline" className="flex-1">
                  Menu
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
