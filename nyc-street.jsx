// Direction 3 — "THE STREET" · Part 1: shell + tabloid headline
// Playful Gen Z: stickers, marker doodles, polaroid tilts, NYC tabloid energy.

function StreetNYC({ theme = 'dark', type = 'DM Sans + Heebo', density = 'cinematic' }) {
  const ref = React.useRef(null);
  const seen = useInView(ref, { threshold: 0.05 });
  const t = NYC_PRESETS.bg[theme] || NYC_PRESETS.bg.dark;
  const f = NYC_PRESETS.type[type] || NYC_PRESETS.type['DM Sans + Heebo'];
  const d = NYC_PRESETS.density[density] || NYC_PRESETS.density.cinematic;
  const isDark = theme === 'dark';
  const orange = '#FF6319';
  const yellow = '#FFB800';
  const tape = '#FFE066';

  const [pick, setPick] = React.useState(2);

  return (
    <div
      ref={ref}
      dir="rtl"
      style={{
        position: 'relative',
        background: t.bg,
        color: t.text,
        fontFamily: f.body,
        padding: `${d.padBlock * 0.8}px ${d.padInline * 0.8}px`,
        overflow: 'hidden',
        minHeight: '100%'
      }}>
      
      {/* paper grain */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: isDark ?
        'radial-gradient(ellipse 80% 80% at 50% 0%, rgba(255,99,25,0.06), transparent 60%)' :
        'radial-gradient(ellipse 80% 80% at 50% 0%, rgba(255,99,25,0.10), transparent 60%)'
      }} />

      <StreetTabloid fonts={f} theme={t} orange={orange} yellow={yellow} tape={tape} seen={seen} />

      <StreetClipping fonts={f} theme={t} orange={orange} seen={seen} />

      <StreetPolaroids pick={pick} setPick={setPick} fonts={f} theme={t} orange={orange} yellow={yellow} tape={tape} />

      <StreetReceipts fonts={f} theme={t} orange={orange} />

      {/* sign-off */}
      <div style={{
        marginTop: 80, textAlign: 'center', fontFamily: f.mono,
        fontSize: 11, letterSpacing: '0.3em', color: t.muted, textTransform: 'uppercase'
      }}>—  PRINTED IN NYC · CHAPTER 03 / 06  —</div>
    </div>);

}

function StreetTabloid({ fonts, theme, orange, yellow, tape, seen }) {
  return (
    <div style={{ position: 'relative', textAlign: 'center', paddingTop: 40, paddingBottom: 60 }}>
      {/* sticker top-left */}
      <div style={{
        position: 'absolute', top: 0, insetInlineStart: 40,
        transform: 'rotate(-12deg)',
        background: orange, color: '#fff',
        fontFamily: fonts.display, fontWeight: 800, fontSize: 14,
        padding: '8px 16px', borderRadius: 4,
        boxShadow: '0 8px 24px rgba(255,99,25,0.4)',
        letterSpacing: '0.05em'
      }}>פרק 03 · NYC</div>

      {/* sticker top-right */}
      <div style={{
        position: 'absolute', top: 16, insetInlineEnd: 60,
        transform: 'rotate(8deg)',
        fontFamily: 'Caveat', fontSize: 32, color: orange, fontWeight: 700
      }}>אש 🔥</div>

      {/* tiny dateline */}
      <div style={{
        fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.3em',
        color: theme.muted, textTransform: 'uppercase', marginBottom: 16
      }}>★ MICHAEL DAILY ★ &nbsp;·&nbsp; VOL. 24 · NO. 080K &nbsp;·&nbsp; ✦</div>

      <h1 style={{
        fontFamily: fonts.display, fontWeight: 800,
        fontSize: 'clamp(80px, 13vw, 180px)', lineHeight: 0.82,
        letterSpacing: '-0.05em', margin: 0,
        color: theme.text
      }} data-comment-anchor="5ef26f4eb9-h1-83-7">
        <span style={{ display: 'block', fontSize: "122px" }}>היי נעים מאוד,</span>
        <span style={{ ...{
            display: 'inline-block',
            background: tape, color: '#000',
            padding: '4px 24px', transform: 'rotate(-1.5deg)',
            fontFamily: fonts.display, fontWeight: 800,
            letterSpacing: '-0.04em', marginBlock: 8
          }, background: "rgb(255, 100, 26)" }}>MICHAEL</span>
        <span style={{ ...{ display: 'block', color: orange, width: "1148px", fontWeight: "500", lineHeight: "1.05", letterSpacing: "-1.6px", fontSize: "51px" }, color: "rgb(245, 240, 236)" }}>ואני כאן כדי שהסושיאל שלכם יהיה הדבר הבא!</span>
      </h1>

      <div style={{
        marginTop: 28, fontSize: 18, fontWeight: 300, opacity: 0.7, maxWidth: 720, marginInline: 'auto'
      }}>
        סיפור על ארבעה חודשים, עמוד אחד עם 80 אלף עוקבים, ובחור בן 24 עם מצלמה שלא מפסיק לרוץ.
      </div>

      {/* underline scrawl */}
      <svg viewBox="0 0 400 24" width="280" height="20" style={{ marginTop: 24 }}>
        <path d="M5 14 Q 80 4, 160 14 T 320 12 T 395 16" stroke={orange} strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </div>);

}

Object.assign(window, { StreetNYC, StreetTabloid });