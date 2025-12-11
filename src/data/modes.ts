import { DocSection } from "./types";
import { rawLoader } from "./loaders";

export const copilotModes: DocSection[] = [
  {
    id: "ask-mode",
    title: "Ask Mode",
    description: "Posez des questions et obtenez des réponses contextuelles",
    loader: rawLoader("modes/ask-mode.md"),
    examples: [
      {
        title: "Question sur une fonction",
        code: `// Question : "Que fait cette fonction ?"
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}`,
        language: "javascript",
        description:
          "Copilot explique le concept de debouncing et comment cette fonction fonctionne",
      },
      {
        title: "Demande d'explication d'erreur",
        code: `// Question : "Pourquoi j'ai cette erreur : 'Cannot read property of undefined' ?"
const user = data.user;
console.log(user.name); // Error!`,
        language: "javascript",
        description:
          "Copilot identifie que data.user peut être undefined et suggère des solutions",
      },
    ],
    tips: [
      "Soyez spécifique dans vos questions",
      "Fournissez du contexte quand nécessaire",
      "Utilisez des exemples concrets",
      "Demandez des clarifications si la réponse n'est pas claire",
    ],
    relatedLinks: [
      { title: "Edit Mode", path: "/modes/edit-mode" },
      { title: "Agent Mode", path: "/modes/agent-mode" },
    ],
  },

  {
    id: "edit-mode",
    title: "Edit Mode",
    description: "Modifiez votre code avec des instructions en langage naturel",
    loader: rawLoader("modes/edit-mode.md"),
    examples: [
      {
        title: "Refactoring vers async/await",
        code: `// Instruction : "Convertir cette fonction pour utiliser async/await"
function fetchData() {
  return fetch('/api/data')
    .then(response => response.json())
    .then(data => processData(data))
    .catch(error => console.error(error));
}

// Résultat après edit
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return processData(data);
  } catch (error) {
    console.error(error);
  }
}`,
        language: "javascript",
      },
      {
        title: "Ajout de validation",
        code: `// Instruction : "Ajouter une validation des paramètres"
function createUser(name, email) {
  return {
    name,
    email,
    createdAt: new Date()
  };
}

// Résultat
function createUser(name, email) {
  if (!name || typeof name !== 'string') {
    throw new Error('Name must be a non-empty string');
  }
  if (!email || !email.includes('@')) {
    throw new Error('Email must be valid');
  }
  
  return {
    name,
    email,
    createdAt: new Date()
  };
}`,
        language: "javascript",
      },
    ],
    tips: [
      "Sélectionnez le code concerné avant de demander une modification",
      "Soyez précis dans vos instructions",
      "Vérifiez toujours les modifications proposées",
      "Utilisez /edit pour des changements multi-fichiers",
    ],
  },

  {
    id: "agent-mode",
    title: "Agent Mode",
    description: "Agents spécialisés pour des tâches complexes",
    loader: rawLoader("modes/agent-mode.md"),
    examples: [
      {
        title: "Utilisation de @workspace",
        code: `@workspace Trouve tous les fichiers qui utilisent l'ancienne API et migre-les vers la nouvelle version

// Copilot va :
// 1. Chercher tous les fichiers concernés
// 2. Analyser les usages de l'ancienne API
// 3. Proposer les modifications
// 4. Appliquer les changements si validé`,
        language: "plaintext",
      },
      {
        title: "Utilisation de @terminal",
        code: `@terminal Comment installer et configurer PostgreSQL sur Ubuntu ?

// Copilot fournit :
// - Commandes d'installation
// - Configuration initiale
// - Création de base de données
// - Commandes de test`,
        language: "plaintext",
      },
    ],
    tips: [
      "Utilisez @workspace pour les opérations multi-fichiers",
      "Combinez plusieurs agents dans une conversation",
      "@terminal est idéal pour le DevOps et les scripts",
      "@vscode aide à configurer et personnaliser votre éditeur",
    ],
    relatedLinks: [],
  },

  {
    id: "plan-mode",
    title: "Plan Mode",
    description: "Planifiez et exécutez des tâches complexes étape par étape",
    loader: rawLoader("modes/plan-mode.md"),
    examples: [
      {
        title: "Migration React vers TypeScript",
        code: `Prompt: "Migrer mon application React JavaScript vers TypeScript"

Plan généré:
1. ✓ Installer les dépendances TypeScript
   - typescript
   - @types/react
   - @types/react-dom

2. ✓ Configurer tsconfig.json
   - Créer fichier de configuration
   - Définir les options du compilateur

3. → Renommer les fichiers .js en .tsx
   - Commencer par les composants simples
   - Identifier les composants avec JSX

4. ⏳ Ajouter les types progressivement
   - Props des composants
   - State management
   - Event handlers

5. ⏳ Corriger les erreurs TypeScript
   - Analyser les erreurs
   - Ajouter les types manquants

6. ⏳ Tester et valider
   - Vérifier que tout compile
   - Tester l'application`,
        language: "plaintext",
      },
    ],
    tips: [
      "Laissez Copilot décomposer les tâches complexes",
      "Validez chaque étape avant de continuer",
      "Le plan s'adapte selon vos retours",
      "Utilisez /plan pour démarrer la planification",
    ],
  },
];

export default copilotModes;
