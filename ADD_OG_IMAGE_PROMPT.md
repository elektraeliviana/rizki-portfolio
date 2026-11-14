# TASK: Add Open Graph Preview Image (Branded Banner) & Meta Tags to Rizky's Portfolio

You are an expert Web Developer. 

## The Problem
When `https://rizki-portfolio-seven.vercel.app/` is shared on Discord, WhatsApp, Twitter/X, Telegram, or LinkedIn, it only shows text with a blank space and **NO IMAGE** (unlike Wikipedia, which displays an image).

## The Goal
Keep the current website design, layout, typography, and content **100% intact**. Your objective is solely to:
1. Generate / add a high-resolution **Branded Banner Graphic** (1200×630px) that matches Rizky's ink-wash and typographic aesthetic.
2. Add the proper **Open Graph & Twitter Card meta tags** to `<head>` in `index.html` so that whenever the link is pasted anywhere, it unfurls with the rich image banner.

---

## 1. THE RECOMMENDATION (Why Large Summary Card is Best)
For a high-stakes portfolio (Systems Narrative Architect), the standard across modern creative and tech portfolios is:
```html
<meta name="twitter:card" content="summary_large_image">
```
- **Why:** On Discord, LinkedIn, X, and WhatsApp, a `summary_large_image` renders a cinematic 1200×630 banner above the title and description. It looks significantly more authoritative and intentional than a tiny icon on the side.

---

## 2. STEP-BY-STEP IMPLEMENTATION

### Step A: Create the Branded Banner Graphic (`assets/og-image.png` or `assets/og-image.svg`)
Place an image in `assets/og-image.png` (Dimensions: 1200×630 px).

**Visual Design of the Banner:**
- **Background:** Ink-wash charcoal / deep paper texture (`#121316` or dark slate) with subtle geometric grid lines (`opacity: 0.15`).
- **Typography:**
  - Eyebrow: `SYSTEMS NARRATIVE ARCHITECT · RESEARCH & STRATEGY` in JetBrains Mono (`#8E8E98`).
  - Main Headline: `RIZKY MAULANA` in bold high-contrast grotesque type (`#F7F6F1`).
  - Subtext: *"Bridging epistemic rigor, sociological depth, and behavioral systems to architect unassailable brand narratives."*
  - Badge / Status tag: `[SYS.ARCH] · Open for high-stakes narrative sprints`.

*(Optional SVG Fallback Generator):* If the agent does not have an external image editor, it can create an SVG or a quick HTML/Canvas script to render a crisp 1200×630 PNG into `assets/og-image.png`.

---

### Step B: Add the Meta Tags to `<head>` in `index.html`
Insert the following tags inside `<head>` in `index.html`, right below the `<title>` tag:

```html
<!-- Primary Meta Tags -->
<title>Rizky Maulana — Systems Narrative Architect</title>
<meta name="title" content="Rizky Maulana — Systems Narrative Architect">
<meta name="description" content="Rizky Maulana is a Systems Narrative Architect: strategic copywriting built on epistemic rigor, sociological context, steelmanning dialectics and generational behavior.">

<!-- Open Graph / Facebook / Discord / WhatsApp -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://rizki-portfolio-seven.vercel.app/">
<meta property="og:title" content="Rizky Maulana — Systems Narrative Architect">
<meta property="og:description" content="Strategic copywriting built on epistemic rigor, sociological context, steelmanning dialectics and generational behavior.">
<meta property="og:image" content="https://rizki-portfolio-seven.vercel.app/assets/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Rizky Maulana — Systems Narrative Architect">

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://rizki-portfolio-seven.vercel.app/">
<meta name="twitter:title" content="Rizky Maulana — Systems Narrative Architect">
<meta name="twitter:description" content="Strategic copywriting built on epistemic rigor, sociological context, steelmanning dialectics and generational behavior.">
<meta name="twitter:image" content="https://rizki-portfolio-seven.vercel.app/assets/og-image.png">

<!-- Theme Color for Browser & Mobile Tabs -->
<meta name="theme-color" content="#121316">
```

---

## 3. VERIFICATION
1. Verify that `assets/og-image.png` is uploaded and accessible directly via browser at `https://<deployed-url>/assets/og-image.png`.
2. Ensure the URL used in `og:image` is an **absolute URL** (`https://...`), because chat apps like Discord and WhatsApp will not load relative paths (`assets/...`).
3. Test using the Discord link share or [OpenGraph.xyz](https://www.opengraph.xyz/) to confirm the image displays properly.
