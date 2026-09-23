// Menu du profil : ouverture / fermeture au clic et touche Échap pour fermer
const boutonProfil = document.querySelector('.profil-bouton');
const menuProfil = document.getElementById('menu-profil');

if (boutonProfil && menuProfil) {
  boutonProfil.addEventListener('click', () => {
    const ouvert = boutonProfil.getAttribute('aria-expanded') === 'true';
    boutonProfil.setAttribute('aria-expanded', String(!ouvert));
    menuProfil.hidden = ouvert;
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menuProfil.hidden) {
      menuProfil.hidden = true;
      boutonProfil.setAttribute('aria-expanded', 'false');
      boutonProfil.focus();
    }
  });
}
