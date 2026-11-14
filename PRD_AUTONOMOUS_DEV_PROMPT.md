# SYSTEM ARCHITECTURE & AUTONOMOUS DEVELOPMENT PROMPT
## Project: Rizky — Strategic Copywriter & Growth Systems Thinker Portfolio
**Target Persona:** International Enterprise Clients, VC-backed Startups, Global Creative Directors.  
**Tech Stack Baseline:** Modern Semantic HTML5 + Modular CSS3 (Custom Design System) + Vanilla ES6+ JavaScript (`data.js` Decoupled Data Engine). Zero build tools, zero dependencies, instantaneous load time, production-ready for Vercel/Netlify/GitHub Pages.

---

### PROMPT INSTRUCTIONS FOR THE CODING AGENT
Copy and run the prompt below in an autonomous coding session. It will construct the entire repository structure, data engine, responsive layouts, interactive components, and visual polish.

```markdown
# TASK: Build the Production-Ready Portfolio for "Rizky — Strategic Copywriter & Growth Systems Thinker"

## 1. PROJECT DIRECTORY TREE
You must construct the complete project with the following exact directory structure:
```
rizki-portfolio/
├── index.html
├── css/
│   ├── variables.css      /* Swiss Editorial Design Tokens, Colors, Typography */
│   ├── base.css           /* Resets, Grid System, Typography Defaults */
│   ├── components.css     /* Cards, Modals, Buttons, Sliders, Badges */
│   ├── sections.css       /* Hero, Horizons, Deep-Dive, Arsenal, Brief Modal */
│   └── cursor.css         /* Fluid Inverted Custom Cursor & Magnetic Hover FX */
├── js/
│   ├── data.js            /* Centralized Decoupled Content Engine (Single Source of Truth) */
│   ├── cursor.js          /* Custom Cursor with mix-blend-mode difference & lerp physics */
│   ├── modal.js           /* Deep Synthesis Modal Engine with Before/After Inspector */
│   ├── brief.js           /* Interactive 3-Step Strategic Brief Modal */
│   └── app.js             /* Main Controller, Smooth Scroll, Filter Logic, Math Rendering */
└── assets/
    ├── og/
    │   └── og-main.png    /* 1200x630 Social Unfurl Card placeholder/SVG generator */
    └── icons/             /* Clean inline SVGs for system indicators, arrows, badges */
```

---

## 2. DESIGN SYSTEM & TOKENS (`css/variables.css`)
Implement the **High-Contrast Swiss Editorial** visual language:
- **Palette Tokens:**
  - `--bg-primary`: `#08080A` (Deep Obsidian / Blackout)
  - `--bg-secondary`: `#111115` (Elevated Panel Surface)
  - `--bg-tertiary`: `#18181D` (Interactive Card Surfaces)
  - `--text-primary`: `#F4F4F6` (Optic Pure Off-White)
  - `--text-secondary`: `#8E8E98` (Muted Technical Gray)
  - `--text-tertiary`: `#52525A` (Subtle Grid / System Annotation)
  - `--accent`: `#CCFF00` (Electric Acid Lime — High-Voltage Conversion Accent)
  - `--accent-hover`: `#E2FF4D`
  - `--border-subtle`: `rgba(255, 255, 255, 0.08)`
  - `--border-focus`: `rgba(204, 255, 0, 0.4)`
  - `--status-danger`: `#FF4D4D` (Legacy / Before Copy Tone)
  - `--status-success`: `#CCFF00` (Strategic Overhaul Tone)
- **Typography Tokens:**
  - Display / Headlines: `'Space Grotesk', -apple-system, sans-serif` (Bold, tight tracking `-0.03em`)
  - Body / Narrative: `'Inter', sans-serif` (Hyper-legible, line-height `1.65`)
  - Technical / Formulas / Badges: `'JetBrains Mono', monospace` (Tabular figures, uppercase metadata)
- **Grid & Spacing:**
  - Max container width: `1320px` with fluid 12-column Swiss editorial grid lines
  - Subtle vertical background grid rules (`repeating-linear-gradient` with `1px` subtle lines)

---

