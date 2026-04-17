import { BarChart3, TrendingUp, Award, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Statistics() {
  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Your Statistics</h1>
          <p className="text-cyan-100">
            Track your progress and achievements in the word unscrambler
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: BarChart3, label: "Total Words", value: "1,247", color: "cyan" },
            { icon: TrendingUp, label: "Longest Word", value: "12 letters", color: "blue" },
            { icon: Flame, label: "Current Streak", value: "7 days", color: "orange" },
            { icon: Award, label: "Rank", value: "#142", color: "purple" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            const colorClass = {
              cyan: "border-cyan-500 text-cyan-600",
              blue: "border-blue-500 text-blue-600",
              orange: "border-orange-500 text-orange-600",
              purple: "border-purple-500 text-purple-600",
            }[stat.color];
            return (
              <div
                key={idx}
                className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-${stat.color}-500`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-slate-600 font-medium">{stat.label}</p>
                  <Icon className={`w-5 h-5 ${colorClass}`} />
                </div>
                <p className={`text-3xl font-bold ${colorClass}`}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Activity Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Last 7 Days Activity</h2>
          <div className="space-y-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => {
              const height = Math.floor(Math.random() * 100) + 20;
              const count = Math.floor(Math.random() * 50) + 10;
              return (
                <div key={day} className="flex items-end gap-4">
                  <span className="w-12 font-semibold text-slate-600">{day}</span>
                  <div className="flex-1 flex items-end gap-1">
                    <div
                      className="bg-gradient-to-t from-cyan-500 to-blue-400 rounded-t-lg transition-all hover:opacity-80"
                      style={{ height: `${height}px` }}
                    />
                  </div>
                  <span className="w-12 text-right font-semibold text-slate-700">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Achievements 🏆</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { emoji: "🌟", name: "First Steps", desc: "Find your first word" },
              { emoji: "🔥", name: "On Fire", desc: "7 day streak" },
              { emoji: "🎯", name: "Sharpshooter", desc: "Find 10+ words in one game" },
              { emoji: "📚", name: "Scholar", desc: "Find 100+ unique words" },
              { emoji: "⚡", name: "Lightning", desc: "Find 50 words in under 1 minute" },
              { emoji: "👑", name: "Champion", desc: "Reach #1 on leaderboard" },
            ].map((achievement, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border-2 border-slate-200 hover:border-cyan-400 transition-colors"
              >
                <div className="text-4xl mb-2">{achievement.emoji}</div>
                <h3 className="font-bold text-slate-800">{achievement.name}</h3>
                <p className="text-sm text-slate-600 mt-1">{achievement.desc}</p>
                <div className="mt-3 w-full h-2 bg-slate-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                    style={{ width: `${Math.random() * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Word Length Distribution */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Word Length Distribution</h2>
            <div className="space-y-3">
              {[
                { len: "2-3", count: 234, percent: 19 },
                { len: "4-5", count: 456, percent: 36 },
                { len: "6-7", count: 378, percent: 30 },
                { len: "8+", count: 179, percent: 15 },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-slate-700">{item.len} letters</span>
                    <span className="text-sm text-slate-600">{item.count} words</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Top Word Categories</h2>
            <div className="space-y-4">
              {[
                { category: "Verbs", count: 234, emoji: "🏃" },
                { category: "Nouns", count: 456, emoji: "📦" },
                { category: "Adjectives", count: 189, emoji: "✨" },
                { category: "Other", count: 178, emoji: "🎲" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <p className="font-semibold text-slate-800">{item.category}</p>
                      <p className="text-xs text-slate-500">{item.count} words</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{item.count}</Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personal Best */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6">Personal Best Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { mode: "30 Second", score: "245 pts", words: 12, emoji: "⚡" },
              { mode: "60 Second", score: "589 pts", words: 28, emoji: "🔥" },
              { mode: "Unlimited", score: "2,340 pts", words: 156, emoji: "👑" },
            ].map((game, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-3xl mb-2">{game.emoji}</div>
                <h3 className="font-bold text-white mb-1">{game.mode}</h3>
                <p className="text-2xl font-bold text-cyan-100 mb-2">{game.score}</p>
                <p className="text-sm text-cyan-200">{game.words} words found</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
