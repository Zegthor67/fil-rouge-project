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
