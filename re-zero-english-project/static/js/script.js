/* =========================================================
   RE:ZERO project — script.js
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  initActiveLink();
  initScrollReveal();
  initStarfield();
  initReturnByDeathCounter();
  initGalleryFallback();
  initSoundboard();
});

/* ---------------------------------------------------------
   Mobile nav toggle
--------------------------------------------------------- */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.classList.toggle('is-active', isOpen);
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------------------------------------------------
   Highlight current page in the nav
--------------------------------------------------------- */
function initActiveLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === current) link.classList.add('active');
  });
}

/* ---------------------------------------------------------
   Scroll reveal: fade sections up as they enter the viewport
--------------------------------------------------------- */
function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------
   Starfield canvas — a slow drifting field of light, like the
   night sky over Lugnica / Emilia's ice-blue spirit magic.
--------------------------------------------------------- */
function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height, stars;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    const count = Math.floor((width * height) / 9000);
    stars = Array.from({ length: count }, () => createStar());
  }

  function createStar() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.3,
      baseAlpha: Math.random() * 0.5 + 0.3,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.05,
      driftY: Math.random() * 0.06 + 0.02,
      hue: Math.random() > 0.85 ? '167,139,250' : '241,238,255',
    };
  }

  function draw(time) {
    ctx.clearRect(0, 0, width, height);
    stars.forEach((s) => {
      const alpha = prefersReducedMotion
        ? s.baseAlpha
        : s.baseAlpha + Math.sin(time * s.twinkleSpeed + s.phase) * 0.25;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${s.hue}, ${Math.max(alpha, 0.08)})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();

      if (!prefersReducedMotion) {
        s.x += s.driftX;
        s.y -= s.driftY;
        if (s.y < -4) { s.y = height + 4; s.x = Math.random() * width; }
        if (s.x < -4) s.x = width + 4;
        if (s.x > width + 4) s.x = -4;
      }
    });
    requestAnimationFrame(draw);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
}

/* ---------------------------------------------------------
   Playful "Return by Death" loop counter using localStorage.
   Purely cosmetic — a nod to the story's central mechanic.
--------------------------------------------------------- */
function initReturnByDeathCounter() {
  const el = document.querySelector('[data-loop-counter]');
  if (!el) return;

  try {
    let loops = parseInt(localStorage.getItem('rezero_loops') || '0', 10);
    loops += 1;
    localStorage.setItem('rezero_loops', String(loops));
    el.textContent = loops;
  } catch (err) {
    el.textContent = '1';
  }
}

/* ---------------------------------------------------------
   Gallery images: if a photo hasn't been added to
   static/images/ yet, show a friendly placeholder instead
   of a broken image icon.
--------------------------------------------------------- */
function initGalleryFallback() {
  document.querySelectorAll('.gallery-img').forEach((img) => {
    img.addEventListener('error', () => {
      img.closest('.gallery-slot')?.classList.add('img-missing');
    }, { once: true });

    if (img.complete && img.naturalWidth === 0) {
      img.closest('.gallery-slot')?.classList.add('img-missing');
    }
  });
}

/* ---------------------------------------------------------
   Soundboard: one clip plays at a time; clicking the
   playing button stops it, clicking another switches to it.
--------------------------------------------------------- */
function initSoundboard() {
  const buttons = document.querySelectorAll('.sound-btn');
  if (!buttons.length) return;

  let currentAudio = null;
  let currentBtn = null;

  function stopCurrent() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    if (currentBtn) currentBtn.classList.remove('is-playing');
    currentAudio = null;
    currentBtn = null;
  }

  buttons.forEach((btn) => {
    const audio = new Audio(btn.dataset.audio);

    audio.addEventListener('ended', () => {
      if (currentAudio === audio) stopCurrent();
    });

    btn.addEventListener('click', () => {
      const wasPlaying = currentAudio === audio;
      stopCurrent();

      if (!wasPlaying) {
        audio.play().catch(() => {
          btn.classList.remove('is-playing');
        });
        btn.classList.add('is-playing');
        currentAudio = audio;
        currentBtn = btn;
      }
    });
  });
}
