import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { findUnscrambledWords } from "@/lib/unscrambler";
import {
  Play,
  Pause,
  RotateCcw,
  Flame,
  Trophy,
  Clock,
  Zap,
  TrendingUp,
  Settings,
  Lightbulb,
  BarChart3,
  Volume2,
  Target,
} from "lucide-react";

const LETTER_SETS = [
  "listen",
  "stream",
  "python",
  "beauty",
  "kitchen",
  "blanket",
  "theater",
  "article",
  "example",
  "computer",
];

type GameMode = "classic" | "endless" | "challenge" | "survival";

interface GameState {
  mode: GameMode;
  isActive: boolean;
  timeRemaining: number;
  score: number;
  foundWords: string[];
  userInput: string;
  currentLetters: string;
  gameOver: boolean;
  difficulty: "easy" | "medium" | "hard";
  soundEnabled: boolean;
  showHints: boolean;
  stats: {
    accuracy: number;
    wordsPerMinute: number;
    streak: number;
    totalPoints: number;
  };
}

const GAME_CONFIGS = {
  classic: { durations: [30, 60, 120, 300], name: "Classic Timed" },
  endless: { durations: [0], name: "Endless Mode" },
  challenge: { durations: [180], name: "Daily Challenge" },
  survival: { durations: [60], name: "Survival Mode" },
};

