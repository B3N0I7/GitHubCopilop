const modules = import.meta.glob<string>("../content/**/*.md", {
  query: "?raw",
  import: "default",
});

export const rawLoader = (path: string) => {
  return async (): Promise<string> => {
    // const cleanPath = path.replace(/^(\.\/)+/, "");
    const cleanPath = path
      .replace(/^(\.\/)+/, "")
      .replace(/^\.\.\/content\//, "")
      .replace(/^content\//, "");
    const key = `../content/${cleanPath}`;

    const loader = modules[key];

    if (!loader) {
      if (import.meta.env.DEV) {
        console.warn(`[rawLoader] Fichier non trouvé : ${key}`);
        console.warn("Chemins disponibles :", Object.keys(modules));
      }
      throw new Error(`Fichier non trouvé : ${key}`);
    }

    return loader();
  };
};
