# GitHub Copilot - Documentation Ultime

Une Single Page Application (SPA) complète pour documenter GitHub Copilot, construite avec React, TypeScript et Tailwind CSS.

## 🚀 Fonctionnalités

- **Documentation complète** des modes Copilot (Ask, Edit, Agent, Plan)
- **Recherche en temps réel** avec Fuse.js
- **Coloration syntaxique** pour les exemples de code (Prism)
- **Mode sombre/clair** avec persistance
- **Navigation fluide** avec React Router v6
- **Design responsive** et moderne avec Tailwind CSS
- **Copy-to-clipboard** sur tous les blocs de code
- **TypeScript** pour la sécurité des types

## 📦 Stack Technologique

- **Framework**: React 18.2
- **Langage**: TypeScript 5.2
- **Build Tool**: Vite 5.0
- **Routing**: React Router DOM 6.20
- **Styling**: Tailwind CSS 3.4
- **Markdown**: React Markdown 9.0
- **Syntax Highlighting**: Prism React Renderer 2.3
- **Recherche**: Fuse.js 7.0
- **Icônes**: Lucide React 0.300

## 🛠️ Installation et Développement

### Prérequis

- Node.js 16+ et npm

### Démarrage rapide

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build

# Prévisualiser le build de production
npm run preview
```

L'application sera accessible sur `http://localhost:5173/`

## 📁 Structure du Projet

```
c:\DEV\Github-Copilot/
├── public/
│   └── copilot-icon.svg
├── src/
│   ├── components/
│   │   ├── CodeBlock.tsx       # Composant de bloc de code avec copie
│   │   ├── Header.tsx          # En-tête avec recherche et toggle dark mode
│   │   ├── Layout.tsx          # Layout principal de l'application
│   │   ├── SearchBar.tsx       # Barre de recherche avec Fuse.js
│   │   └── Sidebar.tsx         # Menu latéral de navigation
│   ├── data/
│   │   └── documentation.ts    # Contenu structuré de la documentation
│   ├── pages/
│   │   ├── CustomAgentsPage.tsx    # Page agents personnalisés
│   │   ├── Home.tsx                # Page d'accueil
│   │   ├── InstructionPage.tsx     # Page instructions/prompts
│   │   └── ModePage.tsx            # Page modes Copilot
│   ├── App.tsx                 # Configuration des routes
│   ├── index.css               # Styles globaux + Tailwind
│   ├── main.tsx                # Point d'entrée React
│   └── vite-env.d.ts          # Types Vite
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 📚 Contenu de la Documentation

### Modes Copilot

1. **Ask Mode** - Questions/réponses contextuelles
2. **Edit Mode** - Modifications de code en langage naturel
3. **Agent Mode** - Agents spécialisés (@workspace, @terminal, @vscode)
4. **Plan Mode** - Planification de tâches complexes

### Instructions & Prompts

1. **Prompt Engineering** - Techniques pour créer des prompts efficaces
2. **Commandes Slash** - Raccourcis (/explain, /fix, /tests, /doc, /optimize)

### Agents Personnalisés

- Guide complet pour créer vos propres agents Copilot
- Exemples de manifest et handlers
- Best practices et conseils

## 🎨 Personnalisation

### Thème

Modifiez `tailwind.config.js` pour personnaliser les couleurs, typographies et autres styles.

### Contenu

Éditez `src/data/documentation.ts` pour ajouter ou modifier le contenu de la documentation.

### Navigation

Mettez à jour le tableau `navigation` dans `src/data/documentation.ts` pour ajouter de nouvelles sections.

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

### Déploiement sur des plateformes

- **Vercel**: `vercel --prod`
- **Netlify**: Glissez le dossier `dist/` ou utilisez Netlify CLI
- **GitHub Pages**: Configurez le workflow GitHub Actions

## 🤝 Contribution

Les contributions sont les bienvenues ! Cette application est conçue pour être facilement extensible.

## 📄 Licence

MIT

---

**Construit avec ❤️ par un senior front-end engineer avec 15 ans d'expérience**
