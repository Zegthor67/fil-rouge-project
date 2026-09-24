document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
  new bootstrap.Tooltip(el);
});

document.querySelectorAll('.btn-ma-liste').forEach((bouton) => {
  bouton.addEventListener('click', () => {
    const ajoute = bouton.getAttribute('aria-pressed') === 'true';
    bouton.setAttribute('aria-pressed', String(!ajoute));
    bouton.textContent = ajoute ? 'Ma Liste' : 'Dans ma liste';
  });
});

const switchTheme = document.getElementById('switch-theme');

if (switchTheme) {
  switchTheme.checked = document.documentElement.getAttribute('data-bs-theme') === 'light';

  switchTheme.addEventListener('change', () => {
    const theme = switchTheme.checked ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}
  });
}
