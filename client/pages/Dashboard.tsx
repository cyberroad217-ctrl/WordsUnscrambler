import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Flame, Trophy, Clock, BookOpen, Sparkles, TrendingUp, Users, Target, Compass } from "lucide-react";

export default function Dashboard() {
  const userStats = {
    level: 12,
    xp: 2450,
    nextLevelXp: 3000,
    streak: 7,
    totalGames: 142,
    avgScore: 385,
    accuracyRate: 78,
    wordsDiscovered: 1847,
    rank: 142,
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8 lg:p-12 pb-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Premium Header */}
        <div className="relative rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600" />
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl" />
          </div>

          <div className="relative z-10 p-8 md:p-12 text-white">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">Welcome back, Champion! 👋</h1>
                <p className="text-indigo-100 text-lg">
                  You're on a {userStats.streak}-day streak. Keep the momentum going!
                </p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold">{userStats.level}</p>
                <p className="text-indigo-100">Level</p>
              </div>
            </div>

            {/* XP Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm opacity-90">Next Level</span>
                <span className="text-sm opacity-90">
                  {userStats.xp} / {userStats.nextLevelXp} XP
                </span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="h-full bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full transition-all duration-500"
                  style={{ width: `${(userStats.xp / userStats.nextLevelXp) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Flame, label: "Current Streak", value: userStats.streak, unit: "days", color: "from-orange-500 to-red-500" },
            { icon: Trophy, label: "Global Rank", value: `#${userStats.rank}`, unit: "position", color: "from-yellow-500 to-orange-500" },
            { icon: TrendingUp, label: "Accuracy", value: `${userStats.accuracyRate}%`, unit: "rate", color: "from-green-500 to-emerald-500" },
            { icon: BookOpen, label: "Words Found", value: userStats.wordsDiscovered, unit: "total", color: "from-blue-500 to-cyan-500" },
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`bg-gradient-to-br ${stat.color} rounded-2xl shadow-lg p-6 text-white overflow-hidden relative group cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105`}
              >
                <div className="absolute inset-0 opacity-10">
                  <Icon className="absolute top-2 right-2 w-16 h-16" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-5 h-5" />
                    <p className="text-sm opacity-90">{stat.label}</p>
                  </div>
                  <p className="text-4xl font-bold">{stat.value}</p>
                  <p className="text-xs opacity-75 mt-1">{stat.unit}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/unscrambler"
            className="group relative overflow-hidden rounded-2xl shadow-lg p-8 bg-white border-2 border-indigo-100 hover:border-indigo-400 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Unscrambler</h3>
                  <p className="text-slate-600 text-sm mt-1">Start a new search instantly</p>
                </div>
                <Zap className="w-8 h-8 text-indigo-600" />
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Start Now
              </Button>
            </div>
          </Link>

          <Link
            to="/game"
            className="group relative overflow-hidden rounded-2xl shadow-lg p-8 bg-white border-2 border-pink-100 hover:border-pink-400 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">Game Mode</h3>
                  <p className="text-slate-600 text-sm mt-1">Earn XP and climb the leaderboard</p>
                </div>
                <Flame className="w-8 h-8 text-pink-600" />
              </div>
              <Button className="bg-pink-600 hover:bg-pink-700">
                Play Now
              </Button>
            </div>
          </Link>
        </div>

        {/* Stats Dashboard */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Performance Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Total Games", value: userStats.totalGames, icon: "🎮" },
              { label: "Average Score", value: userStats.avgScore, icon: "📊" },
              { label: "Best Day Words", value: 42, icon: "📈" },
            ].map((item, idx) => (
              <div key={idx} className="p-6 bg-slate-50 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-slate-600 font-medium">{item.label}</p>
                  <span className="text-3xl">{item.icon}</span>
                </div>
                <p className="text-3xl font-bold text-slate-800">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity & Achievements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { type: "Game Won", detail: "Scored 450 points in Timed Challenge", time: "2h ago", emoji: "🏆" },
                { type: "Streak", detail: "7-day streak maintained", time: "1d ago", emoji: "🔥" },
                { type: "Achievement", detail: "Unlocked 'Word Master' badge", time: "3d ago", emoji: "⭐" },
                { type: "Level Up", detail: "Reached Level 12", time: "5d ago", emoji: "🚀" },
              ].map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-all"
                >
                  <span className="text-2xl">{activity.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">{activity.type}</p>
                    <p className="text-sm text-slate-600">{activity.detail}</p>
                  </div>
                  <span className="text-xs text-slate-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Showcase */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Latest Achievements</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: "🥇", name: "First Victory", unlocked: true },
                { emoji: "🔥", name: "7-Day Streak", unlocked: true },
                { emoji: "🎯", name: "Perfect Game", unlocked: true },
                { emoji: "👑", name: "Leaderboard Top 100", unlocked: false },
                { emoji: "💎", name: "Elite Player", unlocked: false },
                { emoji: "🌟", name: "Legendary", unlocked: false },
              ].map((achievement, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg text-center border-2 transition-all ${
                    achievement.unlocked
                      ? "bg-amber-50 border-amber-300"
                      : "bg-slate-50 border-slate-200 opacity-50"
                  }`}
                >
                  <div className="text-4xl mb-2">{achievement.emoji}</div>
                  <p className="text-sm font-semibold text-slate-700">{achievement.name}</p>
                  {achievement.unlocked && (
                    <p className="text-xs text-amber-600 mt-1">✓ Unlocked</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Challenges */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 border-2 border-indigo-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Today's Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Daily Puzzle",
                desc: "Complete today's featured puzzle",
                reward: "100 XP",
                icon: "📍",
              },
              {
                title: "Speed Challenge",
                desc: "Find 20 words in 1 minute",
                reward: "150 XP",
                icon: "⚡",
              },
              {
                title: "Rare Letters",
                desc: "Use words with Q, X, or Z",
                reward: "200 XP",
                icon: "💠",
              },
            ].map((challenge, idx) => (
              <button
                key={idx}
                className="p-6 bg-white rounded-xl border-2 border-indigo-200 hover:border-indigo-400 transition-all text-left group hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{challenge.icon}</span>
                  <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                    {challenge.reward}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                  {challenge.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1">{challenge.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Quick Navigation</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { icon: "📊", label: "Statistics", href: "/statistics" },
              { icon: "🏆", label: "Leaderboard", href: "/leaderboard" },
              { icon: "📚", label: "History", href: "/history" },
              { icon: "👤", label: "Profile", href: "/profile" },
              { icon: "⚙️", label: "Settings", href: "/settings" },
              { icon: "❓", label: "Help", href: "/help" },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-300 transition-all text-center group"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{link.icon}</div>
                <p className="text-sm font-semibold text-slate-700">{link.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
