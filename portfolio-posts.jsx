// All Posts — Instagram-style grid (desktop) / snap carousel (mobile).

function PFPosts({ tokens }) {
  const { c, f, orange, pink } = tokens;
  const ref = React.useRef(null);
  const seen = useInViewPF(ref, { threshold: 0.05 });
  const [filter, setFilter] = React.useState('ALL');
  const [hoverIdx, setHoverIdx] = React.useState(null);
  const mob = useMobile();

  const categories = ['ALL', 'NYC', 'TRAVEL', 'EVENTS', 'FOOD'];
  const filtered = filter === 'ALL' ?
  ALL_POSTS :
  ALL_POSTS.filter((p) => p.category === filter);

  return (
    <section
      ref={ref}
      id="posts"
      style={{
        position: 'relative', background: c.bg, color: c.text,
        paddingBlock: mob ? 80 : 140, paddingInline: mob ? 20 : 64, overflow: 'hidden'
      }}>
      
      <div aria-hidden style={{
        position: 'absolute', top: 0, insetInline: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${orange}55, transparent)`
      }} />

      <div style={{ maxWidth: 1280, marginInline: 'auto' }}>
        {/* header */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 32, marginBottom: 56
        }}>
          <div>
            <div style={{
              fontFamily: f.mono, fontSize: 11, letterSpacing: '0.4em',
              color: orange, marginBottom: 16
            }}>✦ MORE WORK</div>

            <h2 style={{ fontFamily: f.display, fontWeight: 800,
              fontSize: 'clamp(40px, 5.5vw, 72px)', lineHeight: 1.02,
              letterSpacing: '-0.035em', margin: 0
            }}>
              <span style={{
                display: 'inline-block',
                background: orange, color: '#fff',
                padding: '4px 20px', transform: 'rotate(-1.5deg)',
                boxShadow: `0 8px 24px ${orange}55`
              }}>עבודות נוספות</span>
            </h2>

          </div>

          {/* filter chips */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {categories.map((cat) => {
              const on = filter === cat;
              return (
                <button key={cat} onClick={() => setFilter(cat)} style={{
                  padding: '10px 18px', borderRadius: 999,
                  border: `1.5px solid ${on ? orange : c.border}`,
                  background: on ? orange : 'transparent',
                  color: on ? '#fff' : c.text,
                  fontFamily: f.body, fontSize: 13, fontWeight: 600,
                  letterSpacing: '0.05em',
                  cursor: 'pointer', transition: 'all .2s ease'
                }}>{cat}</button>);

            })}
          </div>
        </div>

        {/* grid (desktop) / carousel (mobile) */}
        {mob ? (
          <PFPostsCarouselMobile filtered={filtered} fonts={f} c={c} orange={orange} />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
            {filtered.map((p, i) =>
              <PFPostTile
                key={p.src + i} post={p}
                active={hoverIdx === i}
                onEnter={() => setHoverIdx(i)}
                onLeave={() => setHoverIdx((prev) => prev === i ? null : prev)}
                fonts={f} c={c} orange={orange} />
            )}
          </div>
        )}
      </div>
    </section>);

}

function PFPostTile({ post, active, onEnter, onLeave, fonts, c, orange }) {
  const vref = React.useRef(null);

  React.useEffect(() => {
    const v = vref.current;if (!v) return;
    if (active) {v.currentTime = 0;v.play().catch(() => {});} else
    {v.pause();v.currentTime = 0;}
  }, [active]);

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: 'relative', aspectRatio: '4 / 5',
        background: '#0a0a0a', overflow: 'hidden', cursor: 'pointer',
        outline: active ? `3px solid ${orange}` : 'none', outlineOffset: -3,
        transition: 'outline-color .2s ease'
      }}>
      
      <video
        ref={vref}
        src={post.src}
        muted loop playsInline preload="metadata"
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          transition: 'filter .3s ease, transform .4s ease',
          filter: active ? 'none' : 'brightness(0.85) saturate(0.92)',
          transform: active ? 'scale(1.04)' : 'scale(1)'
        }} />
      

      {/* reels icon */}
      <div style={{
        position: 'absolute', top: 10, insetInlineEnd: 10, color: '#fff',
        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))',
        opacity: active ? 0 : 1, transition: 'opacity .2s ease'
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      </div>

      {/* play indicator on hover */}
      {active &&
      <div style={{
        position: 'absolute', top: 10, insetInlineEnd: 10,
        fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.2em',
        background: orange, color: '#fff', padding: '3px 8px', borderRadius: 3
      }}>● LIVE</div>
      }

      {/* gradient overlay + caption */}
      <div style={{
        position: 'absolute', inset: 0, padding: 14,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        background: 'linear-gradient(transparent 45%, rgba(0,0,0,0.75))',
        color: '#fff', fontFamily: fonts.body
      }}>
        <div style={{
          fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.25em',
          color: '#fff', opacity: 0.85, marginBottom: 4
        }}>{post.category}</div>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, letterSpacing: '-0.01em' }}>{post.label}</div>
        <div style={{ fontSize: 11, opacity: 0.85, display: 'flex', gap: 12 }}>
          <span>♥ {post.likes}</span>
        </div>
      </div>
    </div>);

}

function PFPostsCarouselMobile({ filtered, fonts, c, orange }) {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const scrollRef = React.useRef(null);

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.offsetWidth);
    setCurrentIdx(Math.max(0, Math.min(idx, filtered.length - 1)));
  };

  const goTo = (idx) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.offsetWidth, behavior: 'smooth' });
    setCurrentIdx(idx);
  };

  // Reset scroll position when filter changes
  React.useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    setCurrentIdx(0);
  }, [filtered]);

  return (
    <div>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="pfNoScrollbar"
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          direction: 'ltr',
          gap: 12,
          marginInline: -20,
          paddingInline: 20,
        }}
      >
        {filtered.map((p, i) => (
          <div key={p.src + i} style={{ flex: '0 0 85%', scrollSnapAlign: 'center' }}>
            <PFPostTileMobile post={p} fonts={fonts} c={c} orange={orange} isVisible={currentIdx === i} />
          </div>
        ))}
      </div>

      {/* dot indicator */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20, direction: 'ltr' }}>
        {filtered.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === currentIdx ? 24 : 8, height: 8, borderRadius: 4,
            border: 'none', padding: 0, cursor: 'pointer',
            background: i === currentIdx ? orange : 'rgba(255,255,255,0.2)',
            transition: 'all .3s ease',
          }} />
        ))}
      </div>
    </div>
  );
}

function PFPostTileMobile({ post, fonts, c, orange, isVisible }) {
  const vref = React.useRef(null);
  React.useEffect(() => {
    const v = vref.current;
    if (!v) return;
    if (isVisible) v.play().catch(() => {});
    else { v.pause(); v.currentTime = 0; }
  }, [isVisible]);

  return (
    <div style={{
      position: 'relative', aspectRatio: '4 / 5',
      background: '#0a0a0a', overflow: 'hidden', borderRadius: 16,
    }}>
      <video ref={vref} src={post.src} muted loop playsInline preload="metadata"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{
        position: 'absolute', inset: 0, padding: 16,
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        background: 'linear-gradient(transparent 40%, rgba(0,0,0,0.78))',
        color: '#fff', fontFamily: fonts.body,
      }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.25em', opacity: 0.85, marginBottom: 4 }}>{post.category}</div>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>{post.label}</div>
        <div style={{ fontSize: 13, opacity: 0.85 }}>♥ {post.likes}</div>
      </div>
    </div>
  );
}

Object.assign(window, { PFPosts, PFPostTile, PFPostsCarouselMobile, PFPostTileMobile });