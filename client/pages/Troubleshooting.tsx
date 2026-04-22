import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, RotateCcw, Zap, Search, Mail, MessageSquare } from "lucide-react";

interface Issue {
  id: string;
  title: string;
  category: string;
  severity: "critical" | "warning" | "info";
  status: "resolved" | "investigating" | "unresolved";
  solutions: string[];
  steps: string[];
  lastUpdated: string;
}

const COMMON_ISSUES: Issue[] = [
  {
    id: "1",
    title: "Words Not Being Found",
    category: "Unscrambler",
    severity: "critical",
    status: "resolved",
    solutions: [
      "Clear browser cache and cookies",
      "Reload the page (Ctrl+Shift+R or Cmd+Shift+R)",
      "Update your browser to the latest version",
      "Try disabling browser extensions",
      "Check if your word is valid in the English dictionary",
    ],
    steps: [
      "1. Go to Settings > Advanced Settings",
      "2. Click 'Reset Cache'",
      "3. Refresh the page",
      "4. Try your word again",
    ],
    lastUpdated: "2024-04-20",
  },
  {
    id: "2",
    title: "Game Mode Freezing",
    category: "Game",
    severity: "critical",
    status: "investigating",
    solutions: [
      "Disable auto-optimize in Advanced Settings",
      "Reduce max concurrent connections to 5",
      "Close other browser tabs",
      "Clear browser cache",
      "Use a different browser",
    ],
    steps: [
      "1. Close other applications",
      "2. Open Settings > Advanced Settings",
      "3. Disable 'Auto-Optimize'",
      "4. Set 'Max Connections' to 5",
      "5. Restart game mode",
    ],
    lastUpdated: "2024-04-19",
  },
  {
    id: "3",
    title: "Slow Performance",
    category: "Performance",
    severity: "warning",
    status: "resolved",
    solutions: [
      "Enable caching in Advanced Settings",
      "Reduce cache expiry time",
      "Disable desktop alerts",
      "Clear browsing history",
      "Update your browser",
    ],
    steps: [
      "1. Go to Settings > Advanced Settings",
      "2. Enable 'Enable Caching'",
      "3. Set Cache Expiry to 3600 seconds",
      "4. Enable 'Auto-Optimize'",
      "5. Restart the application",
    ],
    lastUpdated: "2024-04-20",
  },
  {
    id: "4",
    title: "History Not Saving",
    category: "Data",
    severity: "warning",
    status: "resolved",
    solutions: [
      "Check if local storage is enabled in browser",
      "Disable 'Encrypt Local Data' temporarily",
      "Clear browser cache",
      "Check available disk space",
      "Use Backup & Restore to recover data",
    ],
    steps: [
      "1. Check browser settings for disabled local storage",
      "2. Go to Settings > Advanced Settings",
      "3. Toggle 'Encrypt Local Data' off",
      "4. Try saving to history again",
      "5. If issue persists, use Backup & Restore",
    ],
    lastUpdated: "2024-04-18",
  },
  {
    id: "5",
    title: "Cannot Sync Across Devices",
    category: "Sync",
    severity: "warning",
    status: "investigating",
    solutions: [
      "Check internet connection",
      "Verify you're logged in on all devices",
      "Enable API Access in Advanced Settings",
      "Check server status",
      "Try manual backup and restore",
    ],
    steps: [
      "1. Check your internet connection",
      "2. Log out and log back in",
      "3. Go to Settings > Advanced Settings",
      "4. Enable 'API Access'",
      "5. Wait 2-3 minutes for sync",
    ],
    lastUpdated: "2024-04-17",
  },
];

