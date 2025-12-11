import { DocSection } from "./types";
import { rawLoader } from "./loaders";

export const instructionsData: DocSection[] = [
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    description: "Techniques pour créer des prompts efficaces",
    loader: rawLoader("../content/instructions/prompt-engineering.md"),
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
    loader: rawLoader("../content/instructions/slash-commands.md"),
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

export default instructionsData;
