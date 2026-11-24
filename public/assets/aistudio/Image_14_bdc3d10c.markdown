---
name: Seraphic Luxe Portfolio
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3dae9'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff3ff'
  surface-container: '#e7eefd'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce3f2'
  on-surface: '#151c27'
  on-surface-variant: '#42474f'
  inverse-surface: '#2a313c'
  inverse-on-surface: '#ebf1ff'
  outline: '#727780'
  outline-variant: '#c2c7d0'
  surface-tint: '#326192'
  primary: '#326192'
  on-primary: '#ffffff'
  primary-container: '#8db9f0'
  on-primary-container: '#144979'
  inverse-primary: '#a0caff'
  secondary: '#5d5d6b'
  on-secondary: '#ffffff'
  secondary-container: '#e2e1f1'
  on-secondary-container: '#636371'
  tertiary: '#83523f'
  on-tertiary: '#ffffff'
  tertiary-container: '#e5a890'
  on-tertiary-container: '#683c2a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d2e4ff'
  primary-fixed-dim: '#a0caff'
  on-primary-fixed: '#001c37'
  on-primary-fixed-variant: '#134979'
  secondary-fixed: '#e2e1f1'
  secondary-fixed-dim: '#c6c5d4'
  on-secondary-fixed: '#191b26'
  on-secondary-fixed-variant: '#454652'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#f7b8a0'
  on-tertiary-fixed: '#331204'
  on-tertiary-fixed-variant: '#673b2a'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce3f2'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 56px
    fontWeight: '600'
    lineHeight: 68px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 50px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 4rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.75rem
  space-xl: 3rem
---

## Brand & Style
This design system defines an ethereal, tailored, and elevated digital portfolio environment. Tailored for ambitious design, architecture, and technology scholars, the interface evokes quiet confidence, intellectual rigor, and tactile curation. The emotional core balances scholastic precision with haute-couture editorial grace.

The visual direction merges **Modern Editorial Minimalism** with **Atmospheric Glassmorphism**. Layouts breathe with deliberate white space, disciplined vertical alignment, delicate translucent planes, and soft chromatic glimmers. Every touchpoint feels bespoke, restrained, and intentional—avoiding flashy, noisy gimmicks in favor of museum-grade presentation and editorial typographic rhythm.

## Colors
The palette balances serene cool tones with warm editorial punctuation:

- **Primary (`#8DB9F0`)**: An airy, luminous Powder Blue utilized for interactive focal points, prominent button states, active indicator rings, and focused navigation accents.
- **Secondary (`#E9E8F8`)**: Soft Lavender White, serving as subtle tinted ambient canvases, subtle pill backdrops, and gradient floor fills that keep the light theme soft on the eyes.
- **Tertiary / Accent (`#F5B69E`)**: Warm Sunset Peach applied sparingly for honorary tags, featured project badges, notification pings, and moments requiring deliberate warmth.
- **Neutrals**:
  - `Surface Crisp`: `#FFFFFF` for pristine cards, elevated modals, and top-tier content blocks.
  - `Text Primary`: Deep Slate (`#1E2530`) providing authoritative contrast without the harshness of pure black.
  - `Text Muted / Body Secondary`: Refined Slate Gray (`#475467`) for secondary project metadata, timestamps, and subtitles.
  - `Subtle Border / Stroke`: Semi-transparent Slate tints (`rgba(30, 37, 48, 0.08)`) and frosted translucent borders (`rgba(255, 255, 255, 0.65)`).

## Typography
Typographic rhythm mirrors editorial publishing. Headings feature **Playfair Display**, bringing literary pedigree, delicate serifs, and high-end luxury to project titles, philosophy statements, and section intros. All functional copy, project descriptions, UI badges, and navigation items leverage **Plus Jakarta Sans** for crisp legibility and geometric poise.

Labels and metadata tags employ uppercase treatment with relaxed letter-spacing to create a curated, gallery-catalogue feel. Leading is intentionally spacious across body styles to maximize breathing room and reduce cognitive load.

## Layout & Spacing
The layout model employs a fluid 12-column grid bound to a maximum content width of 1360px, flanked by generous desktop margins (`4rem`) that condense to `1.25rem` on mobile viewports. Vertical section rhythm ranges between `space-xl` and double `space-xl` (4.5rem - 6rem), ensuring that featured works read as autonomous exhibition pieces rather than stacked web modules.

