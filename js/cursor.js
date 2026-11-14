/**
 * Fluid Inverted Custom Cursor with Lerp Physics & Magnetic Interactions
 */
(function() {
  if (window.matchMedia('(pointer: coarse)').matches) {
    return;
  }

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  document.body.appendChild(dot);

  const ring = document.createElement('div');
  ring.className = 'custom-cursor-ring';
  document.body.appendChild(ring);

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let dotX = -100;
  let dotY = -100;
  let targetMagnetic = null;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('mousedown', () => {
    document.body.classList.add('cursor-active');
  });

  window.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-active');
  });

  function attachHoverTriggers() {
    const interactives = document.querySelectorAll('a, button, .card-interactive, .toggle-btn, .rich-link-card, .brief-option-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        if (el.classList.contains('btn') || el.classList.contains('toggle-btn') || el.classList.contains('rich-link-copy-btn')) {
          targetMagnetic = el;
        }
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        targetMagnetic = null;
      });
    });
  }

  function renderCursor() {
    dotX += (mouseX - dotX) * 0.75;
    dotY += (mouseY - dotY) * 0.75;
    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;

    let targetX = mouseX;
    let targetY = mouseY;

    if (targetMagnetic) {
      const rect = targetMagnetic.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      targetX = centerX + (mouseX - centerX) * 0.28;
      targetY = centerY + (mouseY - centerY) * 0.28;
    }

    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);
  document.addEventListener('DOMContentLoaded', attachHoverTriggers);
  window.refreshCursorTriggers = attachHoverTriggers;
})();
