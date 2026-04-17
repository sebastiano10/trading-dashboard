interface Props {
  url: string
  label: string
}

export default function IframePanel({ url, label }: Props) {
  if (!url) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-2 text-[#444]">
        <span className="text-sm">{label}</span>
        <span className="text-xs">No URL — open ⚙ Settings to configure</span>
      </div>
    )
  }

  return (
    <iframe
      src={url}
      title={label}
      className="w-full h-full"
      allow="clipboard-read; clipboard-write"
      // sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      // sandbox is commented out intentionally: TradingView requires allow-same-origin
      // without it. Remove the sandbox attribute entirely for full compatibility.
    />
  )
}
