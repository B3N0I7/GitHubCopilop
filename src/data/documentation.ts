import { copilotModes } from "./modes";
import { instructionsData } from "./instructions";
import { customAgentsData } from "./agents";
import { NavigationItem } from "./types";

export { copilotModes, instructionsData, customAgentsData };

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

// Runtime validation: s'assure que les IDs sont uniques
(function validateUniqueIds() {
  const ids = new Map<string, string>();
  const checkList = [...copilotModes, ...instructionsData, ...customAgentsData];
  checkList.forEach((doc) => {
    if (ids.has(doc.id)) {
      console.warn(
        `Duplicate doc id detected: ${doc.id} ("${doc.title}" and "${ids.get(
          doc.id
        )}")`
      );
    } else {
      ids.set(doc.id, doc.title);
    }
  });
})();
