// Direction 2 — "THE FEED"
// Instagram-native: live comment bubbles, double-tap hearts, story rings,
// likes counter ticking up, mobile-first phone in the center, grid below.
// Part 1: main component + story rings + headline.

function FeedNYC({ theme = 'dark', type = 'DM Sans + Heebo', density = 'cinematic' }) {
  const ref = React.useRef(null);
  const seen = useInView(ref, { threshold: 0.05 });
  const t = NYC_PRESETS.bg[theme] || NYC_PRESETS.bg.dark;
  const f = NYC_PRESETS.type[type] || NYC_PRESETS.type['DM Sans + Heebo'];
  const d = NYC_PRESETS.density[density] || NYC_PRESETS.density.cinematic;
  const isDark = theme === 'dark';
  const orange = '#FF6319';
  const yellow = '#FFB800';
  const pink = '#E1306C';

  const [active, setActive] = React.useState(0);
  const [tab, setTab] = React.useState('foryou'); // following | foryou
  const current = NYC_VIDEOS[active];

  // Live like ticker
  const baseLikes = parseInt(current.likes.replace(/,/g, ''), 10);
  const [bump, setBump] = React.useState(0);
  React.useEffect(() => { setBump(0); }, [active]);
  React.useEffect(() => {
    const id = setInterval(() => setBump(b => b + Math.floor(Math.random() * 3) + 1), 1600);
    return () => clearInterval(id);
  }, []);
  const liveLikes = (baseLikes + bump).toLocaleString();

  // Animated counter for follower headline
  const followers = useCountUp(80, 1800, seen);

  return (
    <div
      ref={ref}
      dir="rtl"
      style={{
        position: 'relative',
        background: t.bg,
        color: t.text,
        fontFamily: f.body,
        padding: `${d.padBlock}px ${d.padInline}px`,
        overflow: 'hidden',
        minHeight: '100%',
      }}
    >
      {/* gradient mesh background */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 40% 30% at 15% 20%, ${pink}18 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 85% 70%, ${orange}1a 0%, transparent 60%),
          radial-gradient(ellipse 35% 30% at 50% 90%, ${yellow}15 0%, transparent 60%)
        `,
      }} />

      {/* Top: Tab switcher Instagram-style */}
      <FeedTabs tab={tab} setTab={setTab} font={f} muted={t.muted} text={t.text} orange={orange} />

      {/* Stories rings */}
      <FeedStories
        active={active}
        setActive={setActive}
        fonts={f}
        theme={t}
        orange={orange}
        pink={pink}
        yellow={yellow}
      />

      {/* Big headline */}
      <div style={{ marginTop: d.gap * 0.8, marginBottom: d.gap * 0.6, textAlign: 'center' }}>
        <div style={{
          fontFamily: f.mono, fontSize: 11, letterSpacing: '0.35em',
          color: orange, marginBottom: 16,
        }}>✦ @DATINGLISTNYC · 4 MONTHS · NYC</div>
        <h1 style={{
          fontFamily: f.display, fontWeight: 800,
          fontSize: 'clamp(56px, 9vw, 120px)', lineHeight: 0.92,
          letterSpacing: '-0.04em', margin: 0,
          opacity: seen ? 1 : 0, transform: seen ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity .9s ease, transform 1s cubic-bezier(.22,1,.36,1)',
        }}>
          הפכתי פיד אחד ל-
          <span style={{
            background: `linear-gradient(135deg, ${orange}, ${pink} 60%, ${yellow})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>{followers}K עוקבים</span>
        </h1>
        <p style={{
          maxWidth: 620, margin: '20px auto 0', opacity: 0.7,
          fontSize: 16, fontWeight: 300, lineHeight: 1.7,
        }}>
          ארבעה חודשים בניו יורק, ממלא מקום למנהלת הסושיאל של datinglistnyc. הקליפים שראיתם בפיד — אלה שלי.
        </p>
      </div>

      {/* Main stage: phone + floating comments */}
      <FeedStage
        active={active}
        current={current}
        liveLikes={liveLikes}
        fonts={f}
        theme={t}
        orange={orange}
        pink={pink}
        seen={seen}
      />

      {/* Explore grid */}
      <FeedGrid active={active} setActive={setActive} fonts={f} theme={t} orange={orange} pink={pink} />

      {/* Footer cred bar */}
      <div style={{
        marginTop: d.gap, paddingTop: 32, borderTop: `1px solid ${t.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: f.mono, fontSize: 11, letterSpacing: '0.25em',
        color: t.muted, textTransform: 'uppercase',
      }}>
        <span style={{ color: orange }}>● ONLINE NOW</span>
        <span>SWIPE · TAP · DOUBLE-TAP</span>
        <span>NEXT POST →</span>
      </div>
    </div>
  );
}

function FeedTabs({ tab, setTab, font, muted, text, orange }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', gap: 56,
      borderBottom: `1px solid ${muted}33`, paddingBottom: 16, marginBottom: 32,
    }}>
      {[
        { id: 'following', label: 'עוקב' },
        { id: 'foryou',    label: 'בשבילך' },
      ].map(o => {
        const on = tab === o.id;
        return (
          <button key={o.id} onClick={() => setTab(o.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '12px 0', position: 'relative',
            fontFamily: font.display, fontSize: 18, fontWeight: on ? 700 : 400,
            color: on ? text : muted, letterSpacing: '-0.01em',
            transition: 'color .2s ease',
          }}>
            {o.label}
            <span style={{
              position: 'absolute', bottom: -17, insetInline: 0, height: 2,
              background: on ? orange : 'transparent',
              transition: 'background .2s ease',
            }} />
          </button>
        );
      })}
    </div>
  );
}

function FeedStories({ active, setActive, fonts, theme, orange, pink, yellow }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 24, paddingBlock: 8 }}>
      {NYC_VIDEOS.map((v, i) => {
        const on = i === active;
        return (
          <button key={i} onClick={() => setActive(i)} style={{
            border: 'none', background: 'transparent', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
            padding: 0,
          }}>
            <div style={{
              width: 74, height: 74, borderRadius: 37,
              background: on
                ? `linear-gradient(135deg, ${orange}, ${pink} 50%, ${yellow})`
                : `${theme.muted}88`,
              padding: 3,
              transform: on ? 'scale(1.06)' : 'scale(1)',
              transition: 'transform .3s ease',
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: theme.bg, padding: 2,
              }}>
                <video
                  src={v.src}
                  muted loop playsInline
                  autoPlay={on}
                  style={{
                    width: '100%', height: '100%', borderRadius: '50%',
                    objectFit: 'cover', display: 'block',
                  }}
                />
              </div>
            </div>
            <div style={{
              fontFamily: fonts.body, fontSize: 11, fontWeight: on ? 600 : 400,
              color: on ? theme.text : theme.muted,
              maxWidth: 80, textAlign: 'center', lineHeight: 1.2,
            }}>{v.label}</div>
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, { FeedNYC, FeedTabs, FeedStories });
