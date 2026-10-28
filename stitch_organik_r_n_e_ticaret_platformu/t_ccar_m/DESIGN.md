---
name: Tüccarım
colors:
  surface: '#fbf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#fbf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f0'
  surface-container: '#efeeeb'
  surface-container-high: '#eae8e5'
  surface-container-highest: '#e4e2df'
  on-surface: '#1b1c1a'
  on-surface-variant: '#4e4540'
  inverse-surface: '#30312f'
  inverse-on-surface: '#f2f0ed'
  outline: '#80756f'
  outline-variant: '#d1c4bd'
  surface-tint: '#695c54'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#231a13'
  on-primary-container: '#908178'
  inverse-primary: '#d5c3b9'
  secondary: '#855232'
  on-secondary: '#ffffff'
  secondary-container: '#fdbb93'
  on-secondary-container: '#794829'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0e1f13'
  on-tertiary-container: '#758978'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f1dfd5'
  primary-fixed-dim: '#d5c3b9'
  on-primary-fixed: '#231a13'
  on-primary-fixed-variant: '#50443d'
  secondary-fixed: '#ffdbc8'
  secondary-fixed-dim: '#fab890'
  on-secondary-fixed: '#321300'
  on-secondary-fixed-variant: '#693b1d'
  tertiary-fixed: '#d3e8d5'
  tertiary-fixed-dim: '#b7ccb9'
  on-tertiary-fixed: '#0e1f13'
  on-tertiary-fixed-variant: '#394b3d'
  background: '#fbf9f6'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2df'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.5rem
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.035em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: '1.15'
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.75rem
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.7'
    letterSpacing: '0'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.9375rem
    fontWeight: '400'
    lineHeight: '1.65'
    letterSpacing: '0'
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: '1.55'
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.8125rem
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.03em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-desktop: 2.5rem
  margin: 1.25rem
  margin-tablet: 2.5rem
  margin-desktop: 4rem
  space-xs: 0.375rem
  space-sm: 0.75rem
  space-md: 1.25rem
  space-lg: 2rem
  space-xl: 3.5rem
---

## Brand & Style

This design system is anchored in quiet luxury agronomy—a minimalist, warm editorial aesthetic that treats artisanal agriculture with the reverence of high-end curation. The emotional register is grounded, authentic, and deliberate: human-crafted warmth without rustic clutter, and modern precision without cold corporate sterility.

The visual ethos blends **Warm Editorial Minimalism** with **Tactile Precision**:
- **Canvas over Container:** Generous alabaster breathing room prioritizes product origin, batch numbers, and sensory tasting notes.
- **Micro-Architectural Lines:** Division relies on whispering hairlines rather than heavy fills or aggressive drop shadows.
- **Restraint Over Noise:** Zero decorative drop badges, zero synthetic neon accents, and zero high-gloss gradients. Every interface node communicates provenance, harvest date, and craftsmanship.

## Colors

The palette draws entirely from natural harvest tones: deeply roasted shells, cold-pressed oils, fertile soil, and sun-dried linen.

- **Primary (`#1f1610` - Roasted Umber):** The commanding dark tone. Used for display typography, primary buttons, essential microcopy, and dominant structural elements. Never pure black.
- **Secondary (`#9c6644` - Hazelnut Ochre):** The foundational craft accent. Used for interactive states, price accents, batch markers, and editorial highlights. Alternate tint `#b07d62` serves as hover or muted support.
- **Tertiary (`#4a5d4e` - Olive Canopy):** An organic botanical tone. Dedicated to certifications, harvest freshness indicators, live inventory status, and estate verification markers.
- **Neutral Canvas (`#faf8f5` - Warm Alabaster):** The main background surface, complemented by `#f3efe9` (Pebble Stone) for secondary surface containers, inset panels, and table row zebra striping.
- **Structural Border (`#e6e1da` - Raw Thread):** A 1px boundary token applied across all dividers, table lines, input frames, and card containers.

## Typography

Typography balances Scandinavian clarity with warm Mediterranean craftsmanship through **Plus Jakarta Sans**. 

- **Display & Headlines:** Set with tight tracking (`-0.035em` to `-0.015em`) and medium/semibold weight for a sharp, refined editorial presentation.
- **Body Text:** Uses relaxed line heights (`1.65` to `1.7`) on warm alabaster backgrounds to ensure comfortable reading of harvest narratives, agricultural certifications, and cold-press extraction logs.
- **Micro-Labels & Technical Annotations:** Rendered in `label-sm` with upper tracking (`+0.08em`) to mimic botanical archive tags and luxury apothecary labels without feeling loud.

