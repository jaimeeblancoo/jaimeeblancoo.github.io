export function setupReveals(motion) {
  const running = new Set();
  const revealed = new WeakSet();
  let revealObserver;

  function reveal(element, delay = 0) {
    if (revealed.has(element)) return;
    revealed.add(element);
    if (typeof element.animate !== 'function') return;
    // Reduced motion gets a short fade with no spatial movement or stagger.
    const frames = motion.reduced
      ? [{ opacity: .55 }, { opacity: 1 }]
      : [{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'translateY(0)' }];
    const animation = element.animate(frames, {
      duration: motion.reduced ? 220 : 600,
      delay: motion.reduced ? 0 : delay,
      easing: 'cubic-bezier(.22, 1, .36, 1)',
      fill: 'both'
    });
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
    if (items.length) items.forEach((element, i) => blocks.push({ element, delay: Math.min(i % 3 * 60, 120) }));
    else blocks.push({ element: content, delay: 80 });
  });
  const contact = document.querySelector('.contact');
  if (contact) blocks.push({ element: contact, delay: 0 });
  const delays = new WeakMap(blocks.map(({ element, delay }) => [element, delay]));

  function observeBlocks() {
    if (!('IntersectionObserver' in window)) return;
    revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        reveal(entry.target, delays.get(entry.target));
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
    blocks.forEach(({ element }) => {
      if (!revealed.has(element)) revealObserver.observe(element);
    });
  }

  // Intro animation only applies when the visitor starts at the top.
  if (scrollY < 80 && !location.hash) {
    document.querySelectorAll('.hero > div > *, .hero > aside').forEach((element, i) => reveal(element, i * 70));
  }
  observeBlocks();
  motion.subscribe(() => {
    [...running].forEach(animation => animation.cancel());
  });

  // Keyboard navigation never has to wait for a fade-in.
  document.addEventListener('focusin', event => {
    [...running].forEach(animation => {
      if (animation.effect.target.contains(event.target)) animation.cancel();
    });
  });
  window.addEventListener('beforeprint', () => [...running].forEach(animation => animation.cancel()));

}
