// NYC Experience — restructured.
// Layout: kicker + headline + paragraph + bullets (all on RIGHT).
// LEFT: stories ABOVE the phone (centered), phone with floating comments.
// Bottom: datinglistnyc testimonial with their real profile pic as the heading.

function PFNYC({ tokens }) {
  const { c, f, orange, pink } = tokens;
  const ref = React.useRef(null);
  const seen = useInViewPF(ref, { threshold: 0.05 });
  const [active, setActive] = React.useState(2);
  const mob = useMobile();
  const current = NYC_VIDEOS_PF[active];

  return (
    <section
      ref={ref}
      id="nyc"
      style={{
        position: 'relative', background: c.bg, color: c.text,
        paddingBlock: mob ? 80 : 140, paddingInline: mob ? 20 : 64, overflow: 'hidden'
      }}
    >
      {/* glow */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 40% 30% at 10% 20%, ${pink}12, transparent 60%),
          radial-gradient(ellipse 50% 40% at 90% 70%, ${orange}18, transparent 60%)
        `
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: 0, insetInline: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${orange}55, transparent)`
      }} />

      <div style={{ maxWidth: 1320, marginInline: 'auto', position: 'relative' }}>
        {/* Grid: text RIGHT (DOM order #1) | stories+phone LEFT (DOM order #2) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: mob ? '1fr' : '1fr 1fr',
          gap: mob ? 48 : 40,
          alignItems: 'center'
        }}>
          {/* RIGHT — title + paragraph + bullets directly stacked */}
          <PFNYCText fonts={f} c={c} orange={orange} seen={seen} />

          {/* LEFT — 3-phone carousel, no stories, no comments */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PFNYCStage
              active={active} setActive={setActive}
              fonts={f} c={c} orange={orange} pink={pink}
            />
          </div>
        </div>

        {/* Testimonial with avatar as heading */}
        <PFNYCQuote fonts={f} c={c} orange={orange} />
      </div>
    </section>
  );
}

function PFNYCText({ fonts, c, orange, seen }) {
  return (
    <div style={{ position: 'relative', paddingTop: 8 }}>
      {/* kicker */}
      <div style={{
        fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.4em',
        color: orange, marginBottom: 24,
        opacity: seen ? 1 : 0, transition: 'opacity .8s ease'
      }}>{NYC.kicker}</div>

      {/* title — two lines: white + orange box */}
      <h2 style={{
        fontFamily: fonts.display, fontWeight: 800,
        fontSize: 'clamp(36px, 4.4vw, 60px)', lineHeight: 1.04,
        letterSpacing: '-0.04em', margin: 0, marginBottom: 32,
        opacity: seen ? 1 : 0, transform: seen ? 'translateY(0)' : 'translateY(30px)',
        transition: 'opacity .9s .1s ease, transform 1s .1s cubic-bezier(.22,1,.36,1)'
      }}>
        <span style={{ display: 'block', whiteSpace: 'nowrap' }}>{NYC.title}</span>
        <PFHighlight orange={orange} pad="4px 22px" style={{
          marginTop: 12,
          transform: 'rotate(-1.5deg)',
          boxShadow: `0 8px 24px ${orange}55`,
          whiteSpace: 'nowrap',
        }}>{NYC.titleAccent}</PFHighlight>
      </h2>

      {/* paragraph directly under title */}
      <p style={{
        fontFamily: fonts.body, fontWeight: 400,
        fontSize: 17, lineHeight: 1.8, margin: 0, marginBottom: 32,
        opacity: seen ? 0.92 : 0,
        transition: 'opacity .8s .25s ease',
        whiteSpace: 'pre-line'
      }}>{NYC.paragraph}</p>

      {/* bullets */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {NYC.bullets.map((b, i) => (
          <div key={i} style={{
            display: 'flex', gap: 16, alignItems: 'flex-start',
            opacity: seen ? 1 : 0,
            transform: seen ? 'translateX(0)' : 'translateX(20px)',
            transition: `opacity .7s ${0.35 + i*0.1}s ease, transform .7s ${0.35 + i*0.1}s ease`
          }}>
            <span style={{
              color: orange, fontFamily: fonts.display, fontWeight: 800, fontSize: 24,
              lineHeight: 1, transform: `rotate(${[-6, 4, -2][i]}deg)`, marginTop: 2,
              flexShrink: 0
            }}>✦</span>
            <div>
              <span style={{
                fontFamily: fonts.display, fontWeight: 700,
                fontSize: 19, letterSpacing: '-0.015em', color: c.text
              }}>{b.title}</span>
              <span style={{
                marginInlineStart: 8, fontWeight: 300,
                opacity: 0.78, fontSize: 16, lineHeight: 1.6, color: c.text
              }}>— {b.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { PFNYC, PFNYCText });
