/**
 * Deep Synthesis Modal Engine & Before/After Copy Inspector
 */
const ModalEngine = (function() {
  let modalOverlay = null;
  let modalDialog = null;
  let currentCase = null;

  function init() {
    createModalDOM();
    bindEvents();
  }

  function createModalDOM() {
    modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = 'deepSynthesisModal';
    modalOverlay.setAttribute('role', 'dialog');
    modalOverlay.setAttribute('aria-modal', 'true');
    modalOverlay.setAttribute('aria-hidden', 'true');

    modalOverlay.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <div class="modal-header-meta">
            <span class="badge badge-accent mono" id="modalSector">SECTOR</span>
            <span class="mono" id="modalClient" style="color: var(--text-secondary); margin-left: 0.5rem;">CLIENT</span>
          </div>
          <button class="modal-close-btn" id="modalCloseBtn" aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body" id="modalContent">
          <!-- Dynamic Content Injected Here -->
        </div>
      </div>
    `;

    document.body.appendChild(modalOverlay);
    modalDialog = modalOverlay.querySelector('.modal-dialog');
  }

  function bindEvents() {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        close();
      }
    });

    const closeBtn = modalOverlay.querySelector('#modalCloseBtn');
    closeBtn.addEventListener('click', close);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        close();
      }
    });
  }

  function open(caseId) {
    const item = PORTFOLIO_DATA.deepDives.find(c => c.id === caseId);
    if (!item) return;
    currentCase = item;

    document.getElementById('modalSector').textContent = item.sector;
    document.getElementById('modalClient').textContent = `${item.client} · ${item.timeline}`;

    const content = document.getElementById('modalContent');
    content.innerHTML = `
      <div>
        <h2 style="font-size: clamp(1.6rem, 3vw, 2.2rem); margin-bottom: 0.75rem; letter-spacing: -0.02em;">${item.headline}</h2>
        <p style="font-size: 1.05rem; color: var(--text-secondary); max-width: 70ch;">${item.summary}</p>
      </div>

      <!-- Formula Banner -->
      <div class="formula-banner">
        <div>
          <span class="formula-tag mono">NARRATIVE ARCHITECTURE FORMULA</span>
          <div style="font-size: 0.95rem; margin-top: 0.4rem; color: var(--accent); font-family: var(--font-mono);">
            ${item.formula}
          </div>
        </div>
      </div>

      <!-- Stage 01: Context & Hypothesis -->
      <div class="synthesis-section">
        <h4>[01] Context & Strategic Premise</h4>
        <p>${item.synthesis.context}</p>
      </div>

      <!-- Stage 02: Market Diagnosis -->
      <div class="synthesis-section">
        <h4>[02] Market Diagnosis & Systemic Friction</h4>
        <p>${item.synthesis.diagnosis}</p>
      </div>

      <!-- Stage 03: Execution Matrix -->
      <div class="synthesis-section">
        <h4>[03] Execution Matrix & Tactical Interventions</h4>
        <table class="execution-matrix-table">
          <thead>
            <tr>
              <th style="width: 35%;">Strategic Layer</th>
              <th>Tactical Conversion Move</th>
            </tr>
          </thead>
          <tbody>
            ${item.synthesis.executionMatrix.map(row => `
              <tr>
                <td class="mono" style="color: var(--accent); font-weight: 500;">${row.layer}</td>
                <td>${row.tacticalMove}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <!-- Stage 04: Interactive Before / After Inspector -->
      <div class="synthesis-section">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <h4>[04] Copy Inspector: Anatomy of the Overhaul</h4>
          <div class="toggle-switch-group">
            <button class="toggle-btn tone-danger" id="toggleLegacyBtn">Legacy Copy</button>
            <button class="toggle-btn tone-success active" id="toggleOverhaulBtn">Strategic Overhaul</button>
          </div>
        </div>

        <div id="inspectorDisplayBox" class="inspector-box overhaul-mode">
          <div class="mono" id="inspectorBadge" style="color: var(--status-success);">● STRATEGIC OVERHAUL APPLIED</div>
          <div class="inspector-headline" id="inspectorHeadline">${item.synthesis.beforeAfter.overhaul.headline}</div>
          <div class="inspector-body" id="inspectorBody">${item.synthesis.beforeAfter.overhaul.body}</div>
          <div class="inspector-critique mono" id="inspectorCritique">${item.synthesis.beforeAfter.overhaul.breakdown}</div>
        </div>
      </div>

      <!-- Stage 05: Quantifiable Lift & Retrospective -->
      <div class="synthesis-section">
        <h4>[05] Quantifiable Lift & Strategic Retrospective</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
          ${item.impact.map(m => `
            <div style="padding: 1rem; background: var(--bg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-xs);">
              <div class="metric-value" style="font-size: 1.6rem;">${m.value}</div>
              <div class="metric-label" style="font-size: 0.68rem; margin-top: 0.25rem;">${m.label}</div>
            </div>
          `).join('')}
        </div>
        <p>${item.synthesis.retrospective}</p>
      </div>
    `;

    // Wire up the Before / After Inspector toggle
    const legacyBtn = document.getElementById('toggleLegacyBtn');
    const overhaulBtn = document.getElementById('toggleOverhaulBtn');
    const displayBox = document.getElementById('inspectorDisplayBox');
    const badge = document.getElementById('inspectorBadge');
    const headline = document.getElementById('inspectorHeadline');
    const body = document.getElementById('inspectorBody');
    const critique = document.getElementById('inspectorCritique');

    legacyBtn.addEventListener('click', () => {
      legacyBtn.classList.add('active');
      overhaulBtn.classList.remove('active');
      displayBox.className = 'inspector-box legacy-mode';
      badge.textContent = '▲ LEGACY / UNCONVERTED COPY';
      badge.style.color = 'var(--status-danger)';
      headline.textContent = item.synthesis.beforeAfter.legacy.headline;
      body.textContent = item.synthesis.beforeAfter.legacy.body;
      critique.textContent = `DIAGNOSIS: ${item.synthesis.beforeAfter.legacy.critique}`;
    });

    overhaulBtn.addEventListener('click', () => {
      overhaulBtn.classList.add('active');
      legacyBtn.classList.remove('active');
      displayBox.className = 'inspector-box overhaul-mode';
      badge.textContent = '● STRATEGIC OVERHAUL APPLIED';
      badge.style.color = 'var(--status-success)';
      headline.textContent = item.synthesis.beforeAfter.overhaul.headline;
      body.textContent = item.synthesis.beforeAfter.overhaul.body;
      critique.textContent = `SYSTEMIC RATIONALE: ${item.synthesis.beforeAfter.overhaul.breakdown}`;
    });

    // Show modal
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (window.refreshCursorTriggers) {
      window.refreshCursorTriggers();
    }
  }

  function close() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  return {
    init,
    open,
    close
  };
})();

document.addEventListener('DOMContentLoaded', ModalEngine.init);
