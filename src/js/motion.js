export function setupMotionPreference() {
  const system = window.matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = new Set();
  const profile = {
    reduced: system.matches,
    subscribe(listener) { listeners.add(listener); }
  };
  function sync() {
    profile.reduced = system.matches;
    document.documentElement.dataset.motion = profile.reduced ? 'reduced' : 'full';
    listeners.forEach(listener => listener());
  }
  system.addEventListener('change', sync);
  sync();
  return profile;
}
