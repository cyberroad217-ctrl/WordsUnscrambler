import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Trophy, Flame, TrendingUp, Globe, Users, Clock } from "lucide-react";

interface Player {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  gamesPlayed: number;
  avgWordsPerGame: number;
  streak: number;
  badge?: string;
}

const MOCK_LEADERBOARD: Player[] = [
  {
    rank: 1,
    name: "WordMaster",
    avatar: "👑",
    score: 12500,
    gamesPlayed: 148,
    avgWordsPerGame: 28,
    streak: 45,
    badge: "Champion",
  },
  {
    rank: 2,
    name: "LinguaLion",
    avatar: "🦁",
    score: 11800,
    gamesPlayed: 132,
    avgWordsPerGame: 26,
    streak: 32,
    badge: "Legend",
  },
  {
    rank: 3,
    name: "ScrambleKing",
    avatar: "👸",
    score: 10750,
    gamesPlayed: 125,
    avgWordsPerGame: 24,
    streak: 28,
    badge: "Elite",
  },
  {
    rank: 4,
    name: "WordWizard",
    avatar: "🧙",
    score: 9920,
    gamesPlayed: 118,
    avgWordsPerGame: 22,
    streak: 21,
  },
  {
    rank: 5,
    name: "You",
    avatar: "⭐",
    score: 8450,
    gamesPlayed: 95,
    avgWordsPerGame: 20,
    streak: 7,
  },
  {
    rank: 6,
    name: "WordNinja",
    avatar: "🥷",
    score: 7890,
    gamesPlayed: 88,
    avgWordsPerGame: 18,
    streak: 14,
  },
  {
    rank: 7,
    name: "LetterLover",
    avatar: "💌",
    score: 7340,
    gamesPlayed: 82,
    avgWordsPerGame: 17,
    streak: 9,
  },
  {
    rank: 8,
    name: "UnscramblePro",
    avatar: "🚀",
    score: 6780,
    gamesPlayed: 76,
    avgWordsPerGame: 16,
    streak: 5,
  },
  {
    rank: 9,
    name: "VocabViper",
    avatar: "🐍",
    score: 6120,
    gamesPlayed: 69,
    avgWordsPerGame: 15,
    streak: 3,
  },
  {
    rank: 10,
    name: "PhraseFinder",
    avatar: "🔎",
    score: 5650,
    gamesPlayed: 63,
    avgWordsPerGame: 14,
    streak: 2,
  },
];

type FilterType = "global" | "monthly" | "weekly" | "friends";

