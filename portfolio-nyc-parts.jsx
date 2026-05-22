// NYC parts: 3-phone carousel (center = active Reels w/ like; sides = peek phones).
// No stories, no comments. Click side phones to advance.
// Position indicator below shows videos remaining each side.

function PFNYCStage({ active, setActive, fonts, c, orange, pink }) {
  const total = NYC_VIDEOS_PF.length;
  const current = NYC_VIDEOS_PF[active];
  const prevIdx = (active - 1 + total) % total;
  const nextIdx = (active + 1) % total;
  const mob = useMobile();

  const [dir, setDir] = React.useState(0);
  const goTo = (idx) => {
    const diff = ((idx - active + total) % total);
    setDir(diff === 1 ? 1 : diff === total - 1 ? -1 : (idx > active ? 1 : -1));
    setActive(idx);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: mob ? 12 : 28 }}>
      {/* 3-phone grid — always shown, scaled down on mobile via zoom */}
      <div style={{
        position: 'relative',
        display: 'grid', gridTemplateColumns: 'auto auto auto',
        alignItems: 'center', gap: 16, perspective: 1400,
        zoom: mob ? 0.68 : 1,
      }}>
        <div aria-hidden style={{
          position: 'absolute', inset: '20% 22% 20% 22%', borderRadius: '50%',
          background: `radial-gradient(circle, ${pink}28 0%, transparent 60%)`,
          filter: 'blur(24px)', pointerEvents: 'none',
        }} />
        <PFNYCPeekPhone key={'peek-prev-' + prevIdx} video={NYC_VIDEOS_PF[prevIdx]} side="prev" onClick={() => goTo(prevIdx)} />
        <PFNYCMainPhone key={'main-' + active} video={current} dir={dir} fonts={fonts} c={c} orange={orange} pink={pink} />
        <PFNYCPeekPhone key={'peek-next-' + nextIdx} video={NYC_VIDEOS_PF[nextIdx]} side="next" onClick={() => goTo(nextIdx)} />
      </div>

      <PFNYCIndicator active={active} total={total} setActive={goTo} fonts={fonts} c={c} orange={orange} />

      <style>{`
        @keyframes pfHeart {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
          30%  { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
          100% { opacity: 0; transform: translate(-50%, -90%) scale(0.9); }
        }
        @keyframes pfPhoneInRight {
          from { opacity: 0; transform: translateX(60px) scale(0.92); }
          to   { opacity: 1; transform: translateX(0)    scale(1);    }
        }
        @keyframes pfPhoneInLeft {
          from { opacity: 0; transform: translateX(-60px) scale(0.92); }
          to   { opacity: 1; transform: translateX(0)     scale(1);    }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Center: the full Reels phone, with like + double-tap

function PFNYCMainPhone({ video, dir, fonts, c, orange, pink }) {
  const [liked, setLiked] = React.useState(false);
  const [bursts, setBursts] = React.useState([]);
  const [bookmarked, setBookmarked] = React.useState(false);
  const tapRef = React.useRef({ lastT: 0 });

  const base = parseInt(video.likes.replace(/,/g, ''), 10);
  const [bump, setBump] = React.useState(0);
  React.useEffect(() => { setBump(0); setLiked(false); setBookmarked(false); }, [video.src]);
  React.useEffect(() => {
    const id = setInterval(() => setBump((b) => b + Math.floor(Math.random() * 3) + 1), 1800);
    return () => clearInterval(id);
  }, []);
  const liveLikes = (base + bump).toLocaleString();

  const onTap = (e) => {
    const now = Date.now();
    if (now - tapRef.current.lastT < 340) {
      setLiked(true);
      const r = e.currentTarget.getBoundingClientRect();
      const id = Math.random();
      setBursts((b) => [...b, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
      setTimeout(() => setBursts((b) => b.filter((z) => z.id !== id)), 900);
    }
    tapRef.current.lastT = now;
  };

  const inAnim = dir === 1 ? 'pfPhoneInRight' : dir === -1 ? 'pfPhoneInLeft' : 'none';

  return (
    <div
      onClick={onTap}
      style={{
        position: 'relative', width: 200, height: 400,
        background: '#000', borderRadius: 34,
        border: '4px solid #1a1a1a',
        boxShadow: '0 0 0 1px #2a2a2a, 0 30px 80px rgba(0,0,0,0.7), 0 0 80px rgba(225,48,108,0.18)',
        overflow: 'hidden', cursor: 'pointer',
        animation: `${inAnim} .55s cubic-bezier(.22,1,.36,1)`,
      }}
    >
      {/* dynamic island */}
      <div style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        width: 70, height: 18, background: '#000', borderRadius: 14, zIndex: 20,
      }} />

      <video
        key={video.src}
        src={video.src}
        autoPlay muted loop playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* overlay UI */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
        background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.65) 100%)',
      }}>
        <div style={{
          position: 'absolute', top: 36, insetInline: 10,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          color: '#fff', direction: 'ltr',
        }}>
          <div style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 13 }}>Reels</div>
          {/* white + icon top-right */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.4} strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>

        <div style={{
          position: 'absolute', bottom: 56, right: 6,
          display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center',
          color: '#fff', pointerEvents: 'auto', direction: 'ltr',
        }}>
          {/* Heart — likes */}
          <PFAction onClick={(e) => { e.stopPropagation(); setLiked((l) => !l); }} label={liveLikes}>
            <PFHeart filled={liked} color={liked ? pink : '#fff'} size={20} />
          </PFAction>

          {/* Comment bubble */}
          <PFAction label="847">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </PFAction>

          {/* Repost — circular arrows */}
          <PFAction label="324">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="17 1 21 5 17 9" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <polyline points="7 23 3 19 7 15" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
          </PFAction>

          {/* Share — paper plane */}
          <PFAction label="412">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </PFAction>
        </div>

        <div style={{
          position: 'absolute', bottom: 14, insetInlineStart: 10, insetInlineEnd: 44,
          color: '#fff',
          direction: 'ltr', textAlign: 'left',
        }}>
          {/* username row with avatar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4,
            fontFamily: fonts.body, direction: 'ltr', justifyContent: 'flex-start',
          }}>
            {/* avatar next to name */}
            <div style={{
              width: 22, height: 22, borderRadius: 11,
              background: `linear-gradient(135deg, ${orange}, ${pink}, #bc1888)`, padding: 1.5,
              flexShrink: 0,
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                overflow: 'hidden', background: c.bg,
              }}>
                <img src="assets/datinglist-profile.jpg" alt="datinglistnyc"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700 }}>datinglistnyc</span>
            <span style={{
              fontSize: 8, padding: '1px 5px',
              border: '1px solid rgba(255,255,255,0.7)', borderRadius: 3, fontWeight: 500,
            }}>עוקב</span>
          </div>
          <div style={{ fontSize: 10, fontWeight: 300, opacity: 0.95, lineHeight: 1.35 }}>
            {video.label} · NYC · {video.tag.toLowerCase()} 🗽
          </div>
        </div>
      </div>

      {bursts.map((b) =>
        <div key={b.id} style={{
          position: 'absolute', left: b.x, top: b.y,
          transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 15,
          animation: 'pfHeart .9s cubic-bezier(.22,1,.36,1) forwards',
        }}>
          <PFHeart filled color="#fff" size={96} stroke={pink} />
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Side peek phone — clickable, scaled down, dimmed

function PFNYCPeekPhone({ video, side, onClick }) {
  const isPrev = side === 'prev';
  const peekScale = 0.55;
  return (
    <button
      onClick={onClick}
      aria-label={isPrev ? 'סרטון קודם' : 'סרטון הבא'}
      style={{
        background: 'transparent', border: 'none', padding: 0,
        cursor: 'pointer', display: 'block',
        transform: `scale(${peekScale}) translateX(${isPrev ? 22 : -22}px)`,
        transformOrigin: isPrev ? 'left center' : 'right center',
        opacity: 0.55,
        transition: 'opacity .3s ease, transform .3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = '0.85';
        e.currentTarget.style.transform = `scale(${peekScale + 0.04}) translateX(${isPrev ? 18 : -18}px)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = '0.55';
        e.currentTarget.style.transform = `scale(${peekScale}) translateX(${isPrev ? 22 : -22}px)`;
      }}
    >
      <div style={{
        position: 'relative', width: 200, height: 400,
        background: '#000', borderRadius: 34,
        border: '4px solid #1a1a1a',
        boxShadow: '0 0 0 1px #2a2a2a, 0 16px 40px rgba(0,0,0,0.5)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
          width: 70, height: 18, background: '#000', borderRadius: 14, zIndex: 20,
        }} />
        <video
          src={video.src}
          muted loop playsInline autoPlay
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: 'brightness(0.7)',
          }}
        />
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Position indicator: pills showing how many videos remain on each side

function PFNYCIndicator({ active, total, setActive, fonts, c, orange }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center', direction: 'ltr' }}>
      {NYC_VIDEOS_PF.map((_, i) => {
        const on = i === active;
        return (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`סרטון ${i + 1}`}
            style={{
              width: on ? 26 : 8, height: 8, borderRadius: 4,
              border: 'none', padding: 0, cursor: 'pointer',
              background: on ? orange : `${c.muted}55`,
              transition: 'all .3s ease',
            }}
          />
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Like / heart icon + action buttons (still used in main phone)

function PFAction({ children, label, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: '#fff',
    }}>
      {children}
      {label != null && <span style={{ fontSize: 11, fontWeight: 700 }}>{label}</span>}
    </button>
  );
}

function PFHeart({ filled, color = '#fff', size = 28, stroke }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'} stroke={stroke || color} strokeWidth={2}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Testimonial card with Instagram-style profile heading

function PFNYCQuote({ fonts, c, orange }) {
  const mob = useMobile();
  return (
    <div style={{
      marginTop: mob ? 48 : 80,
      maxWidth: 1200, marginInline: 'auto',
      background: c.soft,
      border: `1px solid ${c.border}`,
      borderRadius: mob ? 16 : 24,
      padding: mob ? '24px 20px' : '40px 48px',
      boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
      position: 'relative',
    }}>
      {/* corner accent */}
      <div aria-hidden style={{
        position: 'absolute', top: -1, insetInlineStart: 40,
        width: 80, height: 4, background: orange, borderRadius: 2,
      }} />
      {/* Instagram-style profile heading — avatar right, info left (RTL) */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'auto 1fr',
        columnGap: mob ? 16 : 28, alignItems: 'center',
        marginBottom: mob ? 20 : 32, direction: 'rtl',
      }}>
        {/* avatar with IG gradient ring */}
        <div style={{
          width: mob ? 72 : 96, height: mob ? 72 : 96,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
          padding: 3, flexShrink: 0,
        }}>
          <div style={{
            width: '100%', height: '100%', borderRadius: '50%',
            overflow: 'hidden', background: c.bg, border: `3px solid ${c.bg}`,
          }}>
            <img src="assets/datinglist-profile.jpg" alt="datinglistnewyork"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>

        {/* profile info — RTL */}
        <div style={{ direction: 'rtl', textAlign: 'right' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontFamily: fonts.body, fontSize: mob ? 16 : 22, fontWeight: 700,
            color: c.text, marginBottom: 4,
          }}>
            <span>datinglistnewyork</span>
            <svg width={mob ? 16 : 20} height={mob ? 16 : 20} viewBox="0 0 24 24" fill="#3897F0" aria-label="verified">
              <path d="M12 2 L14.5 4 L17.5 3.5 L18.5 6.5 L21 8 L20 11 L21 14 L18.5 15.5 L17.5 18.5 L14.5 18 L12 20 L9.5 18 L6.5 18.5 L5.5 15.5 L3 14 L4 11 L3 8 L5.5 6.5 L6.5 3.5 L9.5 4 Z" />
              <path d="M9 12 L11 14 L15 9" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div style={{
            fontFamily: fonts.body, fontSize: mob ? 13 : 15, fontWeight: 500,
            color: c.text, opacity: 0.85, marginBottom: mob ? 10 : 14,
          }}>Date Ideas in NYC</div>

          <div style={{ display: 'flex', gap: mob ? 16 : 28, fontFamily: fonts.body, color: c.text }}>
            {[
              { val: '463',   label: 'פוסטים' },
              { val: '79.5K', label: 'עוקבים' },
              { val: '194',   label: 'נעקבים' },
            ].map(({ val, label }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                <b style={{ fontWeight: 700, fontSize: mob ? 14 : 17 }}>{val}</b>
                <span style={{ opacity: 0.65, fontSize: mob ? 11 : 13 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The quote */}
      <blockquote style={{
        fontFamily: fonts.display, fontWeight: 500,
        fontSize: mob ? 'clamp(16px, 4.5vw, 22px)' : 'clamp(22px, 2.4vw, 36px)',
        lineHeight: 1.4, letterSpacing: '-0.022em', margin: 0,
        color: c.text,
      }}>
        <span style={{ color: orange, fontSize: '1.4em', lineHeight: 0, marginInlineEnd: 4 }}>"</span>
        {(() => {
          const text = NYC.testimonial.body;
          const highlight = 'הציל אותנו';
          const ending = 'ממליצה בחום!';
          const idx = text.indexOf(highlight);
          const endIdx = text.lastIndexOf(ending);
          if (idx === -1) return text;
          const middle = text.slice(idx + highlight.length, endIdx);
          return (
            <React.Fragment>
              {text.slice(0, idx)}
              <PFHighlight orange={orange} pad="2px 8px" style={{
                transform: 'rotate(-1deg)',
              }}>{highlight}</PFHighlight>
              {middle}
              <span style={{ color: orange, fontWeight: 700 }}>{ending}</span>
            </React.Fragment>
          );
        })()}
        <span style={{ color: orange, fontSize: '1.4em', lineHeight: 0, marginInlineStart: 4 }}>"</span>
      </blockquote>
    </div>
  );
}

Object.assign(window, {
  PFNYCStage, PFNYCMainPhone, PFNYCPeekPhone, PFNYCIndicator,
  PFAction, PFHeart, PFNYCQuote,
});
