import sharp from 'sharp'
import { writeFileSync } from 'fs'

// Icon design: dark dashboard with 3 panels (chat left, chart top-right, screeners bottom-right)
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <!-- Background -->
  <rect width="128" height="128" rx="16" fill="#141414"/>

  <!-- Panel backgrounds -->
  <rect x="8"  y="8"  width="32" height="112" rx="3" fill="#1e1e1e"/>
  <rect x="46" y="8"  width="74" height="56"  rx="3" fill="#1e1e1e"/>
  <rect x="46" y="70" width="74" height="50"  rx="3" fill="#1e1e1e"/>

  <!-- Chat lines (left panel) -->
  <rect x="13" y="18" width="18" height="2.5" rx="1.25" fill="#3a3a3a"/>
  <rect x="13" y="25" width="22" height="2.5" rx="1.25" fill="#3a3a3a"/>
  <rect x="13" y="32" width="14" height="2.5" rx="1.25" fill="#3a3a3a"/>
  <rect x="13" y="39" width="20" height="2.5" rx="1.25" fill="#3a3a3a"/>
  <rect x="13" y="46" width="16" height="2.5" rx="1.25" fill="#3a3a3a"/>

  <!-- Chart line (top-right panel) -->
  <polyline
    points="51,52 61,40 71,44 81,30 91,34 101,22 111,26 117,18"
    fill="none" stroke="#4a9eff" stroke-width="2.5"
    stroke-linecap="round" stroke-linejoin="round"/>

  <!-- Screener tab indicators -->
  <rect x="50" y="74" width="14" height="2.5" rx="1.25" fill="#4a9eff"/>
  <rect x="67" y="74" width="14" height="2.5" rx="1.25" fill="#333"/>
  <rect x="84" y="74" width="14" height="2.5" rx="1.25" fill="#333"/>

  <!-- Screener rows -->
  <rect x="50" y="82" width="7" height="2" rx="1" fill="#4a9eff"/>
  <rect x="60" y="82" width="30" height="2" rx="1" fill="#333"/>
  <rect x="93" y="82" width="18" height="2" rx="1" fill="#333"/>

  <rect x="50" y="90" width="7" height="2" rx="1" fill="#4a9eff"/>
  <rect x="60" y="90" width="22" height="2" rx="1" fill="#333"/>
  <rect x="85" y="90" width="24" height="2" rx="1" fill="#333"/>

  <rect x="50" y="98" width="7" height="2" rx="1" fill="#4a9eff"/>
  <rect x="60" y="98" width="34" height="2" rx="1" fill="#333"/>
  <rect x="97" y="98" width="14" height="2" rx="1" fill="#333"/>

  <rect x="50" y="106" width="7" height="2" rx="1" fill="#4a9eff"/>
  <rect x="60" y="106" width="18" height="2" rx="1" fill="#333"/>
  <rect x="81" y="106" width="22" height="2" rx="1" fill="#333"/>
</svg>`

for (const size of [16, 48, 128]) {
  const png = await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toBuffer()
  writeFileSync(`public/icons/icon${size}.png`, png)
  console.log(`✓ icon${size}.png`)
}
