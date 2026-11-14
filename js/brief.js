/**
 * Interactive 3-Step Strategic Brief Modal Engine
 */
const BriefEngine = (function() {
  let briefOverlay = null;
  let currentStep = 1;
  const state = {
    objective: "Positioning Overhaul",
    stage: "Growth / Series A-B",
    timeline: "Immediate / Q1 Sprint"
  };

  const objectives = [
    { title: "Positioning Overhaul", desc: "Deconstruct and rebuild category narrative from first principles." },
    { title: "High-Velocity Landing Page", desc: "Engineered copy flow with progressive disclosure and conversion mechanics." },
    { title: "Enterprise Sales Narrative", desc: "Equipping enterprise reps to eliminate decision fatigue with CFOs." },
    { title: "Funnel Economics Teardown", desc: "Full cognitive audit of activation, onboarding, and churn bottlenecks." }
  ];

  const stages = [
    { title: "Seed / Pre-Series A", desc: "Establishing initial product-market narrative defensibility." },
    { title: "Growth / Scale (Series A-C)", desc: "Expanding ACV, reducing CAC, and clarifying category dominance." },
    { title: "Enterprise & Global Corporate", desc: "Translating deep technical systems for conservative risk managers." },
    { title: "Strategic Creative Agency", desc: "Embedding high-level narrative strategy into client deliverables." }
  ];

  const timelines = [
    { title: "Immediate Sprint (Next 2 Weeks)", desc: "High-priority, intensive sprint deployment." },
    { title: "Upcoming Quarter (Q1/Q2)", desc: "Strategic planning for next milestone release." },
    { title: "Advisory / Retainer", desc: "Ongoing narrative architecture and messaging oversight." }
  ];

  function init() {
    createBriefDOM();
    bindEvents();
  }

  function createBriefDOM() {
    briefOverlay = document.createElement('div');
    briefOverlay.className = 'modal-overlay';
    briefOverlay.id = 'strategicBriefModal';
    briefOverlay.setAttribute('role', 'dialog');
    briefOverlay.setAttribute('aria-modal', 'true');
    briefOverlay.setAttribute('aria-hidden', 'true');

    briefOverlay.innerHTML = `
      <div class="modal-dialog" style="max-width: 760px;">
        <div class="modal-header">
          <div class="modal-header-meta">
            <span class="badge badge-accent mono">INTAKE PROTOCOL</span>
            <span class="mono" style="color: var(--text-secondary); margin-left: 0.5rem;">STRATEGIC BRIEF WIZARD</span>
          </div>
          <button class="modal-close-btn" id="briefCloseBtn" aria-label="Close brief modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body" id="briefBody">
          <!-- Rendered dynamically by renderStep() -->
        </div>
      </div>
    `;

    document.body.appendChild(briefOverlay);
  }

  function bindEvents() {
    briefOverlay.addEventListener('click', (e) => {
      if (e.target === briefOverlay) {
        close();
      }
    });

    const closeBtn = briefOverlay.querySelector('#briefCloseBtn');
    closeBtn.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && briefOverlay.classList.contains('active')) {
        close();
      }
    });

    // Attach open triggers across the page
    document.querySelectorAll('[data-trigger-brief]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        open();
      });
    });
  }

  function open() {
    currentStep = 1;
    renderStep();
    briefOverlay.classList.add('active');
    briefOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (window.refreshCursorTriggers) {
      window.refreshCursorTriggers();
    }
  }

  function close() {
    if (!briefOverlay) return;
    briefOverlay.classList.remove('active');
    briefOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function renderStep() {
    const container = document.getElementById('briefBody');
    let html = `
      <div class="brief-step-indicators">
        <div class="brief-step-dot ${currentStep >= 1 ? 'active' : ''}"></div>
        <div class="brief-step-dot ${currentStep >= 2 ? 'active' : ''}"></div>
        <div class="brief-step-dot ${currentStep >= 3 ? 'active' : ''}"></div>
      </div>
    `;

    if (currentStep === 1) {
      html += `
        <div>
          <span class="mono" style="color: var(--accent);">STEP 01 OF 03</span>
          <h3 style="font-size: 1.5rem; margin-top: 0.35rem; margin-bottom: 0.5rem;">Select Primary Strategic Objective</h3>
          <p style="font-size: 0.92rem; color: var(--text-secondary);">What is the critical narrative bottleneck your team needs to eliminate?</p>
        </div>
        <div class="brief-options-grid">
          ${objectives.map(item => `
            <div class="brief-option-card ${state.objective === item.title ? 'selected' : ''}" data-val="${item.title}">
              <h5>${item.title}</h5>
              <p>${item.desc}</p>
            </div>
          `).join('')}
        </div>
        <div style="display: flex; justify-content: flex-end; margin-top: 1rem;">
          <button class="btn btn-primary" id="briefNextStepBtn">Next: Company Stage &rarr;</button>
        </div>
      `;
    } else if (currentStep === 2) {
      html += `
        <div>
          <span class="mono" style="color: var(--accent);">STEP 02 OF 03</span>
          <h3 style="font-size: 1.5rem; margin-top: 0.35rem; margin-bottom: 0.5rem;">Company Maturity &amp; Target Timeline</h3>
          <p style="font-size: 0.92rem; color: var(--text-secondary);">Calibrating organizational velocity and stakeholder requirements.</p>
        </div>
        <div>
          <span class="mono" style="font-size: 0.7rem; color: var(--text-secondary);">ORGANIZATIONAL MATURITY</span>
          <div class="brief-options-grid" style="margin-top: 0.4rem; margin-bottom: 1.5rem;">
            ${stages.map(item => `
              <div class="brief-option-card stage-card ${state.stage === item.title ? 'selected' : ''}" data-val="${item.title}">
                <h5>${item.title}</h5>
                <p>${item.desc}</p>
              </div>
            `).join('')}
          </div>

          <span class="mono" style="font-size: 0.7rem; color: var(--text-secondary);">TIMELINE / DEPLOYMENT HORIZON</span>
          <div class="brief-options-grid" style="margin-top: 0.4rem;">
            ${timelines.map(item => `
              <div class="brief-option-card timeline-card ${state.timeline === item.title ? 'selected' : ''}" data-val="${item.title}">
                <h5>${item.title}</h5>
                <p>${item.desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
          <button class="btn" id="briefPrevStepBtn">&larr; Back</button>
          <button class="btn btn-primary" id="briefNextStepBtn">Generate Executive Brief &rarr;</button>
        </div>
      `;
    } else if (currentStep === 3) {
      const email = PORTFOLIO_DATA.meta.email || "rizky@gmail.com";
      const subject = encodeURIComponent(`Strategic Narrative Inquiry: [${state.objective}] - [${state.stage}]`);
      const bodyText = encodeURIComponent(
`Hi Rizky,

I reviewed your portfolio and narrative architecture framework. We are looking for strategic narrative support:

- Primary Objective: ${state.objective}
- Company Maturity: ${state.stage}
- Targeted Timeline: ${state.timeline}

Context on our product / challenge:
[Briefly describe your product and current narrative bottleneck here]

Looking forward to discussing the architecture.

Best,
[Your Name & Organization]`
      );

      const mailtoUrl = `mailto:${email}?subject=${subject}&body=${bodyText}`;

      html += `
        <div>
          <span class="mono" style="color: var(--accent);">STEP 03 OF 03 · DISPATCH PROTOCOL</span>
          <h3 style="font-size: 1.5rem; margin-top: 0.35rem; margin-bottom: 0.5rem;">Executive Brief Generated</h3>
          <p style="font-size: 0.92rem; color: var(--text-secondary);">Review your pre-structured brief or initiate direct asynchronous communication.</p>
        </div>

        <div style="padding: 1.5rem; background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-xs);">
          <div class="mono" style="color: var(--accent); margin-bottom: 0.5rem; font-size: 0.7rem;">CALIBRATED BRIEF SPECIFICATION</div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
            <div>
              <span class="mono" style="font-size: 0.68rem; color: var(--text-secondary);">OBJECTIVE</span>
              <div style="font-weight: 600; font-size: 0.92rem;">${state.objective}</div>
            </div>
            <div>
              <span class="mono" style="font-size: 0.68rem; color: var(--text-secondary);">STAGE</span>
              <div style="font-weight: 600; font-size: 0.92rem;">${state.stage}</div>
            </div>
            <div>
              <span class="mono" style="font-size: 0.68rem; color: var(--text-secondary);">TIMELINE</span>
              <div style="font-weight: 600; font-size: 0.92rem;">${state.timeline}</div>
            </div>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary); border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
            Click below to open your native mail client with this brief formatted, or copy the direct address for async communication.
          </p>
        </div>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">
          <a class="btn btn-primary" href="${mailtoUrl}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 0.4rem;">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Transmit Brief via Mail
          </a>
          <button class="btn" id="briefCopyEmailBtn" data-email="${email}">Copy Direct Email</button>
        </div>
        <div style="margin-top: 0.5rem;">
          <button class="btn btn-sm" id="briefPrevStepBtn" style="border: none; color: var(--text-secondary);">&larr; Adjust Parameters</button>
        </div>
      `;
    }

    container.innerHTML = html;
    wireStepEvents();

    if (window.refreshCursorTriggers) {
      window.refreshCursorTriggers();
    }
  }

  function wireStepEvents() {
    const nextBtn = document.getElementById('briefNextStepBtn');
    const prevBtn = document.getElementById('briefPrevStepBtn');
    const copyBtn = document.getElementById('briefCopyEmailBtn');

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentStep++;
        renderStep();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentStep--;
        renderStep();
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(copyBtn.getAttribute('data-email'));
        copyBtn.textContent = 'Copied to Clipboard!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy Direct Email';
        }, 2200);
      });
    }

    // Step 1 option clicks
    document.querySelectorAll('.brief-option-card[data-val]').forEach(card => {
      card.addEventListener('click', () => {
        if (currentStep === 1) {
          state.objective = card.getAttribute('data-val');
          document.querySelectorAll('.brief-option-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
        } else if (currentStep === 2) {
          if (card.classList.contains('stage-card')) {
            state.stage = card.getAttribute('data-val');
            document.querySelectorAll('.stage-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
          } else if (card.classList.contains('timeline-card')) {
            state.timeline = card.getAttribute('data-val');
            document.querySelectorAll('.timeline-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
          }
        }
      });
    });
  }

  return {
    init,
    open,
    close
  };
})();

document.addEventListener('DOMContentLoaded', BriefEngine.init);
