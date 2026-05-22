// Direction 2 — "THE FEED" · Part 2: phone stage with overlay UI + floating comments + grid

function FeedStage({ active, current, liveLikes, fonts, theme, orange, pink, seen }) {
  const [liked, setLiked] = React.useState(false);
  const [bursts, setBursts] = React.useState([]);
  const [bookmarked, setBookmarked] = React.useState(false);
  const tapRef = React.useRef({ lastT: 0 });

  // Reset liked on swap
  React.useEffect(() => { setLiked(false); setBookmarked(false); }, [active]);

  // Double-tap to like
  const onTap = (e) => {
    const now = Date.now();
    if (now - tapRef.current.lastT < 340) {
      setLiked(true);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Math.random();
      setBursts(b => [...b, { id, x, y }]);
      setTimeout(() => setBursts(b => b.filter(z => z.id !== id)), 900);
    }
    tapRef.current.lastT = now;
  };

  return (
    <div style={{
      position: 'relative',
      display: 'grid', gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center', gap: 40,
      paddingBlock: 32, minHeight: 720,
    }}>
      {/* Left floating comments */}
      <FloatingComments side="right" comments={HE_COMMENTS.slice(0, 3)} fonts={fonts} theme={theme} orange={orange} active={active} />

      {/* Phone stage */}
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        {/* halo */}
        <div aria-hidden style={{
          position: 'absolute', inset: -40, borderRadius: '50%',
          background: `radial-gradient(circle, ${pink}22 0%, transparent 65%)`,
          filter: 'blur(20px)',
        }} />

        <div style={{
          position: 'relative', width: 320, height: 640,
          background: '#000', borderRadius: 52,
          border: '5px solid #1a1a1a',
          boxShadow: '0 0 0 1px #2a2a2a, 0 40px 100px rgba(0,0,0,0.7), 0 0 120px rgba(225,48,108,0.15)',
          overflow: 'hidden',
          cursor: 'pointer',
        }} onClick={onTap}>
          {/* dynamic island */}
          <div style={{
            position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)',
            width: 110, height: 30, background: '#000',
            borderRadius: 20, zIndex: 20,
          }} />

          <video
            key={current.src}
            src={current.src}
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />

          {/* Reels overlay UI */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)',
          }}>
            {/* Top bar */}
            <div style={{
              position: 'absolute', top: 56, insetInline: 16,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              color: '#fff',
            }}>
              <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 18 }}>Reels</div>
              <div style={{ fontSize: 18 }}>📷</div>
            </div>

            {/* Right action rail */}
            <div style={{
              position: 'absolute', bottom: 100, insetInlineEnd: 12,
              display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center',
              color: '#fff', pointerEvents: 'auto',
            }}>
              {/* avatar */}
              <div style={{
                width: 44, height: 44, borderRadius: 22,
                background: `linear-gradient(135deg, ${orange}, ${pink}, #bc1888)`,
                padding: 2,
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  background: theme.bg, color: theme.text,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: fonts.display, fontWeight: 800, fontSize: 16,
                }}>D</div>
              </div>

              {/* like */}
              <ActionBtn onClick={(e) => { e.stopPropagation(); setLiked(l => !l); }} label={liveLikes}>
                <Heart filled={liked} color={liked ? pink : '#fff'} />
              </ActionBtn>

              {/* comment */}
              <ActionBtn label={current.comments}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </ActionBtn>

              {/* share */}
              <ActionBtn label="שתף">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </ActionBtn>

              {/* bookmark */}
              <ActionBtn onClick={(e) => { e.stopPropagation(); setBookmarked(b => !b); }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill={bookmarked ? '#fff' : 'none'} stroke="#fff" strokeWidth={2}>
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
              </ActionBtn>
            </div>

            {/* Bottom caption */}
            <div style={{
              position: 'absolute', bottom: 30, insetInline: 16, insetInlineEnd: 76,
              color: '#fff',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
                fontFamily: fonts.body, fontSize: 14, fontWeight: 700,
              }}>
                <span>@datinglistnyc</span>
                <span style={{
                  fontSize: 10, padding: '2px 8px',
                  border: '1px solid rgba(255,255,255,0.7)', borderRadius: 4, fontWeight: 500,
                }}>עוקב</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 300, opacity: 0.95, lineHeight: 1.4 }}>
                {current.label} · NYC · {current.tag.toLowerCase()} 🗽
              </div>
            </div>
          </div>

          {/* heart bursts on double-tap */}
          {bursts.map(b => (
            <div key={b.id} style={{
              position: 'absolute', left: b.x, top: b.y,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none', zIndex: 15,
              animation: 'feedHeart .9s cubic-bezier(.22,1,.36,1) forwards',
            }}>
              <Heart filled color="#fff" size={96} stroke={pink} />
            </div>
          ))}
        </div>

        {/* hint */}
        <div style={{
          position: 'absolute', bottom: -36, left: '50%', transform: 'translateX(-50%)',
          fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.25em',
          color: theme.muted, textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>↑ קליק כפול → לייק ↑</div>
      </div>

      {/* Right floating comments */}
      <FloatingComments side="left" comments={HE_COMMENTS.slice(3, 6)} fonts={fonts} theme={theme} orange={orange} active={active} />

      <style>{`
        @keyframes feedHeart {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
          30%  { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
          100% { opacity: 0; transform: translate(-50%, -90%) scale(0.9); }
        }
        @keyframes feedFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

function ActionBtn({ children, label, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      color: '#fff',
    }}>
      {children}
      {label != null && <span style={{ fontSize: 11, fontWeight: 700 }}>{label}</span>}
    </button>
  );
}

function Heart({ filled, color = '#fff', size = 28, stroke }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={stroke || color} strokeWidth={2}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}

function FloatingComments({ side, comments, fonts, theme, orange, active }) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => { setTick(0); const id = setInterval(() => setTick(x=>x+1), 3200); return () => clearInterval(id); }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 18,
      alignSelf: 'stretch', justifyContent: 'center',
      paddingBlock: 60,
    }}>
      {comments.map((c, i) => (
        <div
          key={active + '-' + i}
          style={{
            background: theme.soft,
            border: `1px solid ${theme.border}`,
            borderRadius: 18,
            padding: '14px 16px',
            maxWidth: 280,
            alignSelf: side === 'right' ? 'flex-end' : 'flex-start',
            animation: `feedSlideIn .6s ${i * 0.4}s ease backwards, feedFloat ${4 + i}s ease-in-out infinite ${i * 0.5}s`,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <div style={{
              width: 24, height: 24, borderRadius: 12,
              background: `linear-gradient(${i * 67}deg, ${orange}, #E1306C)`,
              fontFamily: fonts.display, fontWeight: 800, fontSize: 11,
              color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{c.user[0].toUpperCase()}</div>
            <div style={{
              fontFamily: fonts.body, fontSize: 12, fontWeight: 600, color: theme.text,
              direction: 'ltr', flex: 1, textAlign: 'left',
            }}>@{c.user} {c.verified && <span style={{ color: '#3897F0' }}>✓</span>}</div>
            <div style={{ fontSize: 10, color: theme.muted }}>{c.ago}</div>
          </div>
          <div style={{ fontSize: 13, color: theme.text, lineHeight: 1.4, fontWeight: 300 }}>{c.text}</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8, fontSize: 10, color: theme.muted }}>
            <span>♡ {c.likes}</span>
            <span>השב</span>
          </div>
        </div>
      ))}
      <style>{`
        @keyframes feedSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function FeedGrid({ active, setActive, fonts, theme, orange, pink }) {
  return (
    <div style={{ marginTop: 80 }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        marginBottom: 24, paddingInline: 4,
      }}>
        <div>
          <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.3em', color: orange }}>EXPLORE GRID</div>
          <div style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em', marginTop: 4 }}>
            כל הפוסטים
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, fontFamily: fonts.body, fontSize: 12, color: theme.muted }}>
          <span style={{ color: theme.text, fontWeight: 600 }}>⊞ רשת</span>
          <span>↗ ריילס</span>
          <span>🏷 תיוגים</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
        {NYC_VIDEOS.map((v, i) => {
          const on = i === active;
          return (
            <button key={i} onClick={() => setActive(i)} style={{
              position: 'relative', aspectRatio: '4 / 5',
              border: 'none', padding: 0, cursor: 'pointer',
              overflow: 'hidden', background: '#000',
              outline: on ? `3px solid ${orange}` : 'none',
              outlineOffset: -3,
            }}>
              <video
                src={v.src}
                autoPlay muted loop playsInline
                style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform .4s ease, filter .3s ease',
                  filter: on ? 'none' : 'grayscale(0) brightness(0.85)',
                }}
              />
              {/* reels icon */}
              <div style={{ position: 'absolute', top: 8, insetInlineEnd: 8, color: '#fff', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <polygon points="23 7 16 12 23 17 23 7"/>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                </svg>
              </div>
              {/* live stats overlay on hover */}
              <div style={{
                position: 'absolute', inset: 0, padding: 12,
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                background: 'linear-gradient(transparent 50%, rgba(0,0,0,0.7))',
                color: '#fff', fontFamily: fonts.body, opacity: on ? 1 : 0.85,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>♥ {v.likes}</div>
                <div style={{ fontSize: 10, opacity: 0.85, marginTop: 2 }}>{v.label}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { FeedStage, FloatingComments, FeedGrid, ActionBtn, Heart });
