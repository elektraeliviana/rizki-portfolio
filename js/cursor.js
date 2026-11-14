/**
 * Fluid Inverted Custom Cursor with Lerp Physics & Magnetic Interactions
 */
(function() {
  // Check if device is touch-enabled
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
  let isHovering = false;
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

  // Attach magnetic hover triggers to interactive elements
  function attachHoverTriggers() {
    const interactives = document.querySelectorAll('a, button, .card-interactive, .toggle-btn, .brief-option-card');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        isHovering = true;
        if (el.classList.contains('btn') || el.classList.contains('toggle-btn')) {
          targetMagnetic = el;
        }
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        isHovering = false;
        targetMagnetic = null;
      });
    });
  }

  // Animation Loop with Linear Interpolation (Lerp)
  function renderCursor() {
    // Dot follows fast
    dotX += (mouseX - dotX) * 0.75;
    dotY += (mouseY - dotY) * 0.75;
    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;

    // Ring follows smoothly with subtle magnetic attraction
    let targetX = mouseX;
    let targetY = mouseY;

    if (targetMagnetic) {
      const rect = targetMagnetic.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      targetX = centerX + (mouseX - centerX) * 0.25;
      targetY = centerY + (mouseY - centerY) * 0.25;
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
