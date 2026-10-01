export function setupLanguageSwitch() {
  // Keep the same section when switching languages; plain links work without JS.
  document.querySelectorAll('[data-language-link]').forEach(link => {
    link.addEventListener('click', () => {
      const current = document.querySelector('nav a[aria-current="location"]');
      const target = new URL(link.href);
      target.hash = current?.hash || '#inicio';
      link.href = target.href;
    });
  });
}
