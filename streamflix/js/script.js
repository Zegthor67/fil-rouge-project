// ===================================
// EXERCICE 1 : Afficher/masquer sections
// ===================================

const boutonsSection = document.querySelectorAll('.btn-toggle-section');

boutonsSection.forEach((bouton) => {
  bouton.addEventListener('click', () => {
    const grille = document.querySelector('#' + bouton.getAttribute('aria-controls'));
    const estMasquee = grille.classList.toggle('hidden');

    bouton.textContent = estMasquee ? 'Afficher' : 'Masquer';
    bouton.setAttribute('aria-expanded', String(!estMasquee));
  });
});

// ===================================
// EXERCICE 2 : Compteur de films
// ===================================

const nombreFilms = document.querySelectorAll('article').length;

const compteur = document.createElement('p');
compteur.classList.add('compteur-films', 'text-center', 'mt-2', 'mb-0');
compteur.textContent = 'Catalogue : ' + nombreFilms + ' films disponibles';

document.querySelector('.pied-de-page .container-fluid').appendChild(compteur);

// ===================================
// EXERCICE 3 : Films vus
// ===================================

const cartesFilms = document.querySelectorAll('.carte-film');

cartesFilms.forEach((carte) => {
  carte.addEventListener('click', (event) => {
    // on ne marque pas le film si on clique sur le lien "Voir le film"
    if (event.target.closest('a')) {
      return;
    }

    const estVu = carte.classList.toggle('watched');
    carte.querySelector('.btn-vu').setAttribute('aria-pressed', String(estVu));
  });
});

// ===================================
// EXERCICE 4 : Recherche
// ===================================

const searchInput = document.querySelector('#search');
const messageRecherche = document.querySelector('#aucun-resultat');

searchInput.addEventListener('input', function () {
  const searchTerm = this.value.trim().toLowerCase();
  const articles = document.querySelectorAll('article');
  let nbResultats = 0;

  articles.forEach((article) => {
    const title = article.querySelector('h3').textContent.toLowerCase();
    // chaque article est dans une colonne (li), c'est elle qu'on cache pour ne pas laisser de trou
    const colonne = article.parentElement;

    if (title.includes(searchTerm)) {
      colonne.style.display = '';
      nbResultats++;
    } else {
      colonne.style.display = 'none';
    }
  });

  // une section sans aucun film correspondant est cachée aussi
  document.querySelectorAll('.rangee').forEach((section) => {
    const filmsVisibles = [...section.querySelectorAll('.grille-films > li')].filter((li) => li.style.display !== 'none');
    section.style.display = filmsVisibles.length > 0 ? '' : 'none';
  });

  messageRecherche.textContent = nbResultats === 0 ? 'Aucun résultat pour « ' + this.value.trim() + ' »' : '';
});

// la recherche se fait en direct, pas besoin d'envoyer le formulaire
searchInput.closest('form').addEventListener('submit', (event) => {
  event.preventDefault();
});

// ===================================
// Bootstrap et thème
// ===================================

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
