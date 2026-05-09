export const fr = {
  nav: {
    services: 'Services',
    cases: 'Études de cas',
    wall: 'The Visual Wall',
    approach: 'Approche',
    cta: 'Parlons-en',
  },
  cases: {
    pageTitle: 'Études de cas',
    pageSubtitle: 'Histoires de produits et services',
    caseLabel: 'Étude de cas',
    viewAll: 'Voir tous les projets',
    backHome: "Retour à l'accueil",
    sections: {
      context: 'Contexte',
      methodology: 'Méthodologie',
      hypothesis: 'Hypothèse',
      solution: 'Solution',
      deliverables: 'Livrables',
      results: 'Résultats',
      visuals: 'Visuels',
      challengesTitle: 'Principaux challenges rencontrés :',
    },
    filters: {
      all: 'Tous',
      featured: 'Coups de cœur',
    },
  },
  services: {
    pageTitle: 'Services — Concepteur Produit',
    pageDescription: 'Ma trousse de savoir-faire en design produit.',
  },
  wall: {
    label: 'The Visual Wall',
    pageTitle: 'The Visual Wall — Stéphane Wagner',
    pageSubtitle: 'Archives visuelles et autres projets numériques',
    pageDescription: 'Une collection de visuels — illustrations, photographies, explorations graphiques.',
    empty: 'En cours de construction.',
  },
} as const;

export type UI = typeof fr;
