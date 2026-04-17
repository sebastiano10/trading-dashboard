/// <reference types="chrome"/>

export interface ScreenerTab {
  id: string
  label: string
  url: string
}

export interface DashboardConfig {
  screeners: ScreenerTab[]
  chartUrl: string
  chatUrl: string
  leftPct: number
  rightTopPct: number
}

const KEY = 'trading-dashboard-v1'

export const DEFAULT_CONFIG: DashboardConfig = {
  screeners: [
    { id: 'eu-longs',  label: 'EU Longs',  url: '' },
    { id: 'eu-shorts', label: 'EU Shorts', url: '' },
    { id: 'us-longs',  label: 'US Longs',  url: '' },
    { id: 'us-shorts', label: 'US Shorts', url: '' }
  ],
  chartUrl: 'https://www.tradingview.com/chart/',
  chatUrl: '',
  leftPct: 25,
  rightTopPct: 45
}

const isChromeExtension = typeof chrome !== 'undefined' && !!chrome.storage

export async function loadConfigAsync(): Promise<DashboardConfig> {
  if (isChromeExtension) {
    return new Promise(resolve => {
      chrome.storage.sync.get(KEY, result => {
        const saved = result[KEY]
        resolve(saved ? { ...DEFAULT_CONFIG, ...saved } : DEFAULT_CONFIG)
      })
    })
  }
  // Dev server fallback
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? { ...DEFAULT_CONFIG, ...JSON.parse(raw) } : DEFAULT_CONFIG
  } catch {
    return DEFAULT_CONFIG
  }
}

export function saveConfig(c: DashboardConfig): void {
  if (isChromeExtension) {
    chrome.storage.sync.set({ [KEY]: c })
  } else {
    localStorage.setItem(KEY, JSON.stringify(c))
  }
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 9)
}
