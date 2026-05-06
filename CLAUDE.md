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

## Déploiement

Le déploiement est automatique via GitHub Actions à chaque push sur `main` :

```bash
git add .
git commit -m "description des changements"
git push
```

Le workflow build Astro et rsync vers `pdx1-shared-a1-34.dreamhost.com:/home/wagess/stephanewagner.com/public/`.

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

## Mobile-first — Chantier en cours

Le site est actuellement en approche **desktop-first** (media queries `max-width`). L'objectif est de migrer vers une approche **mobile-first** (`min-width`).

### Problèmes critiques (à traiter en priorité)

- [x] **Menu mobile manquant** (`Navigation.astro`) — le CTA est masqué sous 768px mais les liens restent en ligne ; aucun hamburger/drawer prévu
- [ ] **Overflow horizontal** (`ToolsBanner.astro:107-113`) — `width: 110%; margin-left: -5%` crée un scroll horizontal sur mobile
- [ ] **Hauteur fixe `ServiceCard`** (`ServiceCard.astro:32`) — `height: 220px` fait déborder le contenu ; remplacer par `min-height`

### Problèmes importants

- [ ] **Refonte mobile-first** — toutes les media queries sont en `max-width` ; migrer vers `min-width` avec styles de base pour mobile
- [ ] **Typographie secondaire non responsive** — les titres utilisent `clamp()` mais les textes courants dans `ServiceCard`, `HeroPillar`, etc. ont des tailles fixes en `px`
- [ ] **Pas de breakpoint < 768px** — aucune règle pour petits téléphones (≤ 480px)
- [ ] **VennDiagram SVG** (`VennDiagram.astro:49-54`) — labels à coordonnées `x/y` fixes, se superposent sur petit écran

### Améliorations secondaires

- [ ] **Breakpoint tablette** — pas de règle intermédiaire entre 768px et 1024px
- [ ] **Breakpoint large écran** — aucune règle au-delà de 1024px (1440px+)
- [ ] **Avatar Hero** (`Hero.astro:95`) — `72px` fixe, ne s'adapte pas aux très petits écrans
- [ ] **Parallax banner** (`[slug].astro`) — `height: 85vh` trop haute sur mobile
- [ ] **`HeroPillar` padding** (`HeroPillar.astro:72`) — `padding: 2rem` fixe sans adaptation

### Ce qui fonctionne déjà bien (ne pas casser)

- Viewport meta correct (`Layout.astro:16`)
- Variables `--spacing-container` et `--section-spacing` qui scalent à 768px
- Grilles qui passent à 1 colonne sur mobile (Services, Cases, `[slug].astro`)
- Images avec `aspect-ratio` + `object-fit` + `max-width: 100%`
- `clamp()` sur tous les titres principaux
- `loading="lazy"` sur les images galerie

## À faire plus tard

- [ ] **Wall type Pinterest** — galerie masonry de projets/images
  - Option A : interface drag & drop custom pour uploader les images directement
  - Option B : Cloudinary — script client-side qui fetch `https://res.cloudinary.com/{cloud_name}/image/list/{tag}.json`
    - Taguer les images `wall` dans Cloudinary
    - Aucun rebuild nécessaire : ajouter une image → elle apparaît au prochain chargement
    - Pas de webhook, pas de GitHub Actions
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
