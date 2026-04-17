import { useRef, useCallback, useState } from 'react'
import { DashboardConfig } from '../lib/config'
import ScreenerPanel from './ScreenerPanel'
import IframePanel from './IframePanel'

interface Props {
  config: DashboardConfig
  onSplitChange: (leftPct: number, rightTopPct: number) => void
}

export default function Dashboard({ config, onSplitChange }: Props) {
  const rootRef      = useRef<HTMLDivElement>(null)
  const chatRef      = useRef<HTMLDivElement>(null)
  const rightRef     = useRef<HTMLDivElement>(null)
  const chartRef     = useRef<HTMLDivElement>(null)
  const screenerRef  = useRef<HTMLDivElement>(null)
  const leftPct      = useRef(config.leftPct)
  const rightTopPct  = useRef(config.rightTopPct)

  // Cursor shown on the full-screen drag overlay while dragging
  const [dragCursor, setDragCursor] = useState<'col-resize' | 'row-resize' | null>(null)

  const dragV = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setDragCursor('col-resize')
    const onMove = (ev: MouseEvent) => {
      if (!rootRef.current || !chatRef.current || !rightRef.current) return
      const { left, width } = rootRef.current.getBoundingClientRect()
      const pct = Math.min(60, Math.max(10, ((ev.clientX - left) / width) * 100))
      leftPct.current = pct
      chatRef.current.style.width  = `${pct}%`
      rightRef.current.style.width = `${100 - pct}%`
    }
    const onUp = () => {
      setDragCursor(null)
      onSplitChange(Math.round(leftPct.current), Math.round(rightTopPct.current))
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [onSplitChange])

  const dragH = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setDragCursor('row-resize')
    const onMove = (ev: MouseEvent) => {
      if (!rightRef.current || !chartRef.current || !screenerRef.current) return
      const { top, height } = rightRef.current.getBoundingClientRect()
      const pct = Math.min(80, Math.max(20, ((ev.clientY - top) / height) * 100))
      rightTopPct.current = pct
      chartRef.current.style.height    = `${pct}%`
      screenerRef.current.style.height = `${100 - pct}%`
    }
    const onUp = () => {
      setDragCursor(null)
      onSplitChange(Math.round(leftPct.current), Math.round(rightTopPct.current))
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [onSplitChange])

  return (
    <div ref={rootRef} className="relative flex h-full w-full select-none">

      {/*
        Full-screen overlay rendered while dragging.
        Sits above all iframes so mousemove/mouseup stay in the parent document
        instead of being swallowed by iframe content.
      */}
      {dragCursor && (
        <div className="absolute inset-0 z-50" style={{ cursor: dragCursor }} />
      )}

      {/* Left column: Chat */}
      <div ref={chatRef} style={{ width: `${config.leftPct}%` }} className="h-full min-w-0 shrink-0">
        <IframePanel url={config.chatUrl} label="Chat" />
      </div>

      {/* Vertical divider */}
      <div
        onMouseDown={dragV}
        className="w-[3px] shrink-0 cursor-col-resize bg-[#222] hover:bg-[#4a9eff] active:bg-[#4a9eff] transition-colors"
      />

      {/* Right column: Chart (top) + Screeners (bottom) */}
      <div ref={rightRef} style={{ width: `${100 - config.leftPct}%` }} className="flex flex-col h-full min-w-0">
        <div ref={chartRef} style={{ height: `${config.rightTopPct}%` }} className="min-h-0">
          <IframePanel url={config.chartUrl} label="Chart" />
        </div>

        {/* Horizontal divider */}
        <div
          onMouseDown={dragH}
          className="h-[3px] shrink-0 cursor-row-resize bg-[#222] hover:bg-[#4a9eff] active:bg-[#4a9eff] transition-colors"
        />

        <div ref={screenerRef} style={{ height: `${100 - config.rightTopPct}%` }} className="min-h-0">
          <ScreenerPanel tabs={config.screeners} />
        </div>
      </div>

    </div>
  )
}
