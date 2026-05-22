// Direction 3 — "THE STREET" · Part 2: clipping + polaroid carousel + receipts

function StreetClipping({ fonts, theme, orange, seen }) {
  return (
    <div style={{
      position: 'relative', marginTop: 40,
      display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 56,
      alignItems: 'flex-start',
    }}>
      {/* IG screenshot pinned with tape */}
      <div style={{ position: 'relative', transform: 'rotate(-2.4deg)' }}>
        {/* tape strips */}
        <div style={{
          position: 'absolute', top: -16, insetInlineEnd: 24,
          width: 90, height: 22, background: '#FFE066',
          transform: 'rotate(8deg)', opacity: 0.85,
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          zIndex: 5,
        }} />
        <div style={{
          position: 'absolute', top: -10, insetInlineStart: 16,
          width: 70, height: 18, background: '#FFE066',
          transform: 'rotate(-6deg)', opacity: 0.85,
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          zIndex: 5,
        }} />

        <div style={{
          background: '#fff', padding: 12, borderRadius: 2,
          boxShadow: '0 24px 60px rgba(0,0,0,0.45), 0 4px 12px rgba(0,0,0,0.2)',
        }}>
          <img
            src="assets/instagram-screenshot.png"
            alt="@datinglistnyc"
            style={{ display: 'block', width: '100%', maxWidth: 460 }}
          />
          {/* photo caption */}
          <div style={{
            fontFamily: 'Caveat', fontSize: 22, color: '#000',
            paddingBlock: 12, paddingInline: 4, textAlign: 'center',
          }}>@datinglistnyc — אכן, 80K עוקבים מאושרים</div>
        </div>

        {/* arrow doodle pointing to it */}
        <svg viewBox="0 0 200 100" width="160" height="80" style={{
          position: 'absolute', top: '40%', insetInlineEnd: -150,
          transform: 'rotate(8deg)',
        }}>
          <path d="M10 50 Q 80 20, 160 50" stroke={orange} strokeWidth="3" fill="none" strokeLinecap="round"/>
          <path d="M155 38 L 165 50 L 152 60" stroke={orange} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* the story */}
      <div style={{ position: 'relative', paddingTop: 20 }}>
        <div style={{
          fontFamily: 'Caveat', fontSize: 38, color: orange, fontWeight: 700,
          transform: 'rotate(-1deg)', marginBottom: 16,
        }}>אז ככה זה התחיל →</div>

        <p style={{
          fontFamily: fonts.body, fontWeight: 400,
          fontSize: 18, lineHeight: 1.7, opacity: 0.92, margin: 0,
        }}>
          קיבלתי הודעה: "תוכל למלא מקום?"<br/>
          ארבעה חודשים אחר כך, ידעתי לזרוק קליפ של בר על הגג בשתי דקות,
          להגיד למי לעקוב כדי לפוצץ את הריץ׳, ולהבדיל בין סטוריס שעובד לבין כזה שמת בשקט.
        </p>

        {/* bullet list with highlighter */}
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {NYC_BULLETS.map((b, i) => (
            <div key={i} style={{
              display: 'flex', gap: 14, alignItems: 'flex-start',
              fontSize: 16,
            }}>
              <span style={{
                color: orange, fontFamily: fonts.display, fontWeight: 800, fontSize: 22,
                lineHeight: 1, transform: `rotate(${[-4, 6, -2][i]}deg)`, marginTop: 2,
              }}>✦</span>
              <div>
                <span style={{
                  background: `linear-gradient(transparent 60%, ${orange}55 60%, ${orange}55 92%, transparent 92%)`,
                  paddingInline: 4,
                  fontFamily: fonts.display, fontWeight: 700,
                  fontSize: 18, letterSpacing: '-0.01em',
                }}>{b.title}</span>
                <span style={{ marginInlineStart: 8, fontWeight: 300, opacity: 0.8 }}>— {b.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* stamp */}
        <div style={{
          position: 'absolute', bottom: -30, insetInlineEnd: 30,
          transform: 'rotate(-14deg)',
          padding: '10px 18px',
          border: `3px solid ${orange}`, borderRadius: 8,
          color: orange, fontFamily: fonts.display, fontWeight: 800,
          fontSize: 16, letterSpacing: '0.1em',
        }}>APPROVED ✓</div>
      </div>
    </div>
  );
}

function StreetPolaroids({ pick, setPick, fonts, theme, orange, yellow, tape }) {
  // Use a fixed set of tilt angles for stable visuals
  const tilts = [-7, 5, -3, 8, -5, 4];
  const offsets = [10, -16, 0, 8, -10, 14];

  return (
    <div style={{ marginTop: 100, paddingBottom: 40 }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        marginBottom: 36, paddingInline: 8,
      }}>
        <div>
          <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.3em', color: orange, textTransform: 'uppercase' }}>★ FROM THE ARCHIVE ★</div>
          <h2 style={{
            fontFamily: fonts.display, fontSize: 56, fontWeight: 800,
            letterSpacing: '-0.04em', margin: 0, marginTop: 8,
          }}>
            הקליפים<span style={{ color: orange }}> שעבדו</span>
          </h2>
        </div>
        <div style={{
          fontFamily: 'Caveat', fontSize: 26, color: theme.muted,
          transform: 'rotate(-2deg)', maxWidth: 240, textAlign: 'left',
        }}>תלחצו על אחד 👇</div>
      </div>

      {/* Polaroid row */}
      <div style={{
        display: 'flex', gap: 0, justifyContent: 'center', alignItems: 'center',
        flexWrap: 'wrap', paddingBlock: 30,
      }}>
        {NYC_VIDEOS.map((v, i) => {
          const on = i === pick;
          return (
            <StreetPolaroid
              key={i}
              video={v}
              active={on}
              tilt={on ? 0 : tilts[i]}
              offsetY={on ? -20 : offsets[i]}
              onClick={() => setPick(i)}
              fonts={fonts}
              orange={orange}
              tape={tape}
            />
          );
        })}
      </div>
    </div>
  );
}

function StreetPolaroid({ video, active, tilt, offsetY, onClick, fonts, orange, tape }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const v = ref.current; if (!v) return;
    if (active) v.play().catch(()=>{}); else v.pause();
  }, [active]);

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative', cursor: 'pointer',
        background: '#fffaf2', padding: 12, paddingBottom: 44,
        boxShadow: active
          ? '0 30px 60px rgba(0,0,0,0.55), 0 0 60px rgba(255,99,25,0.3)'
          : '0 16px 30px rgba(0,0,0,0.35)',
        transform: `rotate(${tilt}deg) translateY(${offsetY}px) scale(${active ? 1.1 : 1})`,
        transition: 'transform .4s cubic-bezier(.22,1,.36,1), box-shadow .4s ease',
        zIndex: active ? 10 : 1,
        marginInline: -8,
      }}
    >
      {/* tape on top corner */}
      {!active && (
        <div style={{
          position: 'absolute', top: -10, insetInlineStart: '40%',
          width: 50, height: 16, background: tape,
          transform: `rotate(${tilt + 90}deg)`,
          opacity: 0.85,
        }} />
      )}

      <div style={{ width: 170, height: 280, overflow: 'hidden', background: '#000' }}>
        <video
          ref={ref}
          src={video.src}
          autoPlay={active} muted loop playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{
        fontFamily: 'Caveat', fontWeight: 700, fontSize: 22,
        color: '#000', textAlign: 'center', marginTop: 8,
      }}>{video.label}</div>

      {active && (
        <div style={{
          position: 'absolute', top: -16, insetInlineEnd: -12,
          transform: 'rotate(14deg)',
          background: orange, color: '#fff',
          fontFamily: fonts.display, fontWeight: 800, fontSize: 12,
          padding: '4px 10px', borderRadius: 4,
          letterSpacing: '0.1em',
        }}>♥ {video.likes}</div>
      )}
    </div>
  );
}

