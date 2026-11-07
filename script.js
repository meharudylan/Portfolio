const btn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');
btn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
  btn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  btn.textContent = open ? '✕' : '☰';
});
nav.addEventListener('click', e => {
  if (e.target.closest('a')) {
    nav.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Abrir menú');
    btn.textContent = '☰';
  }
});
document.querySelectorAll('[data-open]').forEach(b => {
  const dlg = document.getElementById(b.dataset.open);
  b.addEventListener('click', () => dlg.showModal());
});
document.querySelectorAll('dialog').forEach(dlg => {
  dlg.querySelector('[data-close]').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
});

const root = document.documentElement;
const themeBtn = document.querySelector('.theme-btn');
const themeMeta = document.querySelector('meta[name="theme-color"]');
function applyTheme(t) {
  root.dataset.theme = t;
  themeBtn.setAttribute('aria-pressed', t === 'dark');
  themeBtn.setAttribute('aria-label', t === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  themeMeta.setAttribute('content', t === 'dark' ? '#0c2340' : '#f6f2ea');
}
themeBtn.addEventListener('click', () => {
  const t = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', t); } catch (e) { }
  applyTheme(t);
});
applyTheme(root.dataset.theme);
