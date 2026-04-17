import { useState } from 'react'
import { ScreenerTab } from '../lib/config'
import IframePanel from './IframePanel'

export default function ScreenerPanel({ tabs }: { tabs: ScreenerTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? '')

  // All iframes are mounted; only the active one is visible.
  // This keeps the page loaded when switching tabs.
  return (
    <div className="flex flex-col h-full w-full">
      {/* Tab bar */}
      <div className="flex items-end gap-0 px-1 pt-1 bg-[#141414] border-b border-[#242424] shrink-0 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveId(tab.id)}
            className={`px-3 py-1 text-xs whitespace-nowrap rounded-t transition-colors ${
              tab.id === activeId
                ? 'bg-[#0f0f0f] text-white border border-b-[#0f0f0f] border-[#333]'
                : 'text-[#777] hover:text-[#ccc] hover:bg-[#1c1c1c]'
            }`}
          >
            {tab.label || 'Untitled'}
          </button>
        ))}
        {tabs.length === 0 && (
          <span className="px-3 py-1 text-xs text-[#555]">No screeners — open Settings ⚙</span>
        )}
      </div>

      {/* Stacked iframes — only active is visible */}
      <div className="flex-1 relative min-h-0">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className="absolute inset-0"
            style={{ visibility: tab.id === activeId ? 'visible' : 'hidden' }}
          >
            <IframePanel url={tab.url} label={tab.label} />
          </div>
        ))}
      </div>
    </div>
  )
}