function StreetReceipts({ fonts, theme, orange }) {
  return (
    <div style={{ marginTop: 80, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'flex-start' }}>
      {/* receipt */}
      <div style={{
        background: '#fffaf2', color: '#000', padding: 24,
        fontFamily: fonts.mono, fontSize: 13, lineHeight: 1.8,
        maxWidth: 380, marginInline: 'auto',
        transform: 'rotate(-1.5deg)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), 92% 100%, 84% calc(100% - 8px), 76% 100%, 68% calc(100% - 8px), 60% 100%, 52% calc(100% - 8px), 44% 100%, 36% calc(100% - 8px), 28% 100%, 20% calc(100% - 8px), 12% 100%, 4% calc(100% - 8px), 0 100%)',
      }}>
        <div style={{ textAlign: 'center', borderBottom: '1px dashed #000', paddingBottom: 8, marginBottom: 12 }}>
          <div style={{ fontWeight: 700, letterSpacing: '0.15em' }}>* DATINGLISTNYC *</div>
          <div style={{ fontSize: 10, marginTop: 4 }}>SUMMER 2024 — INVOICE #03</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>FOLLOWERS REACHED</span><span>80,000</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>MONTHS ON DUTY</span><span>4</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>POSTS &amp; REELS</span><span>127+</span></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>HOURS OF FOOTAGE</span><span>∞</span></div>
        <div style={{ borderTop: '1px dashed #000', marginBlock: 12 }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
          <span>SATISFACTION</span><span style={{ color: orange }}>★★★★★</span>
        </div>
        <div style={{ textAlign: 'center', marginTop: 12, fontSize: 10 }}>תודה רבה. בואו שוב.</div>
      </div>

      {/* big quote with marker scrawl */}
      <div style={{ position: 'relative', paddingInline: 24, paddingTop: 12 }}>
        <div style={{
          fontFamily: 'Caveat', fontSize: 28, color: orange,
          transform: 'rotate(-1deg)', marginBottom: 12, fontWeight: 700,
        }}>מה הם אמרו אחר כך —</div>

        <blockquote style={{
          fontFamily: fonts.display, fontWeight: 500,
          fontSize: 36, lineHeight: 1.18, letterSpacing: '-0.025em',
          margin: 0,
        }}>
          <span style={{ color: orange, fontSize: 60, lineHeight: 0 }}>"</span>
          מיכאל הגיע אלינו והוא פשוט{' '}
          <span style={{
            background: `linear-gradient(transparent 55%, ${orange}55 55%, ${orange}55 90%, transparent 90%)`,
            paddingInline: 4,
          }}>הציל אותנו</span>.
          ממליצה <span style={{ fontFamily: 'Caveat', color: orange }}>בחום!</span>
          <span style={{ color: orange, fontSize: 60, lineHeight: 0 }}>"</span>
        </blockquote>

        <div style={{
          marginTop: 20, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 18,
            background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontFamily: fonts.display, fontWeight: 800, fontSize: 14,
          }}>D</div>
          <div>
            <div style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 14 }}>@datinglistnyc</div>
            <div style={{ fontSize: 11, color: theme.muted }}>NYC · 80K followers</div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { StreetClipping, StreetPolaroids, StreetPolaroid, StreetReceipts });
