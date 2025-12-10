import React from "react";
import ReactMarkdown from "react-markdown";
import { customAgentsData } from "../data/documentation";
import CodeBlock from "../components/CodeBlock";
import { Bot, Lightbulb } from "lucide-react";

const CustomAgentsPage: React.FC = () => {
  const agentMeta = customAgentsData[0]; // Premier document des agents personnalisés
  const [agentDoc, setAgentDoc] = React.useState(agentMeta ?? null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    if (agentMeta && agentMeta.loader) {
      setLoading(true);
      agentMeta.loader().then((content) => {
        if (!mounted) return;
        setAgentDoc({ ...agentMeta, content });
        setLoading(false);
      });
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <article className="space-y-8">
      <header>
        <div className="flex items-center gap-3 mb-4">
          <Bot className="w-10 h-10 text-primary-600" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {agentDoc.title}
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {agentDoc.description}
        </p>
      </header>

      <div className="prose dark:prose-invert max-w-none">
        {loading ? (
          <p>Chargement...</p>
        ) : (
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
                  {children}
                </ul>
              ),
              li: ({ children }) => <li className="ml-4">{children}</li>,
            }}
          >
            {agentDoc.content}
          </ReactMarkdown>
        )}
      </div>

      {agentDoc.examples && agentDoc.examples.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Exemples de code
          </h2>
          <div className="space-y-6">
            {agentDoc.examples.map((example, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-200 dark:border-slate-700">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {example.title}
                  </h3>
                  {example.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {example.description}
                    </p>
                  )}
                </div>
                <CodeBlock code={example.code} language={example.language} />
              </div>
            ))}
          </div>
        </section>
      )}

      {agentDoc.tips && agentDoc.tips.length > 0 && (
        <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Conseils pratiques
              </h3>
              <ul className="space-y-2">
                {agentDoc.tips.map((tip, index) => (
                  <li
                    key={index}
                    className="text-gray-700 dark:text-gray-300 flex items-start"
                  >
                    <span className="text-blue-600 dark:text-blue-400 mr-2">
                      •
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <section className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Ressources additionnelles
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>
            <a
              href="https://github.com/features/copilot"
              className="text-primary-600 dark:text-primary-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation officielle GitHub Copilot
            </a>
          </li>
          <li>
            <a
              href="https://code.visualstudio.com/api"
              className="text-primary-600 dark:text-primary-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              VS Code Extension API
            </a>
          </li>
          <li>
            <a
              href="https://github.com/openai/openai-node"
              className="text-primary-600 dark:text-primary-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              OpenAI Node.js SDK
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
};

export default CustomAgentsPage;
