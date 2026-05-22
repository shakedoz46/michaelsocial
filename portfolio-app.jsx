// Portfolio App — mounts all sections in order + Tweaks panel.

const PF_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "type": "DM Sans + Heebo",
  "density": "cinematic"
} /*EDITMODE-END*/;

function PFApp() {
  const [t, setTweak] = useTweaks(PF_TWEAK_DEFAULTS);
  const tokens = useTokens(t.theme, t.type, t.density);

  // Apply theme bg to body so scrollbar / overscroll color match
  React.useEffect(() => {
    document.body.style.background = tokens.c.bg;
    document.body.style.color = tokens.c.text;
    document.body.style.fontFamily = tokens.f.body;
  }, [tokens]);

  return (
    <>
      <PFNav tokens={tokens} />

      <PFHero tokens={tokens} />
      <PFAbout tokens={tokens} />
      <PFNYC tokens={tokens} />
      <PFPosts tokens={tokens} />
      <PFContact tokens={tokens} />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Background mode" />
        <TweakRadio
          label="Theme"
          value={t.theme}
          options={['dark', 'light', 'cream']}
          onChange={(v) => setTweak('theme', v)} />
        

        <TweakSection label="Typography" />
        <TweakSelect
          label="Type pairing"
          value={t.type}
          options={['DM Sans + Heebo', 'Bricolage + Heebo', 'Instrument Serif + Heebo', 'Space Grotesk + Heebo']}
          onChange={(v) => setTweak('type', v)} />
        

        <TweakSection label="Density" />
        <TweakRadio
          label="Spacing"
          value={t.density}
          options={['cinematic', 'regular', 'compact']}
          onChange={(v) => setTweak('density', v)} />
        
      </TweaksPanel>
    </>);

}

function PFNav({ tokens }) {
  const { c, f, orange } = tokens;
  const [visible, setVisible] = React.useState(true);
  const [activeSection, setActiveSection] = React.useState('hero');
  const lastYRef = React.useRef(0);
  const mob = useMobile();

  React.useEffect(() => {
    const onS = () => {
      const y = window.scrollY;
      if (y > lastYRef.current && y > 80) setVisible(false);
      else setVisible(true);
      lastYRef.current = y;
    };
    window.addEventListener('scroll', onS, { passive: true });
    return () => window.removeEventListener('scroll', onS);
  }, []);

  React.useEffect(() => {
    const ids = ['hero', 'about', 'nyc', 'posts', 'contact'];
    const ios = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { rootMargin: '-25% 0px -65% 0px' }
      );
      io.observe(el);
      ios.push(io);
    });
    return () => ios.forEach(io => io.disconnect());
  }, []);

  const links = [
    { label: 'בית',     href: '#hero',    id: 'hero'    },
    { label: 'אודות',   href: '#about',   id: 'about'   },
    { label: 'הסיפור',  href: '#nyc',     id: 'nyc'     },
    { label: 'עבודות',  href: '#posts',   id: 'posts'   },
    { label: 'צרו קשר', href: '#contact', id: 'contact' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: mob ? 12 : 20,
      left: '50%',
      transform: `translateX(-50%) translateY(${visible ? 0 : -80}px)`,
      opacity: visible ? 1 : 0,
      transition: 'transform .4s cubic-bezier(.22,1,.36,1), opacity .35s ease',
      zIndex: 50,
      background: 'rgba(255,99,25,0.07)',
      backdropFilter: 'blur(24px) saturate(180%)',
      WebkitBackdropFilter: 'blur(24px) saturate(180%)',
      border: '1px solid rgba(255,99,25,0.2)',
      borderRadius: 999,
      padding: '4px 6px',
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      boxShadow: '0 8px 32px rgba(0,0,0,0.35), 0 2px 12px rgba(255,99,25,0.08), inset 0 1px 0 rgba(255,255,255,0.08)',
      whiteSpace: 'nowrap',
      maxWidth: '96vw',
      overflowX: 'auto',
    }}>
      {links.map(l => {
        const isActive = activeSection === l.id;
        return (
          <a
            key={l.href}
            href={l.href}
            style={{
              fontFamily: f.body,
              fontSize: mob ? 11 : 13,
              fontWeight: isActive ? 600 : 400,
              color: isActive ? orange : c.text,
              textDecoration: 'none',
              padding: mob ? '5px 10px' : '7px 16px',
              borderRadius: 999,
              background: isActive ? 'rgba(255,99,25,0.16)' : 'transparent',
              border: `1px solid ${isActive ? 'rgba(255,99,25,0.42)' : 'transparent'}`,
              transition: 'all .22s ease',
              letterSpacing: '0.01em',
              opacity: isActive ? 1 : 0.72,
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                e.currentTarget.style.opacity = '1';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.opacity = '0.72';
              }
            }}
          >{l.label}</a>
        );
      })}
    </nav>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PFApp />);