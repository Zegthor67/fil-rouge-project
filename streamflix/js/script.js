// Le menu profil est géré par le dropdown de Bootstrap
// (ouverture, fermeture avec Échap et navigation aux flèches)

// Les tooltips Bootstrap ne s'activent pas tout seuls
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
  new bootstrap.Tooltip(el);
});

// Bouton "Ma Liste" : on bascule l'état ajouté / pas ajouté
document.querySelectorAll('.btn-ma-liste').forEach((bouton) => {
  bouton.addEventListener('click', () => {
    const ajoute = bouton.getAttribute('aria-pressed') === 'true';
    bouton.setAttribute('aria-pressed', String(!ajoute));
    bouton.textContent = ajoute ? 'Ma Liste' : 'Dans ma liste';
  });
});
