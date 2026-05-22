// Direction 1 — "THE AGENCY"
// Cinematic premium: huge editorial type, restrained orange, hover-to-play phones,
// monospaced runners, generous whitespace. Same DNA, dialed up.

function AgencyNYC({ theme = 'dark', type = 'DM Sans + Heebo', density = 'cinematic' }) {
  const ref = React.useRef(null);
  const seen = useInView(ref, { threshold: 0.05 });
  const t = NYC_PRESETS.bg[theme] || NYC_PRESETS.bg.dark;
  const f = NYC_PRESETS.type[type] || NYC_PRESETS.type['DM Sans + Heebo'];
  const d = NYC_PRESETS.density[density] || NYC_PRESETS.density.cinematic;
  const isDark = theme === 'dark';
  const orange = '#FF6319';
  const yellow = '#FFB800';

  // Carousel state — central iPhone is "in focus"
  const [center, setCenter] = React.useState(0);
  const [hover, setHover] = React.useState(null);
  const total = NYC_VIDEOS.length;

  // Auto-advance every 5s unless hovered
  React.useEffect(() => {
    if (hover !== null) return;
    const id = setInterval(() => setCenter(c => (c + 1) % total), 5500);
    return () => clearInterval(id);
  }, [hover, total]);

  // Animated counters
  const followers = useCountUp(80, 1800, seen);
  const months = useCountUp(4, 900, seen);
  const posts = useCountUp(127, 2200, seen);

  // 5 visible slots (-2 .. +2)
  const slots = [-2, -1, 0, 1, 2].map(off => (center + off + total * 10) % total);

  return (
    <div
      ref={ref}
      dir="rtl"
      className="grain"
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
      {/* radial accent glow */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 50% at 50% 30%, ${orange}11 0%, transparent 70%)`,
      }} />

      {/* === Top runner: mono breadcrumb === */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: f.mono, fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
        color: isDark ? t.muted : t.muted, marginBottom: d.gap,
      }}>
        <div style={{ display: 'flex', gap: 28 }}>
          <span style={{ color: orange }}>● LIVE</span>
          <span>{NYC_COPY.number} / CHAPTER</span>
          <span>NYC EXPERIENCE</span>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          <span>@datinglistnyc</span>
          <span>NEW YORK CITY</span>
          <span>2024 — 2025</span>
        </div>
      </div>

      {/* === Editorial headline === */}
      <div style={{ marginBottom: d.gap * 0.7 }}>
        <h1 style={{
          fontFamily: f.display, fontWeight: 800,
          fontSize: 'clamp(72px, 11vw, 156px)', lineHeight: 0.88,
          letterSpacing: '-0.045em', margin: 0,
          opacity: seen ? 1 : 0, transform: seen ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity .9s .1s ease, transform 1s .1s cubic-bezier(.22,1,.36,1)',
        }}>
          <div>{NYC_COPY.headline.he1}</div>
          <div style={{ color: orange }}>{NYC_COPY.headline.he2}<span style={{ color: t.text, opacity: 0.18 }}>.</span></div>
        </h1>
      </div>

      {/* === Subhead + stats column === */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: d.gap,
        alignItems: 'start', marginBottom: d.gap * 1.2,
      }}>
        {/* paragraph */}
        <div style={{
          opacity: seen ? 0.85 : 0, transition: 'opacity 1s .35s ease',
        }}>
          <p style={{
            fontFamily: f.body, fontWeight: 300,
            fontSize: 18, lineHeight: 1.85, maxWidth: 560, margin: 0,
          }}>
            {NYC_COPY.paragraph}
          </p>

          {/* Three bullet rows — editorial table */}
          <div style={{ marginTop: 48 }}>
            {NYC_BULLETS.map((b, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '40px 1fr', gap: 24,
                alignItems: 'baseline',
                padding: '20px 0', borderTop: `1px solid ${t.border}`,
                opacity: seen ? 1 : 0, transform: seen ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity .8s ${0.5 + i*0.12}s ease, transform .8s ${0.5+i*0.12}s ease`,
              }}>
                <span style={{
                  fontFamily: f.mono, fontSize: 11, color: orange,
                  letterSpacing: '0.15em',
                }}>0{i+1}</span>
                <div>
                  <div style={{
                    fontFamily: f.display, fontWeight: 700, fontSize: 22,
                    letterSpacing: '-0.02em', marginBottom: 4,
                  }}>{b.title}</div>
                  <div style={{ fontSize: 14, fontWeight: 300, opacity: 0.65, lineHeight: 1.6 }}>{b.desc}</div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: `1px solid ${t.border}` }} />
          </div>
        </div>

        {/* credentials / stats card */}
        <div style={{
          padding: 36, border: `1px solid ${t.border}`, borderRadius: 4,
          background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
          opacity: seen ? 1 : 0, transform: seen ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s .5s ease, transform 1s .5s ease',
        }}>
          {/* mini IG preview */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28,
            paddingBottom: 24, borderBottom: `1px solid ${t.border}`,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 22,
              background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
              padding: 2,
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: t.soft, color: t.text,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: f.display, fontWeight: 800, fontSize: 18,
              }}>D</div>
            </div>
            <div style={{ direction: 'ltr', textAlign: 'left', flex: 1 }}>
              <div style={{ fontFamily: f.body, fontWeight: 600, fontSize: 14 }}>datinglistnyc</div>
              <div style={{ fontFamily: f.mono, fontSize: 10, color: orange, letterSpacing: '0.15em' }}>VERIFIED · NYC</div>
            </div>
          </div>

          {/* big stat */}
          <div style={{
            fontFamily: f.display, fontWeight: 800,
            fontSize: 120, lineHeight: 0.85, letterSpacing: '-0.05em',
            color: t.text,
            display: 'flex', alignItems: 'flex-start',
          }}>
            <span>{followers}</span>
            <span style={{ fontSize: 48, marginTop: 8, marginInlineStart: 4, color: orange }}>K</span>
          </div>
          <div style={{
            fontFamily: f.mono, fontSize: 11, letterSpacing: '0.25em',
            color: t.muted, textTransform: 'uppercase', marginTop: 4,
          }}>followers reached</div>

          {/* sub stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 36 }}>
            <div>
              <div style={{ fontFamily: f.display, fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em' }}>{months}</div>
              <div style={{ fontFamily: f.mono, fontSize: 10, color: t.muted, letterSpacing: '0.2em', textTransform: 'uppercase' }}>חודשים</div>
            </div>
            <div>
              <div style={{ fontFamily: f.display, fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em' }}>{posts}+</div>
              <div style={{ fontFamily: f.mono, fontSize: 10, color: t.muted, letterSpacing: '0.2em', textTransform: 'uppercase' }}>פוסטים</div>
            </div>
          </div>
        </div>
      </div>

      {/* === Pull quote === */}
      <div style={{
        position: 'relative', padding: `${d.gap}px 0`,
        textAlign: 'center',
        borderTop: `1px solid ${t.border}`, borderBottom: `1px solid ${t.border}`,
        marginBottom: d.gap * 1.2,
      }}>
        <div style={{
          fontFamily: f.mono, fontSize: 11, letterSpacing: '0.3em',
          color: orange, marginBottom: 24,
        }}>— TESTIMONIAL —</div>
        <blockquote style={{
          fontFamily: f.display, fontWeight: 500,
          fontSize: 'clamp(28px, 4.5vw, 56px)', lineHeight: 1.15,
          letterSpacing: '-0.02em', margin: 0,
          color: t.text,
        }}>
          <span style={{ color: orange }}>"</span>{NYC_COPY.pullQuote.replace('הציל אותנו', '')}
          <span style={{ color: orange }}>הציל אותנו.</span>
          <span style={{ color: orange }}>"</span>
        </blockquote>
        <div style={{
          marginTop: 20, fontFamily: f.mono, fontSize: 12, letterSpacing: '0.2em',
          color: t.muted, textTransform: 'uppercase',
        }}>{NYC_COPY.pullAttribution}</div>
      </div>

      {/* === Phone cinema row === */}
      <div style={{
        position: 'relative',
        marginBottom: d.gap,
      }}>
        {/* labels above carousel */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: f.mono, fontSize: 11, letterSpacing: '0.25em',
          color: t.muted, textTransform: 'uppercase',
          marginBottom: 40, paddingInline: 8,
        }}>
          <span style={{ color: orange }}>● NOW PLAYING</span>
          <span>HOVER TO PLAY · CLICK TO FOCUS</span>
          <span>{String(center+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>
        </div>

        {/* phones */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: 24, perspective: 1600,
        }}>
          {slots.map((idx, pos) => (
            <AgencyPhone
              key={pos + ':' + idx}
              video={NYC_VIDEOS[idx]}
              center={pos === 2}
              dim={Math.abs(pos - 2)}
              theme={t}
              fonts={f}
              hovered={hover === pos}
              onHover={(v) => setHover(v ? pos : null)}
              onClick={() => setCenter(idx)}
            />
          ))}
        </div>

        {/* caption rail */}
        <div style={{
          marginTop: 40, display: 'flex', justifyContent: 'center', alignItems: 'baseline',
          gap: 16,
        }}>
          <div style={{
            fontFamily: f.display, fontWeight: 700,
            fontSize: 32, letterSpacing: '-0.02em',
          }}>{NYC_VIDEOS[center].label}</div>
          <div style={{
            fontFamily: f.mono, fontSize: 11, letterSpacing: '0.3em', color: orange,
          }}>{NYC_VIDEOS[center].tag}</div>
        </div>

        {/* dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 28 }}>
          {NYC_VIDEOS.map((_, i) => (
            <button key={i} onClick={() => setCenter(i)} style={{
              border: 'none', cursor: 'pointer', padding: 0,
              background: i === center ? orange : t.border,
              height: 2, width: i === center ? 40 : 12, borderRadius: 2,
              transition: 'all .3s ease',
            }} />
          ))}
        </div>
      </div>

      {/* === Bottom runner === */}
      <div style={{
        marginTop: d.gap, paddingTop: 32, borderTop: `1px solid ${t.border}`,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: f.mono, fontSize: 11, letterSpacing: '0.3em',
        color: t.muted, textTransform: 'uppercase',
      }}>
        <span>← מהפרק הקודם · אודות</span>
        <span style={{ color: orange }}>03 / 06</span>
        <span>לפרק הבא · המלצה →</span>
      </div>
    </div>
  );
}

