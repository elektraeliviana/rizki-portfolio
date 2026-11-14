/**
 * Automated Zero-Effort Rich Link Embed Engine
 * Scans content for hyperlinks and injects high-contrast editorial Rich Link Embed cards
 */
const LinkEmbedEngine = (function() {
  function init() {
    processAllRichLinks();
  }

  function processAllRichLinks() {
    if (!PORTFOLIO_DATA || !PORTFOLIO_DATA.linkPreviews) return;

    // Target elements containing paragraphs with hyperlinks
    const targets = document.querySelectorAll('.horizon-card, .synthesis-section, .bio-card');

    targets.forEach(container => {
      const links = container.querySelectorAll('a[href]');
      links.forEach(link => {
        // Skip links that are already inside a rich card or are internal hash links
        if (link.closest('.rich-link-card') || link.getAttribute('href').startsWith('#') || link.getAttribute('href').startsWith('mailto:')) {
          return;
        }

        const href = link.getAttribute('href');
        const data = PORTFOLIO_DATA.linkPreviews[href];

        if (data) {
          // If already injected nearby, skip
          if (container.querySelector(`.rich-link-card[data-url="${href}"]`)) {
            return;
          }

          const card = createRichLinkCard(data);
          
          // Inject card directly below the parent paragraph or block
          const parentBlock = link.closest('p') || link;
          parentBlock.parentNode.insertBefore(card, parentBlock.nextSibling);
        }
      });
    });
  }

  function createRichLinkCard(data) {
    const card = document.createElement('a');
    card.className = 'rich-link-card';
    card.href = data.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.setAttribute('data-url', data.url);

    card.innerHTML = `
      <div class="rich-link-content">
        <div class="rich-link-title-row">
          <span class="rich-link-title">${escapeHTML(data.title)}</span>
          <span class="rich-link-external-icon mono">[ ↗ ]</span>
        </div>
        <p class="rich-link-desc">${escapeHTML(data.description)}</p>
        <div class="rich-link-footer">
          <span class="rich-link-domain mono">${escapeHTML(data.domain || extractDomain(data.url))}</span>
          <button type="button" class="rich-link-copy-btn" data-copy="${data.url}">
            <span>⎘</span>
            <span class="copy-label">Copy Link</span>
          </button>
        </div>
      </div>
      <div class="rich-link-thumbnail-box">
        <img class="rich-link-thumbnail" src="${data.image}" alt="${escapeHTML(data.title)}" loading="lazy">
      </div>
    `;

    // Handle copy link button without triggering card navigation
    const copyBtn = card.querySelector('.rich-link-copy-btn');
    copyBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const urlToCopy = copyBtn.getAttribute('data-copy');
      navigator.clipboard.writeText(urlToCopy).then(() => {
        const label = copyBtn.querySelector('.copy-label');
        const originalText = label.textContent;
        label.textContent = 'Copied!';
        copyBtn.style.color = 'var(--accent)';

        setTimeout(() => {
          label.textContent = originalText;
          copyBtn.style.color = '';
        }, 2000);
      });
    });

    return card;
  }

  function extractDomain(url) {
    try {
      return new URL(url).hostname;
    } catch {
      return 'external';
    }
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  return {
    init,
    processAllRichLinks
  };
})();
