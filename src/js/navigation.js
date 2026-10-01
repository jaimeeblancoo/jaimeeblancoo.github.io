export function setupNavigation() {
  const header = document.querySelector('header');
  const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
  const destinations = navLinks.map(link => ({ link, section: document.querySelector(link.hash) }));
  const progress = document.createElement('div');
  progress.className = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.append(progress);

  const back = document.createElement('a');
  back.className = 'back-to-top';
  back.href = '#inicio';
  back.textContent = '↑';
  back.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Back to top' : 'Volver al inicio');
  back.hidden = true;
  document.body.append(back);

  let queued = false;
  let headerHeight = header.offsetHeight;
  function syncHeaderHeight() {
    headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
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
}
