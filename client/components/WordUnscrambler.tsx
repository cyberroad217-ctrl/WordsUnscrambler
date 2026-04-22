import { useState, useMemo } from "react";
import { findUnscrambledWords, getWordStats, type WordFilterOptions } from "@/lib/unscrambler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Zap, Copy, Check, ChevronDown } from "lucide-react";

export function WordUnscrambler() {
  const [inputLetters, setInputLetters] = useState("");
  const [filters, setFilters] = useState<WordFilterOptions>({});
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [copiedWord, setCopiedWord] = useState<string | null>(null);

  // Find unscrambled words based on current filters
  const unscrambledWords = useMemo(() => {
    return findUnscrambledWords(inputLetters, filters);
  }, [inputLetters, filters]);

  const stats = useMemo(() => {
    return getWordStats(unscrambledWords);
  }, [unscrambledWords]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow letters and spaces
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

  const letterCount = inputLetters.replace(/\s/g, "").length;
  const uniqueLetters = new Set(inputLetters.toLowerCase().replace(/\s/g, "")).size;
  const hasActiveFilters = Object.values(filters).some(v => v);

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 md:w-10 md:h-10 text-indigo-600" />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Word Unscrambler
            </h1>
            <Zap className="w-8 h-8 md:w-10 md:h-10 text-indigo-600" />
          </div>
          <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
            Unlock all possible words from your letters. Type or paste letters to get started!
          </p>
        </div>

        {/* Main Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="space-y-4">
            {/* Input Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700">
                Enter or Paste Letters
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={inputLetters}
                  onChange={handleInputChange}
                  placeholder="Type letters here... (e.g., 'listen')"
                  className="w-full py-4 px-4 text-base md:text-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-xl transition-all"
                />
                {inputLetters && (
                  <button
                    onClick={handlePaste}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500 hover:text-indigo-600 transition-colors"
                    title="Paste from clipboard"
                  >
                    📋
                  </button>
                )}
              </div>
              {letterCount > 0 && (
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{letterCount} letters ({uniqueLetters} unique)</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClear}
                    className="h-auto p-1 text-slate-500 hover:text-slate-700"
                  >
                    Clear
                  </Button>
                </div>
              )}
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full flex items-center justify-between border-2 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 rounded-lg p-3 transition-all text-left"
            >
              <span className="flex items-center gap-2">
                <span>🔍 Filters</span>
                {hasActiveFilters && (
                  <Badge variant="secondary" className="ml-2">
                    Active
                  </Badge>
                )}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  filtersOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Filter Section */}
            {filtersOpen && (
              <div className="mt-4 space-y-4 pt-4 border-t border-slate-200">
                {/* Starts With */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Starts with
                  </label>
                  <Input
                    type="text"
                    value={filters.startsWith || ""}
                    onChange={(e) =>
                      setFilters({ ...filters, startsWith: e.target.value || undefined })
                    }
                    placeholder="e.g., 's' or 'st'"
                    className="w-full border-2 border-slate-200 focus:border-indigo-500"
                    maxLength={3}
                  />
                </div>

                {/* Ends With */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Ends with
                  </label>
                  <Input
                    type="text"
                    value={filters.endsWith || ""}
                    onChange={(e) =>
                      setFilters({ ...filters, endsWith: e.target.value || undefined })
                    }
                    placeholder="e.g., 'e' or 'ed'"
                    className="w-full border-2 border-slate-200 focus:border-indigo-500"
                    maxLength={3}
                  />
                </div>

                {/* Contains */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Contains
                  </label>
                  <Input
                    type="text"
                    value={filters.contains || ""}
                    onChange={(e) =>
                      setFilters({ ...filters, contains: e.target.value || undefined })
                    }
                    placeholder="e.g., 'ing' (must contain)"
                    className="w-full border-2 border-slate-200 focus:border-indigo-500"
                    maxLength={5}
                  />
                </div>

                {/* Required Letter */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Must include letter
                  </label>
                  <Input
                    type="text"
                    value={filters.includeRequired || ""}
                    onChange={(e) =>
                      setFilters({ ...filters, includeRequired: e.target.value || undefined })
                    }
                    placeholder="e.g., 'a' (single letter)"
                    className="w-full border-2 border-slate-200 focus:border-indigo-500"
                    maxLength={1}
                  />
                </div>

                {/* Word Length */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
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
                      className="w-full border-2 border-slate-200 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
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
                      className="w-full border-2 border-slate-200 focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Clear Filters Button */}
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilters({})}
                    className="w-full text-slate-600 hover:text-slate-700"
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {inputLetters && (
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-2xl md:text-3xl font-bold text-indigo-600">
                  {stats.totalWords}
                </div>
                <div className="text-xs md:text-sm text-slate-600">Words found</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-2xl md:text-3xl font-bold text-blue-600">
                  {stats.maxLength}
                </div>
                <div className="text-xs md:text-sm text-slate-600">Longest word</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-2xl md:text-3xl font-bold text-emerald-600">
                  {stats.avgLength}
                </div>
                <div className="text-xs md:text-sm text-slate-600">Avg. length</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <div className="text-2xl md:text-3xl font-bold text-violet-600">
                  {stats.minLength}
                </div>
                <div className="text-xs md:text-sm text-slate-600">Shortest word</div>
              </div>
            </div>

            {/* Words Grid */}
            {unscrambledWords.length > 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6">
                  All Possible Words
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {unscrambledWords.map((word) => (
                    <button
                      key={word}
                      onClick={() => handleCopy(word)}
                      className="group relative bg-gradient-to-br from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 border-2 border-indigo-200 hover:border-indigo-400 rounded-lg p-3 md:p-4 transition-all duration-200 text-left"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="text-base md:text-lg font-bold text-indigo-900">
                            {word}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            {word.length} letters
                          </div>
                        </div>
                        {copiedWord === word ? (
                          <Check className="w-4 h-4 md:w-5 md:h-5 text-emerald-600 flex-shrink-0 mt-1" />
                        ) : (
                          <Copy className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-indigo-600 flex-shrink-0 mt-1 transition-colors" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
                <div className="text-5xl md:text-6xl mb-4">🤔</div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-700 mb-2">
                  No words found
                </h3>
                <p className="text-slate-600">
                  Try adjusting your letters or filters to find more words.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!inputLetters && (
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <div className="text-6xl md:text-7xl mb-6">✨</div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
              Ready to unscramble?
            </h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">
              Start by typing or pasting a group of letters above, and watch as we find all the
              real words you can make!
            </p>
            <Button
              onClick={handlePaste}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 py-6 text-base md:text-lg rounded-xl"
            >
              📋 Paste from Clipboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
