import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Share2, Edit2, Settings, Mail } from "lucide-react";

export default function Profile() {
  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-pink-50 to-rose-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-40 md:h-48 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 rounded-2xl shadow-lg" />

          {/* Profile Card */}
          <div className="relative -mt-16 mx-4 md:mx-0">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
                {/* Avatar */}
                <div className="flex flex-col items-center md:items-start">
                  <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-6xl shadow-lg border-4 border-white">
                    ⭐
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-slate-800">You</h1>
                  <p className="text-slate-600 text-lg mt-1">WordZap Champion</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge className="bg-pink-100 text-pink-800">Level 15</Badge>
                    <Badge className="bg-purple-100 text-purple-800">Premium Member</Badge>
                    <Badge className="bg-orange-100 text-orange-800">7 Day Streak</Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="w-full md:w-auto flex gap-2">
                  <Button
                    className="flex-1 md:flex-none gap-2 bg-pink-600 hover:bg-pink-700"
                    size="lg"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Profile
                  </Button>
                  <Button variant="outline" size="lg">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Bio */}
              <p className="mt-6 text-slate-600 max-w-2xl">
                🎮 Passionate word game enthusiast | 📚 Language lover | 🏆 Competitive player |
                Always up for a challenge!
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200">
                <div className="text-center">
                  <p className="text-3xl font-bold text-pink-600">8,450</p>
                  <p className="text-sm text-slate-600 mt-1">Total Points</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-rose-600">95</p>
                  <p className="text-sm text-slate-600 mt-1">Games Played</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-red-600">1,247</p>
                  <p className="text-sm text-slate-600 mt-1">Words Found</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">#5</p>
                  <p className="text-sm text-slate-600 mt-1">Global Rank</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">🏆 Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { emoji: "🌟", name: "First Steps", unlocked: true },
              { emoji: "🔥", name: "On Fire", unlocked: true },
              { emoji: "🎯", name: "Sharpshooter", unlocked: true },
              { emoji: "📚", name: "Scholar", unlocked: true },
              { emoji: "⚡", name: "Lightning", unlocked: true },
              { emoji: "👑", name: "Champion", unlocked: false },
              { emoji: "🚀", name: "Speedster", unlocked: false },
              { emoji: "💎", name: "Diamond", unlocked: false },
            ].map((achievement, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg text-center border-2 transition-all ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-pink-50 to-rose-50 border-pink-300"
                    : "bg-slate-50 border-slate-200 opacity-60"
                }`}
              >
                <div className="text-4xl mb-2">{achievement.emoji}</div>
                <p className="font-semibold text-slate-800 text-sm">{achievement.name}</p>
                {achievement.unlocked && (
                  <p className="text-xs text-pink-600 mt-1">✓ Unlocked</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">📊 Recent Activity</h2>
          <div className="space-y-4">
            {[
              { type: "Game", detail: "Scored 245 points", time: "2 hours ago" },
              { type: "Word", detail: "Found 'python' in 30 seconds", time: "5 hours ago" },
              { type: "Achievement", detail: "Unlocked 'On Fire' badge", time: "1 day ago" },
              { type: "Milestone", detail: "Reached 1,000 words found", time: "3 days ago" },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                  <div>
                    <p className="font-semibold text-slate-800">{activity.detail}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
                <Badge variant="secondary">{activity.type}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Skills & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6">💪 Your Strengths</h3>
            <div className="space-y-4">
              {[
                { skill: "Word Speed", level: 95 },
                { skill: "Vocabulary", level: 88 },
                { skill: "Pattern Recognition", level: 92 },
                { skill: "Endurance", level: 78 },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-slate-700">{stat.skill}</span>
                    <span className="text-sm font-semibold text-pink-600">{stat.level}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
                      style={{ width: `${stat.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Goals */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-slate-800 mb-6">🎯 Goals & Milestones</h3>
            <div className="space-y-4">
              {[
                { goal: "Reach rank #1", progress: 68 },
                { goal: "Find 2,000 words", progress: 62 },
                { goal: "30 day streak", progress: 23 },
                { goal: "Win 50 games", progress: 76 },
              ].map((goal, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-slate-700">{goal.goal}</span>
                    <span className="text-sm font-semibold text-rose-600">{goal.progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-rose-500 to-orange-500 rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Friends */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">👥 Friends (12)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "WordMaster", avatar: "👑", status: "Online" },
              { name: "LinguaLion", avatar: "🦁", status: "Away" },
              { name: "ScrambleKing", avatar: "👸", status: "Online" },
              { name: "WordWizard", avatar: "🧙", status: "Offline" },
              { name: "WordNinja", avatar: "🥷", status: "Online" },
              { name: "LetterLover", avatar: "💌", status: "Away" },
            ].map((friend, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{friend.avatar}</span>
                  <div>
                    <p className="font-semibold text-slate-800">{friend.name}</p>
                    <p className="text-xs text-slate-500">{friend.status}</p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  friend.status === "Online"
                    ? "bg-green-500"
                    : friend.status === "Away"
                      ? "bg-yellow-500"
                      : "bg-slate-300"
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