Mobile layouts reflow to a 4-column system, collapsing multi-column project teasers into stacked narrative panels while retaining asymmetric whitespace cues.

## Elevation & Depth
Depth in this design system avoids dense, opaque dropshadows. Instead, it relies on **tonal stratifications, backdrop diffusion, and ambient luminosity**:

1. **Base Tier**: `#E9E8F8` with delicate radial gradients of Powder Blue and Sunset Peach at 15% opacity to provide organic warmth.
2. **Surface Tier**: `#FFFFFF` with ultra-soft ambient occlusion: `box-shadow: 0 8px 32px -4px rgba(30, 37, 48, 0.04), 0 2px 8px -2px rgba(30, 37, 48, 0.02)`.
3. **Glassmorphic Floating Panels**: Semi-translucent white (`rgba(255, 255, 255, 0.72)`) paired with `backdrop-filter: blur(16px)` and a whisper-thin outline (`1px solid rgba(255, 255, 255, 0.8)`).
4. **Interactive Hover**: Elevation translates slightly on the Y-axis (-3px) accompanied by a subtle chromatic glow using Powder Blue: `box-shadow: 0 16px 36px -6px rgba(141, 185, 240, 0.22)`.

## Shapes
A roundedness tier of 2 provides tailored sophistication:
- Standard elements (interactive buttons, input fields, badge wrappers) feature `0.5rem` (8px) corners, keeping silhouettes structured.
- Container elements such as case study cards, modal drawers, and gallery viewports employ `rounded-lg` (`1rem` / 16px) or `rounded-xl` (`1.5rem` / 24px) to soften larger surface areas.
- Status badges and contextual tags leverage a full pill treatment for tactile distinctiveness against structured imagery.

## Components

### Buttons
- **Primary**: Background `#8DB9F0`, text `#1E2530`, `font-weight: 600`. Padding: `0.75rem 1.75rem`. Hover triggers a slight brightness lift with a gentle bloom (`box-shadow: 0 8px 24px -2px rgba(141, 185, 240, 0.35)`).
- **Secondary / Ghost**: Crisp white background or translucent backdrop (`rgba(255, 255, 255, 0.85)`), border `1px solid rgba(30, 37, 48, 0.1)`, text `#1E2530`. Hover adopts a soft secondary tint (`#E9E8F8`).
- **Tertiary / Editorial Link**: Playfair italicized anchor with an animated Powder Blue underline that expands on hover from left to right.

### Project & Case Study Cards
- **Base Style**: Pure white `#FFFFFF` surface containers framed by a fine hairline outline (`1px solid rgba(30, 37, 48, 0.06)`), corner radius `1rem`. Internal padding of `space-lg`.
- **Media Containers**: Subtle inset overflow-hidden boxes holding imagery, accompanied by subtle 1-second ease transitions on image scale (`scale(1.02)`) on parent hover.
- **Header Structure**: Category label in uppercase `label-sm`, title in `headline-md`, followed by an excerpt in `body-md` muted slate.

### Chips & Badges
- **Featured Accent Badge**: Warm Sunset Peach fill (`#F5B69E`) at 20% opacity with deep slate text (`#1E2530`) and an inset subtle border (`1px solid rgba(245, 182, 158, 0.4)`).
- **Category & Discipline Chips**: Pill-shaped containers (`rounded-full`), padding `0.35rem 0.85rem`, background `#FFFFFF`, text `#475467`, label style `label-sm`.

### Input Fields & Inquiry Form
- **Form Controls**: Crisp `#FFFFFF` fields, height 48px, rounded 8px (`roundedness: 2`), border `1px solid rgba(30, 37, 48, 0.12)`.
- **Focus State**: `border-color: #8DB9F0`, outer halo `0 0 0 3px rgba(141, 185, 240, 0.25)`. Text sits in Deep Slate `#1E2530`, placeholder in `#475467` at 60% opacity.

### Navigation Header
- **Floating Bar**: Fixed-position frosted bar (`rgba(255, 255, 255, 0.75)`, `backdrop-filter: blur(20px)`), margin-top `1rem`, border `1px solid rgba(255, 255, 255, 0.6)`. Houses candidate wordmark in Playfair Display alongside minimalistic navigation links.