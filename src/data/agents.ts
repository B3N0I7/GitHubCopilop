import { DocSection } from "./types";
import { rawLoader } from "./loaders";

export const customAgentsData: DocSection[] = [
  {
    id: "creating-agents",
    title: "Créer des Agents Personnalisés",
    description: "Guide pour développer vos propres agents Copilot",
    loader: rawLoader("agents/creating-agents.md"),
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

export default customAgentsData;
