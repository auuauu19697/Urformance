import { Section, Eyebrow } from './shared'

export default function Vision({ landing }) {
  return (
    <Section>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '4rem', alignItems: 'start' }}>
        {/* Left — big statement */}
        <div>
          <Eyebrow>Our Vision</Eyebrow>
          <h2 style={{
            fontWeight: 900, fontStyle: 'italic',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            textTransform: 'uppercase',
            letterSpacing: '-0.04em', lineHeight: 1,
            marginBottom: '1.5rem',
          }}>
            {(landing?.vision?.heading || "Form Follows\nFunction").split('\n').map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < (landing?.vision?.heading || "Form Follows\nFunction").split('\n').length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p style={{
            fontSize: '1rem', fontWeight: 600, lineHeight: 1.7,
            color: 'var(--color-muted)', maxWidth: '40ch',
          }}>
            {landing?.vision?.body || "We started URFORMANCE because we couldn't find performance wear that actually performed — without sacrificing how it looked. So we built it ourselves."}
          </p>
        </div>

        {/* Right — three pillars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {(landing?.vision?.pillars || [
            { num: '01', title: 'Built for Movement', body: 'Four-way stretch, moisture-wicking fabric engineered for full range of motion. No restrictions, no excuses.' },
            { num: '02', title: 'Minimal by Design', body: 'No logos, no noise. Clean lines that work as hard in the gym as they do on the street.' },
            { num: '03', title: 'Intentional Drops', body: 'We don\'t mass-produce. Each collection is limited, considered, and crafted to last beyond the season.' },
          ]).map(({ num, title, body }) => (
            <div key={num} style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.75rem', paddingBottom: '1.75rem' }}>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                <span style={{
                  fontWeight: 900, fontStyle: 'italic',
                  fontSize: '0.65rem', letterSpacing: '0.15em',
                  color: 'var(--color-muted)', paddingTop: '0.2rem',
                  flexShrink: 0,
                }}>
                  {num}
                </span>
                <div>
                  <p style={{ fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                    {title}
                  </p>
                  <p style={{ fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.65, color: 'var(--color-muted)' }}>
                    {body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
