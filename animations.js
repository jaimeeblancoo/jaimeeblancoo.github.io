(() => {
  'use strict';
  const header = document.querySelector('header');
  const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
  const destinations = navLinks.map(link => ({ link, section: document.querySelector(link.hash) }));
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const running = new Set();
  const revealed = new WeakSet();
  let revealObserver;

  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);

  const back = document.createElement('a');
  back.className = 'back-to-top';
  back.href = '#inicio';
  back.textContent = '↑';
  back.setAttribute('aria-label', 'Volver al inicio');
  back.hidden = true;
  document.body.append(back);

  function reveal(element, delay = 0) {
    if (revealed.has(element)) return;
    revealed.add(element);
    if (motion.matches || typeof element.animate !== 'function') return;
    const animation = element.animate([
      { opacity: 0, transform: 'translateY(24px)' },
      { opacity: 1, transform: 'translateY(0)' }
    ], { duration: 620, delay, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'both' });
    running.add(animation);
    animation.onfinish = () => { running.delete(animation); animation.cancel(); };
    animation.oncancel = () => running.delete(animation);
  }

  // Each block appears once, in short sequences within its section.
  const blocks = [];
  document.querySelectorAll('.section-grid').forEach(grid => {
    const heading = grid.firstElementChild;
    const content = grid.lastElementChild;
    const items = content.querySelectorAll('.entry, .project, .skill-group, .cert');
    blocks.push({ element: heading, delay: 0 });
    if (items.length) items.forEach((element, i) => blocks.push({ element, delay: Math.min(i % 3 * 80, 160) }));
    else blocks.push({ element: content, delay: 80 });
  });
  const contact = document.querySelector('.contact');
  if (contact) blocks.push({ element: contact, delay: 0 });
  const delays = new WeakMap(blocks.map(({ element, delay }) => [element, delay]));

  function setupReveals() {
    if (motion.matches || !('IntersectionObserver' in window)) return;
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveal(entry.target, delays.get(entry.target));
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -35px 0px' });
    blocks.forEach(({ element }) => {
      if (!revealed.has(element)) revealObserver.observe(element);
    });
  }

  // Intro animation only applies when the visitor starts at the top.
  if (scrollY < 80 && !location.hash) {
    document.querySelectorAll('.hero > div > *, .hero > aside').forEach((element, i) => reveal(element, i * 70));
  }
  setupReveals();
  motion.addEventListener('change', () => {
    revealObserver?.disconnect();
    if (motion.matches) [...running].forEach(animation => animation.cancel());
    else setupReveals();
  });

  // Keyboard navigation never has to wait for a fade-in.
  document.addEventListener('focusin', event => {
    [...running].forEach(animation => {
      if (animation.effect.target.contains(event.target)) animation.cancel();
    });
  });
  window.addEventListener('beforeprint', () => [...running].forEach(animation => animation.cancel()));

  let queued = false;
  let headerHeight = header.offsetHeight;
  function syncHeaderHeight() {
    headerHeight = header.offsetHeight;
    document.documentElement.style.scrollPaddingTop = `${headerHeight + 24}px`;
    queueUpdate();
  }
  function updateScroll() {
    queued = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    const fraction = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
    progress.style.transform = `scaleX(${fraction})`;
    header.classList.toggle('is-scrolled', scrollY > 16);
    back.hidden = scrollY < 600 && document.activeElement !== back;
    const line = headerHeight + (innerHeight - headerHeight) * .25;
    let current;
    destinations.forEach(item => {
      if (item.section && item.section.getBoundingClientRect().top <= line) current = item.link;
    });
    // The final section can be shorter than the viewport.
    if (max > 0 && scrollY >= max - 2) current = navLinks.at(-1);
    navLinks.forEach(link => {
      if (link === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function queueUpdate() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(updateScroll);
  }
  window.addEventListener('scroll', queueUpdate, { passive: true });
  window.addEventListener('resize', syncHeaderHeight, { passive: true });
  back.addEventListener('blur', queueUpdate);
  if ('ResizeObserver' in window) new ResizeObserver(syncHeaderHeight).observe(header);
  syncHeaderHeight();
})();
