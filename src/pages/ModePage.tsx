import React from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { copilotModes } from "../data/documentation";
import CodeBlock from "../components/CodeBlock";
import { AlertCircle, Lightbulb, ArrowRight } from "lucide-react";

const ModePage: React.FC = () => {
  const { modeId } = useParams<{ modeId: string }>();
  const modeMeta = copilotModes.find((m) => m.id === modeId);
  const [mode, setMode] = React.useState(modeMeta ?? null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    if (modeMeta && modeMeta.loader) {
      setLoading(true);
      modeMeta.loader().then((content) => {
        if (!mounted) return;
        setMode({ ...modeMeta, content });
        setLoading(false);
      });
    }
    return () => {
      mounted = false;
    };
  }, [modeId]);

  if (!mode) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Mode non trouvé
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Le mode demandé n'existe pas.
        </p>
      </div>
    );
  }

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {mode.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {mode.description}
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
            {mode.content}
          </ReactMarkdown>
        )}
      </div>

      {mode.examples && mode.examples.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Exemples
          </h2>
          <div className="space-y-6">
            {mode.examples.map((example, index) => (
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

      {mode.tips && mode.tips.length > 0 && (
        <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Conseils pratiques
              </h3>
              <ul className="space-y-2">
                {mode.tips.map((tip, index) => (
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

      {mode.relatedLinks && mode.relatedLinks.length > 0 && (
        <section>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Articles liés
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {mode.relatedLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors group"
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {link.title}
                </span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default ModePage;