export default function Game() {
  const [selectedMode, setSelectedMode] = useState<GameMode>("classic");
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [gameState, setGameState] = useState<GameState>({
    mode: "classic",
    isActive: false,
    timeRemaining: 60,
    score: 0,
    foundWords: [],
    userInput: "",
    currentLetters: LETTER_SETS[0],
    gameOver: false,
    difficulty: "medium",
    soundEnabled: true,
    showHints: false,
    stats: { accuracy: 0, wordsPerMinute: 0, streak: 0, totalPoints: 0 },
  });

  // Game timer
  useEffect(() => {
    if (!gameState.isActive || gameState.gameOver) return;

    const timer = setInterval(() => {
      setGameState((prev) => {
        if (prev.timeRemaining <= 1) {
          return { ...prev, isActive: false, gameOver: true, timeRemaining: 0 };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState.isActive, gameState.gameOver]);

  const availableWords = useMemo(() => {
    return findUnscrambledWords(gameState.currentLetters);
  }, [gameState.currentLetters]);

  const handleSubmitWord = () => {
    if (!gameState.userInput.trim()) return;

    const word = gameState.userInput.toLowerCase();
    const allWords = findUnscrambledWords(gameState.currentLetters);

    if (allWords.includes(word) && !gameState.foundWords.includes(word)) {
      const points = word.length * 10;
      const newFoundWords = [...gameState.foundWords, word];

      setGameState((prev) => ({
        ...prev,
        foundWords: newFoundWords,
        score: prev.score + points,
        userInput: "",
        stats: {
          ...prev.stats,
          accuracy: Math.round((newFoundWords.length / allWords.length) * 100),
          wordsPerMinute: Math.round(
            (newFoundWords.length / (selectedDuration - prev.timeRemaining)) * 60
          ),
          streak: prev.stats.streak + 1,
          totalPoints: prev.stats.totalPoints + points,
        },
      }));

      if (gameState.soundEnabled) {
        // Simulate sound
        console.log("✓ Word accepted!");
      }
    } else {
      setGameState((prev) => ({ ...prev, userInput: "" }));
    }
  };

  const handleStartGame = () => {
    setGameState((prev) => ({
      ...prev,
      mode: selectedMode,
      timeRemaining: selectedDuration,
      score: 0,
      foundWords: [],
      userInput: "",
      gameOver: false,
      isActive: true,
      currentLetters: LETTER_SETS[Math.floor(Math.random() * LETTER_SETS.length)],
    }));
  };

  const handleReset = () => {
    setGameState((prev) => ({
      ...prev,
      isActive: false,
      gameOver: false,
      timeRemaining: selectedDuration,
      score: 0,
      foundWords: [],
      userInput: "",
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "easy") return "bg-green-100 text-green-800";
    if (difficulty === "medium") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4 md:p-8 lg:p-12 pb-12">
      <div className="max-w-7xl mx-auto space-y-6">
        {!gameState.isActive && !gameState.gameOver ? (
          // Game Selection Screen
          <div className="space-y-8">
            {/* Professional Header */}
            <div className="relative rounded-3xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600" />
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl" />
              </div>

              <div className="relative z-10 p-8 md:p-12 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                    <Flame className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold">WordZap Game Arena</h1>
                    <p className="text-purple-100 mt-2">Compete, challenge, and dominate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Game Mode Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  id: "classic" as GameMode,
                  name: "Classic Timed",
                  icon: "⏱️",
                  desc: "Race against time",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  id: "endless" as GameMode,
                  name: "Endless Mode",
                  icon: "♾️",
                  desc: "Play forever",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  id: "challenge" as GameMode,
                  name: "Daily Challenge",
                  icon: "🎯",
                  desc: "Complete daily puzzles",
                  color: "from-orange-500 to-red-500",
                },
                {
                  id: "survival" as GameMode,
                  name: "Survival Mode",
                  icon: "🔥",
                  desc: "Words get harder",
                  color: "from-green-500 to-emerald-500",
                },
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSelectedMode(mode.id)}
                  className={`p-6 rounded-2xl shadow-lg transition-all duration-300 border-2 ${
                    selectedMode === mode.id
                      ? "border-white scale-105 shadow-2xl"
                      : "border-transparent hover:scale-105"
                  } bg-gradient-to-br ${mode.color} text-white`}
                >
                  <div className="text-4xl mb-2">{mode.icon}</div>
                  <h3 className="font-bold text-lg">{mode.name}</h3>
                  <p className="text-sm opacity-90 mt-1">{mode.desc}</p>
                </button>
              ))}
            </div>

            {/* Duration Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Game Duration</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {GAME_CONFIGS[selectedMode].durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setSelectedDuration(duration)}
                    disabled={duration === 0}
                    className={`p-4 rounded-xl border-2 transition-all font-bold text-lg ${
                      selectedDuration === duration && duration !== 0
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-slate-200 text-slate-600 hover:border-purple-300"
                    } ${duration === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {duration === 0 ? "∞" : duration < 60 ? `${duration}s` : `${Math.floor(duration / 60)}m`}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Difficulty Level</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { level: "easy", label: "Easy", desc: "Shorter words & hints" },
                  { level: "medium", label: "Medium", desc: "Balanced challenge" },
                  { level: "hard", label: "Hard", desc: "Complex words only" },
                ].map((diff) => (
                  <button
                    key={diff.level}
                    onClick={() =>
                      setGameState((prev) => ({
                        ...prev,
                        difficulty: diff.level as any,
                      }))
                    }
                    className={`p-4 rounded-xl border-2 transition-all ${
                      gameState.difficulty === diff.level
                        ? `${getDifficultyColor(diff.level)} border-opacity-100 shadow-lg`
                        : "border-slate-200 text-slate-600 hover:border-purple-300"
                    }`}
                  >
                    <p className="font-bold">{diff.label}</p>
                    <p className="text-xs mt-1">{diff.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Game Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-purple-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                Game Settings
              </h2>
              <div className="space-y-4">
                {[
                  { key: "soundEnabled", label: "Sound Effects", icon: "🔊" },
                  { key: "showHints", label: "Show Hints", icon: "💡" },
                ].map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{setting.icon}</span>
                      <p className="font-medium text-slate-800">{setting.label}</p>
                    </div>
                    <button
                      onClick={() =>
                        setGameState((prev) => ({
                          ...prev,
                          [setting.key]: !prev[setting.key as keyof GameState],
                        }))
                      }
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                        gameState[setting.key as keyof GameState]
                          ? "bg-purple-600"
                          : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                          gameState[setting.key as keyof GameState] ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <Button
              onClick={handleStartGame}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-8 text-xl rounded-2xl shadow-xl"
            >
              <Play className="w-6 h-6 mr-3" />
              Start Game
            </Button>
          </div>
        ) : (
          // Active Game Screen
          <div className="space-y-6">
            {/* Game Header with Real-time Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Time */}
              <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">⏱️ Time</span>
                </div>
                <div className="text-4xl font-bold font-mono">{formatTime(gameState.timeRemaining)}</div>
              </div>

              {/* Score */}
              <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">🏆 Score</span>
                </div>
                <div className="text-4xl font-bold">{gameState.score}</div>
              </div>

              {/* Words Found */}
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">📝 Words</span>
                </div>
                <div className="text-4xl font-bold">{gameState.foundWords.length}</div>
              </div>

              {/* Accuracy */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">🎯 Accuracy</span>
                </div>
                <div className="text-4xl font-bold">{gameState.stats.accuracy}%</div>
              </div>

              {/* WPM */}
              <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm opacity-90">⚡ WPM</span>
                </div>
                <div className="text-4xl font-bold">{gameState.stats.wordsPerMinute}</div>
              </div>
            </div>

            {/* Letters Display */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center border-2 border-purple-100">
              <p className="text-slate-600 text-sm font-semibold mb-3 uppercase tracking-wide">Available Letters</p>
              <div className="text-6xl font-bold tracking-widest text-purple-600 mb-4">
                {gameState.currentLetters.toUpperCase()}
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-slate-600">Possible Words</p>
                  <p className="text-2xl font-bold text-slate-800">{availableWords.length}</p>
                </div>
                <div>
                  <p className="text-slate-600">Found</p>
                  <p className="text-2xl font-bold text-purple-600">{gameState.foundWords.length}</p>
                </div>
                <div>
                  <p className="text-slate-600">Remaining</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {availableWords.length - gameState.foundWords.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Hints (if enabled) */}
            {gameState.showHints && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-amber-200">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  Smart Hints
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availableWords
                    .filter((w) => !gameState.foundWords.includes(w))
                    .slice(0, 4)
                    .map((word, idx) => (
                      <div key={idx} className="p-2 bg-white rounded-lg border border-amber-200">
                        <p className="text-sm font-semibold text-slate-700">{word}</p>
                        <p className="text-xs text-slate-500">{word.length}L</p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={gameState.userInput}
                  onChange={(e) =>
                    setGameState((prev) => ({ ...prev, userInput: e.target.value.toLowerCase() }))
                  }
                  onKeyPress={(e) => e.key === "Enter" && handleSubmitWord()}
                  placeholder="Type a word and press Enter..."
                  disabled={!gameState.isActive}
                  className="flex-1 px-4 py-4 border-2 border-slate-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 rounded-lg transition-all text-lg"
                  autoFocus
                />
                <Button
                  onClick={handleSubmitWord}
                  disabled={!gameState.isActive}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8"
                  size="lg"
                >
                  Submit
                </Button>
              </div>
            </div>

            {/* Found Words */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-purple-600" />
                Found Words ({gameState.foundWords.length}/{availableWords.length})
              </h3>
              {gameState.foundWords.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                  {gameState.foundWords.map((word) => (
                    <div
                      key={word}
                      className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300 rounded-lg p-3 text-center"
                    >
                      <p className="font-bold text-purple-900">{word}</p>
                      <p className="text-xs text-purple-600 font-semibold">{word.length * 10}pts</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-600 text-center py-4">No words found yet. Start typing!</p>
              )}
            </div>

            {/* Game Controls */}
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() =>
                  setGameState((prev) => ({
                    ...prev,
                    isActive: !prev.isActive,
                  }))
                }
                size="lg"
                className={gameState.isActive ? "bg-orange-600 hover:bg-orange-700" : "bg-green-600 hover:bg-green-700"}
              >
                {gameState.isActive ? <Pause className="w-5 h-5 mr-2" /> : <Play className="w-5 h-5 mr-2" />}
                {gameState.isActive ? "Pause" : "Resume"}
              </Button>
              <Button onClick={handleReset} variant="outline" size="lg">
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        )}

        {/* Game Over Modal */}
        {gameState.gameOver && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full overflow-hidden">
              {/* Celebration */}
              <div className="text-center mb-6">
                <div className="text-8xl mb-4 animate-bounce">🎉</div>
                <h2 className="text-4xl font-bold text-slate-800">Game Over!</h2>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-purple-50 rounded-lg text-center border-2 border-purple-200">
                  <p className="text-slate-600 text-sm">Final Score</p>
                  <p className="text-3xl font-bold text-purple-600">{gameState.score}</p>
                </div>
                <div className="p-4 bg-pink-50 rounded-lg text-center border-2 border-pink-200">
                  <p className="text-slate-600 text-sm">Words Found</p>
                  <p className="text-3xl font-bold text-pink-600">{gameState.foundWords.length}</p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg text-center border-2 border-blue-200">
                  <p className="text-slate-600 text-sm">Accuracy</p>
                  <p className="text-3xl font-bold text-blue-600">{gameState.stats.accuracy}%</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg text-center border-2 border-green-200">
                  <p className="text-slate-600 text-sm">Words/Min</p>
                  <p className="text-3xl font-bold text-green-600">{gameState.stats.wordsPerMinute}</p>
                </div>
              </div>

              {/* Top Words */}
              {gameState.foundWords.length > 0 && (
                <div className="mb-6 p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
                  <p className="text-sm font-semibold text-slate-700 mb-3">Top Words Found</p>
                  <div className="space-y-2">
                    {gameState.foundWords
                      .sort((a, b) => b.length - a.length)
                      .slice(0, 3)
                      .map((word) => (
                        <div key={word} className="flex items-center justify-between text-sm">
                          <span className="font-semibold text-slate-800">{word}</span>
                          <Badge className="bg-purple-100 text-purple-800">{word.length * 10}pts</Badge>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button onClick={handleReset} className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Play Again
                </Button>
                <Button onClick={handleReset} variant="outline" className="flex-1 border-2">
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
