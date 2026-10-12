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
    // le bouton "Voir le film" ouvre la modal (exercice 5), il ne marque pas le film
    if (event.target.closest('.btn-details')) {
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
// EXERCICE 5 : Modal
// ===================================

const modal = document.querySelector('#modal');
const modalBody = document.querySelector('#modal-body');
const boutonFermer = modal.querySelector('.close');
let boutonOrigine = null;

function openModal(article) {
  const title = article.querySelector('h3').textContent;

  // on vide la modal puis on la remplit avec le titre et les infos du film cliqué
  modalBody.innerHTML = '';

  const titre = document.createElement('h2');
  titre.id = 'modal-titre';
  titre.classList.add('h3', 'mb-3');
  titre.textContent = title;

  modalBody.appendChild(titre);
  modalBody.appendChild(article.querySelector('.infos-film').cloneNode(true));

  modal.setAttribute('aria-labelledby', 'modal-titre');
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';

  boutonOrigine = document.activeElement;
  boutonFermer.focus();
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = '';

  if (boutonOrigine) {
    boutonOrigine.focus();
  }
}

document.querySelectorAll('.btn-details').forEach((bouton) => {
  bouton.addEventListener('click', () => {
    openModal(bouton.closest('article'));
  });
});

boutonFermer.addEventListener('click', closeModal);

// clic sur le fond noir autour de la modal
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener('keydown', (event) => {
  if (modal.style.display !== 'block') {
    return;
  }

  if (event.key === 'Escape') {
    closeModal();
  }

  // la croix est le seul élément cliquable de la modal, on garde le focus dessus
  if (event.key === 'Tab') {
    event.preventDefault();
    boutonFermer.focus();
  }
});

// ===================================
// EXERCICE 6 : Thème sombre / clair (bonus)
// ===================================

const boutonTheme = document.querySelector('#bouton-theme');

// le thème a déjà été choisi dans le <head> pour éviter un flash au chargement,
// ici on met juste la classe du body et le texte du bouton à jour
if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
  document.body.classList.add('dark-theme');
}
boutonTheme.textContent = document.body.classList.contains('dark-theme') ? 'Mode clair' : 'Mode sombre';

boutonTheme.addEventListener('click', () => {
  const sombre = document.body.classList.toggle('dark-theme');
  const theme = sombre ? 'dark' : 'light';

  // Bootstrap et nos variables SCSS se basent sur data-bs-theme
  document.documentElement.setAttribute('data-bs-theme', theme);
  boutonTheme.textContent = sombre ? 'Mode clair' : 'Mode sombre';

  try {
    localStorage.setItem('theme', theme);
  } catch (e) {}
});

// ===================================
// Bootstrap (tooltip et bouton Ma Liste)
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
