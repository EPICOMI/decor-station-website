Here's the finalized, code-ready typography spec for all five hero panels, now updated with Indian Type Foundry-designed fonts in place of the generic Western pairing.[^1][^2]

## Global Setup

```css
/* Font imports */
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Hind:wght@400;500;600&family=Poppins:wght@500;600&display=swap');

:root {
  --font-display: 'Rajdhani', sans-serif;
  --font-body: 'Hind', sans-serif;
  --font-cta: 'Poppins', sans-serif;
}
```

- Display font: **Rajdhani** (ITF, condensed, structured — replaces Playfair Display)[^2]
- Body font: **Hind** (ITF, Devanagari-Latin readability — replaces Manrope/Sora)[^3]
- CTA font: **Poppins** (widely used across Indian D2C brands, crisp for buttons)[^4][^2]
- Base unit: rem with clamp() for responsive scaling[^5]
- Panel spacing: 32px-48px desktop, 24px mobile
- Line length: 45-75 characters per line[^6][^7]
- Scroll animation: fade-up (opacity 0→1, translateY 24px→0), 0.6s ease-out, triggered on scroll-into-view


## Panel 1 — Brand Statement

"Where heritage craftsmanship meets everyday elegance."

```css
.panel-1 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(2.5rem, 6vw, 4rem); /* 40px mobile / 64px desktop */
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #1A1A1A;
  max-width: 600px;
}
.panel-1 .accent {
  color: var(--brand-primary);
  font-style: italic;
}
```

- Apply `.accent` class to "heritage" or "elegance"
- Animation: fade + scale-in (0.95→1), 0.8s ease-out


## Panel 2 — Category Signal

"German silver. Brass. Wood. Curated in timeless forms for the modern home."

```css
.panel-2 {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: clamp(1.375rem, 3vw, 2rem); /* 22px mobile / 32px desktop */
  line-height: 1.3;
  color: #4A4A4A;
}
.panel-2 .material {
  font-weight: 700;
  color: var(--brand-accent);
}
.panel-2 .divider {
  margin: 0 8px;
  color: #B0B0B0;
}
```

- Wrap "German silver," "Brass," "Wood" in `.material` spans

```
- Replace periods between materials with `<span class="divider">·</span>`
```

- Animation: staggered fade-in per word group, 0.1s delay increments


## Panel 3 — Occasion Hook

"From festive rituals to wedding favours — thoughtfully made for every celebration."

```css
.panel-3 {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: clamp(1.125rem, 2.5vw, 1.75rem); /* 18px mobile / 28px desktop */
  line-height: 1.4;
  color: #4A4A4A;
}
.panel-3 .highlight {
  font-weight: 600;
  color: var(--brand-secondary);
}
.panel-3 .rule {
  display: inline-block;
  width: 24px;
  height: 1px;
  background: #B0B0B0;
  margin: 0 8px;
  vertical-align: middle;
}
```

- Apply `.highlight` to "festive rituals" and "wedding favours"

```
- Replace the em-dash with `<span class="rule"></span>` before "thoughtfully made"
```

- Animation: fade + translateX(-16px→0), 0.6s


## Panel 4 — Value Proposition

"Beautifully designed gifting, without the guesswork — budget-friendly to statement pieces."

```css
.panel-4 {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: clamp(1rem, 2vw, 1.5rem); /* 16px mobile / 24px desktop */
  line-height: 1.5;
  color: #5C5C5C;
}
```

- Manually insert a `<br>` after "guesswork" for controlled line break instead of relying on wrap
- Animation: simple fade-in only, no motion, 0.5s


## Panel 5 — Call to Action

"Explore the collection. Custom and bulk orders welcome."

```css
.panel-5 {
  font-family: var(--font-cta);
  display: inline-block;
  padding: 14px 32px;
  border-radius: 6px;
  background: var(--brand-primary);
  color: #FFFFFF;
  font-weight: 600;
  font-size: clamp(1rem, 1.5vw, 1.125rem); /* 16px mobile / 18px desktop */
  line-height: 1.2;
  text-align: center;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.panel-5 .cta-main {
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.panel-5:hover {
  transform: scale(1.05);
}
```

- Wrap "Explore the collection" in `.cta-main`, keep "Custom and bulk orders welcome" as normal case, smaller sub-line below the button
- Animation: scale-in (0.9→1) with bounce easing on load, 0.4s


## Implementation Notes for the Coding LLM

- Use CSS `clamp()` throughout for automatic mobile scaling instead of separate media queries.[^5]
- Keep only 4 distinct font-size scale steps across all panels to preserve hierarchy.[^8]

```
- Panel 5 must render as an actual interactive `<button>` or `<a>` element, not plain text.
```

- If Rajdhani or Hind fail to load, fallback stack should be `sans-serif` (not serif), since both are structurally sans-serif fonts.

<div align="center">⁂</div>

[^1]: CONTEXT.md

[^2]: https://www.1001fonts.com/devanagari+google-web+regular-fonts.html

[^3]: https://fonts.google.com/specimen/Hind

[^4]: https://www.vistaprint.com/hub/font-trends

[^5]: https://fontsarena.com/blog/font-size-guidelines-for-responsive-websites/

[^6]: https://designsystem.digital.gov/components/typography/

[^7]: https://pimpmytype.com/line-length-line-height/

[^8]: https://learnui.design/blog/mobile-desktop-website-font-size-guidelines.html

