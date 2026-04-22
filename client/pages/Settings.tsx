import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Moon, Volume2, Lock, Eye, Trash2, Download, Upload, Settings, LifeBuoy, Database } from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    soundEnabled: true,
    privateProfile: false,
    showStats: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl shadow-lg p-8 text-white">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-emerald-100">Customize your experience</p>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Bell className="w-6 h-6 text-emerald-600" />
            Notifications
          </h2>
          <div className="space-y-4">
            {[
              { id: "notifications", label: "Enable Notifications", desc: "Get notified about achievements and daily streaks" },
              { id: "soundEnabled", label: "Sound Effects", desc: "Play sounds when finding words or completing games" },
            ].map((setting) => (
              <div
                key={setting.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
              >
                <div>
                  <p className="font-semibold text-slate-800">{setting.label}</p>
                  <p className="text-sm text-slate-600">{setting.desc}</p>
                </div>
                <button
                  onClick={() => toggleSetting(setting.id as any)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    settings[setting.id as any] ? "bg-emerald-600" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      settings[setting.id as any] ? "translate-x-7" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Moon className="w-6 h-6 text-emerald-600" />
            Appearance
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
              <div>
                <p className="font-semibold text-slate-800">Dark Mode</p>
                <p className="text-sm text-slate-600">Switch to dark theme for better eye comfort</p>
              </div>
              <button
                onClick={() => toggleSetting("darkMode")}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.darkMode ? "bg-emerald-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.darkMode ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Lock className="w-6 h-6 text-emerald-600" />
            Privacy & Security
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
              <div>
                <p className="font-semibold text-slate-800">Private Profile</p>
                <p className="text-sm text-slate-600">Hide your statistics from other users</p>
              </div>
              <button
                onClick={() => toggleSetting("privateProfile")}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.privateProfile ? "bg-emerald-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.privateProfile ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition">
              <div>
                <p className="font-semibold text-slate-800">Show Statistics</p>
                <p className="text-sm text-slate-600">Display your profile stats on your dashboard</p>
              </div>
              <button
                onClick={() => toggleSetting("showStats")}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.showStats ? "bg-emerald-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.showStats ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <button className="w-full flex items-center justify-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition font-semibold text-slate-700 mt-4">
              <Lock className="w-5 h-5" />
              Change Password
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Download className="w-6 h-6 text-emerald-600" />
            Data Management
          </h2>
          <div className="space-y-3">
            <Button className="w-full justify-start bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-2 border-emerald-200">
              <Download className="w-5 h-5 mr-2" />
              Download Your Data
            </Button>
            <Button className="w-full justify-start bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-200">
              <Upload className="w-5 h-5 mr-2" />
              Import Data
            </Button>
          </div>
        </div>

        {/* Dangerous Zone */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-red-200">
          <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-3">
            <Trash2 className="w-6 h-6" />
            Danger Zone
          </h2>
          <div className="space-y-3">
            <Button className="w-full justify-start bg-red-50 hover:bg-red-100 text-red-700 border-2 border-red-200">
              <Trash2 className="w-5 h-5 mr-2" />
              Clear All History
            </Button>
            <Button className="w-full justify-start bg-red-100 hover:bg-red-200 text-red-800 border-2 border-red-300">
              <Trash2 className="w-5 h-5 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">About WordZap</h2>
          <div className="space-y-2 text-sm text-emerald-100">
            <p>Version 1.0.0</p>
            <p>© 2024 WordZap Inc. All rights reserved.</p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
