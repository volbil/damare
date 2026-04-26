// Hikka-style covers — flatter, less dramatic, more "manga shelf"
function HkCover({ novel, showLabel = false }) {
  return (
    <div className="hk-cover">
      <GeneratedCover title={novel.title} author={novel.author} seed={novel.id}
                       showText={false} />
      {/* Score badge bottom-left */}
      <div style={{ position: 'absolute', left: 6, bottom: 6,
                      display: 'flex', alignItems: 'center', gap: 3,
                      padding: '2px 6px', borderRadius: 4,
                      background: 'oklch(0.13 0 0 / 0.85)',
                      backdropFilter: 'blur(6px)',
                      fontSize: 10.5, fontWeight: 600, color: 'white',
                      fontVariantNumeric: 'tabular-nums' }}>
        <Icon name="star" size={9} style={{ color: 'oklch(0.82 0.16 80)' }} />
        {(novel.kudos / 1000 * 1.2).toFixed(1)}
      </div>
      {showLabel && (
        <div className="hk-cover-art">
          <div style={{ fontSize: 12, fontWeight: 500, color: 'white',
                          textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>
            {novel.title}
          </div>
        </div>
      )}
    </div>
  );
}

window.HkCover = HkCover;
