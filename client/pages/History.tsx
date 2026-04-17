import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2, Clock, Share2, Copy } from "lucide-react";

interface SavedWord {
  id: string;
  word: string;
  letters: string;
  timestamp: string;
  isFavorite: boolean;
  category: string;
}

const MOCK_HISTORY: SavedWord[] = [
  {
    id: "1",
    word: "listen",
    letters: "listen",
    timestamp: "2 hours ago",
    isFavorite: true,
    category: "Found",
  },
  {
    id: "2",
    word: "stream",
    letters: "stream",
    timestamp: "5 hours ago",
    isFavorite: false,
    category: "Game",
  },
  {
    id: "3",
    word: "python",
    letters: "python",
    timestamp: "Yesterday",
    isFavorite: true,
    category: "Game",
  },
  {
    id: "4",
    word: "history",
    letters: "history",
    timestamp: "2 days ago",
    isFavorite: false,
    category: "Found",
  },
  {
    id: "5",
    word: "computer",
    letters: "computer",
    timestamp: "3 days ago",
    isFavorite: true,
    category: "Found",
  },
  {
    id: "6",
    word: "example",
    letters: "example",
    timestamp: "1 week ago",
    isFavorite: false,
    category: "Game",
  },
];

export default function History() {
  const [history, setHistory] = useState<SavedWord[]>(MOCK_HISTORY);
  const [filter, setFilter] = useState<"all" | "favorites" | "recent">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = history.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.letters.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "favorites") return item.isFavorite && matchesSearch;
    if (filter === "recent") {
      const isRecent =
        item.timestamp.includes("ago") || item.timestamp === "Yesterday";
      return isRecent && matchesSearch;
    }
    return matchesSearch;
  });

  const toggleFavorite = (id: string) => {
    setHistory(
      history.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setHistory(history.filter((item) => item.id !== id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Word History</h1>
          <p className="text-orange-100">
            Keep track of all your discovered and saved words. {history.length} total words
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          {/* Search Bar */}
          <div>
            <input
              type="text"
              placeholder="Search by word or letters..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-100 rounded-lg transition-all"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {[
              { key: "all", label: "All Words", count: history.length },
              {
                key: "favorites",
                label: "Favorites",
                count: history.filter((h) => h.isFavorite).length,
              },
              {
                key: "recent",
                label: "Recent",
                count: history.filter(
                  (h) => h.timestamp.includes("ago") || h.timestamp === "Yesterday"
                ).length,
              },
            ].map((btn) => (
              <button
                key={btn.key}
                onClick={() => setFilter(btn.key as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === btn.key
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {btn.label} ({btn.count})
              </button>
            ))}
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length > 0 ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="divide-y divide-slate-200">
              {filteredHistory.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-6 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left Side */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-slate-800">{item.word}</h3>
                        <button
                          onClick={() => toggleFavorite(item.id)}
                          className="text-xl transition-colors"
                        >
                          {item.isFavorite ? "❤️" : "🤍"}
                        </button>
                      </div>
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary">{item.category}</Badge>
                        <span className="flex items-center gap-1 text-sm text-slate-500">
                          <Clock className="w-4 h-4" />
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">
                        From letters:{" "}
                        <code className="bg-slate-100 px-2 py-1 rounded font-mono font-semibold">
                          {item.letters}
                        </code>
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(item.word)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition text-slate-600 hover:text-slate-800"
                        title="Copy word"
                      >
                        <Copy className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(item.letters)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition text-slate-600 hover:text-slate-800"
                        title="Copy letters"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition text-slate-600 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No Words Found</h3>
            <p className="text-slate-600">
              Start unscrambling words to build your history!
            </p>
          </div>
        )}

        {/* Stats Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-slate-600 text-sm font-medium mb-2">Total Words</p>
            <p className="text-3xl font-bold text-orange-600">{history.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-slate-600 text-sm font-medium mb-2">Favorites</p>
            <p className="text-3xl font-bold text-red-600">
              {history.filter((h) => h.isFavorite).length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <p className="text-slate-600 text-sm font-medium mb-2">Average Length</p>
            <p className="text-3xl font-bold text-blue-600">
              {history.length > 0
                ? Math.round((history.reduce((sum, h) => sum + h.word.length, 0) / history.length) * 10) / 10
                : 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
