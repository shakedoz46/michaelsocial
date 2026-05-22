// Hero — clean version: no floating stickers. Just dateline-free, big headline.

function PFHero({ tokens }) {
  const { c, f, orange } = tokens;
  const ref = React.useRef(null);
  const seen = useInViewPF(ref);

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        position: 'relative', minHeight: '100vh',
        background: c.bg, color: c.text,
        padding: '120px 64px 80px',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column', justifyContent: 'center'
      }}>

      {/* halo */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 50% at 50% 40%, ${orange}1a 0%, transparent 70%)`
      }} />

      {/* nyc skyline */}
      <div aria-hidden style={{
        position: 'absolute', insetInline: 0, bottom: 0, height: '55%',
        opacity: c.bg === '#0A0A0A' ? 0.16 : 0.08, pointerEvents: 'none',
        background: 'url(assets/nyc-building.svg) bottom center / cover no-repeat',
        filter: c.bg === '#0A0A0A' ? 'none' : 'invert(1)'
      }} />

      <div style={{
        position: 'relative', textAlign: 'center', paddingBlock: 40,
        maxWidth: 1280, marginInline: 'auto', width: '100%'
      }}>
        {/* HEADLINE */}
        <h1 style={{
          fontFamily: f.display, fontWeight: 800,
          fontSize: 'clamp(80px, 13vw, 180px)', lineHeight: 0.82,
          letterSpacing: '-0.05em', margin: 0, color: c.text
        }}>
          {/* greeting */}
          <span style={{
            display: 'block', fontSize: '0.68em',
            opacity: seen ? 1 : 0, transform: seen ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity .9s .15s ease, transform 1s .15s cubic-bezier(.22,1,.36,1)'
          }}>היי נעים מאוד</span>

          {/* MICHAEL in orange box */}
          <PFHighlight orange={orange} pad="4px 24px" style={{
            fontFamily: f.display,
            marginBlock: 8,
            boxShadow: `0 12px 40px ${orange}66`,
            transform: seen ? 'rotate(-1.5deg)' : 'rotate(-6deg) translateY(20px)',
            opacity: seen ? 1 : 0,
            transition: 'opacity .9s .4s ease, transform 1s .4s cubic-bezier(.22,1,.36,1)',
          }}>MICHAEL</PFHighlight>

          {/* tagline */}
          <span style={{
            display: 'block', color: c.text,
            fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.025em',
            fontSize: '0.31em', maxWidth: '900px', marginInline: 'auto',
            opacity: seen ? 1 : 0, transform: seen ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 1s .7s ease, transform 1s .7s ease'
          }}>ואני כאן כדי שהסושיאל שלכם יהיה{' '}
            <PFHighlight orange={orange} pad="2px 10px" style={{
              transform: 'rotate(-1deg)',
            }}>הדבר הבא!</PFHighlight>
          </span>
        </h1>

        {/* scroll hint */}
        <div style={{
          marginTop: 80, display: 'flex', justifyContent: 'center',
          opacity: seen ? 1 : 0, transition: 'opacity 1s 1.2s ease'
        }}>
          <PFScrollHint fonts={f} orange={orange} muted={c.muted} />
        </div>
      </div>
    </section>);

}

function PFScrollHint({ fonts, orange, muted }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{
        width: 1, height: 48,
        background: `linear-gradient(to bottom, ${orange}, transparent)`,
        animation: 'pfScrollBar 2.2s ease-in-out infinite'
      }} />
      <span style={{
        fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.3em',
        textTransform: 'uppercase', color: muted
      }}>גלול</span>
      <style>{`
        @keyframes pfScrollBar {
          0%, 100% { transform: scaleY(0.4); transform-origin: top; opacity: 0.4; }
          50%      { transform: scaleY(1); transform-origin: top; opacity: 1; }
        }
      `}</style>
    </div>);

}

Object.assign(window, { PFHero, PFScrollHint });