export default function Troubleshooting() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<string | null>(null);

  const filteredIssues = COMMON_ISSUES.filter(
    (issue) =>
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    if (severity === "critical") return "bg-red-100 text-red-800 border-red-300";
    if (severity === "warning") return "bg-yellow-100 text-yellow-800 border-yellow-300";
    return "bg-blue-100 text-blue-800 border-blue-300";
  };

  const getStatusIcon = (status: string) => {
    if (status === "resolved") return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (status === "investigating") return <Zap className="w-5 h-5 text-yellow-600" />;
    return <AlertCircle className="w-5 h-5 text-red-600" />;
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl shadow-lg p-8 text-white">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <AlertCircle className="w-10 h-10" />
            Troubleshooting & Support
          </h1>
          <p className="text-red-100">
            Find solutions to common problems and resolve issues quickly
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button className="bg-red-600 hover:bg-red-700" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              System Diagnostics
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Email Support
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Live Chat
            </Button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-lg transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Issue List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Common Issues</h2>

            {filteredIssues.length > 0 ? (
              filteredIssues.map((issue) => (
                <div
                  key={issue.id}
                  onClick={() => setSelectedIssue(issue)}
                  className={`p-6 rounded-xl shadow-md cursor-pointer transition-all border-2 ${
                    selectedIssue?.id === issue.id
                      ? "border-red-500 bg-red-50"
                      : "border-slate-200 bg-white hover:border-red-300"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-800">{issue.title}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">{issue.category}</Badge>
                        <Badge className={`border-2 ${getSeverityColor(issue.severity)}`}>
                          {issue.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      {getStatusIcon(issue.status)}
                      <span className="text-xs font-semibold text-slate-600 capitalize">
                        {issue.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-600">No issues found matching your search</p>
              </div>
            )}
          </div>

          {/* Solution Panel */}
          <div className="space-y-4">
            {selectedIssue ? (
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4 space-y-4">
                <h3 className="text-xl font-bold text-slate-800">{selectedIssue.title}</h3>

                {/* Quick Solutions */}
                <div>
                  <h4 className="font-semibold text-slate-700 mb-3">Quick Fixes:</h4>
                  <ul className="space-y-2">
                    {selectedIssue.solutions.slice(0, 3).map((solution, idx) => (
                      <li key={idx} className="flex gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        {solution}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step-by-Step */}
                <div>
                  <h4 className="font-semibold text-slate-700 mb-3">Step-by-Step Guide:</h4>
                  <div className="space-y-2">
                    {selectedIssue.steps.map((step, idx) => (
                      <button
                        key={idx}
                        onClick={() => setExpandedSteps(expandedSteps === idx.toString() ? null : idx.toString())}
                        className="w-full text-left p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm transition"
                      >
                        {step}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status Badge */}
                <div className="pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-500">
                    Last updated: {selectedIssue.lastUpdated}
                  </p>
                  <Badge
                    className={`mt-2 border-2 ${
                      selectedIssue.status === "resolved"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-yellow-100 text-yellow-800 border-yellow-300"
                    }`}
                  >
                    {selectedIssue.status === "resolved" ? "✅ RESOLVED" : "🔄 INVESTIGATING"}
                  </Badge>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center text-slate-600">
                <p>Select an issue to see solutions</p>
              </div>
            )}
          </div>
        </div>

        {/* System Health Report */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">System Health Report</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "Browser Cache", status: "Healthy", usage: "250MB / 500MB" },
              { name: "Local Storage", status: "Good", usage: "15MB / 50MB" },
              { name: "API Response Time", status: "Excellent", usage: "95ms avg" },
              { name: "Database Sync", status: "Healthy", usage: "Last: 5min ago" },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-slate-800">{item.name}</p>
                  <Badge className="bg-green-100 text-green-800 border-green-300">
                    {item.status}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600">{item.usage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Optimization Tips */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl shadow-lg p-8 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">💡 Optimization Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: "🚀",
                title: "Enable Caching",
                desc: "Store frequently accessed data locally for faster loading",
              },
              {
                icon: "🧹",
                title: "Clear Cache Regularly",
                desc: "Remove old cache data to improve performance",
              },
              {
                icon: "🌐",
                title: "Check Connection",
                desc: "Ensure stable internet for smooth gameplay",
              },
              {
                icon: "📱",
                title: "Use Latest Browser",
                desc: "Keep your browser updated for best performance",
              },
              {
                icon: "🔌",
                title: "Close Background Apps",
                desc: "Reduce system load by closing unnecessary programs",
              },
              {
                icon: "⚙️",
                title: "Optimize Settings",
                desc: "Adjust advanced settings based on your device specs",
              },
            ].map((tip, idx) => (
              <div key={idx} className="p-4 bg-white rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-800">{tip.title}</p>
                    <p className="text-sm text-slate-600 mt-1">{tip.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Still Need Help?</h2>
          <p className="text-slate-600 mb-6 max-w-lg mx-auto">
            Our support team is ready to assist you with any issues or questions you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              <Mail className="w-5 h-5 mr-2" />
              Email Support
            </Button>
            <Button size="lg" variant="outline">
              <MessageSquare className="w-5 h-5 mr-2" />
              Live Chat (24/7)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
