import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Upload,
  Calendar,
  Database,
  Shield,
  RotateCcw,
  CheckCircle,
  AlertCircle,
  Cloud,
  HardDrive,
} from "lucide-react";

interface Backup {
  id: string;
  name: string;
  date: string;
  size: string;
  type: "manual" | "auto";
  includesData: {
    words: boolean;
    settings: boolean;
    history: boolean;
    stats: boolean;
  };
  status: "complete" | "corrupted" | "partial";
}

const MOCK_BACKUPS: Backup[] = [
  {
    id: "1",
    name: "Backup - April 20, 2024",
    date: "2024-04-20 14:30",
    size: "2.4 MB",
    type: "auto",
    includesData: { words: true, settings: true, history: true, stats: true },
    status: "complete",
  },
  {
    id: "2",
    name: "Backup - April 19, 2024",
    date: "2024-04-19 08:15",
    size: "2.3 MB",
    type: "auto",
    includesData: { words: true, settings: true, history: true, stats: true },
    status: "complete",
  },
  {
    id: "3",
    name: "Before Migration",
    date: "2024-04-18 23:45",
    size: "2.2 MB",
    type: "manual",
    includesData: { words: true, settings: true, history: true, stats: true },
    status: "complete",
  },
  {
    id: "4",
    name: "Backup - April 15, 2024",
    date: "2024-04-15 16:20",
    size: "2.1 MB",
    type: "auto",
    includesData: { words: true, settings: true, history: true, stats: false },
    status: "partial",
  },
];

