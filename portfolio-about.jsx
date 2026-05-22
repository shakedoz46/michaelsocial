// About — vintage symmetric photo, bio as ONE paragraph, skill tags float ALL around.

function PFAbout({ tokens }) {
  const { c, f, orange } = tokens;
  const ref = React.useRef(null);
  const seen = useInViewPF(ref, { threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="about"
      style={{
        position: 'relative', background: c.bg, color: c.text,
        paddingBlock: 140, paddingInline: 64, overflow: 'hidden'
      }}>
      
      {/* divider rule top */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, insetInline: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${orange}55, transparent)`
      }} />

      <div style={{ maxWidth: 1240, marginInline: 'auto' }}>
        {/* kicker — English */}
        <div style={{
          fontFamily: f.mono, fontSize: 11, letterSpacing: '0.4em',
          color: orange, marginBottom: 56,
          opacity: seen ? 1 : 0, transition: 'opacity .8s ease'
        }}>{ABOUT.kicker}</div>

        {/* grid: text RIGHT (RTL DOM first) | photo LEFT */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 480px', gap: 120,
          alignItems: 'center'
        }}>
          {/* TEXT */}
          <div>
            <h2 style={{
              fontFamily: f.display, fontWeight: 800,
              fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 1.05,
              letterSpacing: '-0.035em', margin: 0, marginBottom: 40,
              opacity: seen ? 1 : 0, transform: seen ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity .9s .1s ease, transform 1s .1s cubic-bezier(.22,1,.36,1)'
            }}>
              {ABOUT.title}{' '}
              <PFHighlight orange={orange} pad="2px 18px" style={{
                transform: 'rotate(-1.5deg)',
                boxShadow: `0 8px 24px ${orange}55`,
              }}>{ABOUT.titleAccent}</PFHighlight>
            </h2>

            <p style={{
              fontFamily: f.body, fontWeight: 300,
              fontSize: 18, lineHeight: 1.85, margin: 0,
              color: c.text, opacity: seen ? 0.86 : 0,
              transform: seen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity .8s .25s ease, transform .8s .25s ease',
              textWrap: 'pretty'
            }}>{ABOUT.bio}</p>
          </div>

          {/* PHOTO + floating tags */}
          <PFAboutPhoto fonts={f} orange={orange} seen={seen} c={c} />
        </div>
      </div>
    </section>);

}

function PFAboutPhoto({ fonts, orange, seen, c }) {
  return (
    <div style={{
      position: 'relative',
      transform: seen ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.94)',
      opacity: seen ? 1 : 0,
      transition: 'opacity 1.1s .25s ease, transform 1.2s .25s cubic-bezier(.22,1,.36,1)'
    }}>
      {/* white symmetric frame — vintage portrait */}
      <div style={{
        background: '#FFFAF2',
        padding: 24,
        boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.25)',
        position: 'relative',
        width: 'fit-content', marginInline: 'auto', height: "524px"
      }}>
        {/* inner photo with subtle vintage treatment */}
        <div style={{
          width: 360, height: 440, overflow: 'hidden',
          background: '#1a1a1a',
          position: 'relative'
        }}>
          <img
            src="assets/michael-new.PNG"
            alt="מיכאל"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center top',
              display: 'block',
              filter: 'contrast(1.05) saturate(0.85) sepia(0.06)'
            }} />
          
          {/* vintage vignette */}
          <div aria-hidden style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            boxShadow: 'inset 0 0 60px rgba(0,0,0,0.35)'
          }} />
        </div>
      </div>

      {/* Floating tags on ALL sides */}
      <PFSkillTags fonts={fonts} orange={orange} c={c} />
    </div>);

}

function PFSkillTags({ fonts, orange, c }) {
  // Distributed around the photo: top, right (start in RTL), bottom, left (end in RTL).
  const positions = [
  { top: -22, insetInlineEnd: '14%', rotate: -6 }, // top-right
  { top: '32%', insetInlineEnd: -42, rotate: 4 }, // mid-right (outer)
  { bottom: -22, insetInlineEnd: '38%', rotate: -3 }, // bottom-center
  { bottom: '18%', insetInlineStart: -36, rotate: 6 }, // bottom-left (outer)
  { top: '8%', insetInlineStart: -40, rotate: -5 } // top-left (outer)
  ];
  return (
    <>
      {ABOUT.tags.map((tag, i) =>
      <div key={tag} style={{
        position: 'absolute', ...positions[i],
        transform: `rotate(${positions[i].rotate}deg)`,
        background: 'rgba(255,99,25,0.09)',
        color: orange,
        border: '1px solid rgba(255,99,25,0.28)',
        backdropFilter: 'blur(16px) saturate(160%)',
        WebkitBackdropFilter: 'blur(16px) saturate(160%)',
        padding: '10px 16px', borderRadius: 999,
        fontFamily: fonts.body, fontSize: 14, fontWeight: 600,
        whiteSpace: 'nowrap',
        animation: `pfFloat${i} ${3 + i * 0.5}s ease-in-out infinite ${i * 0.4}s`,
        boxShadow: '0 8px 24px rgba(255,99,25,0.12), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
        zIndex: 5
      }}>{tag}</div>
      )}
      <style>{`
        @keyframes pfFloat0 { 0%,100% { transform: translateY(0) rotate(-6deg); } 50% { transform: translateY(-7px) rotate(-6deg); } }
        @keyframes pfFloat1 { 0%,100% { transform: translateY(0) rotate(4deg);  } 50% { transform: translateY(-7px) rotate(4deg);  } }
        @keyframes pfFloat2 { 0%,100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-7px) rotate(-3deg); } }
        @keyframes pfFloat3 { 0%,100% { transform: translateY(0) rotate(6deg);  } 50% { transform: translateY(-7px) rotate(6deg);  } }
        @keyframes pfFloat4 { 0%,100% { transform: translateY(0) rotate(-5deg); } 50% { transform: translateY(-7px) rotate(-5deg); } }
      `}</style>
    </>);

}

Object.assign(window, { PFAbout, PFAboutPhoto, PFSkillTags });