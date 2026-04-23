import { useState, useMemo } from "react";
import { findUnscrambledWords, getWordStats, type WordFilterOptions } from "@/lib/unscrambler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Copy,
  Check,
  ChevronDown,
  BarChart3,
  Settings,
  Lightbulb,
  Download,
  Share2,
  Eye,
  Filter,
  Wand2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export function WordUnscrambler() {
  const [inputLetters, setInputLetters] = useState("");
  const [filters, setFilters] = useState<WordFilterOptions>({});
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [copiedWord, setCopiedWord] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sortBy, setSortBy] = useState<"length" | "alphabetical" | "frequency">("length");
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [showStats, setShowStats] = useState(false);
  const [problemSolverMode, setProblemSolverMode] = useState(false);

  const unscrambledWords = useMemo(() => {
    let words = findUnscrambledWords(inputLetters, filters);

    // Apply sorting
    if (sortBy === "length") {
      words.sort((a, b) => b.length - a.length);
    } else if (sortBy === "alphabetical") {
      words.sort((a, b) => a.localeCompare(b));
    } else if (sortBy === "frequency") {
      // Simple frequency estimation - common words first
      const commonWords = ["the", "and", "are", "for", "you", "all", "not", "but", "can"];
      words.sort((a, b) => {
        const aCommon = commonWords.includes(a) ? 1 : 0;
        const bCommon = commonWords.includes(b) ? 1 : 0;
        return bCommon - aCommon;
      });
    }

    return words;
  }, [inputLetters, filters, sortBy]);

  const stats = useMemo(() => {
    return getWordStats(unscrambledWords);
  }, [unscrambledWords]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setInputLetters(value);
  };

  const handleCopy = (word: string) => {
    navigator.clipboard.writeText(word);
    setCopiedWord(word);
    setTimeout(() => setCopiedWord(null), 2000);
  };

  const handleClear = () => {
    setInputLetters("");
    setFilters({});
    setSelectedWords([]);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const letters = text.replace(/[^a-zA-Z\s]/g, "");
      setInputLetters(letters);
    } catch {
      // Clipboard access denied
    }
  };

  const toggleWordSelection = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter((w) => w !== word));
    } else {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const getWordDifficulty = (word: string): "Easy" | "Medium" | "Hard" => {
    if (word.length <= 3) return "Easy";
    if (word.length <= 6) return "Medium";
    return "Hard";
  };

  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === "Easy") return "bg-green-100 text-green-800";
    if (difficulty === "Medium") return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const letterCount = inputLetters.replace(/\s/g, "").length;
  const uniqueLetters = new Set(inputLetters.toLowerCase().replace(/\s/g, "")).size;
  const hasActiveFilters = Object.values(filters).some((v) => v);

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Professional Header */}
        <div className="relative rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600" />
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl" />
          </div>

          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                  <Zap className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">Word Unscrambler Pro</h1>
                  <p className="text-indigo-100 mt-2">Advanced word analysis & solver engine</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold">{unscrambledWords.length}</p>
                <p className="text-indigo-100">Words Found</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Input Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel - Larger */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border-2 border-indigo-100">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">
                  📝 Enter Letters
                </label>
                <div className="relative group">
                  <Input
                    type="text"
                    value={inputLetters}
                    onChange={handleInputChange}
                    placeholder="Type or paste letters here... (e.g., 'listen')"
                    className="w-full py-4 px-6 text-lg border-2 border-indigo-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 rounded-xl transition-all"
                  />
                  {inputLetters && (
                    <button
                      onClick={handlePaste}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl hover:scale-110 transition-transform"
                      title="Paste from clipboard"
                    >
                      📋
                    </button>
                  )}
                </div>
              </div>

              {letterCount > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-indigo-50 rounded-lg text-center border-2 border-indigo-200">
                    <p className="text-2xl font-bold text-indigo-600">{letterCount}</p>
                    <p className="text-xs text-slate-600">Letters</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg text-center border-2 border-blue-200">
                    <p className="text-2xl font-bold text-blue-600">{uniqueLetters}</p>
                    <p className="text-xs text-slate-600">Unique</p>
                  </div>
                  <div className="p-3 bg-cyan-50 rounded-lg text-center border-2 border-cyan-200">
                    <p className="text-2xl font-bold text-cyan-600">{unscrambledWords.length}</p>
                    <p className="text-xs text-slate-600">Found</p>
                  </div>
                </div>
              )}

              {/* Quick Action Buttons */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="border-2 border-slate-300 hover:border-slate-400"
                  size="sm"
                >
                  Clear All
                </Button>
                <Button onClick={handlePaste} size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                  📋 Paste
                </Button>
                <Button
                  onClick={() => setShowStats(!showStats)}
                  variant="outline"
                  size="sm"
                  className="border-2 border-slate-300"
                >
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Stats
                </Button>
                <Button
                  onClick={() => setProblemSolverMode(!problemSolverMode)}
                  variant="outline"
                  size="sm"
                  className="border-2 border-slate-300"
                >
                  <Lightbulb className="w-4 h-4 mr-1" />
                  Solver
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats Sidebar */}
          <div className="space-y-4">
            {/* Main Stats Card */}
            <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="font-bold text-sm mb-4 uppercase tracking-wide opacity-90">Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Longest</span>
                  <span className="text-2xl font-bold">{stats.maxLength}</span>
                </div>
                <div className="h-0.5 bg-white/20" />
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Average</span>
                  <span className="text-2xl font-bold">{stats.avgLength}</span>
                </div>
                <div className="h-0.5 bg-white/20" />
                <div className="flex justify-between items-center">
                  <span className="text-sm opacity-90">Shortest</span>
                  <span className="text-2xl font-bold">{stats.minLength}</span>
                </div>
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-white rounded-2xl shadow-lg p-4 space-y-2 border-2 border-slate-100">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" className="w-full border-2" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Problem Solver Mode */}
        {problemSolverMode && inputLetters && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl shadow-lg p-6 border-2 border-amber-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              Smart Solver Suggestions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: "🎯",
                  title: "Common Words",
                  desc: "Focus on frequently used words",
                },
                {
                  icon: "📊",
                  title: "Pattern Match",
                  desc: "Look for common letter combinations",
                },
                {
                  icon: "🔤",
                  title: "Vowel Balance",
                  desc: "Words with balanced vowel/consonant ratio",
                },
              ].map((tip, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-lg border-2 border-amber-100 hover:border-amber-300 transition-all"
                >
                  <p className="text-2xl mb-2">{tip.icon}</p>
                  <p className="font-semibold text-slate-800 text-sm">{tip.title}</p>
                  <p className="text-xs text-slate-600 mt-1">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Advanced Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-slate-100">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="w-full flex items-center justify-between font-bold text-slate-800 hover:text-indigo-600 transition"
          >
            <span className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Advanced Filters
              {hasActiveFilters && <Badge className="ml-2 bg-indigo-600">Active</Badge>}
            </span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
            />
          </button>

          {filtersOpen && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t-2 border-slate-200">
              {/* Starts With */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Starts with
                </label>
                <Input
                  type="text"
                  value={filters.startsWith || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, startsWith: e.target.value || undefined })
                  }
                  placeholder="e.g., 's' or 'st'"
                  className="border-2 border-slate-200 focus:border-indigo-500"
                  maxLength={3}
                />
              </div>

              {/* Ends With */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Ends with
                </label>
                <Input
                  type="text"
                  value={filters.endsWith || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, endsWith: e.target.value || undefined })
                  }
                  placeholder="e.g., 'e' or 'ed'"
                  className="border-2 border-slate-200 focus:border-indigo-500"
                  maxLength={3}
                />
              </div>

              {/* Contains */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Contains
                </label>
                <Input
                  type="text"
                  value={filters.contains || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, contains: e.target.value || undefined })
                  }
                  placeholder="e.g., 'ing'"
                  className="border-2 border-slate-200 focus:border-indigo-500"
                  maxLength={5}
                />
              </div>

              {/* Required Letter */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Must include
                </label>
                <Input
                  type="text"
                  value={filters.includeRequired || ""}
                  onChange={(e) =>
                    setFilters({ ...filters, includeRequired: e.target.value || undefined })
                  }
                  placeholder="e.g., 'a'"
                  className="border-2 border-slate-200 focus:border-indigo-500"
                  maxLength={1}
                />
              </div>

              {/* Min Length */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Min length
                </label>
                <Input
                  type="number"
                  value={filters.minLength || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minLength: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  placeholder="2"
                  min="2"
                  max="20"
                  className="border-2 border-slate-200 focus:border-indigo-500"
                />
              </div>

              {/* Max Length */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Max length
                </label>
                <Input
                  type="number"
                  value={filters.maxLength || ""}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      maxLength: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                  placeholder="20"
                  min="2"
                  max="20"
                  className="border-2 border-slate-200 focus:border-indigo-500"
                />
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  onClick={() => setFilters({})}
                  className="text-slate-600 hover:text-slate-700 col-span-full"
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Sorting Options */}
        {inputLetters && (
          <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-slate-100">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-slate-700">Sort by:</span>
              {[
                { key: "length", label: "Longest First" },
                { key: "alphabetical", label: "A-Z" },
                { key: "frequency", label: "Frequency" },
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setSortBy(option.key as any)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    sortBy === option.key
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Words Results Grid */}
        {inputLetters && unscrambledWords.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-indigo-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                Found {unscrambledWords.length} Words
              </h2>
              {selectedWords.length > 0 && (
                <Badge className="bg-indigo-600">{selectedWords.length} selected</Badge>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {unscrambledWords.map((word) => {
                const difficulty = getWordDifficulty(word);
                const isSelected = selectedWords.includes(word);

                return (
                  <div
                    key={word}
                    onClick={() => toggleWordSelection(word)}
                    className={`group relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-indigo-100 border-indigo-500 shadow-lg"
                        : "bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200 hover:border-indigo-400 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1">
                        <div className="text-lg font-bold text-indigo-900">{word}</div>
                        <div className="text-xs text-slate-500 mt-1">{word.length} letters</div>
                      </div>
                      {copiedWord === word ? (
                        <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <Copy
                          className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 flex-shrink-0 transition-colors cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(word);
                          }}
                        />
                      )}
                    </div>

                    <div className="flex gap-1">
                      <Badge className={`text-xs ${getDifficultyColor(difficulty)}`}>
                        {difficulty}
                      </Badge>
                    </div>

                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : inputLetters ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-slate-100">
            <div className="text-5xl mb-4">🤔</div>
            <h3 className="text-xl font-bold text-slate-700 mb-2">No words found</h3>
            <p className="text-slate-600">Try adjusting your letters or filters</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-lg p-12 text-center border-2 border-indigo-200">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Ready to unscramble?</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Enter letters above and watch as our advanced solver finds all possible words
              instantly!
            </p>
            <Button
              onClick={handlePaste}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Unscrambling
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
