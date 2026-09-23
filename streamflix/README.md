# StreamFlix

Projet fil rouge : plateforme de streaming en HTML, Bootstrap 5 et SASS.

## Installation

```bash
cd streamflix
npm install
```

## Compilation SASS

- `npm run watch` : recompile `css/style.css` automatiquement à chaque sauvegarde d'un fichier `.scss`
- `npm run build` : version minifiée pour la mise en ligne

Il ne faut jamais modifier `css/style.css` directement, il est écrasé à chaque compilation.

## Organisation (architecture 7-1)

```
scss/
├── base/          reset et typographie
├── components/    boutons, cartes, navigation
├── layout/        header, hero, footer
├── pages/         styles propres à la page d'accueil
├── utils/         variables et mixins (aucune sortie CSS)
├── vendors/       personnalisation de Bootstrap
└── style.scss     fichier principal qui importe tout le reste
```

Bootstrap 5.3 est chargé par le CDN. Le paquet npm `bootstrap` sert uniquement à récupérer ses variables et mixins SASS dans `vendors/_bootstrap-custom.scss`, pour adapter ses couleurs à la charte StreamFlix sans recompiler tout le framework.

## Branches

- `main` : structure HTML de départ
- `cssNatif` : version avant la migration
- `bootstrap-sass` : migration vers Bootstrap et SASS