export default function Leaderboard() {
  const [filter, setFilter] = useState<FilterType>("global");
  const [sortBy, setSortBy] = useState<"score" | "streak" | "games">("score");

  const sortedPlayers = [...MOCK_LEADERBOARD].sort((a, b) => {
    if (sortBy === "score") return b.score - a.score;
    if (sortBy === "streak") return b.streak - a.streak;
    if (sortBy === "games") return b.gamesPlayed - a.gamesPlayed;
    return 0;
  });

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  const getBadgeColor = (badge?: string) => {
    if (badge === "Champion") return "bg-yellow-100 text-yellow-800";
    if (badge === "Legend") return "bg-purple-100 text-purple-800";
    if (badge === "Elite") return "bg-blue-100 text-blue-800";
    return "bg-slate-100 text-slate-800";
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-yellow-50 to-orange-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl shadow-lg p-8 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Trophy className="w-10 h-10" />
                Global Leaderboard
              </h1>
              <p className="text-amber-100">
                Compete with players worldwide and climb the rankings
              </p>
            </div>
            <div className="text-5xl">🏆</div>
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          {/* Filter Buttons */}
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3">Leaderboard</p>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "global", label: "Global", icon: Globe },
                { key: "monthly", label: "This Month", icon: Calendar },
                { key: "weekly", label: "This Week", icon: Clock },
                { key: "friends", label: "Friends", icon: Users },
              ].map((btn) => {
                const Icon = btn.icon;
                return (
                  <button
                    key={btn.key}
                    onClick={() => setFilter(btn.key as FilterType)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      filter === btn.key
                        ? "bg-orange-500 text-white shadow-lg"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {btn.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <p className="text-sm font-semibold text-slate-700 mb-3">Sort By</p>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "score", label: "Score" },
                { key: "streak", label: "Streak", icon: Flame },
                { key: "games", label: "Games Played" },
              ].map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => setSortBy(btn.key as any)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy === btn.key
                      ? "bg-orange-100 text-orange-700 border-2 border-orange-500"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 border-2 border-transparent"
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sortedPlayers.slice(0, 3).map((player, idx) => {
            const positions = [
              { height: "h-64", offsetY: "0" },
              { height: "h-56", offsetY: "8" },
              { height: "h-52", offsetY: "16" },
            ];
            const pos = positions[idx];
            const medal = getMedalEmoji(idx + 1);

            return (
              <div
                key={player.rank}
                className={`relative ${pos.height} flex flex-col items-center justify-end`}
              >
                {/* Podium */}
                <div
                  className={`w-full bg-gradient-to-b ${
                    idx === 0
                      ? "from-yellow-400 to-yellow-500"
                      : idx === 1
                        ? "from-slate-400 to-slate-500"
                        : "from-orange-400 to-orange-500"
                  } rounded-t-3xl shadow-lg flex flex-col items-center justify-center text-white p-4`}
                >
                  <div className="text-6xl mb-2">{medal}</div>
                  <div className="text-3xl font-bold">{idx + 1}</div>
                </div>

                {/* Player Info Card */}
                <div className="absolute -top-24 bg-white rounded-2xl shadow-2xl p-6 w-full max-w-xs">
                  <div className="text-center">
                    <div className="text-5xl mb-2">{player.avatar}</div>
                    <h3 className="text-xl font-bold text-slate-800">{player.name}</h3>
                    {player.badge && (
                      <Badge className={`mt-2 ${getBadgeColor(player.badge)}`}>
                        {player.badge}
                      </Badge>
                    )}
                    <p className="text-3xl font-bold text-orange-600 mt-3">
                      {player.score.toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-500">points</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full Rankings Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800">Rankings</h2>
            <p className="text-slate-600 text-sm mt-1">Top {sortedPlayers.length} players</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Rank</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-700">Player</th>
                  <th className="text-center py-4 px-6 font-semibold text-slate-700">Score</th>
                  <th className="text-center py-4 px-6 font-semibold text-slate-700">Games</th>
                  <th className="text-center py-4 px-6 font-semibold text-slate-700">Avg Words</th>
                  <th className="text-center py-4 px-6 font-semibold text-slate-700">Streak</th>
                </tr>
              </thead>
              <tbody>
                {sortedPlayers.map((player, idx) => (
                  <tr
                    key={player.rank}
                    className={`border-b border-slate-200 transition-colors hover:bg-slate-50 ${
                      player.name === "You" ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold">
                          {getMedalEmoji(idx + 1) || `#${idx + 1}`}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{player.avatar}</span>
                        <div>
                          <p className="font-semibold text-slate-800">{player.name}</p>
                          {player.badge && (
                            <Badge className={`mt-1 ${getBadgeColor(player.badge)}`}>
                              {player.badge}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="text-xl font-bold text-orange-600">
                        {player.score.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="font-semibold text-slate-700">{player.gamesPlayed}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="font-semibold text-slate-700">{player.avgWordsPerGame}</span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Flame className="w-4 h-4 text-orange-500" />
                        <span className="font-semibold text-slate-700">{player.streak}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Your Rank</h3>
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-4xl font-bold text-orange-600 mb-2">#5</p>
            <p className="text-sm text-slate-600">+15 positions this month</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Your Score</h3>
              <Trophy className="w-6 h-6 text-amber-600" />
            </div>
            <p className="text-4xl font-bold text-amber-600 mb-2">8,450</p>
            <p className="text-sm text-slate-600">Need 2,500 more for top 3</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Your Streak</h3>
              <Flame className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-4xl font-bold text-red-600 mb-2">7 days</p>
            <p className="text-sm text-slate-600">Keep playing to extend!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Import Calendar icon
function Calendar() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}
