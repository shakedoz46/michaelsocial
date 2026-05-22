// Portfolio data — original copy preserved from the Next.js codebase.

const HERO = {
  greeting: 'היי, נעים מאוד,',
  name: 'מיכאל',
  tagline: 'ואני כאן כדי שהסושיאל שלכם יהיה הדבר הבא!',
  kicker: '✦ SOCIAL MEDIA PORTFOLIO',
};

const ABOUT = {
  kicker: '✦ ABOUT',
  title: 'אז מי אני בכלל',
  titleAccent: 'אתם שואלים?',
  bio: 'אני מיכאל, בן 24, סטודנט למשפטים שאוהב להנות מהחיים, ובעיקר - לתפוס את הרגע. צילום הוא חלק בלתי נפרד ממני, ובמיוחד היכולת להפוך חוויות סושיאל עם חברים לתוכן בלתי נשכח. יש לי עין חדה לפרטים וכישרון לתפוס את הרגעים הטובים ביותר דרך עדשת המצלמה, ואני תמיד שואף למצוינות — מאמין שסושיאל טוב הוא אותנטי, מצחיק ומרגש.',
  tags: ['צילום', 'עריכה', 'סושיאל מדיה', 'קריאייטיב', 'סטוריטלינג'],
};

const NYC = {
  kicker: '✦ NYC EXPERIENCE',
  title: 'מניו יורק ועד אליכם:',
  titleAccent: 'סושיאל ששובר את הרשת',
  paragraph: 'בניו יורק, מצאתי את עצמי ממלא מקום למשך 4 חודשים עבור מנהלת הסושיאל של עמוד האינסטגרם המפורסם datinglistnyc (שמונה כמעט 80K עוקבים!).\nזו הייתה תקופה אינטנסיבית ומלאת למידה, שבה הייתי אחראי על:',
  bullets: [
    { title: 'צילומים ועריכות',     desc: 'תיעדתי חוויות, אוכל ובילויים ברחבי ניו יורק' },
    { title: 'הגדלת מעורבות וקהל',  desc: 'עזרתי לשמור על רמת תוכן גבוהה ולגדול' },
    { title: 'למידה מהשטח',         desc: 'ספגתי ידע עצום על סושיאל, מותגים וקהלים' },
  ],
  testimonial: {
    body: 'מיכאל הגיע אלינו בתקופה עמוסה במיוחד, והוא פשוט הציל אותנו! הכישרון שלו בצילום ועריכה, יחד עם ההבנה העמוקה שלו בסושיאל, עזרו לנו לשמור על רמה גבוהה של תוכן ואפילו להגדיל את הקהל שלנו. הוא עבד במהירות, ביעילות ותמיד עם חיוך. הוא לא רק עובד מצוין, הוא גם בן אדם מדהים. ממליצה בחום!',
    avatarSrc: 'assets/datinglist-profile.jpg',
    author: '@datinglistnyc',
    tag: 'ממליצה בחום!',
  },
};

const NYC_VIDEOS_PF = [
  { src: 'assets/videos/nyc-bar.mp4',         label: 'בר על הגג',         tag: 'NIGHTLIFE', likes: '4,287' },
  { src: 'assets/videos/nyc-coffee.mp4',      label: 'קפה של בוקר',       tag: 'CAFÉ',      likes: '6,104' },
  { src: 'assets/videos/nyc-restaurant.mp4',  label: 'מסעדה איטלקית',     tag: 'DINING',    likes: '3,892' },
  { src: 'assets/videos/nyc-active.mp4',      label: 'פעילות בעיר',       tag: 'LIFESTYLE', likes: '2,743' },
  { src: 'assets/videos/nyc-rooftop.mp4',     label: 'רופטופ במנהטן',     tag: 'ROOFTOP',   likes: '8,431' },
  { src: 'assets/videos/nyc-steakhouse.mp4',  label: 'סטייק האוס',         tag: 'DINING',    likes: '5,917' },
];

const ALL_POSTS = [
  { src: 'assets/videos/wedding.mp4',         label: 'חתונה בקיץ',        category: 'EVENTS',   likes: '12.4K' },
  { src: 'assets/videos/africa1.mp4',         label: 'אפריקה — סוואנה',   category: 'TRAVEL',   likes: '8,902' },
  { src: 'assets/videos/nyc-rooftop.mp4',     label: 'רופטופ במנהטן',     category: 'NYC',      likes: '8,431' },
  { src: 'assets/videos/asian-food.mp4',      label: 'אוכל אסייתי',       category: 'FOOD',     likes: '7,210' },
  { src: 'assets/videos/africa2.mp4',         label: 'שקיעה במזרח אפריקה',category: 'TRAVEL',   likes: '6,847' },
  { src: 'assets/videos/nyc-coffee.mp4',      label: 'קפה של בוקר',       category: 'NYC',      likes: '6,104' },
  { src: 'assets/videos/nyc-steakhouse.mp4',  label: 'סטייק האוס',        category: 'NYC',      likes: '5,917' },
  { src: 'assets/videos/brasserie.mp4',       label: 'ברסרי חדש',         category: 'FOOD',     likes: '5,488' },
  { src: 'assets/videos/ice-cream.mp4',       label: 'גלידה של אחרי צהריים', category: 'FOOD', likes: '4,902' },
  { src: 'assets/videos/nyc-bar.mp4',         label: 'בר על הגג',         category: 'NYC',      likes: '4,287' },
  { src: 'assets/videos/nyc-restaurant.mp4',  label: 'מסעדה איטלקית',     category: 'NYC',      likes: '3,892' },
  { src: 'assets/videos/nyc-active.mp4',      label: 'פעילות בעיר',       category: 'NYC',      likes: '2,743' },
];

