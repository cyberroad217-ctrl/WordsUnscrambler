import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Shield,
  Database,
  Zap,
  Eye,
  Lock,
  Volume2,
  Palette,
  Clock,
  Server,
  Wifi,
  Bell,
  Globe,
  Code,
  Download,
  Upload,
  RotateCcw,
} from "lucide-react";

export default function AdvancedSettings() {
  const [settings, setSettings] = useState({
    // Performance
    enableCache: true,
    cacheExpiry: 3600,
    maxConnections: 10,
    autoOptimize: true,

    // Privacy
    dataCollection: true,
    analyticsTracking: false,
    thirdPartySharing: false,
    encryptLocalData: true,

    // Notifications
    soundNotifications: true,
    desktopAlerts: true,
    emailDigest: false,
    pushNotifications: true,

    // Display
    customTheme: false,
    fontSize: "medium",
    highContrast: false,
    reducedMotion: false,

    // Advanced
    betaFeatures: false,
    developmentMode: false,
    apiAccessEnabled: false,
    customDictionary: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === "boolean" ? !prev[key] : prev[key],
    }));
  };

  const handleNumberChange = (key: keyof typeof settings, value: number) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleStringChange = (key: keyof typeof settings, value: string) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl shadow-lg p-8 text-white">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Settings className="w-10 h-10" />
            Advanced Settings
          </h1>
          <p className="text-teal-100">
            Fine-tune every aspect of your WordZap experience with advanced configuration options
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button className="bg-teal-600 hover:bg-teal-700" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Settings
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Import Settings
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
          <Button variant="outline" size="sm">
            <Database className="w-4 h-4 mr-2" />
            View Logs
          </Button>
        </div>

        {/* Performance Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Zap className="w-6 h-6 text-teal-600" />
            Performance Optimization
          </h2>
          <div className="space-y-6">
            {/* Enable Cache */}
            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="font-semibold text-slate-800">Enable Caching</p>
                <p className="text-sm text-slate-600">Store frequently accessed data locally</p>
              </div>
              <button
                onClick={() => toggleSetting("enableCache")}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.enableCache ? "bg-teal-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.enableCache ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Cache Expiry */}
            {settings.enableCache && (
              <div className="flex items-start justify-between p-4 bg-teal-50 border-2 border-teal-200 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">Cache Expiry (seconds)</p>
                  <p className="text-sm text-slate-600">How long to keep cached data</p>
                </div>
                <input
                  type="number"
                  value={settings.cacheExpiry}
                  onChange={(e) => handleNumberChange("cacheExpiry", parseInt(e.target.value))}
                  className="w-24 px-3 py-2 border-2 border-teal-300 rounded-lg"
                  min="60"
                  max="86400"
                />
              </div>
            )}

            {/* Max Connections */}
            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <p className="font-semibold text-slate-800">Max Concurrent Connections</p>
                <p className="text-sm text-slate-600">Maximum simultaneous API requests</p>
              </div>
              <input
                type="number"
                value={settings.maxConnections}
                onChange={(e) => handleNumberChange("maxConnections", parseInt(e.target.value))}
                className="w-20 px-3 py-2 border-2 border-slate-300 rounded-lg"
                min="1"
                max="50"
              />
            </div>

            {/* Auto Optimize */}
            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="font-semibold text-slate-800">Auto-Optimize Resources</p>
                <p className="text-sm text-slate-600">Automatically clean up unused cache and files</p>
              </div>
              <button
                onClick={() => toggleSetting("autoOptimize")}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.autoOptimize ? "bg-teal-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.autoOptimize ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Shield className="w-6 h-6 text-cyan-600" />
            Privacy & Security
          </h2>
          <div className="space-y-4">
            {[
              {
                key: "dataCollection",
                label: "Data Collection",
                desc: "Allow anonymous usage data collection",
              },
              {
                key: "analyticsTracking",
                label: "Analytics Tracking",
                desc: "Track your gameplay and statistics",
              },
              {
                key: "thirdPartySharing",
                label: "Third-Party Data Sharing",
                desc: "Share data with partner services",
              },
              {
                key: "encryptLocalData",
                label: "Encrypt Local Data",
                desc: "Encrypt all data stored on your device",
              },
            ].map((setting) => (
              <div
                key={setting.key}
                className="flex items-start justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
              >
                <div>
                  <p className="font-semibold text-slate-800">{setting.label}</p>
                  <p className="text-sm text-slate-600">{setting.desc}</p>
                </div>
                <button
                  onClick={() => toggleSetting(setting.key as keyof typeof settings)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors flex-shrink-0 ${
                    settings[setting.key as keyof typeof settings]
                      ? "bg-cyan-600"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      settings[setting.key as keyof typeof settings]
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Bell className="w-6 h-6 text-orange-600" />
            Notification Preferences
          </h2>
          <div className="space-y-4">
            {[
              { key: "soundNotifications", label: "Sound Notifications", desc: "Play sound effects" },
              { key: "desktopAlerts", label: "Desktop Alerts", desc: "Show desktop notifications" },
              { key: "emailDigest", label: "Email Digest", desc: "Weekly summary emails" },
              {
                key: "pushNotifications",
                label: "Push Notifications",
                desc: "Browser push notifications",
              },
            ].map((setting) => (
              <div
                key={setting.key}
                className="flex items-start justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition"
              >
                <div>
                  <p className="font-semibold text-slate-800">{setting.label}</p>
                  <p className="text-sm text-slate-600">{setting.desc}</p>
                </div>
                <button
                  onClick={() => toggleSetting(setting.key as keyof typeof settings)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors flex-shrink-0 ${
                    settings[setting.key as keyof typeof settings]
                      ? "bg-orange-600"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      settings[setting.key as keyof typeof settings]
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Palette className="w-6 h-6 text-purple-600" />
            Display & Accessibility
          </h2>
          <div className="space-y-6">
            {/* Font Size */}
            <div>
              <p className="font-semibold text-slate-800 mb-3">Font Size</p>
              <div className="flex gap-2">
                {["small", "medium", "large", "xlarge"].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleStringChange("fontSize", size)}
                    className={`px-4 py-2 rounded-lg capitalize font-medium transition-all ${
                      settings.fontSize === size
                        ? "bg-purple-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* High Contrast */}
            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="font-semibold text-slate-800">High Contrast Mode</p>
                <p className="text-sm text-slate-600">Increase contrast for better visibility</p>
              </div>
              <button
                onClick={() => toggleSetting("highContrast")}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.highContrast ? "bg-purple-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.highContrast ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Reduced Motion */}
            <div className="flex items-start justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="font-semibold text-slate-800">Reduce Motion</p>
                <p className="text-sm text-slate-600">Minimize animations and transitions</p>
              </div>
              <button
                onClick={() => toggleSetting("reducedMotion")}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  settings.reducedMotion ? "bg-purple-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                    settings.reducedMotion ? "translate-x-7" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border-2 border-yellow-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Code className="w-6 h-6 text-yellow-600" />
            Developer & Advanced Options
          </h2>
          <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-200">
            <p className="text-sm text-yellow-800">
              ⚠️ These advanced options are for experienced users. Incorrect configuration may
              affect app performance.
            </p>
          </div>
          <div className="space-y-4">
            {[
              {
                key: "betaFeatures",
                label: "Enable Beta Features",
                desc: "Access experimental features before release",
              },
              {
                key: "developmentMode",
                label: "Developer Mode",
                desc: "Enable debug tools and verbose logging",
              },
              {
                key: "apiAccessEnabled",
                label: "API Access",
                desc: "Enable REST API for external integrations",
              },
              {
                key: "customDictionary",
                label: "Custom Dictionary Support",
                desc: "Use custom word lists alongside default dictionary",
              },
            ].map((setting) => (
              <div
                key={setting.key}
                className="flex items-start justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:bg-yellow-100 transition"
              >
                <div>
                  <p className="font-semibold text-slate-800">{setting.label}</p>
                  <p className="text-sm text-slate-600">{setting.desc}</p>
                </div>
                <button
                  onClick={() => toggleSetting(setting.key as keyof typeof settings)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors flex-shrink-0 ${
                    settings[setting.key as keyof typeof settings]
                      ? "bg-yellow-600"
                      : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      settings[setting.key as keyof typeof settings]
                        ? "translate-x-7"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}

            {settings.developmentMode && (
              <div className="mt-6 p-4 bg-slate-100 rounded-lg border-2 border-red-500">
                <p className="font-semibold text-slate-800 mb-3">Development Console</p>
                <div className="space-y-2 text-xs">
                  <p className="text-slate-600">🔧 [10:45:23] Application initialized</p>
                  <p className="text-slate-600">📊 [10:45:24] Cache system activated</p>
                  <p className="text-green-600">✅ [10:45:25] All services operational</p>
                  <p className="text-slate-600">🌐 [10:45:26] Connected to API servers</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status & Health Check */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Server className="w-6 h-6 text-green-600" />
            System Health
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Server Status", status: "Operational", color: "green" },
              { label: "API Health", status: "Healthy", color: "green" },
              { label: "Cache Usage", status: "45%", color: "green" },
              { label: "Database", status: "Connected", color: "green" },
              { label: "CDN", status: "Active", color: "green" },
              { label: "Last Backup", status: "1h ago", color: "yellow" },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 bg-${item.color}-50 border-${item.color}-200`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-800">{item.label}</p>
                  <div className={`w-3 h-3 rounded-full bg-${item.color}-500`} />
                </div>
                <p className={`text-sm text-${item.color}-700 mt-1`}>{item.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" size="lg">
            Discard Changes
          </Button>
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  );
}
