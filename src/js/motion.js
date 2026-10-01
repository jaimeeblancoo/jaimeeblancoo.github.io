export function setupMotionPreference() {
  const system = window.matchMedia('(prefers-reduced-motion: reduce)');
  const listeners = new Set();
  let choice;
  try { choice = localStorage.getItem('portfolio-motion'); } catch { /* Storage is optional. */ }
  const controller = {
    enabled: choice === 'on' || (choice !== 'off' && !system.matches),
    subscribe(listener) { listeners.add(listener); }
  };
  const english = document.documentElement.lang === 'en';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'motion-toggle';
  const languages = document.querySelector('.language-switch');
  const tools = document.createElement('div');
  tools.className = 'header-tools';
  languages.before(tools);
  tools.append(languages, button);

  function sync() {
    document.documentElement.dataset.motion = controller.enabled ? 'on' : 'off';
    button.setAttribute('aria-pressed', String(controller.enabled));
    button.textContent = english
      ? (controller.enabled ? 'Pause animations' : 'Enable animations')
      : (controller.enabled ? 'Pausar animaciones' : 'Activar animaciones');
    listeners.forEach(listener => listener(controller.enabled));
  }
  button.addEventListener('click', () => {
    controller.enabled = !controller.enabled;
    choice = controller.enabled ? 'on' : 'off';
    try { localStorage.setItem('portfolio-motion', choice); } catch { /* Works without storage. */ }
    sync();
  });
  system.addEventListener('change', () => {
    if (choice === 'on' || choice === 'off') return;
    controller.enabled = !system.matches;
    sync();
  });
  sync();
  return controller;
}
