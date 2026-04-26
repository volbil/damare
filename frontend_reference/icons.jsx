// Lightweight inline icon set (stroke icons)
const Icon = ({ name, size = 16, stroke = 1.6, ...rest }) => {
  const s = size;
  const common = {
    width: s, height: s, viewBox: '0 0 24 24',
    fill: 'none', stroke: 'currentColor', strokeWidth: stroke,
    strokeLinecap: 'round', strokeLinejoin: 'round',
    ...rest,
  };
  switch (name) {
    case 'search':   return <svg {...common}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'home':     return <svg {...common}><path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/></svg>;
    case 'compass':  return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="m15 9-1.5 4.5L9 15l1.5-4.5L15 9Z"/></svg>;
    case 'book':     return <svg {...common}><path d="M4 4h12a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4Z"/><path d="M4 17a3 3 0 0 1 3-3h12"/></svg>;
    case 'pen':      return <svg {...common}><path d="M14 4l6 6L9 21H3v-6L14 4Z"/><path d="m12 6 6 6"/></svg>;
    case 'bookmark': return <svg {...common}><path d="M6 3h12v18l-6-4-6 4V3Z"/></svg>;
    case 'bookmark-fill': return <svg {...common} fill="currentColor"><path d="M6 3h12v18l-6-4-6 4V3Z"/></svg>;
    case 'heart':    return <svg {...common}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></svg>;
    case 'heart-fill': return <svg {...common} fill="currentColor"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></svg>;
    case 'eye':      return <svg {...common}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>;
    case 'message':  return <svg {...common}><path d="M4 5h16v11H8l-4 4V5Z"/></svg>;
    case 'bell':     return <svg {...common}><path d="M6 17V11a6 6 0 1 1 12 0v6l1.5 2H4.5L6 17Z"/><path d="M10 21h4"/></svg>;
    case 'user':     return <svg {...common}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>;
    case 'settings': return <svg {...common}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>;
    case 'plus':     return <svg {...common}><path d="M12 5v14M5 12h14"/></svg>;
    case 'check':    return <svg {...common}><path d="m5 12 5 5L20 7"/></svg>;
    case 'arrow-r':  return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arrow-l':  return <svg {...common}><path d="M19 12H5M11 18l-6-6 6-6"/></svg>;
    case 'arrow-up': return <svg {...common}><path d="M12 19V5M6 11l6-6 6 6"/></svg>;
    case 'menu':     return <svg {...common}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case 'filter':   return <svg {...common}><path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/></svg>;
    case 'sort':     return <svg {...common}><path d="M7 4v16M4 8l3-4 3 4M17 20V4M14 16l3 4 3-4"/></svg>;
    case 'x':        return <svg {...common}><path d="M6 6l12 12M18 6 6 18"/></svg>;
    case 'more':     return <svg {...common}><circle cx="12" cy="6" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="18" r="1.2" fill="currentColor"/></svg>;
    case 'chevron-d': return <svg {...common}><path d="m6 9 6 6 6-6"/></svg>;
    case 'chevron-r': return <svg {...common}><path d="m9 6 6 6-6 6"/></svg>;
    case 'star':     return <svg {...common}><path d="m12 3 2.7 5.7 6.3.9-4.6 4.4 1.1 6.3L12 17.4 6.5 20.3l1.1-6.3L3 9.6l6.3-.9L12 3Z"/></svg>;
    case 'sparkle':  return <svg {...common}><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/></svg>;
    case 'tag':      return <svg {...common}><path d="M3 11V3h8l10 10-8 8-10-10Z"/><circle cx="7" cy="7" r="1.4" fill="currentColor"/></svg>;
    case 'list':     return <svg {...common}><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>;
    case 'grid':     return <svg {...common}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
    case 'type':     return <svg {...common}><path d="M4 6V4h16v2M9 4v16M7 20h4"/></svg>;
    case 'sun':      return <svg {...common}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/></svg>;
    case 'moon':     return <svg {...common}><path d="M21 13a8 8 0 1 1-9-9 6 6 0 0 0 9 9Z"/></svg>;
    case 'edit':     return <svg {...common}><path d="M14 4l6 6L9 21H3v-6L14 4Z"/></svg>;
    case 'flag':     return <svg {...common}><path d="M5 21V4M5 4h12l-2 4 2 4H5"/></svg>;
    case 'send':     return <svg {...common}><path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z"/></svg>;
    case 'image':    return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="1"/><circle cx="9" cy="10" r="1.6"/><path d="m4 18 5-5 5 5 3-3 3 3"/></svg>;
    case 'bold':     return <svg {...common}><path d="M6 4h7a4 4 0 0 1 0 8H6V4ZM6 12h8a4 4 0 0 1 0 8H6v-8Z"/></svg>;
    case 'italic':   return <svg {...common}><path d="M19 4h-7M14 4 10 20M12 20H5"/></svg>;
    case 'quote':    return <svg {...common}><path d="M6 8h4v8H4v-4a4 4 0 0 1 2-4ZM16 8h4v8h-6v-4a4 4 0 0 1 2-4Z"/></svg>;
    case 'minus':    return <svg {...common}><path d="M5 12h14"/></svg>;
    case 'check-circle': return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>;
    case 'globe':    return <svg {...common}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case 'flame':    return <svg {...common}><path d="M12 21c4 0 7-3 7-7 0-3-3-5-3-9 0 0-3 1-4 5-1-2-3-2-3-4 0 0-4 3-4 8s3 7 7 7Z"/></svg>;
    case 'rss':      return <svg {...common}><path d="M5 5a14 14 0 0 1 14 14M5 12a7 7 0 0 1 7 7"/><circle cx="6" cy="18" r="1.5" fill="currentColor"/></svg>;
    case 'lock':     return <svg {...common}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 1 1 8 0v4"/></svg>;
    case 'mail':     return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>;
    case 'kudos':    return <svg {...common}><path d="M14 9V5a2 2 0 0 0-4 0L8 11H4v9h12l4-7v-3h-6Z"/></svg>;
    case 'calendar': return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>;
    case 'play':     return <svg {...common}><path d="M7 5v14l12-7L7 5Z" fill="currentColor"/></svg>;
    case 'tv':       return <svg {...common}><rect x="3" y="5" width="18" height="13" rx="2"/><path d="M8 21h8M12 18v3"/></svg>;
    default:         return null;
  }
};

window.Icon = Icon;
