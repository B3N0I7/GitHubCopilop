import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { instructionsData } from "../data/documentation";
import CodeBlock from "../components/CodeBlock";
import { AlertCircle, Lightbulb } from "lucide-react";

const InstructionPage: React.FC = () => {
  const { instructionId } = useParams<{ instructionId: string }>();
  const instruction = instructionsData.find((i) => i.id === instructionId);

  if (!instruction) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Instruction non trouvée
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          L'instruction demandée n'existe pas.
        </p>
      </div>
    );
  }

  return (
    <article className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {instruction.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {instruction.description}
        </p>
      </header>

      <div className="prose dark:prose-invert max-w-none">
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
          {instruction.content}
        </ReactMarkdown>
      </div>

      {instruction.examples && instruction.examples.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Exemples
          </h2>
          <div className="space-y-6">
            {instruction.examples.map((example, index) => (
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

      {instruction.tips && instruction.tips.length > 0 && (
        <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Conseils pratiques
              </h3>
              <ul className="space-y-2">
                {instruction.tips.map((tip, index) => (
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
    </article>
  );
};

export default InstructionPage;
