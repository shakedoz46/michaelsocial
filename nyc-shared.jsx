// Shared data + tiny utilities for all 3 NYC directions.
// Hebrew RTL content for Michael's portfolio.

const NYC_VIDEOS = [
  { src: 'assets/videos/nyc-bar.mp4',         label: 'בר על הגג',         tag: 'NIGHTLIFE',  likes: '4,287',  comments: 132 },
  { src: 'assets/videos/nyc-coffee.mp4',      label: 'קפה של בוקר',       tag: 'CAFÉ',       likes: '6,104',  comments: 218 },
  { src: 'assets/videos/nyc-restaurant.mp4',  label: 'מסעדה איטלקית',     tag: 'DINING',     likes: '3,892',  comments: 96  },
  { src: 'assets/videos/nyc-active.mp4',      label: 'פעילות בעיר',       tag: 'LIFESTYLE',  likes: '2,743',  comments: 71  },
  { src: 'assets/videos/nyc-rooftop.mp4',     label: 'רוטופ במנהטן',      tag: 'ROOFTOP',    likes: '8,431',  comments: 412 },
  { src: 'assets/videos/nyc-steakhouse.mp4',  label: 'סטייקיה קלאסית',    tag: 'DINING',     likes: '5,917',  comments: 188 },
];

const NYC_STATS = [
  { value: '80K',  label: 'עוקבים על העמוד' },
  { value: '4',    label: 'חודשי עבודה אינטנסיביים' },
  { value: '120+', label: 'פוסטים, ריילס וסטוריס' },
];

const NYC_BULLETS = [
  { title: 'צילומים ועריכות',       desc: 'תיעוד חוויות, אוכל ובילויים ברחבי ניו יורק. מבר על הגג ועד קפה של בוקר.' },
  { title: 'הגדלת קהל ומעורבות',    desc: 'שמרתי על רמת תוכן גבוהה, וצמחנו יחד באלפי עוקבים בארבעה חודשים בלבד.' },
  { title: 'למידה מהשטח',           desc: 'ספגתי ידע עצום על סושיאל, אלגוריתמים, מותגים וקהלים אמיתיים.' },
];

const NYC_COPY = {
  kicker: '✦ NYC EXPERIENCE',
  number: '03',
  headline: { he1: 'מניו יורק', he2: 'ועד אליכם', accent: 'סושיאל ששובר את הרשת' },
  paragraph: 'בניו יורק, מצאתי את עצמי ממלא מקום למשך 4 חודשים עבור מנהלת הסושיאל של עמוד האינסטגרם המפורסם datinglistnyc (שמונה כמעט 80K עוקבים!). זו הייתה תקופה אינטנסיבית ומלאת למידה, שבה הייתי אחראי על:',
  shortPara: 'ארבעה חודשים. עמוד אחד. 80,000 עוקבים. הסיפור של datinglistnyc.',
  pullQuote: 'מיכאל הגיע אלינו בתקופה עמוסה במיוחד, והוא פשוט הציל אותנו.',
  pullAttribution: '— datinglistnyc',
};

const HE_COMMENTS = [
  { user: 'tlv.foodie',     text: 'אחי הקליפ הזה אש 🔥🔥🔥', likes: 412, ago: '2ש׳' },
  { user: 'ronibarak',      text: 'תגיד לי שזה אתה צילמת?? בלתי אפשרי', likes: 217, ago: '5ש׳' },
  { user: 'datinglistnyc',  text: 'מיכאל הגיע אלינו והציל אותנו! ❤️', likes: 1247, ago: '1ש׳', verified: true },
  { user: 'shir.dor',       text: 'מבקשת אותך עליי בחתונה 😍', likes: 89, ago: '14ש׳' },
  { user: 'nycbites',       text: 'best content on our feed this month', likes: 304, ago: '3ש׳' },
  { user: 'maor.k',         text: 'איך הוא תופס את הרגעים האלו?!', likes: 56, ago: '6ש׳' },
];

const NYC_PRESETS = {
  bg: {
    dark:  { bg: '#0A0A0A', soft: '#141414', text: '#F5F0EB', muted: '#8A8070', border: '#2A2520' },
    light: { bg: '#F4F0EA', soft: '#FFFFFF', text: '#0A0A0A', muted: '#6B6258', border: '#D9D2C5' },
    cream: { bg: '#F8E7CF', soft: '#FFF6E8', text: '#1A1208', muted: '#6E5535', border: '#E0C695' },
  },
  type: {
    'DM Sans + Heebo':        { display: "'DM Sans', 'Heebo', sans-serif", body: "'Heebo', sans-serif", mono: "'JetBrains Mono', monospace" },
    'Bricolage + Heebo':      { display: "'Bricolage Grotesque', 'Heebo', sans-serif", body: "'Heebo', sans-serif", mono: "'JetBrains Mono', monospace" },
    'Instrument Serif + Heebo': { display: "'Instrument Serif', 'Heebo', serif", body: "'Heebo', sans-serif", mono: "'JetBrains Mono', monospace" },
    'Space Grotesk + Heebo':  { display: "'Space Grotesk', 'Heebo', sans-serif", body: "'Heebo', sans-serif", mono: "'JetBrains Mono', monospace" },
  },
  density: {
    cinematic: { padBlock: 140, padInline: 80, gap: 80,  scale: 1.0 },
    regular:   { padBlock: 96,  padInline: 64, gap: 56,  scale: 0.92 },
    compact:   { padBlock: 64,  padInline: 48, gap: 36,  scale: 0.84 },
  }
};

// Hook: lightweight in-view detector for animations inside artboards.
function useInView(ref, opts) {
  // In a pan/zoom canvas the artboards aren't intersecting the document viewport
  // in the normal way, so fall back to a short mount delay to kick off entrance
  // animations — and also listen via IO in case the artboard is still off-screen.
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const id = setTimeout(() => setSeen(true), 120);
    let io;
    try {
      io = new IntersectionObserver(
        (entries) => entries.forEach(e => { if (e.isIntersecting) setSeen(true); }),
        { threshold: opts?.threshold ?? 0.05, rootMargin: opts?.margin ?? '0px' }
      );
      if (ref.current) io.observe(ref.current);
    } catch {}
    return () => { clearTimeout(id); io && io.disconnect(); };
  }, []);
  return seen;
}

// Hook: ticking counter (animated number)
function useCountUp(target, durationMs, run) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    if (!run) return;
    let raf, start;
    const tick = (t) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / durationMs);
      const eased = 1 - Math.pow(1 - k, 3);
      setVal(Math.round(target * eased));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, durationMs]);
  return val;
}

// Plays/pauses a video on hover
function useHoverPlay(active) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const v = ref.current; if (!v) return;
    if (active) { v.currentTime = 0; v.play().catch(()=>{}); }
    else { v.pause(); }
  }, [active]);
  return ref;
}

Object.assign(window, {
  NYC_VIDEOS, NYC_STATS, NYC_BULLETS, NYC_COPY, HE_COMMENTS, NYC_PRESETS,
  useInView, useCountUp, useHoverPlay,
});
