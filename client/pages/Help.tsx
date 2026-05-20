import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, Mail, MessageSquare, BookOpen } from "lucide-react";

const FAQS = [
  {
    question: "How does the word unscrambler work?",
    answer:
      "The word unscrambler analyzes the letters you provide and finds all valid English words that can be formed using those letters. Each letter can only be used as many times as it appears in your input.",
  },
  {
    question: "Can I use the same letter multiple times?",
    answer:
      "Only if it appears multiple times in your input. For example, if you enter 'aab', you can use 'a' twice but 'b' only once.",
  },
  {
    question: "What counts as a valid word?",
    answer:
      "We use a comprehensive English dictionary. Words must be at least 2 letters long and be recognized in standard English dictionaries.",
  },
  {
    question: "How do I earn points in Game Mode?",
    answer:
      "Points are calculated based on word length. Each letter in a word is worth 10 points. So a 5-letter word gives you 50 points!",
  },
  {
    question: "Can I save my favorite words?",
    answer:
      "Yes! You can mark words as favorites by clicking the heart icon. Your favorites are stored in the History section for quick reference.",
  },
  {
    question: "How can I compete with other players?",
    answer:
      "Play Game Mode to earn points and climb the leaderboard! Your score is compared with other players globally. Check Statistics to see the current rankings.",
  },
  {
    question: "Is there a limit to how many words I can find?",
    answer:
      "No limit in the Unscrambler! In Game Mode, you're limited by the time available. Find as many words as you can before time runs out.",
  },
  {
    question: "How does the streak system work?",
    answer:
      "Playing for 7 consecutive days keeps your streak alive! A streak represents your commitment to the app. Maintain it to unlock special badges.",
  },
];

export default function Help() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-4 md:p-8 lg:p-12 pb-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Help & FAQ</h1>
          <p className="text-indigo-100">
            Find answers to common questions and learn how to make the most of WordZap
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 rounded-lg transition-all"
            />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800">Frequently Asked Questions</h2>
            <p className="text-slate-600 text-sm mt-1">
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""}
            </p>
          </div>

          {filteredFaqs.length > 0 ? (
            <div className="divide-y divide-slate-200">
              {filteredFaqs.map((faq, idx) => {
                const originalIdx = FAQS.indexOf(faq);
                const isExpanded = expandedIndex === originalIdx;

                return (
                  <button
                    key={originalIdx}
                    onClick={() => setExpandedIndex(isExpanded ? null : originalIdx)}
                    className="w-full text-left p-6 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-semibold text-slate-800 text-left">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 flex-shrink-0 mt-1 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {isExpanded && (
                      <p className="mt-4 text-slate-600 text-left leading-relaxed">{faq.answer}</p>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-slate-600">No questions found matching your search.</p>
            </div>
          )}
        </div>

        {/* Quick Tips */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            Quick Tips & Tricks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                emoji: "⚡",
                title: "Start with Common Patterns",
                desc: "Look for common letter combinations like 'ing', 'ed', 'er' to find words faster.",
              },
              {
                emoji: "🔍",
                title: "Use Filters Wisely",
                desc: "Filter by word length or starting letters to narrow down results quickly.",
              },
              {
                emoji: "🎮",
                title: "Practice in Game Mode",
                desc: "Game Mode helps you improve speed and find more words under pressure.",
              },
              {
                emoji: "❤️",
                title: "Save Interesting Words",
                desc: "Mark words as favorites to build a personal vocabulary collection.",
              },
              {
                emoji: "📈",
                title: "Track Your Progress",
                desc: "Check Statistics to see how your skills improve over time.",
              },
              {
                emoji: "🔥",
                title: "Maintain Your Streak",
                desc: "Play daily to keep your streak alive and unlock achievements.",
              },
            ].map((tip, idx) => (
              <div
                key={idx}
                className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200 hover:border-indigo-400 transition-colors"
              >
                <div className="text-3xl mb-2">{tip.emoji}</div>
                <h3 className="font-bold text-slate-800 mb-2">{tip.title}</h3>
                <p className="text-sm text-slate-600">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Still Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="w-full justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-base rounded-xl">
              <Mail className="w-5 h-5" />
              Email Support
            </Button>
            <Button className="w-full justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-6 text-base rounded-xl">
              <MessageSquare className="w-5 h-5" />
              Live Chat
            </Button>
          </div>
        </div>

        {/* Video Tutorials */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">📺 Video Tutorials</h2>
          <p className="mb-4 text-indigo-100">
            Check out our YouTube channel for step-by-step guides and gameplay tips.
          </p>
          <Button className="bg-white hover:bg-indigo-50 text-indigo-700 font-semibold">
            Watch Tutorials
          </Button>
        </div>
      </div>
    </div>
  );
}