export default function BackupRestore() {
  const [backups, setBackups] = useState<Backup[]>(MOCK_BACKUPS);
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState("daily");
  const [cloudBackupEnabled, setCloudBackupEnabled] = useState(false);

  const handleCreateBackup = () => {
    const newBackup: Backup = {
      id: Date.now().toString(),
      name: `Backup - ${new Date().toLocaleDateString()}`,
      date: new Date().toLocaleString(),
      size: "2.5 MB",
      type: "manual",
      includesData: { words: true, settings: true, history: true, stats: true },
      status: "complete",
    };
    setBackups([newBackup, ...backups]);
  };

  const handleDownloadBackup = (backup: Backup) => {
    // Simulate download
    console.log("Downloading backup:", backup.id);
    alert(`Downloading ${backup.name}...`);
  };

  const handleRestoreBackup = (backup: Backup) => {
    setSelectedBackup(backup);
    setShowRestoreConfirm(true);
  };

  const confirmRestore = () => {
    if (selectedBackup) {
      alert(`Restored backup: ${selectedBackup.name}\nThis would reload the page in production.`);
      setShowRestoreConfirm(false);
    }
  };

  const handleDeleteBackup = (id: string) => {
    if (confirm("Are you sure you want to delete this backup?")) {
      setBackups(backups.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Database className="w-10 h-10" />
            Backup & Recovery
          </h1>
          <p className="text-blue-100">
            Protect your data with automatic and manual backups. Restore anytime if needed.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={handleCreateBackup} size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Database className="w-5 h-5 mr-2" />
            Create Backup Now
          </Button>
          <Button size="lg" variant="outline">
            <Upload className="w-5 h-5 mr-2" />
            Import From File
          </Button>
          <Button size="lg" variant="outline">
            <Cloud className="w-5 h-5 mr-2" />
            Cloud Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Backup List */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-slate-800">Your Backups</h2>

            {backups.length > 0 ? (
              <div className="space-y-4">
                {backups.map((backup) => (
                  <div
                    key={backup.id}
                    onClick={() => setSelectedBackup(backup)}
                    className={`p-6 rounded-xl shadow-md cursor-pointer transition-all border-2 ${
                      selectedBackup?.id === backup.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-800">{backup.name}</h3>
                          <Badge variant="outline">{backup.type.toUpperCase()}</Badge>
                          {backup.status === "complete" ? (
                            <Badge className="bg-green-100 text-green-800 border-green-300">
                              Complete
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
                              Partial
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {backup.date}
                          </span>
                          <span>{backup.size}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {backup.includesData.words && (
                            <Badge className="bg-blue-50 text-blue-700 border border-blue-200">
                              Words
                            </Badge>
                          )}
                          {backup.includesData.settings && (
                            <Badge className="bg-purple-50 text-purple-700 border border-purple-200">
                              Settings
                            </Badge>
                          )}
                          {backup.includesData.history && (
                            <Badge className="bg-pink-50 text-pink-700 border border-pink-200">
                              History
                            </Badge>
                          )}
                          {backup.includesData.stats && (
                            <Badge className="bg-orange-50 text-orange-700 border border-orange-200">
                              Statistics
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2 flex-col">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadBackup(backup);
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRestoreBackup(backup);
                          }}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteBackup(backup.id);
                          }}
                        >
                          🗑️
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-slate-600">No backups available</p>
              </div>
            )}
          </div>

          {/* Settings & Details */}
          <div className="space-y-4">
            {/* Backup Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Backup Settings</h3>

              <div className="space-y-4">
                {/* Auto Backup */}
                <div className="flex items-start justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-slate-800">Auto Backup</p>
                    <p className="text-xs text-slate-600">Automatic daily backups</p>
                  </div>
                  <button
                    onClick={() => setAutoBackupEnabled(!autoBackupEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      autoBackupEnabled ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        autoBackupEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Backup Frequency */}
                {autoBackupEnabled && (
                  <div>
                    <label className="text-sm font-semibold text-slate-700 mb-2 block">
                      Backup Frequency
                    </label>
                    <select
                      value={backupFrequency}
                      onChange={(e) => setBackupFrequency(e.target.value)}
                      className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg"
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                )}

                {/* Cloud Backup */}
                <div className="flex items-start justify-between p-3 bg-slate-50 rounded-lg border-2 border-blue-200">
                  <div>
                    <p className="font-semibold text-slate-800">Cloud Backup</p>
                    <p className="text-xs text-slate-600">Upload to cloud storage</p>
                  </div>
                  <button
                    onClick={() => setCloudBackupEnabled(!cloudBackupEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      cloudBackupEnabled ? "bg-blue-600" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        cloudBackupEnabled ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Details */}
              {selectedBackup && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-800 mb-3">Backup Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Status:</span>
                      <Badge className="bg-green-100 text-green-800">
                        {selectedBackup.status === "complete" ? "✓ Complete" : "⚠ Partial"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Date:</span>
                      <span className="font-medium">{selectedBackup.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Size:</span>
                      <span className="font-medium">{selectedBackup.size}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Storage Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <HardDrive className="w-6 h-6 text-blue-600" />
            Storage Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
              <p className="text-slate-600 mb-2">Local Storage</p>
              <p className="text-3xl font-bold text-blue-600">245 MB</p>
              <p className="text-sm text-slate-600 mt-2">of 500 MB available</p>
              <div className="w-full h-2 bg-slate-200 rounded-full mt-3">
                <div className="h-full w-1/2 bg-blue-600 rounded-full" />
              </div>
            </div>

            <div className="p-6 bg-purple-50 rounded-lg border-2 border-purple-200">
              <p className="text-slate-600 mb-2">Cloud Storage</p>
              <p className="text-3xl font-bold text-purple-600">1.2 GB</p>
              <p className="text-sm text-slate-600 mt-2">of 5 GB available</p>
              <div className="w-full h-2 bg-slate-200 rounded-full mt-3">
                <div className="h-full w-1/4 bg-purple-600 rounded-full" />
              </div>
            </div>

            <div className="p-6 bg-orange-50 rounded-lg border-2 border-orange-200">
              <p className="text-slate-600 mb-2">Oldest Backup</p>
              <p className="text-3xl font-bold text-orange-600">32 days</p>
              <p className="text-sm text-slate-600 mt-2">April 15, 2024</p>
            </div>
          </div>
        </div>

        {/* Restore Confirmation Modal */}
        {showRestoreConfirm && selectedBackup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
                <h2 className="text-2xl font-bold text-slate-800">Confirm Restore</h2>
              </div>

              <p className="text-slate-600 mb-4">
                This will restore your data to the state of{" "}
                <strong>{selectedBackup.date}</strong>. Current data will be overwritten.
              </p>

              <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-200">
                <p className="text-sm text-yellow-800">
                  ⚠️ This action cannot be undone. Make sure you have a current backup.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowRestoreConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmRestore}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  Confirm Restore
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Best Practices */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg p-8 border-2 border-green-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">💡 Backup Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Automated Daily Backups",
                desc: "Enable automatic backups to protect against data loss automatically",
              },
              {
                title: "Download Important Backups",
                desc: "Keep local copies of critical backups on your device or external drive",
              },
              {
                title: "Test Restores Periodically",
                desc: "Verify backups work by restoring to a test environment",
              },
              {
                title: "Multiple Backup Locations",
                desc: "Store backups in both local and cloud storage for redundancy",
              },
            ].map((practice, idx) => (
              <div key={idx} className="flex gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-800">{practice.title}</p>
                  <p className="text-sm text-slate-600 mt-1">{practice.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
