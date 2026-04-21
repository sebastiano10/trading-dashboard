import { X, Plus, Trash2 } from 'lucide-react'
import { DashboardConfig, ScreenerTab, uid } from '../lib/config'

interface Props {
  config: DashboardConfig
  onChange: (c: DashboardConfig) => void
  onClose: () => void
}

function Input({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="flex-1 min-w-0 bg-[#111] border border-[#333] rounded px-2 py-1.5 text-xs text-white placeholder-[#444] focus:outline-none focus:border-[#4a9eff] transition-colors"
    />
  )
}

export default function Settings({ config, onChange, onClose }: Props) {
  const updateTab = (id: string, field: keyof ScreenerTab, val: string) =>
    onChange({ ...config, screeners: config.screeners.map(s => s.id === id ? { ...s, [field]: val } : s) })

  const addTab = () =>
    onChange({ ...config, screeners: [...config.screeners, { id: uid(), label: 'New Tab', url: '' }] })

  const removeTab = (id: string) =>
    onChange({ ...config, screeners: config.screeners.filter(s => s.id !== id) })

  const moveTab = (i: number, dir: -1 | 1) => {
    const arr = [...config.screeners]
    const j = i + dir
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]]
    onChange({ ...config, screeners: arr })
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/75">
      <div className="bg-[#1a1a1a] border border-[#333] rounded-lg w-[640px] max-h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2a2a]">
          <h2 className="text-sm font-semibold">Settings</h2>
          <button onClick={onClose} className="text-[#666] hover:text-white transition-colors"><X size={15} /></button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">

          {/* Screeners */}
          <section>
            <h3 className="text-[10px] font-semibold text-[#777] uppercase tracking-widest mb-2">Screener Tabs</h3>
            <div className="space-y-2">
              {config.screeners.map((tab, i) => (
                <div key={tab.id} className="flex items-center gap-2">
                  <div className="flex flex-col gap-0.5 shrink-0">
                    <button onClick={() => moveTab(i, -1)} disabled={i === 0}
                      className="text-[#444] hover:text-[#888] disabled:opacity-20 text-[10px] leading-none">▲</button>
                    <button onClick={() => moveTab(i, 1)} disabled={i === config.screeners.length - 1}
                      className="text-[#444] hover:text-[#888] disabled:opacity-20 text-[10px] leading-none">▼</button>
                  </div>
                  <input
                    value={tab.label}
                    onChange={e => updateTab(tab.id, 'label', e.target.value)}
                    placeholder="Label"
                    className="w-24 shrink-0 bg-[#111] border border-[#333] rounded px-2 py-1.5 text-xs text-white placeholder-[#444] focus:outline-none focus:border-[#4a9eff]"
                  />
                  <Input value={tab.url} onChange={v => updateTab(tab.id, 'url', v)}
                    placeholder="https://www.tradingview.com/screener/..." />
                  <button onClick={() => removeTab(tab.id)}
                    className="shrink-0 text-[#555] hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                </div>
              ))}
            </div>
            <button onClick={addTab}
              className="mt-2 flex items-center gap-1 text-xs text-[#4a9eff] hover:text-[#7abfff] transition-colors">
              <Plus size={12} /> Add screener tab
            </button>
          </section>

          {/* Chart */}
          <section>
            <h3 className="text-[10px] font-semibold text-[#777] uppercase tracking-widest mb-2">Chart URL</h3>
            <Input value={config.chartUrl} onChange={v => onChange({ ...config, chartUrl: v })}
              placeholder="https://www.tradingview.com/chart/" />
          </section>

          {/* Chat */}
          <section>
            <h3 className="text-[10px] font-semibold text-[#777] uppercase tracking-widest mb-2">Chat URL</h3>
            <Input value={config.chatUrl} onChange={v => onChange({ ...config, chatUrl: v })}
              placeholder="https://your-chat-site.com" />
          </section>

          {/* Note about iframe compatibility */}
          <section className="text-[11px] text-[#555] leading-5 border-t border-[#252525] pt-4">
            <strong className="text-[#666]">Note:</strong> Some sites block iframe embedding (X-Frame-Options).
            TradingView shared screener links (<code className="text-[#888]">tradingview.com/screener/…</code>) typically work.
            If a panel shows blank, the site is blocking it.
          </section>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-5 py-3 border-t border-[#2a2a2a]">
          <button onClick={onClose}
            className="px-4 py-1.5 text-xs rounded bg-[#4a9eff] hover:bg-[#3a8eef] text-white transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
