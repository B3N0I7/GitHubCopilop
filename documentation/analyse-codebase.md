# Analyse de la codebase

Date : 2025-12-10

## Résumé rapide

Projet : Single Page Application React + TypeScript construite avec Vite. Le projet regroupe une documentation interactive (modes, instructions, agents personnalisés) exposée via des constantes dans `src/data/documentation.ts` et rendue par des pages React.

## Démarrage rapide

- Installer les dépendances :

```powershell
npm install
```

- Lancer le serveur de développement (Vite) :

```powershell
npm run dev
```

- Construire pour la production :

```powershell
npm run build
```

Scripts utiles (extrait de `package.json`) :

```powershell
npm run dev    # lance Vite en mode développement
npm run build  # exécute `tsc` puis `vite build`
npm run preview# prévisualise le build localement
```

## Points d'entrée importants

- `index.html` → point d'entrée HTML
- `src/main.tsx` → bootstrap React
- `src/App.tsx` → routes main et configuration React Router
- `src/data/documentation.ts` → données de la documentation (modes, instructions, navigation)
- `src/components/Layout.tsx` → layout global (header, sidebar, main)
- `src/components/Header.tsx`, `src/components/Sidebar.tsx`, `src/components/SearchBar.tsx`, `src/components/CodeBlock.tsx` → composants réutilisables
- `src/pages/*` → pages (Home, ModePage, InstructionPage, CustomAgentsPage)

## Architecture & flux

- Routing : défini dans `src/App.tsx` (utilisation confirmée de React Router v6). Routes principales :

  - `/` → `Home`
  - `/modes` → redirect vers `/modes/ask-mode`
  - `/modes/:modeId` → `ModePage`
  - `/instructions` → redirect vers `/instructions/prompt-engineering`
  - `/instructions/:instructionId` → `InstructionPage`
  - `/custom-agents` → `CustomAgentsPage`
  - `*` → redirige vers `/`

- Données : centralisées dans `src/data/documentation.ts` et importées par les pages et la barre de recherche
- Recherche : implémentée côté client dans `SearchBar` (indexation des données de `documentation.ts`) via `Fuse.js`.
  - Les champs indexés : `title`, `description`, `content`.
  - Seuil de similarité : `threshold: 0.3`.
  - Résultats limités à 5 et navigation automatique vers la route correspondante :
    - si l'ID correspond à `copilotModes` → `/modes/:id`
    - si l'ID correspond à `instructionsData` → `/instructions/:id`
    - si l'ID correspond à `customAgentsData` → `/custom-agents`
- Syntax highlighting : `CodeBlock` utilise `prism-react-renderer` ou équivalent
- Thème : Tailwind CSS (config dans `tailwind.config.js`), dark mode géré via une classe `dark` sur le `document.documentElement`.
  - `Layout` expose `isDarkMode` et bascule la classe `dark` via un `useEffect`.
  - Recommandation : persister `isDarkMode` dans `localStorage` pour garder la préférence entre sessions.

## Composants et responsabilités

- `Layout` : conteneur global, bascule du thème, état du sidebar
  - `isSidebarOpen` (state local) contrôle l'affichage de la `Sidebar` et l'offset du `main` (`ml-64` quand ouvert)
  - `Header` reçoit des callbacks pour ouvrir/fermer la sidebar et basculer le thème
- `Header` : contient la barre de recherche et éléments de navigation globaux
- `Sidebar` : navigation latérale, génère les liens à partir de `navigation` dans `documentation.ts`
- `SearchBar` : recherche full-text et navigation vers les pages correspondantes
- `CodeBlock` : rendu de blocs de code avec copie et coloration

## Style & configuration

- Tailwind configuré via `tailwind.config.js` et `postcss.config.js` (présence de `autoprefixer` et `postcss` dans les `devDependencies`).
- Styles globaux : `src/index.css`
- Vite configuré via `vite.config.ts`

## Tests & CI

- Tests & CI : pas de dépendances de test détectées dans `package.json`. Recommandation : ajouter `vitest` et `@testing-library/react`, puis un workflow GitHub Actions basique qui exécute `npm ci`, `npm run build` et `npm test`.

## Sécurité & bonnes pratiques

- Vérifier l'absence de secrets dans le repo (API keys dans `src/` ou `public/`)
- Activer `strict` dans `tsconfig.json` si ce n'est pas déjà fait
- Centraliser les appels réseau dans un dossier `src/services` et typer les réponses

## Recommandations d'amélioration

- Ajouter des tests unitaires et d'intégration (Vitest + React Testing Library)
- Ajouter CI (GitHub Actions) pour lint/build/tests
- Persister la préférence du thème dans `localStorage` (dans `Layout`)
- Documenter le format des données dans `src/data/documentation.ts` (types et exemples)
- Ajouter un script `analyze` pour analyser la taille du bundle Vite

## Liens utiles (fichiers clés)

- `package.json` (dépendances clés) :

- runtime : `react`, `react-dom`, `react-router-dom`, `react-markdown`, `prism-react-renderer`, `fuse.js`, `lucide-react`
- dev : `@vitejs/plugin-react`, `typescript`, `vite`, `tailwindcss`, `postcss`, `autoprefixer`

- `tsconfig.json` / `tsconfig.node.json`
- `vite.config.ts`
- `tailwind.config.js` / `postcss.config.js`
- `src/data/documentation.ts`
- `src/components/Layout.tsx`
- `src/components/Header.tsx`
- `src/components/Sidebar.tsx`
- `src/components/SearchBar.tsx`
- `src/components/CodeBlock.tsx`
- `src/pages/*`

---

Fichier généré automatiquement par l'assistant. Si tu veux, je peux :

- Ajouter un sommaire plus détaillé (section par fichier)
- Exécuter `npm run build` et fournir un rapport de bundle
- Ajouter des exemples de tests et config CI
