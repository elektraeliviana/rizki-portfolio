/**
 * Main Controller: Mounts data, triggers animations, initializes interactions
 */
document.addEventListener('DOMContentLoaded', () => {
  renderHeroData();
  renderArsenal();
  renderDeepDives();
  renderHorizons();
  renderPhilosophy();
  initMetricCounterAnimation();
  initSmoothScroll();
});

function renderHeroData() {
  const meta = PORTFOLIO_DATA.meta;
  const statusEl = document.getElementById('heroStatusText');
  const headlineEl = document.getElementById('heroHeadline');
  const leadEl = document.getElementById('heroLead');
  const tickerEl = document.getElementById('metricTicker');

  if (statusEl) statusEl.textContent = meta.statusSubtext;
  if (headlineEl) {
    headlineEl.innerHTML = `I ENGINEER <em>NARRATIVE ARCHITECTURE</em> FOR SYSTEMS THAT CANNOT AFFORD TO BE MISUNDERSTOOD.`;
  }
  if (leadEl) leadEl.textContent = meta.lead;

  if (tickerEl && meta.stats) {
    tickerEl.innerHTML = meta.stats.map(s => `
      <div class="metric-box">
        <div class="metric-value counter-value" data-target="${s.value}">${s.value}</div>
        <div class="metric-label">${s.label}</div>
      </div>
    `).join('');
  }
}

function renderArsenal() {
  const container = document.getElementById('arsenalGrid');
  if (!container || !PORTFOLIO_DATA.arsenal) return;

  container.innerHTML = PORTFOLIO_DATA.arsenal.map(p => `
    <article class="arsenal-card">
      <div class="arsenal-idx mono">${p.code}</div>
      <div>
        <h3>${p.title}</h3>
        <p class="mono" style="color: var(--accent); font-size: 0.72rem; margin-top: 0.25rem;">${p.tagline}</p>
      </div>
      <p>${p.description}</p>
    </article>
  `).join('');
}

function renderDeepDives() {
  const container = document.getElementById('deepdivesGrid');
  if (!container || !PORTFOLIO_DATA.deepDives) return;

  container.innerHTML = PORTFOLIO_DATA.deepDives.map(item => `
    <article class="deepdive-card card-interactive" onclick="ModalEngine.open('${item.id}')">
      <div>
        <div class="deepdive-meta">
          <span class="badge badge-accent mono">${item.sector}</span>
          <span class="mono" style="color: var(--text-secondary);">${item.client} · ${item.timeline}</span>
        </div>
        <h3 class="deepdive-headline">${item.headline}</h3>
        <p class="deepdive-summary">${item.summary}</p>
        
        <div class="deepdive-metrics-row">
          ${item.impact.map(m => `
            <div>
              <div class="metric-value" style="font-size: 1.5rem;">${m.value}</div>
              <div class="metric-label" style="font-size: 0.68rem; margin-top: 0.2rem;">${m.label}</div>
            </div>
          `).join('')}
        </div>

        <button class="btn btn-sm">
          Inspect Architecture
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left: 0.3rem;">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>

      <div style="background: var(--bg-primary); padding: 1.75rem; border: 1px solid var(--border-subtle); border-radius: var(--radius-xs); display: flex; flex-direction: column; gap: 1rem;">
        <span class="mono" style="color: var(--accent); font-size: 0.7rem;">SYSTEM FORMULA DEPLOYED</span>
        <div class="mono" style="color: var(--text-primary); font-size: 0.88rem; line-height: 1.5;">
          ${item.formula}
        </div>
        <div style="font-size: 0.8rem; color: var(--text-secondary); border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          Click to inspect the full 5-stage synthesis matrix, hypothesis deconstruction, and interactive Before/After copy breakdown.
        </div>
      </div>
    </article>
  `).join('');
}

function renderHorizons() {
  const container = document.getElementById('horizonsGrid');
  if (!container || !PORTFOLIO_DATA.horizons) return;

  container.innerHTML = PORTFOLIO_DATA.horizons.map((essay, idx) => `
    <article class="horizon-card">
      <div>
        <div class="horizon-top">
          <span class="badge mono">${essay.tag}</span>
          <span class="mono" style="color: var(--text-tertiary);">${essay.readTime}</span>
        </div>
        <div class="mono" style="color: var(--accent); margin-top: 1.25rem; font-size: 0.72rem;">ESSAY 0${idx + 1}</div>
        <h3 style="margin-top: 0.4rem; margin-bottom: 0.75rem;">${essay.title}</h3>
        <p class="horizon-abstract">${essay.abstract}</p>
      </div>

      <div>
        <div class="formula-banner" style="margin-bottom: 1.25rem; padding: 0.85rem 1.15rem; font-size: 0.78rem;">
          ${essay.formula}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span class="mono" style="color: var(--text-tertiary);">Curated Monograph</span>
          <button class="btn btn-sm" onclick="alert('${essay.title}\\n\\n${essay.fullText.replace(/'/g, "\\'")}')">
            Read Monograph &rarr;
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderPhilosophy() {
  const email = PORTFOLIO_DATA.meta.email || "rizky@gmail.com";
  const emailLink = document.getElementById('philosophyEmailLink');
  if (emailLink) {
    emailLink.href = `mailto:${email}?subject=Strategic%20Narrative%20Inquiry`;
    emailLink.textContent = email;
  }
}

function initMetricCounterAnimation() {
  const counters = document.querySelectorAll('.counter-value');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId.startsWith('#')) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Generate Open Graph image dynamically on canvas if needed
window.generateOgPreview = function() {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#08080A';
  ctx.fillRect(0, 0, 1200, 630);

  // Border & Grid
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, 1120, 550);

  // Accent Line
  ctx.fillStyle = '#CCFF00';
  ctx.fillRect(80, 80, 8, 80);

  // Typography
  ctx.fillStyle = '#F4F4F6';
  ctx.font = 'bold 54px "Space Grotesk", sans-serif';
  ctx.fillText('RIZKY MAULANA', 110, 125);

  ctx.fillStyle = '#CCFF00';
  ctx.font = 'bold 22px "JetBrains Mono", monospace';
  ctx.fillText('SYSTEMS NARRATIVE ARCHITECT · RESEARCH & STRATEGY', 110, 155);

  ctx.fillStyle = '#8E8E98';
  ctx.font = '32px "Inter", sans-serif';
  ctx.fillText('Engineering high-velocity narrative architecture &', 110, 280);
  ctx.fillText('conversion economics for enterprise systems.', 110, 330);

  return canvas.toDataURL('image/png');
};
