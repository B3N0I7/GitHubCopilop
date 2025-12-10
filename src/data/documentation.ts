export interface DocSection {
  id: string;
  title: string;
  description: string;
  content?: string;
  loader?: () => Promise<string>;
  examples?: CodeExample[];
  tips?: string[];
  relatedLinks?: { title: string; path: string }[];
}

export interface CodeExample {
  title: string;
  code: string;
  language: string;
  description?: string;
}

export interface NavigationItem {
  path: string;
  title: string;
  icon?: string;
  children?: NavigationItem[];
}

// Documentation data structure
export const copilotModes: DocSection[] = [
  {
    id: "ask-mode",
    title: "Ask Mode",
    description: "Posez des questions et obtenez des réponses contextuelles",
    loader: () =>
      import("../content/modes/ask-mode.md?raw").then((m) => m.default),
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
    loader: () =>
      import("../content/modes/edit-mode.md?raw").then((m) => m.default),
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
    loader: () =>
      import("../content/modes/agent-mode.md?raw").then((m) => m.default),
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
    loader: () =>
      import("../content/modes/plan-mode.md?raw").then((m) => m.default),
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

export const instructionsData: DocSection[] = [
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    description: "Techniques pour créer des prompts efficaces",
    loader: () =>
      import("../content/instructions/prompt-engineering.md?raw").then(
        (m) => m.default
      ),
    examples: [
      {
        title: "Prompt vague vs spécifique",
        code: `❌ Prompt vague:
"Crée une fonction de validation"

✅ Prompt spécifique:
"Crée une fonction TypeScript qui valide une adresse email selon RFC 5322, retourne true si valide et false sinon, avec des tests unitaires"`,
        language: "plaintext",
      },
      {
        title: "Ajout de contexte",
        code: `✅ Prompt avec contexte:
"Je développe une API REST pour un e-commerce. 
Crée un endpoint POST /api/orders qui :
- Accepte { userId, items: [{productId, quantity}], shippingAddress }
- Valide le stock disponible
- Calcule le total avec taxes
- Crée la commande en base de données
- Retourne l'ordre créé avec un statut 201"`,
        language: "plaintext",
      },
    ],
    tips: [
      "Utilisez un langage clair et précis",
      "Mentionnez le langage/framework si pertinent",
      "Précisez les contraintes (performance, sécurité...)",
      "Demandez des explications si nécessaire",
    ],
  },
  {
    id: "slash-commands",
    title: "Commandes Slash",
    description: "Raccourcis pour des actions courantes",
    loader: () =>
      import("../content/instructions/slash-commands.md?raw").then(
        (m) => m.default
      ),
    examples: [
      {
        title: "Utilisation de /explain",
        code: `/explain
// Sur ce code:
const memoizedValue = useMemo(() => 
  computeExpensiveValue(a, b), 
  [a, b]
);

// Copilot explique:
// useMemo est un hook React qui mémorise le résultat
// d'un calcul coûteux. Il ne recalcule la valeur que
// lorsque 'a' ou 'b' changent.`,
        language: "javascript",
      },
      {
        title: "Utilisation de /tests",
        code: `/tests
// Sur cette fonction:
function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

// Copilot génère:
describe('isPalindrome', () => {
  it('should return true for palindromes', () => {
    expect(isPalindrome('A man a plan a canal Panama')).toBe(true);
    expect(isPalindrome('race car')).toBe(true);
  });
  
  it('should return false for non-palindromes', () => {
    expect(isPalindrome('hello')).toBe(false);
  });
  
  it('should handle empty strings', () => {
    expect(isPalindrome('')).toBe(true);
  });
});`,
        language: "typescript",
      },
    ],
  },
];

export const customAgentsData: DocSection[] = [
  {
    id: "creating-agents",
    title: "Créer des Agents Personnalisés",
    description: "Guide pour développer vos propres agents Copilot",
    loader: () =>
      import("../content/agents/creating-agents.md?raw").then((m) => m.default),
    examples: [
      {
        title: "Manifest d'un agent",
        code: `{
  "name": "database-helper",
  "displayName": "Database Helper",
  "description": "Agent pour gérer les requêtes et migrations de base de données",
  "version": "1.0.0",
  "capabilities": {
    "commands": [
      {
        "name": "generateMigration",
        "description": "Génère une migration de base de données"
      },
      {
        "name": "optimizeQuery",
        "description": "Optimise une requête SQL"
      }
    ]
  }
}`,
        language: "json",
      },
      {
        title: "Handler d'agent",
        code: `import * as vscode from 'vscode';

export async function handleRequest(
  request: AgentRequest,
  context: AgentContext
): Promise<AgentResponse> {
  const { command, parameters } = request;
  
  switch (command) {
    case 'generateMigration':
      return await generateMigration(parameters, context);
    
    case 'optimizeQuery':
      return await optimizeQuery(parameters, context);
    
    default:
      return {
        error: 'Unknown command'
      };
  }
}

async function generateMigration(
  params: any,
  context: AgentContext
): Promise<AgentResponse> {
  // Analyse le schema actuel
  const currentSchema = await analyzeDatabase(context);
  
  // Génère la migration
  const migration = createMigration(params.changes, currentSchema);
  
  return {
    content: migration,
    type: 'migration',
    metadata: {
      timestamp: Date.now()
    }
  };
}`,
        language: "typescript",
      },
    ],
    tips: [
      "Commencez simple et itérez",
      "Documentez bien les capacités de votre agent",
      "Gérez les erreurs explicitement",
      "Testez avec différents types d'entrées",
    ],
  },
];

export const navigation: NavigationItem[] = [
  {
    path: "/",
    title: "Accueil",
    icon: "Home",
  },
  {
    path: "/modes",
    title: "Modes Copilot",
    icon: "Layers",
    children: [
      { path: "/modes/ask-mode", title: "Ask Mode" },
      { path: "/modes/edit-mode", title: "Edit Mode" },
      { path: "/modes/agent-mode", title: "Agent Mode" },
      { path: "/modes/plan-mode", title: "Plan Mode" },
    ],
  },
  {
    path: "/instructions",
    title: "Instructions & Prompts",
    icon: "FileText",
    children: [
      { path: "/instructions/prompt-engineering", title: "Prompt Engineering" },
      { path: "/instructions/slash-commands", title: "Commandes Slash" },
    ],
  },
  {
    path: "/custom-agents",
    title: "Agents Personnalisés",
    icon: "Bot",
  },
];
