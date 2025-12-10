import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Sparkles, Zap, Target } from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          GitHub Copilot
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Documentation ultime pour maîtriser votre assistant IA
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/modes/ask-mode"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Commencer
          </Link>
          <Link
            to="/custom-agents"
            className="px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors font-medium"
          >
            Agents Personnalisés
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          icon={<BookOpen className="w-8 h-8 text-primary-600" />}
          title="Ask Mode"
          description="Posez des questions et obtenez des réponses contextuelles instantanées"
          link="/modes/ask-mode"
        />
        <FeatureCard
          icon={<Sparkles className="w-8 h-8 text-purple-600" />}
          title="Edit Mode"
          description="Modifiez votre code avec des instructions en langage naturel"
          link="/modes/edit-mode"
        />
        <FeatureCard
          icon={<Zap className="w-8 h-8 text-yellow-600" />}
          title="Agent Mode"
          description="Agents spécialisés pour des tâches complexes et autonomes"
          link="/modes/agent-mode"
        />
        <FeatureCard
          icon={<Target className="w-8 h-8 text-green-600" />}
          title="Plan Mode"
          description="Planifiez et exécutez des projets étape par étape"
          link="/modes/plan-mode"
        />
      </section>

      <section className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-gray-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          À propos de cette documentation
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300">
            Cette documentation complète vous guide à travers toutes les
            fonctionnalités de GitHub Copilot. Que vous soyez débutant ou
            développeur expérimenté, vous trouverez ici tout ce dont vous avez
            besoin pour maximiser votre productivité.
          </p>
          <ul className="text-gray-700 dark:text-gray-300 mt-4 space-y-2">
            <li>✓ Guides détaillés pour chaque mode de Copilot</li>
            <li>✓ Exemples pratiques et cas d'usage réels</li>
            <li>✓ Techniques de prompt engineering</li>
            <li>✓ Création d'agents personnalisés</li>
            <li>✓ Astuces et bonnes pratiques</li>
          </ul>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <QuickLink
          title="Prompt Engineering"
          description="Apprenez à créer des prompts efficaces"
          link="/instructions/prompt-engineering"
        />
        <QuickLink
          title="Commandes Slash"
          description="Raccourcis pour des actions courantes"
          link="/instructions/slash-commands"
        />
        <QuickLink
          title="Agents Personnalisés"
          description="Étendez Copilot avec vos propres outils"
          link="/custom-agents"
        />
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  link,
}) => {
  return (
    <Link
      to={link}
      className="block p-6 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors group"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </Link>
  );
};

interface QuickLinkProps {
  title: string;
  description: string;
  link: string;
}

const QuickLink: React.FC<QuickLinkProps> = ({ title, description, link }) => {
  return (
    <Link
      to={link}
      className="block p-4 bg-gray-50 dark:bg-slate-800/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
    >
      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </Link>
  );
};

export default Home;
