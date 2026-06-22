# Font System Reference

## Architecture

```
theme.js → tokens: { fontBrand, fontSecondary, ... }
    ↓
ThemeContext → injects as CSS vars on :root
    ↓
:root { --font-brand, --font-secondary, --font-thai, --font-decorative, --font-script }
    ↓
body { font-family: var(--font-brand) }     ← everything inherits brand font
.font-secondary { font-family: var(--font-secondary) }  ← opt-in for body text
.font-thai { font-family: var(--font-thai) }             ← opt-in for Thai text
```

- Fonts are defined as **tokens** in each theme's `theme.js` → `tokens: { fontBrand, fontSecondary, ... }`
- `ThemeContext` injects these as CSS custom properties: `--font-brand`, `--font-secondary`, etc.
- Global CSS provides utility classes: `.font-brand`, `.font-secondary`, `.font-thai`, `.font-decorative`, `.font-script`
- `body` defaults to `var(--font-brand)` — most text inherits this automatically
- `.input-field` defaults to `var(--font-secondary)` — form inputs use the readable font

## Font Roles

| CSS Variable        | CSS Class         | Purpose                              | When to Use                                |
|---------------------|-------------------|--------------------------------------|--------------------------------------------|
| `--font-brand`      | `.font-brand`     | Primary brand typeface               | Headings, CTAs, hero text, product names   |
| `--font-secondary`  | `.font-secondary` | Supporting typeface                  | Body text, descriptions, form labels       |
| `--font-thai`       | `.font-thai`      | Thai-language text                   | Any Thai copy (labels, descriptions)       |
| `--font-decorative` | `.font-decorative`| Elegant/editorial accents            | Quotes, editorial sections, callouts       |
| `--font-script`     | `.font-script`    | Handwritten/script                   | Signatures, special highlights             |

## Per-Brand Font Mapping

| Role        | Urformance        | Kutee Club        | MU Jersey                            |
|-------------|-------------------|-------------------|--------------------------------------|
| brand       | Catalogue         | Catalogue         | Satoshi + LINE Seed Sans TH fallback |
| secondary   | Manrope           | Manrope           | Satoshi                              |
| thai        | Akiv Grotesk Thai | Akiv Grotesk Thai | LINE Seed Sans TH                    |
| decorative  | Apple Garamond    | Apple Garamond    | Satoshi                              |
| script      | Brush Script MT   | Brush Script MT   | Satoshi                              |

## Usage

### In Tailwind-style components (JSX className)

```jsx
{/* Headings — brand font (inherited from body, no class needed) */}
<h1 className="text-3xl font-black italic uppercase">URFORMANCE</h1>

{/* Body text — secondary font for readability */}
<p className="font-secondary text-muted">Premium performance wear designed for athletes...</p>

{/* Thai labels — thai font */}
<label className="font-thai">ชื่อ-นามสกุล *</label>

{/* Decorative accent */}
<blockquote className="font-decorative italic">Designed for movement</blockquote>
```

### In landing page components (inline style)

```jsx
{/* Body text in inline-style components */}
<p style={{
  fontSize: '1rem',
  fontWeight: 600,
  fontFamily: 'var(--font-secondary)',
  color: 'var(--color-muted)',
}}>
  Built for athletes who refuse to compromise.
</p>
```

### Form inputs

Form inputs automatically use `--font-secondary` via the `.input-field` CSS class.
No additional className is needed.

## Font Loading

| Font               | Loaded Via                 | Brands Using It        |
|--------------------|----------------------------|------------------------|
| Catalogue          | `index.css` @font-face     | Urformance, Kutee Club |
| Manrope            | Google Fonts (index.html)  | Urformance, Kutee Club |
| Aktiv Grotesk Thai | `index.css` @font-face     | Urformance, Kutee Club |
| Satoshi            | Fontshare (index.html)     | MU Jersey              |
| LINE Seed Sans TH  | `index.css` @font-face CDN | MU Jersey              |
| Apple Garamond     | System font                | Urformance, Kutee Club |
| Brush Script MT    | System font                | Urformance, Kutee Club |

## Adding a New Brand

1. Create `themes/your-brand/theme.js`
2. Define all 5 font tokens in `tokens: {}`:
   ```js
   tokens: {
     fontBrand: "'Your Display Font'",
     fontSecondary: "'Your Body Font'",
     fontThai: "'Your Thai Font'",
     fontDecorative: "'Your Accent Font'",
     fontScript: "'Your Script Font'",
     // ... other tokens
   }
   ```
3. Load fonts via `@font-face` in `index.css` or CDN link in `index.html`
4. Register the theme in `themes/index.js`
