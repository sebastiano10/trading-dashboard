import { useState, useEffect, useCallback } from 'react'
import { Settings as SettingsIcon } from 'lucide-react'
import { loadConfigAsync, saveConfig, DashboardConfig } from './lib/config'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'

export default function App() {
  const [config, setConfig] = useState<DashboardConfig | null>(null)
  const [showSettings, setShowSettings] = useState(false)

  // Load persisted config once on mount
  useEffect(() => {
    loadConfigAsync().then(setConfig)
  }, [])

  // Every config change is saved immediately
  const updateConfig = useCallback((next: DashboardConfig) => {
    setConfig(next)
    saveConfig(next)
  }, [])

  // Don't render until config is loaded (avoids flash of default layout)
  if (!config) return null

  return (
    <div className="flex flex-col h-full w-full bg-[#0f0f0f]">
      <div className="flex items-center justify-between px-3 h-7 bg-[#141414] border-b border-[#242424] shrink-0">
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#555]">
          Trading Dashboard
        </span>
        <button
          onClick={() => setShowSettings(true)}
          className="p-1 rounded text-[#555] hover:text-white hover:bg-[#2a2a2a] transition-colors"
          title="Settings (configure URLs)"
        >
          <SettingsIcon size={13} />
        </button>
      </div>

      <div className="flex-1 min-h-0">
        <Dashboard
          config={config}
          onSplitChange={(l, r) => updateConfig({ ...config, leftPct: l, rightTopPct: r })}
        />
      </div>

      {showSettings && (
        <Settings config={config} onChange={updateConfig} onClose={() => setShowSettings(false)} />
      )}
    </div>
  )
}
