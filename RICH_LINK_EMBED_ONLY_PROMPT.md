# TASK: Add Rich Hyperlink Embed Cards to the Current Website

You are an expert Frontend Developer. Your objective is **NOT** to redesign or rewrite the current website. You must keep the current design, typography, layout, ink-wash aesthetic, and content on `https://rizki-portfolio-seven.vercel.app/` **100% intact**. 

Your **ONLY** task is to add a drop-in, zero-dependency **Rich Hyperlink Embed Card feature** so that external links display a rich preview card with a title, description, and thumbnail image (matching Discord/Slack unfurl cards).

---

## 1. COMPONENT VISUAL SPECIFICATION
Create a rich link preview card that matches the user's reference image:
- **Card Container (`.rich-link-card`):**
  - Dark slate/charcoal background (`#1e1f23` or matching the site's dark tone).
  - Subtle rounded corners (`8px`).
  - Subtle border (`1px solid rgba(255, 255, 255, 0.1)`).
  - Padding: `12px 16px`.
  - Max-width: `560px` (or full width of parent article).
  - Layout: Flexbox horizontal layout with content on the left and thumbnail on the right.
  - Hover effect: Slight border highlight and smooth cursor pointer.
- **Left Column (Text & Metadata):**
  - **Title:** Hyperlink style (`color: #4a88f7`), bold/medium weight (`0.95rem`), clickable, opening in a new tab (`target="_blank"`).
  - **Description:** Clean multi-line summary (`color: #b5bac1` or `#d1d5db`), font size `0.85rem`, line height `1.4`.
- **Right Column (Thumbnail):**
  - Square or rounded thumbnail (`width: 72px`, `height: 72px`, `border-radius: 6px`, `object-fit: cover`, `flex-shrink: 0`).
  - Vertically centered.

---

## 2. HOW IT WORKS (ZERO-FRICTION INTEGRATION)
In the existing codebase (`index.html`, `styles.css`, `script.js`):

### Step A: Add the CSS to `styles.css`
Append these styles to the bottom of the existing `styles.css` without modifying existing selectors:
```css
/* ===================================================
   RICH HYPERLINK EMBED CARDS (UNFURL ENGINE)
   =================================================== */
.rich-link-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: #1e1f23;
  color: #f3f4f6;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 14px 18px;
  margin: 14px 0 20px 0;
  text-decoration: none;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  max-width: 580px;
}
.rich-link-card:hover {
  border-color: rgba(74, 136, 247, 0.5);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  transform: translateY(-1px);
}
.rich-link-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  min-width: 0;
}
.rich-link-title {
  color: #4a88f7;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.3;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.rich-link-card:hover .rich-link-title {
  text-decoration: underline;
}
.rich-link-desc {
  color: #b5bac1;
  font-size: 0.85rem;
  line-height: 1.45;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.rich-link-domain {
  font-family: var(--mono, monospace);
  font-size: 0.72rem;
  color: #8b8f97;
  text-transform: lowercase;
  margin-top: 4px;
}
.rich-link-thumb {
  width: 72px;
  height: 72px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
  background: #2b2d31;
}
@media (max-width: 480px) {
  .rich-link-card {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
  .rich-link-thumb {
    width: 100%;
    height: 140px;
  }
}
```

### Step B: Add Link Previews Data & Auto-Injector in `script.js`
In `script.js`, create a dictionary of link previews and an automatic helper so any standard anchor tag with class `embed-link` (or any link in the content) automatically renders this card:

```javascript
// Link Preview Metadata Dictionary (Local, Instant, Zero External Latency)
const LINK_PREVIEWS = {
  "https://www.wikipedia.org/": {
    url: "https://www.wikipedia.org/",
    title: "Wikipedia, the free encyclopedia",
    description: "Wikipedia is a free online encyclopedia, created and edited by volunteers around the world and hosted by the Wikimedia Foundation.",
    image: "https://www.wikipedia.org/static/images/project-logos/enwiki.png",
    domain: "wikipedia.org"
  },
  "https://en.wikipedia.org/wiki/Epistemology": {
    url: "https://en.wikipedia.org/wiki/Epistemology",
    title: "Epistemology — Wikipedia",
    description: "The branch of philosophy concerned with knowledge, belief justification, and the rationality of cognition.",
    image: "https://www.wikipedia.org/static/images/project-logos/enwiki.png",
    domain: "wikipedia.org"
  },
  "https://en.wikipedia.org/wiki/System_dynamics": {
    url: "https://en.wikipedia.org/wiki/System_dynamics",
    title: "System dynamics — Wikipedia",
    description: "An approach to understanding the nonlinear behaviour of complex systems over time using feedback loops and time delays.",
    image: "https://www.wikipedia.org/static/images/project-logos/enwiki.png",
    domain: "wikipedia.org"
  }
};

// Function to generate the embed card HTML
function createRichLinkCard(data) {
  return `
    <a href="${data.url}" class="rich-link-card" target="_blank" rel="noopener noreferrer">
      <div class="rich-link-content">
        <span class="rich-link-title">${data.title}</span>
        <p class="rich-link-desc">${data.description}</p>
        <span class="rich-link-domain">${data.domain || ''}</span>
      </div>
      <img src="${data.image}" alt="${data.title}" class="rich-link-thumb" loading="lazy" />
    </a>
  `;
}

// Auto-inject rich cards for links marked with class "embed-link" or data-embed="true"
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[data-embed="true"], a.embed-link').forEach((link) => {
    const url = link.getAttribute("href");
    const previewData = LINK_PREVIEWS[url];
    if (previewData) {
      const cardContainer = document.createElement("div");
      cardContainer.innerHTML = createRichLinkCard(previewData);
      link.parentNode.insertBefore(cardContainer.firstElementChild, link.nextSibling);
    }
  });
});
```

### Step C: How to Use in `index.html`
Whenever the user wants a rich embed card to appear under a link in the Essays or Case Studies, they just add `data-embed="true"` to their link:
```html
<p>
  Check the foundation on 
  <a href="https://www.wikipedia.org/" data-embed="true">Wikipedia</a>.
</p>
```
*Result:* The script instantly mounts the Discord-style rich card directly beneath the text without altering any existing site structure.

---

## 3. VERIFICATION
- Test that existing styles (ink-wash background, serif/sans fonts, section reveals, case studies) remain completely unchanged.
- Ensure the card is responsive and renders cleanly across mobile and desktop.
- Ensure clicking the card opens the external link in a new tab without interfering with internal smooth scroll links.
