# Coaching Case

Plateforme bilingue (FR/EN) de préparation aux entretiens de conseil : programme de 8 semaines, calcul mental chronométré, bibliothèque d'études de cas guidées en six étapes (filtres, recherche), fit interview (méthode STAR), tests de raisonnement numérique et verbal, suivi de progression.

## Démarrage

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # tests unitaires (Vitest)
npm run build    # build de production dans dist/
```

Sans configuration, l'application tourne en **mode local** : l'utilisateur saisit son prénom et sa progression est stockée dans le navigateur (`localStorage`).

## Brancher Supabase (comptes et progression en ligne)

1. Créer un projet sur [supabase.com](https://supabase.com).
2. Appliquer le schéma : exécuter `supabase/migrations/0001_init.sql` dans l'éditeur SQL, ou utiliser `supabase db push` avec la CLI.
3. Copier `.env.example` en `.env` et renseigner `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` (Project Settings → API).
4. Relancer `npm run dev` : l'écran de connexion passe en e-mail + mot de passe.

Chaque utilisateur ne voit que ses propres lignes, grâce aux règles RLS définies dans la migration.

## Structure

```
src/
  main.js            routeur (#/dashboard, #/roadmap, #/drill, #/cases/:id, #/fit, #/tests/:id, #/profile)
  styles.css         thème (clair/sombre via prefers-color-scheme)
  lib/
    i18n.js          traductions, t() pour l'interface, tr() pour le contenu {fr, en}
    auth.js          Supabase Auth ou profil local
    store.js         progression : Supabase si configuré, localStorage sinon
    drill.js         générateur et correcteur du calcul mental (pur, testé)
    cases.js         aides du lecteur de cas (pur, testé)
  locales/           fr.js, en.js (mêmes clés, vérifié par les tests)
  content/
    cases.js         banque de cas
    fit.js           banque de questions fit
    roadmap.js       programme de 8 semaines
    tests.js         tests de raisonnement numérique et verbal
  views/             un fichier par écran
supabase/migrations/ schéma SQL + RLS
tests/               Vitest
```

## Ajouter du contenu

- **Un cas** : ajouter un objet dans `src/content/cases.js`, en suivant la forme des cas existants. Chaque texte est un objet `{ fr, en }`. Les tests vérifient que les deux langues sont complètes.
- **Une question fit** : ajouter une entrée dans `QUESTIONS` (`src/content/fit.js`).
- **Une tâche du programme** : ajouter une entrée dans la semaine voulue (`src/content/roadmap.js`), avec un `id` unique et, en option, un lien `href` vers un module.
- **Une question de test** : ajouter une entrée dans `TESTS.numerical` ou `TESTS.verbal` (`src/content/tests.js`). `answer` est l'index de la bonne option.
- **Un libellé d'interface** : ajouter la clé dans `src/locales/fr.js` **et** `src/locales/en.js`.

## Déploiement

`netlify.toml` est prêt : build `npm run build`, dossier publié `dist`. Déclarer les variables `VITE_SUPABASE_*` dans les paramètres du site.