const HE_COMMENTS_PF = [
  { user: 'tlv.foodie',     text: 'אחי הקליפ הזה אש 🔥🔥🔥', likes: 412, ago: '2ש׳' },
  { user: 'ronibarak',      text: 'תגיד לי שזה אתה צילמת??', likes: 217, ago: '5ש׳' },
  { user: 'datinglistnyc',  text: 'מיכאל הציל אותנו ❤️ ממליצה!', likes: 1247, ago: '1ש׳', verified: true },
  { user: 'shir.dor',       text: 'מבקשת אותך עליי בחתונה 😍', likes: 89, ago: '14ש׳' },
  { user: 'nycbites',       text: 'best content on our feed', likes: 304, ago: '3ש׳' },
  { user: 'maor.k',         text: 'איך הוא תופס את הרגעים?!', likes: 56, ago: '6ש׳' },
];

const CONTACT = {
  kicker: '✦ LET’S TALK',
  title: 'בואו',
  titleAccent: 'נדבר!',
  intro: 'נשמע מעניין? חושבים שהסושיאל שלכם צריך קצת יותר אופי, הומור וכישרון? מלאו את הפרטים ואני אחזור אליכם עם רעיונות שיגרמו לכם לחייך.',
  cta: 'בואו נהפוך את הסושיאל שלכם לסיפור הצלחה! ',
  fields: [
    { id: 'name',     label: 'שם מלא',  type: 'text',  placeholder: 'הכנס את שמך' },
    { id: 'phone',    label: 'טלפון',   type: 'tel',   placeholder: '050-000-0000' },
    { id: 'business', label: 'שם העסק', type: 'text',  placeholder: 'שם החברה / העסק' },
    { id: 'email',    label: 'מייל',    type: 'email', placeholder: 'example@mail.com' },
  ],
};

const THEMES = {
  dark:  { bg: '#0A0A0A', soft: '#141414', text: '#F5F0EB', muted: '#8A8070', border: '#2A2520', tape: '#FFE066' },
  light: { bg: '#F4F0EA', soft: '#FFFFFF', text: '#0A0A0A', muted: '#6B6258', border: '#D9D2C5', tape: '#FFD84D' },
  cream: { bg: '#F8E7CF', soft: '#FFF6E8', text: '#1A1208', muted: '#6E5535', border: '#E0C695', tape: '#F2B43A' },
};

const TYPE_PAIRS = {
  'DM Sans + Heebo':          { display: "'DM Sans', 'Heebo', sans-serif",          body: "'Heebo', sans-serif", mono: "'JetBrains Mono', monospace" },
  'Bricolage + Heebo':        { display: "'Bricolage Grotesque', 'Heebo', sans-serif", body: "'Heebo', sans-serif", mono: "'JetBrains Mono', monospace" },
  'Instrument Serif + Heebo': { display: "'Instrument Serif', 'Heebo', serif",      body: "'Heebo', sans-serif", mono: "'JetBrains Mono', monospace" },
  'Space Grotesk + Heebo':    { display: "'Space Grotesk', 'Heebo', sans-serif",    body: "'Heebo', sans-serif", mono: "'JetBrains Mono', monospace" },
};

const DENSITY = {
  cinematic: { padBlock: 140, padInline: 80, gap: 80 },
  regular:   { padBlock: 96,  padInline: 64, gap: 56 },
  compact:   { padBlock: 64,  padInline: 48, gap: 36 },
};

// Tokens passed down to every section
function useTokens(theme, type, density) {
  return React.useMemo(() => ({
    c: THEMES[theme] || THEMES.dark,
    f: TYPE_PAIRS[type] || TYPE_PAIRS['DM Sans + Heebo'],
    d: DENSITY[density] || DENSITY.cinematic,
    isDark: theme === 'dark',
    orange: '#FF6319',
    yellow: '#FFB800',
    pink: '#E1306C',
  }), [theme, type, density]);
}

function useInViewPF(ref, opts) {
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

function useCountUpPF(target, durationMs, run) {
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

function PFHighlight({ children, orange, pad, style }) {
  const [hovered, setHovered] = React.useState(false);
  const existingTransition = (style && style.transition) ? style.transition + ', ' : '';
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-block',
        background: orange,
        color: '#fff',
        padding: pad || '2px 18px',
        ...style,
        fontWeight: hovered ? 300 : 800,
        fontVariationSettings: hovered ? "'wght' 260" : "'wght' 800",
        letterSpacing: hovered ? '-0.05em' : '-0.03em',
        willChange: 'font-variation-settings',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        cursor: 'default',
        transition: existingTransition + 'font-variation-settings 600ms ease-out, letter-spacing 600ms ease-out',
      }}
    >{children}</span>
  );
}

Object.assign(window, {
  HERO, ABOUT, NYC, NYC_VIDEOS_PF, ALL_POSTS, HE_COMMENTS_PF, CONTACT,
  THEMES, TYPE_PAIRS, DENSITY, useTokens, useInViewPF, useCountUpPF,
  PFHighlight,
});
