import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Zap,
  Clock,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Trophy,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { icon: Home, label: "Dashboard", href: "/", id: "dashboard" },
  { icon: Zap, label: "Unscrambler", href: "/unscrambler", id: "unscrambler" },
  { icon: Zap, label: "Game Mode", href: "/game", id: "game" },
  { icon: Clock, label: "History", href: "/history", id: "history" },
  { icon: BarChart3, label: "Statistics", href: "/statistics", id: "stats" },
  { icon: Trophy, label: "Leaderboard", href: "/leaderboard", id: "leaderboard" },
  { icon: User, label: "Profile", href: "/profile", id: "profile" },
  { icon: Settings, label: "Settings", href: "/settings", id: "settings" },
  { icon: HelpCircle, label: "Help", href: "/help", id: "help" },
];

export function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (href: string) => location.pathname === href;

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 lg:flex-row">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-indigo-900 to-indigo-800 text-white shadow-xl transition-transform duration-300 lg:relative lg:translate-x-0 lg:inset-auto lg:h-auto lg:min-h-screen",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close Button (Mobile) */}
        <button
          onClick={closeSidebar}
          className="absolute top-4 right-4 lg:hidden p-2 hover:bg-indigo-700 rounded-lg transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo Section */}
        <div className="p-4 border-b border-indigo-700">
          <Link to="/" onClick={closeSidebar} className="flex items-center gap-2 group">
            <div className="p-1.5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg">
              <Zap className="w-5 h-5 text-indigo-900" />
            </div>
            <div>
              <h1 className="text-lg font-bold">WordZap</h1>
              <p className="text-xs text-indigo-300">Pro</p>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.id}
                to={item.href}
                onClick={closeSidebar}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  active
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-indigo-200 hover:bg-indigo-700 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 font-medium">{item.label}</span>
                {active && <ChevronRight className="w-4 h-4" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-indigo-700 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-indigo-200 hover:bg-indigo-700 hover:text-white transition-all duration-200">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-4 md:px-8">
            {/* Menu Button (Mobile) */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition"
            >
              <Menu className="w-6 h-6 text-slate-600" />
            </button>

            {/* Title */}
            <h2 className="text-lg md:text-xl font-bold text-slate-800 flex-1 text-center lg:text-left">
              {NAV_ITEMS.find(item => isActive(item.href))?.label || "App"}
            </h2>

            {/* Header Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/help")}
                className="p-2 hover:bg-slate-100 rounded-lg transition text-slate-600 hover:text-slate-800"
                title="Notifications"
              >
                <span className="text-xl">🔔</span>
              </button>
              <button
                onClick={() => navigate("/settings")}
                className="p-2 hover:bg-slate-100 rounded-lg transition text-slate-600 hover:text-slate-800"
                title="Settings"
              >
                <Settings className="w-6 h-6" />
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-lg transition hover:scale-110"
                title="Profile"
              >
                U
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