## 3. OPEN GRAPH & SOCIAL PREVIEW ENGINE (`index.html`)
Implement complete SEO and social graph metadata in the `<head>`:
- Dynamic Open Graph & Twitter Cards:
  - `<meta property="og:title" content="Rizky — Strategic Copywriter & Growth Systems Thinker">`
  - `<meta property="og:description" content="Engineering high-velocity narrative architecture, conversion economics, and multi-layered positioning for international enterprise systems.">`
  - `<meta property="og:image" content="assets/og/og-main.png">`
  - `<meta property="og:image:width" content="1200">`
  - `<meta property="og:image:height" content="630">`
  - `<meta name="twitter:card" content="summary_large_image">`
  - Include an inline SVG/Canvas fallback generator in `app.js` to dynamically generate a crisp 1200x630 preview image if `og-main.png` is queried.

---

## 4. CONTENT ENGINE SPECIFICATION (`js/data.js`)
All content must live in `js/data.js` as an exportable object `const PORTFOLIO_DATA = { ... }`.
Include rich, realistic, high-level mock data across 4 core collections:

1. **`meta`**: Name, Title, Value Prop, Status (`"Available for Q1 Strategic Sprints"`), Location (`"Remote / Global UTC"`).
2. **`horizons` (Strategic Thought Leadership & Mental Models):**
   - 3 deep-thinking essays on copy systems, e.g.:
     - *"The Fallacy of Vague Differentiation: Why 90% of B2B Messaging Fails the Specificity Test"*
     - *"Copy as Cognitive Interface: Applying System Dynamics to Conversion Architecture"*
     - *"The Generative Moat: Brand Voice Engineering in the Era of Infinite AI Noise"*
   - Include: `id`, `tag`, `readTime`, `title`, `abstract`, `formula` (KaTeX-ready string), `fullText`.
3. **`deepDives` (Multi-layered System Case Studies):**
   - 3 in-depth case studies following the **Deep Synthesis Framework**:
     - **Case 1: Enterprise AI Data Platform** (Positioning overhaul & enterprise narrative $\to$ +$1.2M pipeline).
     - **Case 2: FinTech Infrastructure API** (Simplifying complex multi-party settlement copy $\to$ +42% developer signups).
     - **Case 3: High-Growth B2B SaaS** (Homepage teardown & value-anchor engineering $\to$ +34% trial-to-paid CVR).
   - Structure per case study:
     ```javascript
     {
       id: "saas-pipeline-rebrand",
       client: "Nexus Engine (San Francisco)",
       sector: "Enterprise AI Infrastructure",
       timeline: "6-Week Sprint",
       headline: "Translating Complex Graph Computing into an Irresistible Category King Narrative",
       summary: "From generic 'unified data intelligence' buzzwords to quantifiable business infrastructure.",
       impact: [
         { label: "ACV Expansion", value: "+$42,000" },
         { label: "Pipeline Velocity", value: "3.2x Faster" },
         { label: "Demo Conversion", value: "+38.4%" }
       ],
       formula: "\\Delta \\text{Enterprise Value} = \\left( \\frac{\\text{Urgent Tension} \\times \\text{Specific Moat}}{\\text{Cognitive Friction}} \\right) \\times \\text{ACV}",
       synthesis: {
         context: "...",
         diagnosis: "...",
         executionMatrix: [
           { layer: "Brand Narrative", tacticalMove: "Anchored to operational cost of inaction" },
           { layer: "Landing Page Architecture", tacticalMove: "Progressive disclosure flow for CTOs" }
         ],
         beforeAfter: {
           legacy: {
             headline: "The Next-Generation Platform for All Your Enterprise Data Needs",
             body: "We empower enterprise teams to leverage synergy across multi-cloud environments seamlessly with AI-driven analytics.",
             critique: "Zero concrete value, bloated corporate buzzwords, high cognitive friction."
           },
           overhaul: {
             headline: "Eliminate $180k in Unused Data Warehouse Queries Every Single Month.",
             body: "One continuous indexing engine that intercepts duplicate pipelines before they execute. Installed in 14 minutes.",
             breakdown: "Direct quantified anchor, urgent pain point, eliminates vendor fatigue, friction-free implementation claim."
           }
         },
         retrospective: "..."
       }
     }
     ```
4. **`arsenal` (Core Competencies & Strategic Capabilities):**
   - 4 systematic capabilities:
     - `Category Positioning & Narrative Moats`
     - `High-Velocity Landing Page Architecture`
     - `B2B Funnel Economics & Messaging Teardowns`
     - `Human-in-the-Loop AI Voice Standardization`

---

