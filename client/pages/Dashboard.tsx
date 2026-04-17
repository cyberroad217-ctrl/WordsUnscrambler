import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Flame, Trophy, Clock, BookOpen, Sparkles } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-lg p-8 md:p-12 text-white">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome back, User! 👋</h1>
              <p className="text-indigo-100 text-lg">
                Ready to unscramble some words today? Let's dive in!
              </p>
            </div>
            <Sparkles className="w-12 h-12 flex-shrink-0" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Words Found Today</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">237</p>
              </div>
              <Zap className="w-8 h-8 text-indigo-500" />
            </div>
            <p className="text-xs text-slate-500 mt-3">↑ 42% from yesterday</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Current Streak</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">7</p>
              </div>
              <Flame className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-xs text-slate-500 mt-3">Keep it going! 🔥</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-emerald-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Personal Best</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">18</p>
              </div>
              <Trophy className="w-8 h-8 text-emerald-500" />
            </div>
            <p className="text-xs text-slate-500 mt-3">Words in one game</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-violet-500">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Total Time</p>
                <p className="text-3xl font-bold text-slate-800 mt-2">4h 23m</p>
              </div>
              <Clock className="w-8 h-8 text-violet-500" />
            </div>
            <p className="text-xs text-slate-500 mt-3">Playing time</p>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Unscrambler Card */}
          <Link
            to="/unscrambler"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 border border-slate-200 hover:border-indigo-300"
          >
            <div className="mb-4 inline-block p-3 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Word Unscrambler</h3>
            <p className="text-slate-600 mb-6">
              Enter any letters and find all possible words instantly.
            </p>
            <div className="flex items-center text-indigo-600 font-semibold">
              Start Now <span className="ml-2">→</span>
            </div>
          </Link>

          {/* Game Mode Card */}
          <Link
            to="/game"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 border border-slate-200 hover:border-blue-300"
          >
            <div className="mb-4 inline-block p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Game Mode</h3>
            <p className="text-slate-600 mb-6">
              Compete in timed challenges and climb the leaderboard.
            </p>
            <div className="flex items-center text-blue-600 font-semibold">
              Play Now <span className="ml-2">→</span>
            </div>
          </Link>

          {/* Learn Card */}
          <Link
            to="/help"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-8 transition-all duration-300 border border-slate-200 hover:border-emerald-300"
          >
            <div className="mb-4 inline-block p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-lg group-hover:scale-110 transition-transform">
              <BookOpen className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Learn & Help</h3>
            <p className="text-slate-600 mb-6">
              Tips, tricks, and frequently asked questions.
            </p>
            <div className="flex items-center text-emerald-600 font-semibold">
              Learn More <span className="ml-2">→</span>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { word: "listen", time: "2 hours ago", type: "Found" },
              { word: "stream", time: "5 hours ago", type: "Found" },
              { word: "python", time: "Yesterday", type: "Game" },
              { word: "history", time: "2 days ago", type: "Found" },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                  <div>
                    <p className="font-semibold text-slate-800">{item.word}</p>
                    <p className="text-sm text-slate-500">{item.time}</p>
                  </div>
                </div>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                  {item.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Top Players This Week</h2>
          <div className="space-y-3">
            {[
              { rank: 1, name: "WordMaster", score: 1250, emoji: "👑" },
              { rank: 2, name: "LinguaLion", score: 1180, emoji: "🦁" },
              { rank: 3, name: "ScrambleKing", score: 1075, emoji: "👸" },
              { rank: 4, name: "You", score: 945, emoji: "⭐" },
              { rank: 5, name: "WordWizard", score: 920, emoji: "🧙" },
            ].map((player) => (
              <div key={player.rank} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{player.emoji}</span>
                  <div>
                    <p className="font-semibold text-slate-800">
                      #{player.rank} - {player.name}
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold text-indigo-600">{player.score} pts</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