## Layout & Spacing

The layout is structured around an editorial grid with ample negative space:

- **Desktop (1200px+):** 12-column grid, `4rem` outer canvas margins, `2.5rem` gutters. Product showcases, merchant dossiers, and ledger tables maintain disciplined alignment along vertical guide rules.
- **Tablet (768px - 1199px):** 8-column grid, `2.5rem` margins, `1.5rem` gutters. Inset split screens smoothly fold into balanced stacked panels.
- **Mobile (< 768px):** 4-column grid, `1.25rem` outer canvas margins, `1rem` gutters. Sticky utility bars tuck quietly to the lower viewport with zero intrusive floating sheets.
- **Pacing Rule:** Component spacing uses generous vertical margins (`space-xl`) between narrative sections, balanced with condensed micro-padding (`space-xs`, `space-sm`) inside interactive pills and table cells.

## Elevation & Depth

Visual hierarchy uses physical, quiet layer depth rather than heavy drop shadows:

- **Surface Tiers:**
  - *Base Layer (`#faf8f5`):* General canvas background.
  - *Secondary Layer (`#f3efe9`):* Merchant cards, summary sidebars, and batch detail callouts.
  - *Floating Layer (`#ffffff`):* High-focus active cards, flyout shopping sheets, and checkout modules.
- **Low-Contrast Micro-Hairlines:** All containers and segmented modules use `1px solid #e6e1da` as their primary boundary definition.
- **Ambient Shadow System:**
  - *Subtle Resting Elevation:* `0 2px 8px -2px rgba(31, 22, 16, 0.04)`
  - *Active Hover Elevation:* `0 8px 24px -4px rgba(31, 22, 16, 0.07)`
  - Shadows are tinted using Roasted Umber (`rgba(31, 22, 16)`), preserving a warm, organic glow that avoids clinical slate cast.

## Shapes

The design uses **Soft (`1`)** geometry:
- Standard buttons, input frames, badges, and card boundaries use `0.25rem` (4px).
- Modals, large image wrappers, and merchant summary sheets use `rounded-lg` (`0.5rem` / 8px).
- Capsule elements (e.g., origin status badges, harvest indicators) use full pill radiuses only when encapsulating singular status tokens.
- This subtle radius mirrors hand-pressed letterpress paper and cleanly finished wood crates.

## Components

### Buttons
- **Primary:** Background `#1f1610`, text `#faf8f5`, 1px border `#1f1610`, radius `0.25rem`. Padding: `0.75rem 1.5rem`. On hover, shifts to `#9c6644` with a smooth `200ms ease-out` transition.
- **Secondary / Outline:** Background `transparent`, text `#1f1610`, 1px border `#e6e1da`, radius `0.25rem`. On hover, background shifts to `#f3efe9`.
- **Tertiary Minimal:** Pure text button in `#9c6644`, subtle underline offset `4px`, zero background.

### Chips & Provenance Tags
- **Organic & Batch Badges:** Background `rgba(74, 93, 78, 0.08)`, border `1px solid rgba(74, 93, 78, 0.25)`, text `#4a5d4e`, uppercase tracking, font size `label-sm`.
- **Harvest Vintage Tag:** Background `rgba(156, 102, 68, 0.08)`, border `1px solid rgba(156, 102, 68, 0.25)`, text `#9c6644`.

### Input Fields & Controls
- **Text Inputs:** Background `#faf8f5`, border `1px solid #e6e1da`, text `#1f1610`, radius `0.25rem`, padding `0.75rem 1rem`. Focus state: border `#1f1610`, outline none, zero loud blue/purple rings.
- **Checkboxes & Radios:** 16px square/circle, border `1.5px solid #9c6644`, fill `#faf8f5`. Checked state: background `#1f1610` with `#faf8f5` micro-mark.

### Cards & Product Listings
- **Artisan Product Card:** Pure alabaster background, `1px solid #e6e1da` outline, flush photography container with `#f3efe9` placeholder background. Meta content padded with `space-md`. No heavy elevation; image zooms `1.02x` subtly within overflow bounds on hover.

### Data Tables & Merchant Ledgers
- Clean horizontal gridlines (`1px solid #e6e1da`), zero vertical column borders. Table header: `label-sm` uppercase, text `#9c6644`. Row padding: `1rem 0.5rem`. Zebra alternating striping using `#faf8f5` and `#f3efe9`.

### Quiet Navigation Bar
- Frosted minimal bar (`#faf8f5` with 90% opacity and 12px blur), bordered bottom with `1px solid #e6e1da`. Subtle merchant switcher and basket count indicated with fine monospace numerical counter.