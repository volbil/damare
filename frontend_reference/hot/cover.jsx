/* Programmatic SVG cover — mirrors components/cover.html behavior.
   Deterministic palette + layout from a seed string. */

function hashStr(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const COVER_PALETTES = [
  ['#1a2620', '#9bbf7c', '#e8e6dd'], // pine
  ['#2a1f1a', '#d18b5a', '#f0e9dc'], // umber
  ['#1d2129', '#6a8fb8', '#dde4ee'], // ink
  ['#2b1d24', '#b87a8e', '#f0d8db'], // rose
  ['#23231a', '#c9b25c', '#ece4c8'], // ochre
  ['#1a1f1f', '#7daea8', '#dde9e6'], // sea
];

function MockCover({ title, author = '', seed = '', showText = true }) {
  const s = seed || title;
  const h = hashStr(s);
  const pal = COVER_PALETTES[h % COVER_PALETTES.length];
  const lay = h % 6;
  const [bg, accent, ink] = pal;

  const shapes = (() => {
    switch (lay) {
      case 0: return <>
        <rect width="200" height="300" fill={bg}/>
        <circle cx="100" cy="120" r="60" fill={accent} opacity="0.9"/>
        <rect x="0" y="180" width="200" height="120" fill={accent} opacity="0.08"/>
        <line x1="20" y1="180" x2="180" y2="180" stroke={ink} strokeOpacity="0.3"/>
      </>;
      case 1: return <>
        <rect width="200" height="300" fill={bg}/>
        <rect x="0" y="0" width="60" height="300" fill={accent} opacity="0.85"/>
        <rect x="80" y="40" width="2" height="220" fill={ink} opacity="0.5"/>
        <circle cx="140" cy="80" r="24" fill="none" stroke={ink} strokeOpacity="0.4"/>
      </>;
      case 2: return <>
        <rect width="200" height="300" fill={bg}/>
        <polygon points="0,0 200,0 200,180" fill={accent} opacity="0.18"/>
        <polygon points="0,300 200,300 0,80" fill={accent} opacity="0.05"/>
        <line x1="0" y1="80" x2="200" y2="180" stroke={accent} strokeWidth="1" opacity="0.6"/>
      </>;
      case 3: return <>
        <rect width="200" height="300" fill={bg}/>
        <circle cx="100" cy="220" r="120" fill="none" stroke={accent} strokeWidth="1" opacity="0.5"/>
        <circle cx="100" cy="220" r="80" fill="none" stroke={accent} strokeWidth="1" opacity="0.4"/>
        <circle cx="100" cy="220" r="40" fill={accent} opacity="0.7"/>
      </>;
      case 4: return <>
        <rect width="200" height="300" fill={bg}/>
        {[40, 80, 120, 160, 200, 240].map(y => (
          <line key={y} x1="0" y1={y} x2="200" y2={y} stroke={ink} strokeOpacity="0.07"/>
        ))}
        <circle cx="100" cy="100" r="7" fill={accent}/>
      </>;
      default: return <>
        <rect width="200" height="300" fill={bg}/>
        <rect x="14" y="14" width="172" height="272" fill="none" stroke={accent} strokeOpacity="0.45"/>
        <rect x="14" y="14" width="172" height="60" fill={accent} opacity="0.12"/>
      </>;
    }
  })();

  const ty = lay === 5 ? 50 : 240;
  const ay = lay === 5 ? 66 : 256;
  const shortTitle = title.length > 22 ? title.slice(0, 21) + '…' : title;

  return (
    <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMid slice"
         style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {shapes}
      {showText && <>
        <text x="20" y={ty} fontFamily="IBM Plex Serif, Georgia, serif" fontSize="16"
              fontWeight="500" fill={ink} style={{ letterSpacing: '-0.01em' }}>
          {shortTitle}
        </text>
        {author && (
          <text x="20" y={ay} fontFamily="IBM Plex Sans, sans-serif" fontSize="9"
                fill={ink} fillOpacity="0.65"
                style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {author}
          </text>
        )}
      </>}
    </svg>
  );
}

window.MockCover = MockCover;
