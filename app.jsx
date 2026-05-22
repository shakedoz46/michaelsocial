// Main app: design canvas with 3 NYC directions as artboards + Tweaks panel.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "type": "DM Sans + Heebo",
  "density": "cinematic"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  return (
    <>
      <DesignCanvas>
        <DCSection id="nyc-3directions" title="NYC / datinglistnyc · 3 directions" subtitle="Same content, three bolder visual systems — Cinematic premium, Instagram-native, Tabloid playful.">
          <DCArtboard id="agency" label="A · The Agency" width={1280} height={2200} style={{ background: NYC_PRESETS.bg[t.theme].bg }}>
            <AgencyNYC theme={t.theme} type={t.type} density={t.density} />
          </DCArtboard>
          <DCArtboard id="feed" label="B · The Feed" width={1280} height={2300} style={{ background: NYC_PRESETS.bg[t.theme].bg }}>
            <FeedNYC theme={t.theme} type={t.type} density={t.density} />
          </DCArtboard>
          <DCArtboard id="street" label="C · The Street" width={1280} height={2400} style={{ background: NYC_PRESETS.bg[t.theme].bg }}>
            <StreetNYC theme={t.theme} type={t.type} density={t.density} />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Background mode" />
        <TweakRadio
          label="Theme"
          value={t.theme}
          options={['dark', 'light', 'cream']}
          onChange={(v) => setTweak('theme', v)}
        />

        <TweakSection label="Typography" />
        <TweakSelect
          label="Type pairing"
          value={t.type}
          options={['DM Sans + Heebo', 'Bricolage + Heebo', 'Instrument Serif + Heebo', 'Space Grotesk + Heebo']}
          onChange={(v) => setTweak('type', v)}
        />

        <TweakSection label="Density" />
        <TweakRadio
          label="Spacing"
          value={t.density}
          options={['cinematic', 'regular', 'compact']}
          onChange={(v) => setTweak('density', v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
