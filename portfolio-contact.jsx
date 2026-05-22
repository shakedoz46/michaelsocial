// Contact — big accessible inputs, solid orange CTA with white bold text.

function PFContact({ tokens }) {
  const { c, f, orange } = tokens;
  const ref = React.useRef(null);
  const seen = useInViewPF(ref, { threshold: 0.05 });
  const mob = useMobile();

  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 900);
  };

  return (
    <section
      ref={ref}
      id="contact"
      style={{
        position: 'relative',
        background: `linear-gradient(180deg, ${c.bg} 0%, ${c.soft} 100%)`,
        color: c.text,
        paddingBlock: mob ? 80 : 140, paddingInline: mob ? 20 : 64, overflow: 'hidden'
      }}
    >
      <div aria-hidden style={{
        position: 'absolute', top: 0, insetInline: 0, height: 1,
        background: `linear-gradient(90deg, transparent, ${orange}55, transparent)`
      }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 70% 50% at 50% 100%, ${orange}11 0%, transparent 70%)`
      }} />

      <div style={{ maxWidth: 1180, marginInline: 'auto' }}>
        {/* kicker — English */}
        <div style={{
          fontFamily: f.mono, fontSize: 11, letterSpacing: '0.4em',
          color: orange, marginBottom: 24
        }}>{CONTACT.kicker}</div>

        {/* headline */}
        <h2 style={{
          fontFamily: f.display, fontWeight: 800,
          fontSize: mob ? 28 : 'clamp(56px, 8vw, 120px)', lineHeight: mob ? 1.1 : 0.95,
          letterSpacing: '-0.05em', margin: 0, marginBottom: 24
        }}>
          {CONTACT.title}{' '}
          <span style={{
            display: 'inline-block',
            background: orange, color: '#fff',
            padding: '4px 28px', transform: 'rotate(-2deg)',
            boxShadow: `0 12px 40px ${orange}55`
          }}>{CONTACT.titleAccent}</span>
        </h2>

        <p style={{
          maxWidth: 720, fontSize: 19, fontWeight: 300,
          lineHeight: 1.7, color: c.muted, marginBottom: 72
        }}>{CONTACT.intro}</p>

        {submitted ? (
          <PFThanks fonts={f} c={c} orange={orange} />
        ) : (
          <form onSubmit={submit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)',
              gap: mob ? 20 : 28, marginBottom: 32
            }}>
              {/* col 1: name + phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: mob ? 20 : 24 }}>
                <PFInput field={CONTACT.fields[0]} fonts={f} c={c} orange={orange} />
                <PFInput field={CONTACT.fields[1]} fonts={f} c={c} orange={orange} />
              </div>
              {/* col 2: business + email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: mob ? 20 : 24 }}>
                <PFInput field={CONTACT.fields[2]} fonts={f} c={c} orange={orange} />
                <PFInput field={CONTACT.fields[3]} fonts={f} c={c} orange={orange} />
              </div>
              {/* col 3: textarea */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{
                  fontFamily: f.body, fontSize: 15, fontWeight: 600,
                  color: c.text, opacity: 0.9, marginBottom: 10,
                }}>ספרו לי על העסק שלכם</label>
                <textarea
                  required
                  dir="rtl"
                  placeholder="מה אתם מחפשים? מה הסיפור שלכם?"
                  style={{
                    flex: 1, minHeight: 200, padding: '20px 22px',
                    borderRadius: 16, border: `1.5px solid ${c.border}`,
                    background: c.soft, color: c.text,
                    fontFamily: f.body, fontWeight: 400, fontSize: 17,
                    lineHeight: 1.6,
                    outline: 'none', resize: 'none',
                    textAlign: 'right',
                    transition: 'border-color .2s ease, box-shadow .2s ease',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = orange; e.target.style.boxShadow = `0 0 0 4px ${orange}22`; }}
                  onBlur={(e) => { e.target.style.borderColor = c.border; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            {/* CTA — solid orange, white bold large */}
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '26px 24px',
              borderRadius: 16, border: 'none',
              background: orange,
              color: '#FFFFFF',
              fontFamily: f.display, fontWeight: 800,
              fontSize: 22, letterSpacing: '-0.005em',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'transform .15s ease, box-shadow .25s ease, background .2s ease',
              boxShadow: `0 16px 50px ${orange}55, 0 4px 12px ${orange}33`,
            }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)', e.currentTarget.style.boxShadow = `0 20px 60px ${orange}77, 0 4px 12px ${orange}33`)}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)', e.currentTarget.style.boxShadow = `0 16px 50px ${orange}55, 0 4px 12px ${orange}33`)}
            >{loading ? 'שולח…' : CONTACT.cta}</button>
          </form>
        )}

        {/* footer — centered */}
        <div style={{
          marginTop: 72, paddingTop: 32, borderTop: `1px solid ${c.border}`,
          textAlign: 'center'
        }}>
          <div style={{
            fontFamily: f.mono, fontSize: 11, letterSpacing: '0.3em',
            color: c.muted, textTransform: 'uppercase'
          }}>© 2026 MICHAEL · CONTENT CREATOR</div>
        </div>
      </div>
    </section>
  );
}

function PFInput({ field, fonts, c, orange }) {
  return (
    <div>
      <label style={{
        display: 'block', fontFamily: fonts.body, fontSize: 15, fontWeight: 600,
        color: c.text, opacity: 0.9, marginBottom: 10
      }}>{field.label}</label>
      <input
        type={field.type}
        placeholder={field.placeholder}
        required
        dir="rtl"
        style={{
          width: '100%', padding: '20px 22px',
          borderRadius: 16, border: `1.5px solid ${c.border}`,
          background: c.soft, color: c.text,
          fontFamily: fonts.body, fontWeight: 400, fontSize: 17,
          outline: 'none', transition: 'border-color .2s ease, box-shadow .2s ease',
          textAlign: 'right'
        }}
        onFocus={(e) => { e.target.style.borderColor = orange; e.target.style.boxShadow = `0 0 0 4px ${orange}22`; }}
        onBlur={(e) => { e.target.style.borderColor = c.border; e.target.style.boxShadow = 'none'; }}
      />
    </div>
  );
}

function PFThanks({ fonts, c, orange }) {
  return (
    <div style={{
      padding: '72px 32px', textAlign: 'center',
      borderRadius: 20, border: `1px solid ${c.border}`, background: c.soft,
      animation: 'pfThanksIn .6s cubic-bezier(.22,1,.36,1)'
    }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>✨</div>
      <h3 style={{
        fontFamily: fonts.display, fontWeight: 800, fontSize: 36,
        letterSpacing: '-0.03em', margin: 0, marginBottom: 12
      }}>
        תודה רבה,{' '}
        <span style={{
          display: 'inline-block', background: orange, color: '#fff',
          padding: '2px 18px', transform: 'rotate(-2deg)',
        }}>קיבלתי!</span>
      </h3>
      <p style={{
        fontFamily: fonts.body, fontWeight: 300, fontSize: 17,
        color: c.muted, margin: 0
      }}>אני אחזור אליכם בהקדם עם רעיונות שיגרמו לכם לחייך 🧡</p>
      <style>{`
        @keyframes pfThanksIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { PFContact, PFInput, PFThanks });
