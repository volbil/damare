// Cover art generator — programmatic SVG covers (no external assets).
// Style is editorial / minimal so it matches the brand.

const COVER_PALETTES = [
  // [base, accent, ink]
  ['#1a2138', '#e8c547', '#f5e9c4'],
  ['#2b1d2f', '#d97a5a', '#f0d9c8'],
  ['#1c2a26', '#9bb89a', '#dde7d8'],
  ['#3a1f1c', '#e8c547', '#f4d8b8'],
  ['#241a2e', '#a594d9', '#e2d9f2'],
  ['#1f2a3a', '#7cb3c9', '#d6e6ee'],
  ['#2a2118', '#e8b547', '#f3dca0'],
  ['#1d2b2b', '#e8c547', '#cce5d8'],
  ['#2e1a26', '#e89e8a', '#f4d4cc'],
  ['#202020', '#e8c547', '#e8e4d8'],
  ['#1a1d2e', '#bf8ce0', '#dccff0'],
  ['#2a2a3e', '#e8c547', '#cdd0e8'],
];

function pickPalette(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return COVER_PALETTES[Math.abs(h) % COVER_PALETTES.length];
}

// Several layout variants — chosen by seed for variety.
function GeneratedCover({ title, author, seed = '', layout, palette, showText = true }) {
  const pal = palette || pickPalette(seed || title);
  const [bg, accent, ink] = pal;
  let h = 0;
  for (let i = 0; i < (seed + title).length; i++) h = (h * 33 + (seed + title).charCodeAt(i)) | 0;
  const lay = layout != null ? layout : Math.abs(h) % 6;

  const Layouts = [
    // 0 — circle + horizon
    () => (
      <>
        <rect width="200" height="300" fill={bg} />
        <circle cx="100" cy="120" r="60" fill={accent} opacity="0.9" />
        <rect x="0" y="180" width="200" height="120" fill={accent} opacity="0.08" />
        <line x1="20" y1="180" x2="180" y2="180" stroke={ink} strokeOpacity="0.3" />
      </>
    ),
    // 1 — vertical bands
    () => (
      <>
        <rect width="200" height="300" fill={bg} />
        <rect x="0" y="0" width="60" height="300" fill={accent} opacity="0.85" />
        <rect x="80" y="40" width="2" height="220" fill={ink} opacity="0.5" />
        <circle cx="140" cy="80" r="24" fill="none" stroke={ink} strokeOpacity="0.4" />
      </>
    ),
    // 2 — diagonal split
    () => (
      <>
        <rect width="200" height="300" fill={bg} />
        <polygon points="0,0 200,0 200,180" fill={accent} opacity="0.18" />
        <polygon points="0,300 200,300 0,80" fill={accent} opacity="0.05" />
        <line x1="0" y1="80" x2="200" y2="180" stroke={accent} strokeWidth="1" opacity="0.6" />
      </>
    ),
    // 3 — concentric arcs
    () => (
      <>
        <rect width="200" height="300" fill={bg} />
        <circle cx="100" cy="220" r="120" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
        <circle cx="100" cy="220" r="80"  fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
        <circle cx="100" cy="220" r="40"  fill={accent} opacity="0.7" />
      </>
    ),
    // 4 — grid + dot
    () => (
      <>
        <rect width="200" height="300" fill={bg} />
        {[40, 80, 120, 160, 200, 240].map((y, i) => (
          <line key={i} x1="0" y1={y} x2="200" y2={y} stroke={ink} strokeOpacity="0.07" />
        ))}
        <circle cx="100" cy="100" r="7" fill={accent} />
      </>
    ),
    // 5 — solid w/ frame
    () => (
      <>
        <rect width="200" height="300" fill={bg} />
        <rect x="14" y="14" width="172" height="272" fill="none" stroke={accent} strokeOpacity="0.45" />
        <rect x="14" y="14" width="172" height="60" fill={accent} opacity="0.12" />
      </>
    ),
  ];

  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice"
         style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {Layouts[lay]()}
      {showText && (
        <>
          <text x="20" y={lay === 5 ? 50 : 240}
                fontFamily="Newsreader, Georgia, serif" fontSize="16" fontWeight="500"
                fill={ink} style={{ letterSpacing: '-0.01em' }}>
            {title.length > 22 ? title.slice(0, 21) + '…' : title}
          </text>
          {author && (
            <text x="20" y={lay === 5 ? 66 : 256}
                  fontFamily="Inter, sans-serif" fontSize="9"
                  fill={ink} fillOpacity="0.65"
                  style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {author}
            </text>
          )}
        </>
      )}
    </svg>
  );
}

window.GeneratedCover = GeneratedCover;
window.pickPalette = pickPalette;