## 5. COMPONENT & UX SPECIFICATIONS

### A. Custom Fluid Inverted Cursor (`js/cursor.js` & `css/cursor.css`)
- A dual-element cursor: outer tracking ring + inner solid dot.
- Uses `mix-blend-mode: difference` over white text and dark panels.
- Smooth linear interpolation (lerp physics) on `requestAnimationFrame`.
- When hovering interactive elements (`a`, `button`, `.clickable`, `.card`): outer ring expands, accelerates, and activates magnetic pull towards the element center.
- Disabled cleanly on touch devices (`@media (pointer: coarse)`).

### B. Header & Navigation
- Sticky Swiss editorial top bar with glassmorphic backdrop (`backdrop-filter: blur(12px)`).
- Left: Monospace system status beacon (Live blinking green dot + `"SYSTEM STATUS: AVAILABLE FOR STRATEGIC ENGAGEMENTS"`).
- Center: Discrete section anchor links (`01. Horizons`, `02. Deep Dives`, `03. Arsenal`, `04. Philosophy`).
- Right: Magnetic CTA button: `[ Initiate Strategic Brief ]` (triggers the Brief Modal).

### C. Hero Section
- Oversized brutalist headline: **"I ENGINEER NARRATIVE ARCHITECTURE FOR SYSTEMS THAT CANNOT AFFORD TO BE MISUNDERSTOOD."**
- Subtext: Strategic Copywriter & Growth Systems Thinker bridging complex enterprise engineering with high-velocity conversion mechanics.
- Live Metric Ticker: Dynamic counter stats (e.g. `+$18.4M Value Engineered`, `3.4x Avg. CVR Lift`, `40+ Global Deployments`).

### D. Deep-Dive Showcase & Interactive Modal (`js/modal.js`)
- Grid of curated case studies with metric badges and category tags.
- Clicking any card opens the full-screen / centered **Deep Synthesis Modal**:
  - Top header: Client meta, sector, sprint length, and close button (`ESC` keyboard shortcut support).
  - Formula Banner: Clean math formula render.
  - 5-Stage synthesis tabs or stacked editorial scroll:
    1. *Hypothesis & Context*
    2. *Market Diagnosis (The Systemic Bottleneck)*
    3. *Execution Matrix*
    4. *Interactive Before / After Copy Inspector* with a toggle switch `[ View Legacy Copy ]` vs `[ View Strategic Overhaul ]` highlighting syntax, cognitive hooks, and conversion triggers.
    5. *Quantifiable Lift & Retrospective*.

### E. Interactive Strategic Brief Modal (`js/brief.js`)
- Triggered by `[ Initiate Strategic Brief ]`.
- 3-Step interactive intake widget:
  - Step 1: Select Strategic Objective (Positioning Overhaul, Landing Page Sprint, Funnel Teardown, Enterprise Narrative).
  - Step 2: Select Stage & Timeline (Seed/Series A, Growth/Scale, Enterprise / Immediate, Next Quarter).
  - Step 3: Generates a pre-formatted, highly executive inquiry summary with a direct `mailto:` link populated with subject & structured brief, alongside a 1-click Cal.com booking link.

---

## 6. STEP-BY-STEP IMPLEMENTATION PLAN
1. **Initialize Project Files:** Scaffold all files according to the directory tree.
2. **Setup Styling & Tokens:** Populate `css/variables.css`, `css/base.css`, `css/cursor.css`, `css/components.css`, and `css/sections.css`.
3. **Populate Content Engine:** Build `js/data.js` with realistic, high-impact case studies, essays, and metrics.
4. **Implement Core HTML Structure:** Write `index.html` with full semantic tags, social Open Graph tags, and container targets for dynamic rendering.
5. **Implement Cursor & Interactions:** Write `js/cursor.js` with magnetic physics.
6. **Implement Modal Engine:** Write `js/modal.js` featuring the Before/After comparison toggles and accessible modal controls (`aria`, `focus trap`, `escape key`).
7. **Implement Brief Modal:** Write `js/brief.js` with dynamic step-selection logic.
8. **Assemble Controller:** Write `js/app.js` to mount all sections dynamically from `data.js`, wire up scroll listeners, and initialize interactions.
9. **Final Audit:** Test responsiveness across mobile (`375px`), tablet (`768px`), and desktop (`1440px`), verifying zero console errors and 60fps interaction smoothness.
```
