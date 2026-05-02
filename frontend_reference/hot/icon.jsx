/* Inline SVG icons — minimal subset matching templates/components/icon.html */
function MockIcon({ name, size = 16, stroke = 1.6 }) {
  const s = size, st = stroke;
  const common = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: st, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'rss': return <svg {...common}><path d="M5 5a14 14 0 0 1 14 14M5 12a7 7 0 0 1 7 7"/><circle cx="6" cy="18" r="1.5" fill="currentColor"/></svg>;
    case 'flame': return <svg {...common}><path d="M12 21c4 0 7-3 7-7 0-3-3-5-3-9 0 0-3 1-4 5-1-2-3-2-3-4 0 0-4 3-4 8s3 7 7 7Z"/></svg>;
    case 'heart': return <svg {...common}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></svg>;
    case 'message': return <svg {...common}><path d="M4 5h16v11H8l-4 4V5Z"/></svg>;
    case 'eye': return <svg {...common}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>;
    case 'sparkle': return <svg {...common}><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></svg>;
    case 'star': return <svg {...common}><path d="m12 3 2.7 5.7 6.3.9-4.6 4.4 1.1 6.3L12 17.4 6.5 20.3l1.1-6.3L3 9.6l6.3-.9L12 3Z"/></svg>;
    case 'quote': return <svg {...common}><path d="M6 8h4v8H4v-4a4 4 0 0 1 2-4ZM16 8h4v8h-6v-4a4 4 0 0 1 2-4Z"/></svg>;
    case 'arrow-r': return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'check': return <svg {...common}><path d="m5 12 5 5L20 7"/></svg>;
    case 'send': return <svg {...common}><path d="m22 2-11 11M22 2l-7 20-4-9-9-4 20-7Z"/></svg>;
    case 'github': return <svg {...common}><path d="M9 19c-4 1.5-4-2-6-2m12 4v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>;
    default: return null;
  }
}
window.MockIcon = MockIcon;