function AgencyPhone({ video, center, dim, theme, fonts, hovered, onHover, onClick }) {
  const vref = React.useRef(null);
  const [muted, setMuted] = React.useState(true);

  React.useEffect(() => {
    const v = vref.current; if (!v) return;
    if (center || hovered) { v.play().catch(()=>{}); }
    else { v.pause(); }
    v.muted = !(center && !muted);
  }, [center, hovered, muted]);

  const scale = center ? 1 : (dim === 1 ? 0.78 : 0.6);
  const opacity = center ? 1 : (dim === 1 ? 0.55 : 0.22);
  const z = center ? 10 : (dim === 1 ? 5 : 1);

  return (
    <div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={onClick}
      style={{
        position: 'relative', cursor: 'pointer',
        transform: `scale(${scale})`,
        opacity, zIndex: z,
        transition: 'transform .6s cubic-bezier(.22,1,.36,1), opacity .6s ease',
        flexShrink: 0,
      }}
    >
      {/* phone */}
      <div style={{
        position: 'relative', width: 240, height: 480,
        background: '#0a0a0a', borderRadius: 42,
        border: '3px solid #1d1d1d',
        boxShadow: center
          ? '0 0 0 1px #2a2a2a, 0 40px 80px rgba(0,0,0,0.7), 0 0 80px rgba(255,99,25,0.15)'
          : '0 0 0 1px #2a2a2a, 0 20px 40px rgba(0,0,0,0.6)',
        overflow: 'hidden',
      }}>
        {/* notch */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 110, height: 24, background: '#0a0a0a',
          borderRadius: '0 0 16px 16px', zIndex: 10,
        }} />
        <video
          ref={vref}
          src={video.src}
          autoPlay={center}
          muted={muted}
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* home indicator */}
        <div style={{
          position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
          width: 80, height: 4, background: 'rgba(255,255,255,0.3)', borderRadius: 2, zIndex: 10,
        }} />

        {/* center-only overlay UI */}
        {center && (
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5,
          }}>
            {/* corner badge */}
            <div style={{
              position: 'absolute', top: 36, insetInlineEnd: 14,
              fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.2em',
              color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.6)',
              padding: '4px 8px', background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(8px)', borderRadius: 4,
            }}>{video.tag}</div>
          </div>
        )}
      </div>

      {/* unmute toggle below phone (center only) */}
      {center && (
        <button
          onClick={(e) => { e.stopPropagation(); setMuted(m => !m); }}
          style={{
            position: 'absolute', bottom: -12, left: '50%',
            transform: 'translateX(-50%)',
            width: 36, height: 36, borderRadius: 18,
            border: `1px solid #FF6319`, background: theme.bg, color: '#FF6319',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14,
          }}
        >{muted ? '🔇' : '🔊'}</button>
      )}
    </div>
  );
}

Object.assign(window, { AgencyNYC });
