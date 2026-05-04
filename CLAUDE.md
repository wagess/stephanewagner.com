# Portfolio — Concepteur Produit

Site portfolio statique construit avec Astro, présentant des études de cas UX/produit.

## Stack

- **Astro 5** — générateur de sites statiques
- **TypeScript** — mode strict
- **CSS vanilla** — pas de framework CSS, variables globales dans `Layout.astro`
- **GLightbox** — galerie d'images côté client
- **Polices** : Cormorant Garamond (titres), Libre Franklin (corps), Space Mono (labels)

## Commandes

```bash
npm run dev      # Serveur de développement — localhost:4321
npm run build    # Build production → ./dist/
npm run preview  # Prévisualiser le build local
```

## Structure cible (multilingue)

Le site sera disponible en **français** (langue par défaut) et en **anglais**.
Stratégie : i18n natif d'Astro 5 avec préfixe de locale dans l'URL.

```
src/
├── pages/
│   ├── index.astro           # Redirige vers /fr/ ou détecte la langue
│   ├── fr/
│   │   ├── index.astro       # Page d'accueil FR
│   │   └── cases/
│   │       ├── index.astro
│   │       └── [slug].astro
│   └── en/
│       ├── index.astro       # Page d'accueil EN
│       └── cases/
│           ├── index.astro
│           └── [slug].astro
├── components/               # Composants Astro réutilisables (language-agnostic)
├── layouts/Layout.astro      # Layout global — reçoit `lang` en prop
├── content/
│   └── cases/
│       ├── fr/               # Études de cas en français
│       └── en/               # Études de cas en anglais
├── i18n/
│   ├── fr.ts                 # Traductions UI (nav, labels, sections)
│   └── en.ts
└── assets/                   # Icônes SVG
public/cases/                 # Images partagées entre les deux langues
```

### Configuration i18n dans `astro.config.mjs`

```js
export default defineConfig({
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: true, // /fr/ et /en/ tous les deux préfixés
    },
  },
})
```

### Règles i18n

- Les URLs sont toujours préfixées : `/fr/cases/mon-cas`, `/en/cases/my-case`
- Les slugs peuvent différer entre les deux langues
- Les chaînes UI (nav, labels, titres de sections) passent par `src/i18n/`
- Les composants reçoivent `lang: 'fr' | 'en'` en prop et appellent le bon dictionnaire
- Les images sont partagées — un seul dossier `public/cases/`
- Ajouter un sélecteur de langue dans `Navigation.astro`

## Contenu

Les études de cas sont des fichiers Markdown dans `src/content/cases/`. Le schéma est défini dans `src/content.config.ts`.

Frontmatter attendu :

```yaml
title: string
cover: string          # chemin image de couverture
year: number
tags: string[]
star_summary: string   # accroche principale
contexte: string | string[]
probleme: string | string[]
hypothese: string | string[]
solution: string | string[]
methodologie: string | string[]
livrables: string | string[]
resultat: string | string[]
challenges: array
variant: 'default' | 'secondary'
external_url: string   # optionnel
```

Utiliser `_template.md` comme point de départ pour un nouveau cas.

## Conventions

- Langues : **français** (par défaut) + **anglais** (à venir)
- CSS scopé dans chaque composant Astro (`<style>`)
- Variables globales : `--color-accent` (#8619e0), `--spacing-container`, `--section-spacing`, `--border-radius` (10px)
- Breakpoint responsive : 768px
- JS côté client minimal — préférer le rendu serveur Astro
- Pas de commits directs sur la branche principale sans build propre

## Services externes

- **Upstash Redis** — KV store pour les likes des études de cas
  - Console : https://console.upstash.com/redis?teamid=0
  - Base : `knowing-maggot-40629`
  - Credentials dans `.env` (`PUBLIC_UPSTASH_REDIS_REST_URL`, `PUBLIC_UPSTASH_REDIS_REST_TOKEN`)

## À faire plus tard

- [ ] Migration multilingue (FR + EN) avec i18n natif Astro 5
- [ ] Sélecteur de langue dans `Navigation.astro`
- [x] Améliorer les filtres dans la page Cases
- [ ] Booster le SEO, surtout avec les pages de projets
- [ ] Grille Gallery flexible (ex. si une seule image -> pleine largeur)
- [ ] Pipeline de déploiement GitHub Actions → Dreamhost via SSH + rsync
  - Repo : `git@github.com:wagess/stephanewagner.com.git`
  - Host : `pdx1-shared-a1-34.dreamhost.com`
  - User SSH : `wagess`
  - Chemin : `/home/wagess`
